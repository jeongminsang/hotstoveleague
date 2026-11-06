import { Env } from "./types";
import { discoverDraftsWithGemini } from "./gemini";
import {
  getSupabaseClient,
  filterExistingDrafts,
  insertRumorDrafts,
} from "./supabase";

export async function runDraftHarvestPipeline(env: Env): Promise<{
  discoveredCount: number;
  newDraftCount: number;
  savedCount: number;
  debug?: Record<string, unknown>;
}> {
  console.log("[Draft Crawler] Starting draft collection cycle...");

  const debugInfo: Record<string, unknown> = {
    hasGeminiKey: Boolean(env.GEMINI_API_KEY),
    geminiKeyLen: env.GEMINI_API_KEY ? env.GEMINI_API_KEY.length : 0,
    hasSupabaseUrl: Boolean(env.SUPABASE_URL),
    hasSupabaseKey: Boolean(env.SUPABASE_KEY),
  };

  if (!env.GEMINI_API_KEY) {
    console.warn("[Draft Crawler] Missing GEMINI_API_KEY. Skipping harvest.");
    return { discoveredCount: 0, newDraftCount: 0, savedCount: 0, debug: debugInfo };
  }

  // 1. Discover candidates via Gemini
  let candidateDrafts: any[] = [];
  try {
    candidateDrafts = await discoverDraftsWithGemini(env.GEMINI_API_KEY);
    debugInfo.candidateCount = candidateDrafts.length;
  } catch (e: any) {
    debugInfo.geminiError = e?.message || String(e);
  }

  if (candidateDrafts.length === 0) {
    return { discoveredCount: 0, newDraftCount: 0, savedCount: 0, debug: debugInfo };
  }

  if (!env.SUPABASE_URL || !env.SUPABASE_KEY) {
    console.warn("[Draft Crawler] Supabase credentials missing. Returning candidate count only.");
    return {
      discoveredCount: candidateDrafts.length,
      newDraftCount: candidateDrafts.length,
      savedCount: 0,
      debug: debugInfo,
    };
  }

  // 2. Filter out items already in rumors or rumor_drafts
  const supabase = getSupabaseClient(env);
  const newDrafts = await filterExistingDrafts(supabase, candidateDrafts);
  console.log(`[Draft Crawler] ${newDrafts.length} new drafts after deduplication.`);

  if (newDrafts.length === 0) {
    return {
      discoveredCount: candidateDrafts.length,
      newDraftCount: 0,
      savedCount: 0,
    };
  }

  // 3. Insert into rumor_drafts table as 'pending'
  const savedCount = await insertRumorDrafts(supabase, newDrafts);
  console.log(`[Draft Crawler] Successfully saved ${savedCount} pending drafts into Supabase.`);

  return {
    discoveredCount: candidateDrafts.length,
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
        service: "HotStove League Draft Harvester",
        endpoints: ["/harvest (GET/POST)", "/health (GET)"],
      }),
      { headers: { "Content-Type": "application/json" } }
    );
  },
};
