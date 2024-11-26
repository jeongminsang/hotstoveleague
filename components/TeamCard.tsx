"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import TeamLogo from "./TeamLogo";
import { Button } from "./ui/button";
import { useState } from "react";

interface Team {
  id: number;
  name: string;
  light_mode_logo_url: string;
  dark_mode_logo_url: string;
}
interface TeamRoster {
  id: number;
  team_id: number;
  name: string;
  position: string;
  image: string;
}

const positionOrder = ["TOP", "JGL", "MID", "BOT", "SPT"];

export default function TeamCard({
  team,
  teamRoster,
  expectedRoster,
}: {
  team: Team;
  teamRoster: TeamRoster[] | undefined;
  expectedRoster: TeamRoster[] | undefined;
}) {
  const [isPrevRoster, setPrevRoster] = useState(true);
  const sortRosterByPosition = (roster: TeamRoster[] | undefined) => {
    return roster?.sort(
      (a, b) =>
        positionOrder.indexOf(a.position) - positionOrder.indexOf(b.position)
    );
  };
  const sortedTeamRoster = sortRosterByPosition(teamRoster);
  const sortedExpectedRoster = sortRosterByPosition(expectedRoster);

  return (
    <Card className="w-full max-w-5xl">
      <div className="flex flex-row w-full justify-center relative">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <TeamLogo team={team} />
          </div>
          <CardTitle className="text-3xl font-bold">{team.name}</CardTitle>
        </CardHeader>
        <CardFooter className="absolute top-5 right-0">
          <Button
            variant="outline"
            onClick={() => {
              setPrevRoster(!isPrevRoster);
            }}
          >
            {isPrevRoster ? "Expected" : "Prev"}
          </Button>
        </CardFooter>
      </div>

      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {(isPrevRoster ? sortedTeamRoster : sortedExpectedRoster)?.map(
            (player) => {
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
            }
          )}
        </div>
      </CardContent>
    </Card>
  );
}
