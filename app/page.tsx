import { createClient } from "@/utils/supabase/server";
import TeamCard from "@/components/TeamCard";

export default async function Index() {
  const supabase = await createClient();
  const { data: teamList } = await supabase.from("lck").select();
  const { data: teamRosters } = await supabase.from("players").select();

  const teamRoster = (teamId: number) => {
    return teamRosters?.filter((player) => player.team_id === teamId);
  };

  const expectedRoster = (teamId: number) => {
    return teamRosters?.filter((player) => player.transfer === teamId);
  };

  return (
    <div className="bg-background text-foreground">
      {teamList?.map((team) => (
        <div
          key={team.id}
          className="min-h-screen flex items-center justify-center p-4"
        >
          <TeamCard
            team={team}
            teamRoster={teamRoster(team.id)}
            expectedRoster={expectedRoster(team.id)}
          />
        </div>
      ))}
    </div>
  );
}
