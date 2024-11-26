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
import { useState } from "react";
import { motion } from "framer-motion";
import { twMerge } from "tailwind-merge";
import { Button } from "./ui/button";

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
  image?: string;
  transfer: number;
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

  if (team.id === 11) {
    return null;
  }

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
                <motion.div
                  key={player.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className={twMerge(
                    "flex items-center space-x-4 p-2 rounded-lg bg-secondary transition-all duration-1000 border-transparent border-2",
                    !isPrevRoster &&
                      player.transfer !== player.team_id &&
                      "border-red-500"
                  )}
                >
                  <Avatar>
                    <AvatarImage src={player.image} alt={player.name} />
                    <AvatarFallback>{player.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <motion.p
                      key={`name-${player.id}`}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{
                        opacity: 1,
                        scale: 1,
                      }}
                      transition={{
                        duration: 0.5,
                        ease: "easeInOut",
                      }}
                      className="font-medium"
                    >
                      {player.name}
                    </motion.p>
                    <p key={`position-${player.id}`} className="text-sm">
                      {player.position}
                    </p>
                  </div>
                </motion.div>
              );
            }
          )}
        </div>
      </CardContent>
    </Card>
  );
}
