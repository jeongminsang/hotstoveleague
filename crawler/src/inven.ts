import { Env, CandidateDraft } from "./types";
import { RealNewsItem } from "./news";
import { parseRealNewsWithGemini } from "./gemini";
import { autoPublishCandidateDraft } from "./leaguepedia";
import { getSupabaseClient, filterExistingDrafts, insertRumorDrafts } from "./supabase";

export async function runInvenExclusiveHarvest(env: Env): Promise<{
  scanned: number;
  saved: number;
  autoPublished: number;
}> {
  if (!env.GEMINI_API_KEY || !env.SUPABASE_URL || !env.SUPABASE_KEY) {
    return { scanned: 0, saved: 0, autoPublished: 0 };
  }

  const res = await fetch("https://www.inven.co.kr/webzine/news/?site=lol", {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36",
    },
  });
  if (!res.ok) return { scanned: 0, saved: 0, autoPublished: 0 };

  const html = await res.text();
  const matches = [...html.matchAll(/href="([^"]*news=(\d+)[^"]*)"[^>]*>([\s\S]*?)<\/a>/gi)];

  const seen = new Set<string>();
  const articles: RealNewsItem[] = [];

  for (const m of matches) {
    const newsId = m[2];
    const cleanText = m[3]
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim();
    if (!newsId || seen.has(newsId)) continue;
    if (!/(\[단독\]|\[오피셜\]|계약\s*종료|영입|재계약|합류\s*유력)/.test(cleanText)) continue;
    seen.add(newsId);

    // Keep concise headline (up to 120 chars)
    const headline = cleanText.slice(0, 120);
    articles.push({
      id: `inven-${newsId}`,
      title: headline,
      link: `https://www.inven.co.kr/webzine/news/?news=${newsId}&site=lol`,
      pubDate: new Date().toISOString(),
      source: "NEWS",
      author: "Inven",
    });
    if (articles.length >= 8) break;
  }

  if (articles.length === 0) return { scanned: 0, saved: 0, autoPublished: 0 };

  const supabase = getSupabaseClient(env);
  // Pre-filter articles already in rumors or rumor_drafts BEFORE calling Gemini
  const preCandidates = articles.map((a) => ({ post_id: a.id } as CandidateDraft));
  const unseenIds = new Set((await filterExistingDrafts(supabase, preCandidates)).map((d) => d.post_id));
  const unseenArticles = articles.filter((a) => unseenIds.has(a.id)).slice(0, 4);

  if (unseenArticles.length === 0) {
    return { scanned: articles.length, saved: 0, autoPublished: 0 };
  }

  const candidates: CandidateDraft[] = [];
  let autoPublished = 0;

  for (const a of unseenArticles) {
    const parsed = await parseRealNewsWithGemini(env.GEMINI_API_KEY, a);
    if (parsed) {
      candidates.push(parsed);
      const pubOk = await autoPublishCandidateDraft(env, parsed);
      if (pubOk) autoPublished++;
    }
  }

  if (candidates.length === 0) {
    return { scanned: articles.length, saved: 0, autoPublished };
  }

  const newDrafts = await filterExistingDrafts(supabase, candidates);
  if (newDrafts.length === 0) {
    return { scanned: articles.length, saved: 0, autoPublished };
  }

  const saved = await insertRumorDrafts(supabase, newDrafts);
  return { scanned: articles.length, saved, autoPublished };
}
