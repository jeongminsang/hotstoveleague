import { Env, CandidateDraft } from "./types";
import { fetchRealRumorArticles } from "./news";
import { parseRealNewsWithGemini } from "./gemini";
import { runLeaguepediaAutoPublish, autoPublishCandidateDraft } from "./leaguepedia";
import { runInvenExclusiveHarvest } from "./inven";
import { runWeiboDirectHarvest } from "./weibo";
import {
  getSupabaseClient,
  filterExistingDrafts,
  insertRumorDrafts,
} from "./supabase";

export async function runDraftHarvestPipeline(
  env: Env,
  mode: "auto" | "lp" | "weibo" = "auto"
): Promise<{
  mode: string;
  leaguepedia: { fetched: number; published: number; skipped: number };
  inven: { scanned: number; saved: number; autoPublished: number };
  weibo: { accountsChecked: number; postsMatched: number; saved: number; autoPublished: number };
  realArticlesFound: number;
  validRumorsParsed: number;
  autoPublishedCount: number;
  newDraftCount: number;
  savedCount: number;
}> {
  const isEvenHour = new Date().getUTCHours() % 2 === 0;
  const runLpInven = mode === "lp" || (mode === "auto" && isEvenHour);
  const runWeiboNews = mode === "weibo" || (mode === "auto" && !isEvenHour);
  const activeMode = runLpInven ? "even-hour(leaguepedia+inven)" : "odd-hour(weibo+news)";

  let lpResult = { fetched: 0, published: 0, skipped: 0 };
  let invenResult = { scanned: 0, saved: 0, autoPublished: 0 };
  let weiboResult = { accountsChecked: 0, postsMatched: 0, saved: 0, autoPublished: 0 };

  if (runLpInven) {
    console.log("[Draft Crawler] 1. Running Leaguepedia auto-publish...");
    lpResult = await runLeaguepediaAutoPublish(env);
    console.log(
      `[Draft Crawler] Leaguepedia: fetched=${lpResult.fetched}, published=${lpResult.published}, skipped=${lpResult.skipped}`
    );

    console.log("[Draft Crawler] 1.5. Running Inven [단독]/[오피셜] harvest...");
    invenResult = await runInvenExclusiveHarvest(env);
    console.log(
      `[Draft Crawler] Inven: scanned=${invenResult.scanned}, saved=${invenResult.saved}, autoPublished=${invenResult.autoPublished}`
    );
  }

  if (runWeiboNews) {
    console.log("[Draft Crawler] 1.8. Running Direct Weibo Insiders & Official Teams harvest...");
    weiboResult = await runWeiboDirectHarvest(env);
    console.log(
      `[Draft Crawler] Weibo: accounts=${weiboResult.accountsChecked}, matched=${weiboResult.postsMatched}, saved=${weiboResult.saved}, autoPublished=${weiboResult.autoPublished}`
    );
  }

  if (!runWeiboNews) {
    return {
      mode: activeMode,
      leaguepedia: lpResult,
      inven: invenResult,
      weibo: weiboResult,
      realArticlesFound: 0,
      validRumorsParsed: 0,
      autoPublishedCount: 0,
      newDraftCount: 0,
      savedCount: 0,
    };
  }

  console.log("[Draft Crawler] 2. Searching for real published rumor articles...");
  const realArticles = await fetchRealRumorArticles();
  console.log(`[Draft Crawler] Found ${realArticles.length} real news items.`);

  if (realArticles.length === 0) {
    return {
      leaguepedia: lpResult,
      inven: invenResult,
      weibo: weiboResult,
      realArticlesFound: 0,
      validRumorsParsed: 0,
      autoPublishedCount: 0,
      newDraftCount: 0,
      savedCount: 0,
    };
  }

  const supabase = env.SUPABASE_URL && env.SUPABASE_KEY ? getSupabaseClient(env) : null;
  let unseenArticles = realArticles;
  if (supabase) {
    const preCandidates = realArticles.map((a) => ({ post_id: a.id } as CandidateDraft));
    const unseenIds = new Set((await filterExistingDrafts(supabase, preCandidates)).map((d) => d.post_id));
    unseenArticles = realArticles.filter((a) => unseenIds.has(a.id));
  }

  const candidateDrafts: CandidateDraft[] = [];
  let autoPublishedCount = 0;

  for (const article of unseenArticles.slice(0, 3)) {
    if (!env.GEMINI_API_KEY) break;
    const parsed = await parseRealNewsWithGemini(env.GEMINI_API_KEY, article);
    if (parsed) {
      candidateDrafts.push(parsed);
      const pubOk = await autoPublishCandidateDraft(env, parsed);
      if (pubOk) autoPublishedCount++;
    }
  }

  console.log(`[Draft Crawler] Extracted ${candidateDrafts.length} valid transfer rumors.`);

  if (candidateDrafts.length === 0 || !env.SUPABASE_URL || !env.SUPABASE_KEY) {
    return {
      leaguepedia: lpResult,
      inven: invenResult,
      weibo: weiboResult,
      realArticlesFound: realArticles.length,
      validRumorsParsed: candidateDrafts.length,
      autoPublishedCount,
      newDraftCount: 0,
      savedCount: 0,
    };
  }

  try {
    const supabase = getSupabaseClient(env);
    const newDrafts = await filterExistingDrafts(supabase, candidateDrafts);

    if (newDrafts.length === 0) {
      return {
        mode: activeMode,
        leaguepedia: lpResult,
        inven: invenResult,
        weibo: weiboResult,
        realArticlesFound: realArticles.length,
        validRumorsParsed: candidateDrafts.length,
        autoPublishedCount,
        newDraftCount: 0,
        savedCount: 0,
      };
    }

    const savedCount = await insertRumorDrafts(supabase, newDrafts);
    return {
      mode: activeMode,
      leaguepedia: lpResult,
      inven: invenResult,
      weibo: weiboResult,
      realArticlesFound: realArticles.length,
      validRumorsParsed: candidateDrafts.length,
      autoPublishedCount,
      newDraftCount: newDrafts.length,
      savedCount,
    };
  } catch (err) {
    console.error("[Draft Crawler] Error saving drafts to Supabase:", err);
    throw err;
  }
}

export default {
  async scheduled(event: ScheduledEvent, env: Env, ctx: ExecutionContext) {
    ctx.waitUntil(runDraftHarvestPipeline(env));
  },

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
