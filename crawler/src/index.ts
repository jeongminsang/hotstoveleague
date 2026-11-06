import { Env, CandidateDraft } from "./types";
import { fetchRealRumorArticles } from "./news";
import { parseRealNewsWithGemini } from "./gemini";
import {
  getSupabaseClient,
  filterExistingDrafts,
  insertRumorDrafts,
} from "./supabase";

export async function runDraftHarvestPipeline(env: Env): Promise<{
  realArticlesFound: number;
  validRumorsParsed: number;
  newDraftCount: number;
  savedCount: number;
}> {
  console.log("[Draft Crawler] 1. Searching for real published rumor articles...");

  // 1. Fetch real articles via Google News RSS (zero quota, 100% free, real links)
  const realArticles = await fetchRealRumorArticles();
  console.log(`[Draft Crawler] Found ${realArticles.length} real news items.`);

  if (realArticles.length === 0) {
    return { realArticlesFound: 0, validRumorsParsed: 0, newDraftCount: 0, savedCount: 0 };
  }

  // 2. Parse transfer details and multilingual summaries using Gemini
  const candidateDrafts: CandidateDraft[] = [];
  for (const article of realArticles) {
    if (!env.GEMINI_API_KEY) break;
    const parsed = await parseRealNewsWithGemini(env.GEMINI_API_KEY, article);
    if (parsed) {
      candidateDrafts.push(parsed);
    }
  }

  console.log(`[Draft Crawler] Extracted ${candidateDrafts.length} valid transfer rumors from real sources.`);

  if (candidateDrafts.length === 0) {
    return {
      realArticlesFound: realArticles.length,
      validRumorsParsed: 0,
      newDraftCount: 0,
      savedCount: 0,
    };
  }

  if (!env.SUPABASE_URL || !env.SUPABASE_KEY) {
    console.warn("[Draft Crawler] Supabase credentials missing. Returning count only.");
    return {
      realArticlesFound: realArticles.length,
      validRumorsParsed: candidateDrafts.length,
      newDraftCount: candidateDrafts.length,
      savedCount: 0,
    };
  }

  // 3. Filter out items already in rumors or rumor_drafts
  const supabase = getSupabaseClient(env);
  const newDrafts = await filterExistingDrafts(supabase, candidateDrafts);
  console.log(`[Draft Crawler] ${newDrafts.length} new drafts after deduplication.`);

  if (newDrafts.length === 0) {
    return {
      realArticlesFound: realArticles.length,
      validRumorsParsed: candidateDrafts.length,
      newDraftCount: 0,
      savedCount: 0,
    };
  }

  // 4. Insert into rumor_drafts table as 'pending'
  const savedCount = await insertRumorDrafts(supabase, newDrafts);
  console.log(`[Draft Crawler] Successfully saved ${savedCount} pending drafts into Supabase.`);

  return {
    realArticlesFound: realArticles.length,
    validRumorsParsed: candidateDrafts.length,
    newDraftCount: newDrafts.length,
    savedCount,
  };
}

export default {
  /**
   * Cloudflare Cron Trigger (Runs every 6 hours)
   */
  async scheduled(event: ScheduledEvent, env: Env, ctx: ExecutionContext) {
    ctx.waitUntil(runDraftHarvestPipeline(env));
  },

  /**
   * HTTP Handler for manual trigger or healthcheck
   */
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === "/health") {
      return new Response(JSON.stringify({ status: "ok", timestamp: new Date() }), {
        headers: { "Content-Type": "application/json" },
      });
    }

    if (url.pathname === "/crawl" || url.pathname === "/harvest") {
      try {
        const result = await runDraftHarvestPipeline(env);
        return new Response(JSON.stringify(result, null, 2), {
          headers: { "Content-Type": "application/json" },
        });
      } catch (err: any) {
        return new Response(
          JSON.stringify({ error: err?.message || String(err), stack: err?.stack }),
          { status: 500, headers: { "Content-Type": "application/json" } }
        );
      }
    }

    return new Response(
      JSON.stringify({
        service: "HotStove League Real-Source Harvester",
        endpoints: ["/harvest (GET/POST)", "/health (GET)"],
      }),
      { headers: { "Content-Type": "application/json" } }
    );
  },
};
