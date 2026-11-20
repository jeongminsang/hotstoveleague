import { Env } from "./types";
import { parseRealNewsWithGemini } from "./gemini";
import { getSupabaseClient, filterExistingDrafts, insertRumorDrafts } from "./supabase";

export async function runInvenExclusiveHarvest(env: Env): Promise<{
  scanned: number;
  saved: number;
}> {
  if (!env.GEMINI_API_KEY || !env.SUPABASE_URL || !env.SUPABASE_KEY) {
    return { scanned: 0, saved: 0 };
  }

  const res = await fetch("https://www.inven.co.kr/webzine/news/?site=lol", {
    headers: { "User-Agent": "Mozilla/5.0 (compatible; HotStoveLeagueBot/1.0)" },
  });
  if (!res.ok) return { scanned: 0, saved: 0 };

  const html = await res.text();
  const matches = [...html.matchAll(/href="([^"]*news=(\d+)[^"]*)"[^>]*>([^<]*(?:\[단독\]|\[오피셜\])[^<]*)<\/a>/gi)];

  const seen = new Set<string>();
  const articles: Array<{ title: string; url: string; publishedAt: string; source: string }> = [];

  for (const m of matches) {
    const newsId = m[2];
    const title = m[3].replace(/\s+/g, " ").trim();
    if (!newsId || seen.has(newsId)) continue;
    seen.add(newsId);

    articles.push({
      title,
      url: `https://www.inven.co.kr/webzine/news/?news=${newsId}&site=lol`,
      publishedAt: new Date().toISOString(),
      source: "Inven",
    });
    if (articles.length >= 10) break;
  }

  if (articles.length === 0) return { scanned: 0, saved: 0 };

  const candidates = [];
  for (const a of articles) {
    const parsed = await parseRealNewsWithGemini(env.GEMINI_API_KEY, a);
    if (parsed) candidates.push(parsed);
  }

  if (candidates.length === 0) return { scanned: articles.length, saved: 0 };

  const supabase = getSupabaseClient(env);
  const newDrafts = await filterExistingDrafts(supabase, candidates);
  if (newDrafts.length === 0) return { scanned: articles.length, saved: 0 };

  const saved = await insertRumorDrafts(supabase, newDrafts);
  return { scanned: articles.length, saved };
}
