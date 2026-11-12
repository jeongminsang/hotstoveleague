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

  const [{ data: rumorsData }, { data: teamsData }, { data: playersData }] =
    await Promise.all([
      supabase
        .from("rumors")
        .select("*")
        .order("published_at", { ascending: false }),
      supabase.from("teams").select("*").order("id", { ascending: true }),
      supabase.from("players").select("*"),
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

  return (
    <div className="w-full flex justify-center">
      <RumorsListClient
        dbRumors={(rumorsData as Rumor[]) || []}
        teams={teams}
        players={players}
      />
    </div>
  );
}

