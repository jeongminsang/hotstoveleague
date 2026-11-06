import { CandidateDraft } from "./types";
import { RealNewsItem } from "./news";

const SYSTEM_INSTRUCTION = `You are an elite League of Legends esports stove league investigator.
You are given REAL published articles and reports.
Your job is to strictly analyze whether the article is related to LoL player/coach roster transfers, FA, contracts, or leaker reports (Sheep Esports, Wooloo, etc.).

Strict Rules:
1. Do NOT invent or fabricate any rumor.
2. If the article is NOT a roster rumor or transfer news (e.g. general match recap or tournament awards), set is_roster_rumor: false.
3. If it IS a roster transfer rumor/announcement:
   - summary: 1-sentence concise factual summary in Korean
   - summary_en: 1-sentence concise summary in English
   - summary_zh: 1-sentence concise summary in Chinese
   - player_name: player's official in-game tag (e.g. "Zicssi", "SkewMond", "Caps", "Ruler") or null if coach/general
   - player_slug: lowercase tag (e.g. "zicssi") or null
   - from_team: current team short code or null
   - to_team: target or rumored team short code (e.g. "SK", "G2", "T1", "GEN", "FA") or null
   - league: "LCK" | "LPL" | "LEC" | "LCS"
   - kind: "TRANSFER" | "RENEWAL" | "FA" | "STAY"
   - confidence: 90 for Sheep Esports/Wooloo reports, 100 for official announcements, 80 for press
4. Return JSON only:
{
  "is_roster_rumor": boolean,
  "summary": string,
  "summary_en": string,
  "summary_zh": string,
  "player_name": string | null,
  "player_slug": string | null,
  "from_team": string | null,
  "to_team": string | null,
  "league": string,
  "kind": string,
  "confidence": number
}`;

export async function parseRealNewsWithGemini(
  apiKey: string,
  news: RealNewsItem
): Promise<CandidateDraft | null> {
  const model = "gemini-flash-lite-latest";
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

  const prompt = `Analyze this real esports news report:
Title: "${news.title}"
Source Author: "${news.author}"
Published Date: "${news.pubDate}"

Extract transfer data according to the schema. If it is not a roster transfer rumor or report, set is_roster_rumor to false.`;

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.1,
          response_mime_type: "application/json",
        },
        system_instruction: { parts: [{ text: SYSTEM_INSTRUCTION }] },
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error(`[Gemini Parse] HTTP ${res.status}:`, errText);
      return null;
    }

    const data = (await res.json()) as any;
    const textOutput = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!textOutput) return null;

    const rawTitle = (news.title || "").toLowerCase();
    // Exclude Valorant / VCT titles to keep strictly League of Legends
    if (rawTitle.includes("vct") || rawTitle.includes("valorant")) {
      return null;
    }

    // Direct detection of Sheep Esports / Wooloo source reports
    const isSourceReport = /sources:|sources |verbal agreement|won't continue|set to join|to join|transfer|roster/i.test(news.title);

    let parsed: any = null;
    try {
      parsed = JSON.parse(textOutput);
    } catch {
      return null;
    }

    if (!parsed?.is_roster_rumor && !isSourceReport) return null;

    return {
      post_id: news.id,
      source: (news.source as any) || "NEWS",
      author: news.author,
      author_en: news.author,
      author_zh: news.author,
      raw_text: news.title,
      summary: parsed.summary,
      summary_en: parsed.summary_en,
      summary_zh: parsed.summary_zh,
      player_slug: parsed.player_slug || undefined,
      player_name: parsed.player_name || undefined,
      current_team_short: parsed.from_team || undefined,
      target_team_short: parsed.to_team || undefined,
      league: parsed.league || "LCK",
      kind: parsed.kind || "UNKNOWN",
      confidence: parsed.confidence || 85,
      post_url: news.link, // REAL actual link from Google News RSS
      published_at: news.pubDate, // REAL actual published date from source
    };
  } catch (err) {
    console.error("[Gemini Parse] Failed to parse article:", err);
    return null;
  }
}
