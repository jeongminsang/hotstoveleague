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
  expectedCoaches = [],
}: {
  initialTeams: Team[];
  initialPlayers: Player[];
  initialCoaches?: Coach[];
  expectedCoaches?: Coach[];
}) {
  const [players, setPlayers] = useState<Player[]>(initialPlayers);
  const [activeLeague, setActiveLeague] = useState<League>("LCK");
  const { t } = useLanguage();
  const supabase = createClient();

  useEffect(() => {
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

  const getExpectedCoaches = (teamId: number) => {
    const list = expectedCoaches.filter(
      (c) => (c.predicted_team_id ?? c.team_id) === teamId
    );
    return list.length > 0 ? list : getTeamCoaches(teamId);
  };

  return (
    <div className="w-full flex flex-col gap-4 sm:gap-6 items-center">
      {/* Binance Markets Tab Bar (Horizontally Scrollable on Mobile with Snap) */}
      <div className="w-full flex justify-between items-center flex-wrap gap-2.5 pb-2 border-b border-[#2b3139]">
        <div className="w-full sm:w-auto overflow-x-auto scrollbar-none py-0.5">
          <div className="inline-flex p-1 bg-[#1e2329] rounded-lg border border-[#2b3139] gap-1 shrink-0">
            {LEAGUES.map((league) => {
              const isActive = activeLeague === league.key;
              const count = initialTeams.filter(
                (t) => (t.league || "LCK").toUpperCase() === league.key
              ).length;

              return (
                <button
                  key={league.key}
                  onClick={() => setActiveLeague(league.key)}
                  className={`relative px-3 sm:px-4 py-1.5 rounded-md text-xs font-bold transition-all duration-150 select-none flex items-center gap-1.5 shrink-0 ${
                    isActive
                      ? "bg-[#FCD535] text-[#181a20] shadow-sm"
                      : "text-[#707a8a] hover:text-white hover:bg-[#2b3139]"
                  }`}
                >
                  <span>{league.name}</span>
                  <span
                    className={`text-[9px] sm:text-[10px] px-1 py-0.2 rounded font-mono ${
                      isActive
                        ? "bg-[#181a20]/15 text-[#181a20]"
                        : "bg-[#0b0e11] text-[#707a8a]"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Info Ticker (Desktop only) */}
        <div className="hidden lg:flex items-center gap-2 text-xs text-[#707a8a] font-mono">
          <span>{t("rosterStatus")}:</span>
          <span className="text-[#0ecb81] font-bold">100% {t("statConfirmed")}</span>
          <span className="text-[#707a8a]">•</span>
          <span className="text-[#FCD535] font-bold">{t("rumor")}</span>
        </div>
      </div>

      {/* Team Cards Grid: 1-col on Mobile/Small Tablet, 2-col on Desktop (1024px+) as per design.md */}
      <motion.div
        layout
        className="w-full grid grid-cols-1 lg:grid-cols-2 gap-3.5 sm:gap-4"
      >
        <AnimatePresence mode="popLayout">
          {filteredTeams.map((team) => (
            <motion.div
              key={team.id}
              layout
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              <TeamCard
                team={team}
                allTeams={initialTeams}
                teamRoster={getTeamRoster(team.id)}
                expectedRoster={getExpectedRoster(team.id)}
                coaches={getTeamCoaches(team.id)}
                expectedCoaches={getExpectedCoaches(team.id)}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
