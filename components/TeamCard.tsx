"use client";

import TeamLogo from "./TeamLogo";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Player, Team, Coach } from "@/lib/types";
import { useLanguage } from "./language-provider";
import { ExternalLink } from "lucide-react";
import { PREDICTED_PLAYER_OVERRIDES } from "@/lib/rumors-data";
import { getDisplayRealName } from "@/lib/korean-romanization";

const positions: Array<Player["position"]> = ["TOP", "JGL", "MID", "BOT", "SPT"];

export default function TeamCard({
  team,
  allTeams = [],
  teamRoster,
  expectedRoster,
  coaches = [],
  expectedCoaches = [],
}: {
  team: Team;
  allTeams?: Team[];
  teamRoster: Player[];
  expectedRoster: Player[];
  coaches?: Coach[];
  expectedCoaches?: Coach[];
}) {
  const { t, getTeamName } = useLanguage();
  const [isPrevRoster, setPrevRoster] = useState(false); // 기본 Expected (예측)

  const activeRoster = isPrevRoster ? teamRoster : expectedRoster;
  const activeCoaches = isPrevRoster
    ? coaches
    : expectedCoaches && expectedCoaches.length > 0
    ? expectedCoaches
    : coaches;
  const headCoaches = activeCoaches.filter((c) => c.role === "HEAD_COACH");
  const subCoaches = activeCoaches.filter((c) => c.role === "COACH");

  return (
    <div className="w-full rounded-xl bg-[#1e2329] border border-[#2b3139] hover:border-[#FCD535]/50 transition-all duration-200 overflow-hidden shadow-sm flex flex-col justify-between">
      {/* Top Header Card */}
      <div className="p-3.5 sm:p-5 border-b border-[#2b3139] flex items-center justify-between gap-2.5">
        {/* Left: Logo & Team Name */}
        <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-white border border-[#2b3139] flex items-center justify-center p-1 sm:p-1.5 shrink-0 shadow-sm">
            <TeamLogo team={team} />
          </div>
          <div className="min-w-0 truncate">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <h3 className="text-sm sm:text-base font-black tracking-tight text-white uppercase truncate">
                {getTeamName(team.short_name, team.name)}
              </h3>
              <span className="text-[9px] sm:text-[10px] font-mono px-1.5 py-0.2 rounded bg-[#0b0e11] text-[#707a8a] border border-[#2b3139] shrink-0">
                {team.short_name}
              </span>
            </div>
            <p className="text-[10px] sm:text-[11px] text-[#707a8a] mt-0.5 truncate">
              {isPrevRoster ? t("officialSubtitle") : t("predictedSubtitle")}
            </p>
          </div>
        </div>

        {/* Right: Roster Toggle Button */}
        <button
          onClick={() => setPrevRoster(!isPrevRoster)}
          className={`px-2.5 sm:px-3 py-1.5 text-[11px] sm:text-xs font-bold rounded-md transition-all shrink-0 min-h-[36px] sm:min-h-[40px] flex items-center justify-center ${
            isPrevRoster
              ? "bg-[#2b3139] text-[#eaecef] hover:bg-[#3b414a]"
              : "bg-[#FCD535] text-[#181a20] hover:bg-[#f0b90b]"
          }`}
        >
          {isPrevRoster ? t("predictedRoster") : t("officialRoster")}
        </button>
      </div>

      {/* Coaches Strip */}
      {activeCoaches && activeCoaches.length > 0 && (
        <div className="px-3.5 sm:px-4 py-1.5 sm:py-2 bg-[#0b0e11]/60 border-b border-[#2b3139] flex items-center justify-between gap-2 text-xs flex-wrap">
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            <span className="text-[9px] sm:text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-[#2b3139] text-[#FCD535] shrink-0">
              COACH
            </span>
            <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap text-[#eaecef] text-[11px] sm:text-xs">
              {headCoaches.map((hc) => {
                const isConfirmed = hc.status === "CONFIRMED";
                const isRumored = hc.status === "RUMORED";
                const hasStatus = !isPrevRoster && (isConfirmed || isRumored);

                return (
                  <span key={hc.id} className="inline-flex items-center gap-1 font-semibold text-white">
                    <span>{hc.name}</span>
                    <span className="text-[9px] sm:text-[10px] text-[#707a8a]">(HC)</span>

                    {/* Rumor / Confirmed Badge & Source */}
                    {hasStatus && (
                      <span className="inline-flex items-center gap-1 ml-0.5">
                        <span
                          className={`text-[8px] sm:text-[9px] font-bold px-1 py-0.2 rounded font-mono ${
                            isConfirmed
                              ? "bg-[#0ecb81]/15 text-[#0ecb81] border border-[#0ecb81]/30"
                              : "bg-[#FCD535]/15 text-[#FCD535] border border-[#FCD535]/30"
                          }`}
                        >
                          {isConfirmed ? "CONFIRMED" : "RUMOR"}
                        </span>
                        {typeof hc.confidence === "number" && (
                          <span
                            className={`font-mono text-[9px] sm:text-[10px] font-bold ${
                              hc.confidence === 100
                                ? "text-[#0ecb81]"
                                : hc.confidence >= 80
                                ? "text-[#FCD535]"
                                : "text-[#f6465d]"
                            }`}
                          >
                            {hc.confidence}%
                          </span>
                        )}
                        {hc.source_url && (
                          <a
                            href={hc.source_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#707a8a] hover:text-[#FCD535] transition-colors inline-block"
                            title="Source Link"
                          >
                            <ExternalLink className="w-2.5 h-2.5" />
                          </a>
                        )}
                      </span>
                    )}
                  </span>
                );
              })}
              {subCoaches.map((sc) => {
                const isConfirmed = sc.status === "CONFIRMED";
                const isRumored = sc.status === "RUMORED";
                const hasStatus = !isPrevRoster && (isConfirmed || isRumored);

                return (
                  <span key={sc.id} className="inline-flex items-center gap-1 text-[#929aa5]">
                    <span>{sc.name}</span>
                    {hasStatus && (
                      <span className="inline-flex items-center gap-1 ml-0.5">
                        <span
                          className={`text-[8px] sm:text-[9px] font-bold px-1 py-0.2 rounded font-mono ${
                            isConfirmed
                              ? "bg-[#0ecb81]/15 text-[#0ecb81] border border-[#0ecb81]/30"
                              : "bg-[#FCD535]/15 text-[#FCD535] border border-[#FCD535]/30"
                          }`}
                        >
                          {isConfirmed ? "CONFIRMED" : "RUMOR"}
                        </span>
                        {typeof sc.confidence === "number" && (
                          <span
                            className={`font-mono text-[9px] sm:text-[10px] font-bold ${
                              sc.confidence === 100
                                ? "text-[#0ecb81]"
                                : sc.confidence >= 80
                                ? "text-[#FCD535]"
                                : "text-[#f6465d]"
                            }`}
                          >
                            {sc.confidence}%
                          </span>
                        )}
                        {sc.source_url && (
                          <a
                            href={sc.source_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#707a8a] hover:text-[#FCD535] transition-colors inline-block"
                            title="Source Link"
                          >
                            <ExternalLink className="w-2.5 h-2.5" />
                          </a>
                        )}
                      </span>
                    )}
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Roster Positions Grid (5 Positions Row) */}
      <div className="p-2.5 sm:p-4 divide-y divide-[#2b3139]/60">
        <AnimatePresence mode="wait">
          {positions.map((pos) => {
            const player = activeRoster.find((p) => p.position === pos);
            const override = player?.slug
              ? PREDICTED_PLAYER_OVERRIDES[player.slug.toLowerCase()]
              : undefined;

            const hasActiveRumorOrConfirm = Boolean(override || (player && player.status && player.status !== "STAY"));
            const isConfirmed = player?.status === "CONFIRMED";
            const isRumored = player?.status === "RUMORED" || (override && override.predicted_team_id === team.id);
            const confidence = override ? override.confidence : player?.confidence;
            const sourceUrl = override ? override.source_url : player?.source_url;

            // From previous team short name
            const prevTeam = player?.current_team_id
              ? allTeams.find((t) => t.id === player.current_team_id)
              : undefined;

            return (
              <motion.div
                key={pos + (player?.id || "empty")}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="py-2 sm:py-2.5 flex items-center justify-between gap-2"
              >
                {/* Position Badge & Player Name */}
                <div className="flex items-center gap-2 sm:gap-2.5 min-w-0 truncate">
                  <span className="w-7 sm:w-8 text-[10px] sm:text-[11px] font-mono font-bold text-[#707a8a] px-1 py-0.5 rounded bg-[#0b0e11] text-center border border-[#2b3139] shrink-0">
                    {pos}
                  </span>

                  {player ? (
                    <div className="flex items-center gap-1.5 sm:gap-2 truncate">
                      <span className="font-bold text-xs sm:text-sm text-white tracking-tight truncate">
                        {player.name}
                      </span>
                      {player.real_name && (
                        <span className="text-[11px] sm:text-xs text-[#707a8a] hidden md:inline truncate">
                          ({getDisplayRealName(player.real_name)})
                        </span>
                      )}

                      {!isPrevRoster && prevTeam && prevTeam.id !== team.id && (
                        <span className="text-[9px] sm:text-[10px] font-mono px-1 sm:px-1.5 py-0.2 rounded bg-[#2b3139] text-[#929aa5] shrink-0">
                          ex-{prevTeam.short_name}
                        </span>
                      )}
                    </div>
                  ) : (
                    <span className="text-xs text-[#707a8a] italic font-mono">
                      {t("vacant")}
                    </span>
                  )}
                </div>

                {/* Status Indicator & Confidence (Binance trading style) */}
                <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                  {player && !isPrevRoster && hasActiveRumorOrConfirm && (
                    <>
                      {/* Status Tag */}
                      <span
                        className={`text-[9px] sm:text-[10px] font-bold px-1.5 sm:px-2 py-0.5 rounded font-mono ${
                          isConfirmed
                            ? "bg-[#0ecb81]/15 text-[#0ecb81] border border-[#0ecb81]/30"
                            : isRumored
                            ? "bg-[#FCD535]/15 text-[#FCD535] border border-[#FCD535]/30"
                            : "bg-[#2b3139] text-[#929aa5]"
                        }`}
                      >
                        {isConfirmed
                          ? "CONFIRMED"
                          : isRumored
                          ? "RUMOR"
                          : "STAY"}
                      </span>

                      {/* Confidence Number */}
                      {typeof confidence === "number" && (
                        <span
                          className={`font-mono text-[11px] sm:text-xs font-bold ${
                            confidence === 100
                              ? "text-[#0ecb81]"
                              : confidence >= 80
                              ? "text-[#FCD535]"
                              : "text-[#f6465d]"
                          }`}
                        >
                          {confidence}%
                        </span>
                      )}

                      {sourceUrl && (
                        <a
                          href={sourceUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#707a8a] hover:text-[#FCD535] transition-colors p-1"
                          title="Source Link"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </>
                  )}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
