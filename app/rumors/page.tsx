import { createPublicClient } from "@/utils/supabase/public";
import { hasEnvVars } from "@/utils/supabase/check-env-vars";
import { Rumor, Team, Player } from "@/lib/types";
import RumorsListClient from "@/components/RumorsListClient";
import { MISSING_LPL_TEAMS, MISSING_LPL_PLAYERS } from "@/lib/rumors-data";

export const revalidate = 60;

export default async function RumorsPage() {
  if (!hasEnvVars) {
    return (
      <div className="w-full flex justify-center py-8">
        <RumorsListClient dbRumors={[]} teams={[]} players={[]} />
      </div>
    );
  }

  const supabase = createPublicClient();

  const [
    { data: rumorsData },
    { data: teamsData },
    { data: playersData },
    { data: coachesData },
  ] = await Promise.all([
    supabase
      .from("rumors")
      .select("*")
      .order("published_at", { ascending: false }),
    supabase.from("teams").select("*").order("id", { ascending: true }),
    supabase.from("players").select("*"),
    supabase.from("coaches").select("*"),
  ]);

  const rawTeams = (teamsData as Team[]) || [];
  const existingTeamShorts = new Set(
    rawTeams.map((t) => t.short_name.toUpperCase())
  );
  const teams = [
    ...rawTeams,
    ...MISSING_LPL_TEAMS.filter(
      (mt) => !existingTeamShorts.has(mt.short_name.toUpperCase())
    ),
  ];

  const rawPlayers = (playersData as Player[]) || [];
  const existingSlugs = new Set(
    rawPlayers.map((p) => (p.slug || p.name || "").toLowerCase())
  );
  const players = [
    ...rawPlayers,
    ...MISSING_LPL_PLAYERS.filter(
      (mp) => !existingSlugs.has((mp.slug || mp.name || "").toLowerCase())
    ),
  ];

  const baseRumors = (rumorsData as Rumor[]) || [];
  const teamById = new Map(teams.map((t) => [t.id, t]));
  const existingKeys = new Set(
    baseRumors.map(
      (r) =>
        `${(r.player_name || "").toLowerCase()}|${r.target_team_id ?? "FA"}`
    )
  );

  const syncedRumors: Rumor[] = [...baseRumors];

  for (const p of rawPlayers) {
    if (p.status === "STAY") continue;
    const key = `${p.name.toLowerCase()}|${p.predicted_team_id ?? "FA"}`;
    if (existingKeys.has(key)) continue;
    existingKeys.add(key);

    const fromTeam = p.current_team_id ? teamById.get(p.current_team_id) : null;
    const toTeam = p.predicted_team_id ? teamById.get(p.predicted_team_id) : null;
    const action =
      p.status === "FA"
        ? "계약 종료 (FA)"
        : p.status === "CONFIRMED"
        ? `${toTeam?.short_name || "신규 팀"} 이적 확정`
        : `${toTeam?.short_name || "신규 팀"} 이적 루머`;

    const actionEn =
      p.status === "FA"
        ? "Contract Expired (FA)"
        : p.status === "CONFIRMED"
        ? `Confirmed to join ${toTeam?.short_name || "new team"}`
        : `Rumored to join ${toTeam?.short_name || "new team"}`;
    const actionZh =
      p.status === "FA"
        ? "合约到期 (FA)"
        : p.status === "CONFIRMED"
        ? `确认加盟 ${toTeam?.short_name || "新战队"}`
        : `传闻加盟 ${toTeam?.short_name || "新战队"}`;

    syncedRumors.push({
      id: 100000 + p.id,
      post_id: `sync-player-${p.id}`,
      source: p.source_url?.includes("x.com") ? "TWITTER" : "NEWS",
      author: "Roster Sync",
      raw_text: `${p.name} (${p.position}) ${action}`,
      summary: `${p.name} (${p.position}) ${action}`,
      summary_en: `${p.name} (${p.position}) ${actionEn}`,
      summary_zh: `${p.name} (${p.position}) ${actionZh}`,
      player_id: p.id,
      target_team_id: p.predicted_team_id ?? null,
      confidence: p.confidence ?? 85,
      post_url: p.source_url ?? null,
      published_at: p.updated_at || new Date().toISOString(),
      league: toTeam?.league || fromTeam?.league || "LCK",
      player_name: p.name,
      current_team_short: fromTeam?.short_name || null,
      target_team_short: toTeam?.short_name || (p.status === "FA" ? "FA" : null),
    });
  }

  for (const c of (coachesData as any[]) || []) {
    if (c.status === "STAY") continue;
    const key = `${(c.name || "").toLowerCase()}|${c.predicted_team_id ?? "FA"}`;
    if (existingKeys.has(key)) continue;
    existingKeys.add(key);

    const fromTeam = c.team_id ? teamById.get(c.team_id) : null;
    const toTeam = c.predicted_team_id ? teamById.get(c.predicted_team_id) : null;
    const roleLabel = c.role === "HEAD_COACH" ? "감독" : "코치";
    const action =
      c.status === "FA"
        ? `${roleLabel} 계약 종료 (FA)`
        : c.status === "CONFIRMED"
        ? `${toTeam?.short_name || "신규 팀"} ${roleLabel} 합류 확정`
        : `${toTeam?.short_name || "신규 팀"} ${roleLabel} 합류 루머`;

    const roleEn = c.role === "HEAD_COACH" ? "Head Coach" : "Coach";
    const roleZh = c.role === "HEAD_COACH" ? "主教练" : "教练";
    const actionEn =
      c.status === "FA"
        ? `${roleEn} Contract Expired (FA)`
        : c.status === "CONFIRMED"
        ? `Confirmed as ${toTeam?.short_name || "new team"} ${roleEn}`
        : `Rumored to join ${toTeam?.short_name || "new team"} as ${roleEn}`;
    const actionZh =
      c.status === "FA"
        ? `${roleZh} 合约到期 (FA)`
        : c.status === "CONFIRMED"
        ? `确认出任 ${toTeam?.short_name || "新战队"} ${roleZh}`
        : `传闻出任 ${toTeam?.short_name || "新战队"} ${roleZh}`;

    syncedRumors.push({
      id: 200000 + c.id,
      post_id: `sync-coach-${c.id}`,
      source: c.source_url?.includes("x.com") ? "TWITTER" : "NEWS",
      author: "Roster Sync",
      raw_text: `${c.name} ${action}`,
      summary: `${c.name} ${action}`,
      summary_en: `${c.name} ${actionEn}`,
      summary_zh: `${c.name} ${actionZh}`,
      player_id: null,
      target_team_id: c.predicted_team_id ?? null,
      confidence: c.confidence ?? 85,
      post_url: c.source_url ?? null,
      published_at: c.created_at || new Date().toISOString(),
      league: toTeam?.league || fromTeam?.league || "LCK",
      player_name: c.name,
      current_team_short: fromTeam?.short_name || null,
      target_team_short: toTeam?.short_name || (c.status === "FA" ? "FA" : null),
    });
  }

  syncedRumors.sort(
    (a, b) =>
      new Date(b.published_at).getTime() - new Date(a.published_at).getTime()
  );

  return (
    <div className="w-full flex justify-center">
      <RumorsListClient
        dbRumors={syncedRumors}
        teams={teams}
        players={players}
      />
    </div>
  );
}

