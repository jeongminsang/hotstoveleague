"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { Player, Team, Coach, League } from "@/lib/types";
import TeamCard from "./TeamCard";
import { LEAGUES, useLanguage } from "./language-provider";
import { motion, AnimatePresence } from "framer-motion";

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
  const [activeLeague, setActiveLeague] = useState<League>("LCK");
  const { t } = useLanguage();
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

  const filteredTeams = initialTeams.filter(
    (team) => (team.league || "LCK").toUpperCase() === activeLeague
  );

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
    <div className="w-full flex flex-col gap-6 items-center">
      {/* 본문 내부 서브 탭 (최상단 헤더가 아닌 페이지 내부에 배치) */}
      <div className="w-full max-w-5xl flex justify-center">
        <div className="inline-flex p-1.5 bg-muted/80 rounded-2xl border shadow-inner gap-1.5 overflow-x-auto max-w-full">
          {LEAGUES.map((league) => {
            const isActive = activeLeague === league.key;
            const teamCount = initialTeams.filter(
              (t) => (t.league || "LCK").toUpperCase() === league.key
            ).length;

            return (
              <button
                key={league.key}
                onClick={() => setActiveLeague(league.key)}
                className={`relative px-4 sm:px-5 py-2 rounded-xl text-sm font-bold transition-all duration-200 select-none flex items-center gap-1.5 shrink-0 ${
                  isActive
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground hover:bg-background/40"
                }`}
              >
                <span>{league.name}</span>
                {teamCount > 0 && (
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono transition-colors ${
                      isActive
                        ? "bg-primary/10 text-primary font-extrabold"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {teamCount}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* 팀 리스트 렌더링 */}
      {filteredTeams.length === 0 ? (
        <div className="w-full max-w-2xl text-center py-16 border rounded-2xl bg-card p-8 space-y-3 shadow-sm">
          <p className="text-base font-semibold text-foreground">
            {t("noTeamsInLeague")}
          </p>
          <p className="text-xs text-muted-foreground">
            Supabase 대시보드에서 최신 <code className="bg-secondary px-1.5 py-0.5 rounded">seed.sql</code>을 다시 실행하시면 해당 리그 구단 및 로스터가 등록됩니다.
          </p>
        </div>
      ) : (
        <div className="w-full flex flex-col gap-10 items-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeLeague}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="w-full flex flex-col gap-10 items-center"
            >
              {filteredTeams.map((team) => (
                <div key={team.id} className="w-full flex justify-center">
                  <TeamCard
                    team={team}
                    allTeams={initialTeams}
                    teamRoster={getTeamRoster(team.id)}
                    expectedRoster={getExpectedRoster(team.id)}
                    coaches={getTeamCoaches(team.id)}
                  />
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}

