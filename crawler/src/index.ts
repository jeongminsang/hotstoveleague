import { Env, RawRumor } from "./types";
import { fetchTwitterRumors } from "./twitter";
import { fetchWeiboRumors } from "./weibo";
import { parseRumorWithGemini } from "./gemini";
import {
  getSupabaseClient,
  filterExistingRumors,
  syncRumorAndPrediction,
} from "./supabase";

async function runPipeline(env: Env): Promise<{
  scrapedCount: number;
  newCount: number;
  processedCount: number;
}> {
  console.log("[HotStove Pipeline] Starting crawl cycle...");

  if (!env.SUPABASE_URL || !env.SUPABASE_SERVICE_ROLE_KEY) {
    console.warn("[HotStove Pipeline] Missing Supabase environment variables. Skipping DB sync.");
    return { scrapedCount: 0, newCount: 0, processedCount: 0 };
  }

  // 1. 트위터 및 웨이보에서 최신 포스트 스크래핑
  const [twitterRumors, weiboRumors] = await Promise.all([
    fetchTwitterRumors(),
    fetchWeiboRumors(env.WEIBO_SUB_COOKIE),
  ]);

  const allRumors: RawRumor[] = [...twitterRumors, ...weiboRumors];
  console.log(`[HotStove Pipeline] Scraped total ${allRumors.length} posts`);

  // 2. Supabase DB와 대조하여 이미 수집된 글 필터링
  const supabase = getSupabaseClient(env);
  const newRumors = await filterExistingRumors(supabase, allRumors);
  console.log(`[HotStove Pipeline] Found ${newRumors.length} brand new posts`);

  if (newRumors.length === 0) {
    return {
      scrapedCount: allRumors.length,
      newCount: 0,
      processedCount: 0,
    };
  }

  // 3. 신규 찌라시 건에 대해서만 Gemini AI 정제 및 DB 저장
  let processedCount = 0;
  for (const rumor of newRumors) {
    if (!env.GEMINI_API_KEY) {
      console.warn("[HotStove Pipeline] Missing GEMINI_API_KEY. Skipping AI parsing.");
      break;
    }

    const parsed = await parseRumorWithGemini(env.GEMINI_API_KEY, rumor.text);
    if (parsed) {
      await syncRumorAndPrediction(supabase, rumor, parsed);
      processedCount++;
    }
  }

  console.log(`[HotStove Pipeline] Cycle completed. Processed ${processedCount} rumors.`);
  return {
    scrapedCount: allRumors.length,
    newCount: newRumors.length,
    processedCount,
  };
}

export default {
  /**
   * 1분마다 Cloudflare Cron Trigger에 의해 자동 실행
   */
  async scheduled(event: ScheduledEvent, env: Env, ctx: ExecutionContext) {
    ctx.waitUntil(runPipeline(env));
  },

  /**
   * 개발/테스트용 HTTP 엔드포인트
   * GET /crawl 로 브라우저나 curl에서 즉시 수동 트리거 가능
   */
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === "/health") {
      return new Response(JSON.stringify({ status: "ok", timestamp: new Date() }), {
        headers: { "Content-Type": "application/json" },
      });
    }

    if (url.pathname === "/crawl") {
      const result = await runPipeline(env);
      return new Response(JSON.stringify(result, null, 2), {
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(
      JSON.stringify({
        service: "HotStove League Crawler",
        endpoints: ["/crawl (POST/GET)", "/health (GET)"],
      }),
      { headers: { "Content-Type": "application/json" } }
    );
  },
};

