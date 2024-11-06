import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { createClient } from "@/utils/supabase/server";

export default async function Component() {
  const supabase = await createClient();
  const { data: teamList } = await supabase.from("lck").select();
  const { data: teamRoster } = await supabase.from("players").select();

  return (
    <div className="bg-background text-foreground">
      {teamList?.map((team) => (
        <div
          key={team.id}
          className="min-h-screen flex items-center justify-center p-4"
        >
          <Card className="w-full max-w-5xl">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <img
                  src={team.logo}
                  alt={`${team.name} logo`}
                  className="w-24 h-24"
                />
              </div>
              <CardTitle className="text-3xl font-bold">{team.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                {teamRoster?.map((player) => {
                  if (player.team_id !== team.id) return;
                  return (
                    <div
                      key={player.id}
                      className="flex items-center space-x-4 p-2 rounded-lg bg-secondary"
                    >
                      <Avatar>
                        <AvatarImage src={player.image} alt={player.name} />
                        <AvatarFallback>{player.name[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{player.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {player.position}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      ))}
    </div>
  );
}
