import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { Env, ParsedRumor, RawRumor } from "./types";

export function getSupabaseClient(env: Env): SupabaseClient {
  return createClient(env.SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

/**
 * DB에 이미 존재하는 postId인지 확인하여 신규 찌라시만 필터링합니다.
 */
export async function filterExistingRumors(
  supabase: SupabaseClient,
  rumors: RawRumor[]
): Promise<RawRumor[]> {
  if (rumors.length === 0) return [];

  const postIds = rumors.map((r) => r.postId);
  const { data: existingRows, error } = await supabase
    .from("rumors")
    .select("post_id")
    .in("post_id", postIds);

  if (error) {
    console.error("[Supabase] Failed to check existing rumors:", error);
    return rumors;
  }

  const existingSet = new Set((existingRows || []).map((row) => row.post_id));
  return rumors.filter((r) => !existingSet.has(r.postId));
}

/**
 * 정제된 루머를 rumors 테이블에 INSERT하고,
 * 대상 선수가 확인되면 players 테이블의 예측 로스터를 UPDATE합니다.
 */
export async function syncRumorAndPrediction(
  supabase: SupabaseClient,
  raw: RawRumor,
  parsed: ParsedRumor
): Promise<void> {
  let matchedPlayerId: number | null = null;
  let targetTeamId: number | null = null;

  // 1. 대상 선수 매칭 (대소문자 무시)
  if (parsed.player_name) {
    const { data: players } = await supabase
      .from("players")
      .select("id, name, current_team_id")
      .ilike("name", parsed.player_name)
      .limit(1);

    if (players && players.length > 0) {
      matchedPlayerId = players[0].id;
    }
  }

  // 2. 이적 대상 팀 매칭
  if (parsed.target_team) {
    const { data: teams } = await supabase
      .from("teams")
      .select("id, name, short_name")
      .or(`name.ilike.%${parsed.target_team}%,short_name.ilike.%${parsed.target_team}%`)
      .limit(1);

    if (teams && teams.length > 0) {
      targetTeamId = teams[0].id;
    }
  }

  // 3. rumors 테이블에 INSERT
  const { error: insertError } = await supabase.from("rumors").insert({
    post_id: raw.postId,
    source: raw.source,
    author: raw.author,
    raw_text: raw.text,
    summary: parsed.one_line_summary,
    player_id: matchedPlayerId,
    target_team_id: targetTeamId,
    confidence: parsed.confidence,
    post_url: raw.postUrl,
    published_at: raw.publishedAt,
  });

  if (insertError) {
    console.error(`[Supabase] Failed to insert rumor ${raw.postId}:`, insertError);
    return;
  }

  console.log(`[Supabase] Rumor inserted: ${raw.postId} (${parsed.one_line_summary})`);

  // 4. 선수 이적 예측 UPDATE (이벤트 발생 시 Supabase Realtime을 통해 웹소켓 푸시됨)
  if (matchedPlayerId && parsed.is_roster_rumor && targetTeamId) {
    const { error: updateError } = await supabase
      .from("players")
      .update({
        predicted_team_id: targetTeamId,
        confidence: parsed.confidence,
        status: parsed.status,
        updated_at: new Date().toISOString(),
      })
      .eq("id", matchedPlayerId);

    if (updateError) {
      console.error(`[Supabase] Failed to update player ${matchedPlayerId}:`, updateError);
    } else {
      console.log(
        `[Supabase] Updated player ${matchedPlayerId} -> Team ${targetTeamId} (Confidence: ${parsed.confidence}%)`
      );
    }
  }
}

