import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { Env, CandidateDraft, RumorDraftRow } from "./types";

export function getSupabaseClient(env: Env): SupabaseClient {
  return createClient(env.SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

/**
 * Filter candidates against existing rumors and rumor_drafts to avoid duplicates
 */
export async function filterExistingDrafts(
  supabase: SupabaseClient,
  drafts: CandidateDraft[]
): Promise<CandidateDraft[]> {
  if (drafts.length === 0) return [];

  const postIds = drafts.map((d) => d.post_id).filter(Boolean);
  if (postIds.length === 0) return drafts;

  // Check against published rumors
  const { data: existingRumors } = await supabase
    .from("rumors")
    .select("post_id")
    .in("post_id", postIds);

  const existingPostIds = new Set(
    (existingRumors || []).map((r) => r.post_id).filter(Boolean)
  );

  // Check against existing drafts
  const { data: existingDrafts } = await supabase
    .from("rumor_drafts")
    .select("post_id")
    .in("post_id", postIds);

  (existingDrafts || []).forEach((d) => {
    if (d.post_id) existingPostIds.add(d.post_id);
  });

  return drafts.filter((d) => !existingPostIds.has(d.post_id));
}

/**
 * Insert candidate drafts into rumor_drafts table with status 'pending'
 */
export async function insertRumorDrafts(
  supabase: SupabaseClient,
  drafts: CandidateDraft[]
): Promise<number> {
  if (drafts.length === 0) return 0;

  const rows: RumorDraftRow[] = drafts.map((d) => ({
    post_id: d.post_id || `draft-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    source: d.source || "COMMUNITY",
    author: d.author || "Insider",
    author_en: d.author_en || d.author,
    author_zh: d.author_zh || d.author,
    raw_text: d.raw_text || d.summary || "",
    summary: d.summary || "",
    summary_en: d.summary_en || null,
    summary_zh: d.summary_zh || null,
    player_slug: d.player_slug?.toLowerCase() || (d.player_name ? d.player_name.toLowerCase() : null),
    player_name: d.player_name || null,
    current_team_short: d.current_team_short?.toUpperCase() || null,
    target_team_short: d.target_team_short?.toUpperCase() || null,
    league: d.league || "LCK",
    kind: d.kind || "UNKNOWN",
    confidence: typeof d.confidence === "number" ? d.confidence : 70,
    post_url: d.post_url || null,
    published_at: d.published_at || new Date().toISOString(),
    status: "pending",
    raw_payload: d as unknown as Record<string, unknown>,
  }));

  const { error, count } = await supabase
    .from("rumor_drafts")
    .insert(rows, { count: "exact" });

  if (error) {
    console.error("[Supabase] Failed to insert rumor drafts:", error);
    return 0;
  }

  return count || rows.length;
}
