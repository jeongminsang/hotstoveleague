import { createClient } from "@/utils/supabase/server";
import { hasEnvVars } from "@/utils/supabase/check-env-vars";
import { Rumor, Team, Player } from "@/lib/types";
import RumorsListClient from "@/components/RumorsListClient";

export const dynamic = "force-dynamic";

export default async function RumorsPage() {
  if (!hasEnvVars) {
    return (
      <div className="w-full flex justify-center py-8">
        <RumorsListClient dbRumors={[]} teams={[]} players={[]} />
      </div>
    );
  }

  const supabase = await createClient();

  const [{ data: rumorsData }, { data: teamsData }, { data: playersData }] =
    await Promise.all([
      supabase
        .from("rumors")
        .select("*")
        .order("published_at", { ascending: false }),
      supabase.from("teams").select("*").order("id", { ascending: true }),
      supabase.from("players").select("*"),
    ]);

  return (
    <div className="w-full flex justify-center">
      <RumorsListClient
        dbRumors={(rumorsData as Rumor[]) || []}
        teams={(teamsData as Team[]) || []}
        players={(playersData as Player[]) || []}
      />
    </div>
  );
}
