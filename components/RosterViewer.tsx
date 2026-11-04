"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { Player, Team, Coach } from "@/lib/types";
import TeamCard from "./TeamCard";

export default function RosterViewer({
  initialTeams,
  initialPlayers,
  initialCoaches = [],
}: {
  initialTeams: Team[];
  initialPlayers: Player[];
  initialCoaches?: Coach[];
}) {
  const [players, setPlayers] = useState<Player[]>(initialPlayers);
  const supabase = createClient();

  useEffect(() => {
    // Supabase Realtime: players 테이블 UPDATE 감지 시 즉시 상태 반영
    const channel = supabase
      .channel("realtime-players")
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "players",
        },
        (payload) => {
          const updatedPlayer = payload.new as Player;
          setPlayers((prev) =>
            prev.map((p) => (p.id === updatedPlayer.id ? updatedPlayer : p))
          );
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase]);

  const getTeamRoster = (teamId: number) => {
    return players.filter((p) => p.current_team_id === teamId);
  };

  const getExpectedRoster = (teamId: number) => {
    return players.filter((p) => p.predicted_team_id === teamId);
  };

  const getTeamCoaches = (teamId: number) => {
    return initialCoaches.filter((c) => c.team_id === teamId);
  };

  return (
    <div className="w-full flex flex-col gap-10 items-center">
      {initialTeams.map((team) => (
        <div key={team.id} className="w-full flex justify-center">
          <TeamCard
            team={team}
            teamRoster={getTeamRoster(team.id)}
            expectedRoster={getExpectedRoster(team.id)}
            coaches={getTeamCoaches(team.id)}
          />
        </div>
      ))}
    </div>
  );
}

