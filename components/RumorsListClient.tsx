"use client";

import { useState, useMemo } from "react";
import { Rumor, Team, Player } from "@/lib/types";
import { INITIAL_RUMORS, SeedRumor } from "@/lib/rumors-data";
import { LEAGUES, useLanguage } from "./language-provider";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import {
  ExternalLink,
  Clock,
  ArrowLeft,
  Radio,
  ArrowRight,
  ArrowUpDown,
} from "lucide-react";
import Link from "next/link";

interface EnrichedRumor extends Rumor {
  player_name?: string;
  current_team_short?: string;
  target_team_short?: string;
  league?: string;
}

export default function RumorsListClient({
  dbRumors = [],
  teams = [],
  players = [],
}: {
  dbRumors: Rumor[];
  teams: Team[];
  players: Player[];
}) {
  const { t, language } = useLanguage();
  const [selectedLeague, setSelectedLeague] = useState<string>("ALL");
  const [selectedSource, setSelectedSource] = useState<string>("ALL");
  const [sortDesc, setSortDesc] = useState<boolean>(true);

  // DB에 찌라시가 있으면 DB 데이터를 우선하되 메타데이터를 보강하고,
  // 아직 seed.sql 재실행 전이라 비어 있으면 INITIAL_RUMORS 34건을 즉시 활용
  const allRumors: EnrichedRumor[] = useMemo(() => {
    const seedByPostId = new Map<string, SeedRumor>(
      INITIAL_RUMORS.map((r) => [r.post_id, r])
    );
    const teamById = new Map<number, Team>(teams.map((tm) => [tm.id, tm]));
    const playerById = new Map<number, Player>(players.map((pl) => [pl.id, pl]));

    const verifiedDbRumors = dbRumors.filter((r) =>
      (r.post_id || "").startsWith("rv-")
    );

    if (verifiedDbRumors.length > 0) {
      return verifiedDbRumors.map((r) => {
        const seed = seedByPostId.get(r.post_id);
        const pl = r.player_id ? playerById.get(r.player_id) : undefined;
        const curTeam = pl?.current_team_id
          ? teamById.get(pl.current_team_id)
          : undefined;
        const tgtTeam = r.target_team_id
          ? teamById.get(r.target_team_id)
          : undefined;

        return {
          ...r,
          post_url: seed?.post_url || r.post_url,
          player_name: pl?.name || seed?.player_name,
          current_team_short: curTeam?.short_name || seed?.current_team_short,
          target_team_short: tgtTeam?.short_name || seed?.target_team_short,
          league: tgtTeam?.league || curTeam?.league || seed?.league || "LCK",
        };
      });
    }

    return INITIAL_RUMORS.map((sr) => ({
      id: sr.id,
      post_id: sr.post_id,
      source: sr.source,
      author: sr.author,
      raw_text: sr.raw_text,
      summary: sr.summary,
      player_id: null,
      target_team_id: sr.target_team_id,
      confidence: sr.confidence,
      post_url: sr.post_url,
      published_at: sr.published_at,
      player_name: sr.player_name,
      current_team_short: sr.current_team_short,
      target_team_short: sr.target_team_short,
      league: sr.league,
    }));
  }, [dbRumors, teams, players]);

  const filteredRumors = useMemo(() => {
    return allRumors
      .filter((r) => {
        if (
          selectedLeague !== "ALL" &&
          (r.league || "").toUpperCase() !== selectedLeague
        ) {
          return false;
        }
        if (
          selectedSource !== "ALL" &&
          (r.source || "").toUpperCase() !== selectedSource
        ) {
          return false;
        }
        return true;
      })
      .sort((a, b) => {
        const tA = new Date(a.published_at).getTime();
        const tB = new Date(b.published_at).getTime();
        return sortDesc ? tB - tA : tA - tB;
      });
  }, [allRumors, selectedLeague, selectedSource, sortDesc]);

  const sources = ["ALL", "TWITTER", "WEIBO", "COMMUNITY"];

  return (
    <div className="w-full max-w-5xl flex flex-col gap-6 py-4">
      {/* 상단 네비게이션 및 헤더 */}
      <div className="flex flex-col gap-3 border-b pb-5">
        <div className="flex items-center justify-between">
          <Button variant="ghost" size="sm" className="gap-1.5 font-bold -ml-2" asChild>
            <Link href="/">
              <ArrowLeft className="w-4 h-4" />
              {t("backToRosters")}
            </Link>
          </Button>

          <Button
            variant="outline"
            size="sm"
            className="text-xs font-bold gap-1.5"
            onClick={() => setSortDesc(!sortDesc)}
          >
            <ArrowUpDown className="w-3.5 h-3.5" />
            {sortDesc
              ? language === "ko"
                ? "최신순 (시간순)"
                : "Newest First"
              : language === "ko"
                ? "오래된순 (시간순)"
                : "Oldest First"}
          </Button>
        </div>

        <div className="flex items-center gap-2.5">
          <Radio className="w-6 h-6 text-red-500 animate-pulse" />
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            {t("rumorsPageTitle")}
          </h1>
          <Badge className="bg-amber-500 text-white font-black border-0">
            {filteredRumors.length}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground">{t("rumorsPageSubtitle")}</p>
      </div>

      {/* 리그 및 출처 필터 바 */}
      <div className="flex flex-col sm:flex-row gap-3 justify-between items-start sm:items-center bg-secondary/40 p-3 rounded-2xl border">
        {/* 리그 필터 */}
        <div className="flex flex-wrap gap-1.5">
          <button
            onClick={() => setSelectedLeague("ALL")}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              selectedLeague === "ALL"
                ? "bg-primary text-primary-foreground shadow-sm"
                : "bg-background/70 text-muted-foreground hover:text-foreground"
            }`}
          >
            {t("allLeagues")}
          </button>
          {LEAGUES.map((lg) => (
            <button
              key={lg.key}
              onClick={() => setSelectedLeague(lg.key)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedLeague === lg.key
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "bg-background/70 text-muted-foreground hover:text-foreground"
              }`}
            >
              {lg.name}
            </button>
          ))}
        </div>

        {/* 소스 필터 */}
        <div className="flex flex-wrap gap-1.5">
          {sources.map((src) => (
            <button
              key={src}
              onClick={() => setSelectedSource(src)}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all border ${
                selectedSource === src
                  ? "bg-foreground text-background border-foreground"
                  : "bg-background text-muted-foreground border-border hover:text-foreground"
              }`}
            >
              {src === "ALL" ? t("allSources") : src}
            </button>
          ))}
        </div>
      </div>

      {/* 시간순 찌라시 타임라인 리스트 */}
      <div className="relative pl-4 sm:pl-6 border-l-2 border-amber-500/40 space-y-4">
        {filteredRumors.map((rumor) => {
          const isStay =
            rumor.current_team_short &&
            rumor.current_team_short === rumor.target_team_short;

          const sourceBadgeStyle =
            rumor.source === "WEIBO"
              ? "bg-red-600 text-white"
              : rumor.source === "COMMUNITY"
                ? "bg-emerald-600 text-white"
                : "bg-sky-600 text-white";

          const formattedDate = new Date(rumor.published_at).toLocaleString(
            language === "ko" ? "ko-KR" : "en-US",
            {
              year: "numeric",
              month: "short",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            }
          );

          return (
            <a
              key={rumor.post_id || rumor.id}
              href={rumor.post_url || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="group block relative rounded-2xl border-2 border-border/80 bg-card hover:bg-amber-50/60 hover:border-amber-500 transition-all duration-200 p-4 sm:p-5 shadow-sm hover:shadow-md cursor-pointer"
            >
              {/* 타임라인 도트 */}
              <div className="absolute -left-[23px] sm:-left-[31px] top-6 w-3.5 h-3.5 rounded-full bg-amber-500 ring-4 ring-background group-hover:scale-125 transition-transform" />

              <div className="flex flex-col gap-2.5">
                {/* 상단 메타 정보 (시간, 출처, 작성자, 리그, 적중 신뢰도) */}
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-1 text-xs font-mono font-bold text-muted-foreground bg-secondary px-2 py-0.5 rounded-md">
                      <Clock className="w-3 h-3 text-amber-600" />
                      {formattedDate}
                    </span>

                    {rumor.league && (
                      <Badge
                        variant="outline"
                        className="text-[11px] font-extrabold border-primary/40 text-primary"
                      >
                        {rumor.league}
                      </Badge>
                    )}

                    <Badge
                      className={`text-[10px] px-2 py-0.5 font-extrabold border-0 ${sourceBadgeStyle}`}
                    >
                      {rumor.source}
                    </Badge>

                    <span className="text-xs font-extrabold text-foreground">
                      {rumor.author}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {rumor.confidence > 0 && (
                      <span
                        className={`text-xs font-black px-2.5 py-0.5 rounded-full ${
                          rumor.confidence >= 85
                            ? "bg-red-500/15 text-red-700 border border-red-500/30"
                            : "bg-amber-500/15 text-amber-800 border border-amber-500/30"
                        }`}
                      >
                        {t("confidence")} {rumor.confidence}%
                      </span>
                    )}

                    <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-700 group-hover:translate-x-0.5 transition-transform">
                      {t("viewOriginalPost")}
                      <ExternalLink className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>

                {/* 선수 및 이적 방향 하이라이트 바 */}
                {rumor.player_name && (
                  <div className="flex items-center gap-2 pt-0.5">
                    <span className="px-2.5 py-0.5 rounded-lg bg-amber-500/20 border border-amber-500/40 text-amber-950 font-black text-sm">
                      {rumor.player_name}
                    </span>
                    {rumor.current_team_short && rumor.target_team_short && (
                      <div className="flex items-center gap-1.5 text-xs font-extrabold">
                        <span className="px-2 py-0.5 rounded bg-secondary text-foreground">
                          {rumor.current_team_short}
                        </span>
                        <ArrowRight className="w-3.5 h-3.5 text-amber-600" />
                        <span
                          className={`px-2 py-0.5 rounded ${
                            isStay
                              ? "bg-emerald-500/15 text-emerald-800 border border-emerald-500/30"
                              : "bg-amber-500 text-white"
                          }`}
                        >
                          {rumor.target_team_short}{" "}
                          {isStay ? `(${t("stay")})` : ""}
                        </span>
                      </div>
                    )}
                  </div>
                )}

                {/* 요약 본문 */}
                <h3 className="text-sm sm:text-base font-extrabold text-foreground leading-snug">
                  {rumor.summary || rumor.raw_text}
                </h3>

                {/* 원문 인용구 */}
                {rumor.summary && rumor.raw_text && (
                  <p className="text-xs text-muted-foreground bg-secondary/50 p-3 rounded-xl border border-border/60 leading-relaxed font-medium">
                    “{rumor.raw_text}”
                  </p>
                )}
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
}

