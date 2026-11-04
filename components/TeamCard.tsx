"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import TeamLogo from "./TeamLogo";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { twMerge } from "tailwind-merge";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Player, Team, Coach } from "@/lib/types";
import { useLanguage } from "./language-provider";

const positions: Array<Player["position"]> = ["TOP", "JGL", "MID", "BOT", "SPT"];

export default function TeamCard({
  team,
  teamRoster,
  expectedRoster,
  coaches = [],
}: {
  team: Team;
  teamRoster: Player[];
  expectedRoster: Player[];
  coaches?: Coach[];
}) {
  const { t, getTeamName } = useLanguage();
  const [isPrevRoster, setPrevRoster] = useState(false); // 기본 'Expected(예측)'

  const activeRoster = isPrevRoster ? teamRoster : expectedRoster;
  const headCoaches = coaches.filter((c) => c.role === "HEAD_COACH");
  const subCoaches = coaches.filter((c) => c.role === "COACH");

  return (
    <Card className="w-full max-w-5xl shadow-lg border-2 hover:border-primary/40 transition-all duration-300">
      <div className="flex flex-row w-full justify-center relative items-center">
        <CardHeader className="text-center pt-6 pb-3">
          <div className="flex justify-center mb-3">
            <TeamLogo team={team} />
          </div>
          <CardTitle className="text-3xl font-extrabold tracking-tight">
            {getTeamName(team.short_name, team.name)}
          </CardTitle>
          <p className="text-xs text-muted-foreground mt-1">
            {isPrevRoster ? t("officialSubtitle") : t("predictedSubtitle")}
          </p>
        </CardHeader>

        <CardFooter className="absolute top-5 right-5 p-0">
          <Button
            variant={isPrevRoster ? "outline" : "default"}
            size="sm"
            className="font-bold text-xs"
            onClick={() => setPrevRoster(!isPrevRoster)}
          >
            {isPrevRoster ? t("predictedRoster") : t("officialRoster")}
          </Button>
        </CardFooter>
      </div>

      <CardContent className="pt-2 pb-6">
        {/* 감코진 (감독 및 코치진) 정보 바 - 본명 제외 영문 활동명만 표시 */}
        {coaches && coaches.length > 0 && (
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 mb-4 py-2 px-4 rounded-xl bg-secondary/35 border border-border/50 text-xs">
            {headCoaches.length > 0 && (
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="font-mono font-black text-[10px] px-1.5 py-0.5 rounded bg-primary text-primary-foreground tracking-wider">
                  {t("headCoach")}
                </span>
                {headCoaches.map((hc, idx) => (
                  <span key={hc.id} className="font-bold text-foreground">
                    {hc.name}
                    {idx < headCoaches.length - 1 && (
                      <span className="text-muted-foreground/50 ml-1">,</span>
                    )}
                  </span>
                ))}
              </div>
            )}

            {headCoaches.length > 0 && subCoaches.length > 0 && (
              <span className="text-border hidden sm:inline">|</span>
            )}

            {subCoaches.length > 0 && (
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="font-mono font-bold text-[10px] px-1.5 py-0.5 rounded bg-muted text-muted-foreground tracking-wider">
                  {t("coach")}
                </span>
                {subCoaches.map((c, idx) => (
                  <span key={c.id} className="text-foreground font-semibold">
                    {c.name}
                    {idx < subCoaches.length - 1 && (
                      <span className="text-muted-foreground/40 ml-1.5">,</span>
                    )}
                  </span>
                ))}
              </div>
            )}
          </div>
        )}

        {/* 5개 포지션(TOP, JGL, MID, BOT, SPT) 라인별 선수 그리드 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {positions.map((pos) => {
            const lanePlayers = activeRoster.filter((p) => p.position === pos);

            return (
              <div
                key={pos}
                className="flex flex-col rounded-xl bg-secondary/40 border border-border/60 p-3 gap-2.5 min-h-[140px]"
              >
                {/* 포지션 라벨 */}
                <div className="flex items-center justify-between pb-1.5 border-b border-border/40">
                  <span className="font-mono font-black text-xs px-2 py-0.5 rounded bg-primary/10 text-primary">
                    {pos}
                  </span>
                  {lanePlayers.length > 1 && (
                    <span className="text-[10px] text-muted-foreground font-semibold px-1.5 py-0.2 rounded bg-background/60">
                      {lanePlayers.length}
                      {t("playersCount")}
                    </span>
                  )}
                </div>

                {/* 해당 라인 소속 선수 목록 (본명 제외 영문 활동명만 표시) */}
                <div className="flex flex-col gap-2 flex-1">
                  <AnimatePresence mode="popLayout">
                    {lanePlayers.length > 0 ? (
                      lanePlayers.map((player) => {
                        const isTransferred =
                          !isPrevRoster &&
                          player.predicted_team_id !== player.current_team_id;

                        return (
                          <motion.div
                            key={`${isPrevRoster ? "prev" : "exp"}-${player.id}-${player.name}`}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                            className={twMerge(
                              "flex flex-col p-2.5 rounded-lg bg-background border transition-all duration-200 relative hover:border-primary/50 shadow-sm",
                              isTransferred &&
                                "border-red-500/90 bg-red-500/5 shadow-md shadow-red-500/10"
                            )}
                          >
                            {/* 이적 예측 뱃지 */}
                            {isTransferred && (
                              <div className="absolute -top-2 right-2 px-1.5 py-0.2 rounded-full text-[9px] font-black uppercase tracking-wider bg-red-600 text-white shadow">
                                {player.confidence >= 80 ? t("likely") : t("rumor")}{" "}
                                {player.confidence}%
                              </div>
                            )}

                            <div className="flex items-center justify-between gap-1 py-0.5">
                              <span className="font-bold text-sm tracking-tight text-foreground truncate">
                                {player.name}
                              </span>
                            </div>

                            {/* 이적 상태 안내 */}
                            {isTransferred && (
                              <div className="mt-1 text-[10px] font-semibold text-red-500">
                                {t("transferredNotice")}
                              </div>
                            )}
                          </motion.div>
                        );
                      })
                    ) : (
                      <div className="flex items-center justify-center flex-1 text-xs text-muted-foreground/60 italic py-4">
                        {t("vacant")}
                      </div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
