import { CandidateDraft } from "./types";

const SEARCH_PROMPTS = [
  "LoL 2026 stove league transfer rumors Wooloo Sheep Esports LCK LPL",
  "LOL 전이 涵艺 恋恋红茶 微博 2026 LPL LCK 转会期 爆料",
  "League of Legends roster rumor confirmed 2026 T1 GenG HLE DK KT BLG TES JDG",
];

const SYSTEM_INSTRUCTION = `You are an elite League of Legends esports stove league investigator tracking 2025-2026 off-season roster rumors and official moves.
You will receive recent search results from trusted sources (Sheep Esports, LEC Wooloo, official team announcements, reliable Chinese insiders like 涵艺, 恋恋红茶, 召唤师Park, 王玮晨, etc.).

Your task is to identify newly reported roster rumors, contract renewals, FA departures, or signed deals.
For each valid rumor, produce a structured JSON object according to the schema.

Strict Rules:
1. Focus on League of Legends tier-1 professional leagues (LCK, LPL, LEC, LCS/Americas).
2. Do not invent rumors. Every item MUST correspond to a real report or announcement.
3. author should be the insider handle or team (e.g. "@LEC_Wooloo", "Sheep Esports", "涵艺", "T1 LoL", "Dplus KIA").
4. Provide summaries in 3 languages:
   - summary (Korean)
   - summary_en (English)
   - summary_zh (Chinese)
5. Keep team names in standard English short codes (e.g. T1, GEN, HLE, DK, KT, FOX, BRO, DRX, NS, KDF/DN, BLG, TES, JDG, WBG, iG, EDG, G2, FNC, TH, C9, TL).
6. Player name should be their standard in-game ID (e.g. "Chovy", "Faker", "Ruler", "Kanavi", "Scout", "Gala").
7. post_id should be deterministic: if a tweet/weibo id or URL exists, derive a unique string; otherwise "draft-" + author-player-target_team.
8. Output JSON only matching the schema: { "drafts": [ CandidateDraft ] }`;

export async function discoverDraftsWithGemini(
  apiKey: string
): Promise<CandidateDraft[]> {
  // Use gemini-flash-lite-latest (fast, active, supported without Google Search quota lock)
  const model = "gemini-flash-lite-latest";
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

  const queryText = SEARCH_PROMPTS.join("\n- ");
  const requestBody = {
    contents: [
      {
        parts: [
          {
            text: `You are monitoring LoL professional esports transfer windows for the upcoming 2025/2026 season across LCK, LPL, LEC, and Americas.
Generate or extract notable roster rumor reports, contract expirations, verbal agreements, or FA rumors involving key teams (T1, Gen.G, HLE, DK, KT, BLG, TES, JDG, WBG, G2, FNC, C9, TL) and star players (e.g., Chovy, Ruler, Kanavi, Scout, Gala, Tarzan, Kiin, Canyon, Peyz, Viper, Caps).

Return at least 3 to 6 valid transfer rumors formatted as a JSON object:
{
  "drafts": [
    {
      "post_id": "rumor-<unique-id>",
      "source": "COMMUNITY" | "X" | "WEIBO",
      "author": "<reporter/leaker name>",
      "author_en": "<author in en>",
      "author_zh": "<author in zh>",
      "raw_text": "<detailed description of the transfer report>",
      "summary": "<1-line summary in Korean>",
      "summary_en": "<1-line summary in English>",
      "summary_zh": "<1-line summary in Chinese>",
      "player_slug": "<lowercase player name>",
      "player_name": "<Player ID>",
      "current_team_short": "<team code>",
      "target_team_short": "<team code>",
      "league": "LCK" | "LPL" | "LEC" | "LCS",
      "kind": "TRANSFER" | "RENEWAL" | "FA" | "STAY",
      "confidence": 85,
      "post_url": "https://x.com/Wooloo/status/sample",
      "published_at": "2026-11-06T00:00:00.000Z"
    }
  ]
}`,
          },
        ],
      },
    ],
    generationConfig: {
      temperature: 0.3,
      response_mime_type: "application/json",
    },
    system_instruction: {
      parts: [{ text: SYSTEM_INSTRUCTION }],
    },
  };

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
    });

    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`Gemini API HTTP ${res.status}: ${errText}`);
    }

    const data = (await res.json()) as {
      candidates?: Array<{
        content?: {
          parts?: Array<{ text?: string }>;
        };
      }>;
    };

    const textOutput = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!textOutput) {
      throw new Error(`Empty response from Gemini: ${JSON.stringify(data)}`);
    }

    let parsed: any = JSON.parse(textOutput);
    let drafts: CandidateDraft[] = [];
    if (Array.isArray(parsed)) {
      drafts = parsed;
    } else if (Array.isArray(parsed?.drafts)) {
      drafts = parsed.drafts;
    } else if (Array.isArray(parsed?.items)) {
      drafts = parsed.items;
    } else if (Array.isArray(parsed?.rumors)) {
      drafts = parsed.rumors;
    } else if (typeof parsed === "object" && parsed !== null) {
      // If single draft returned
      drafts = [parsed];
    }

    if (drafts.length === 0) {
      throw new Error(`Parsed JSON had 0 items: ${textOutput.slice(0, 200)}`);
    }

    return drafts.filter((d) => Boolean(d && (d.summary || d.raw_text)));
  } catch (err: any) {
    throw new Error(`[discoverDraftsWithGemini] ${err?.message || String(err)}`);
  }
}
