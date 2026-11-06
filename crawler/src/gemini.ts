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
  const model = "gemini-2.5-flash";
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

  const queryText = SEARCH_PROMPTS.join("\n- ");
  const requestBody = {
    contents: [
      {
        parts: [
          {
            text: `Investigate and extract the latest 2025-2026 LoL stove league roster rumors and announcements across LCK, LPL, LEC, LCS using Google Search.\nFocus points:\n- ${queryText}\n\nReturn up to 10 of the most recent, notable transfer/roster rumors formatted as JSON.`,
          },
        ],
      },
    ],
    tools: [
      {
        google_search: {},
      },
    ],
    generationConfig: {
      temperature: 0.2,
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
      console.error(`[Gemini Search] API error ${res.status}:`, errText);
      return [];
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
      console.warn("[Gemini Search] Empty response from model");
      return [];
    }

    let parsed: { drafts?: CandidateDraft[] } | CandidateDraft[] = JSON.parse(textOutput);
    const drafts: CandidateDraft[] = Array.isArray(parsed)
      ? parsed
      : Array.isArray(parsed?.drafts)
      ? parsed.drafts
      : [];

    return drafts.filter((d) => Boolean(d && (d.summary || d.raw_text)));
  } catch (err) {
    console.error("[Gemini Search] Failed to discover drafts:", err);
    return [];
  }
}
