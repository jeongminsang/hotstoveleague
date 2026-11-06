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
  author_en?: string;
  author_zh?: string;
  summary_en?: string;
  summary_zh?: string;
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

  // DB에 찌라시가 있으면 DB 데이터를 우선 활용하고(누락 시 seed로 보강),
  // DB가 완전히 비어있을 때만 INITIAL_RUMORS를 기본 표시
  const allRumors: EnrichedRumor[] = useMemo(() => {
    const seedByPostId = new Map<string, SeedRumor>(
      INITIAL_RUMORS.map((r) => [r.post_id, r])
    );
    const teamById = new Map<number, Team>(teams.map((tm) => [tm.id, tm]));
    const playerById = new Map<number, Player>(players.map((pl) => [pl.id, pl]));

    if (dbRumors.length > 0) {
      return dbRumors.map((r) => {
        const seed = r.post_id ? seedByPostId.get(r.post_id) : undefined;
        const pl = r.player_id ? playerById.get(r.player_id) : undefined;
        const curTeam = pl?.current_team_id
          ? teamById.get(pl.current_team_id)
          : undefined;

        return {
          ...r,
          source: r.source || seed?.source || "X",
          author: r.author || seed?.author || "Unknown",
          author_en: r.author_en || seed?.author_en,
          author_zh: r.author_zh || seed?.author_zh,
          raw_text: r.raw_text || seed?.raw_text || "",
          summary: r.summary || seed?.summary || "",
          summary_en: r.summary_en || seed?.summary_en,
          summary_zh: r.summary_zh || seed?.summary_zh,
          target_team_id: r.target_team_id ?? seed?.target_team_id ?? null,
          confidence: r.confidence ?? seed?.confidence ?? 80,
          post_url: r.post_url ?? seed?.post_url ?? null,
          published_at: r.published_at ?? seed?.published_at ?? new Date().toISOString(),
          player_name: r.player_name || seed?.player_name || pl?.name,
          current_team_short:
            r.current_team_short || seed?.current_team_short || curTeam?.short_name,
          target_team_short: r.target_team_short || seed?.target_team_short,
          league: r.league || seed?.league || curTeam?.league || "LCK",
        };
      });
    }

    return INITIAL_RUMORS.map((sr) => ({
      id: sr.id,
      post_id: sr.post_id,
      source: sr.source,
      author: sr.author,
      author_en: sr.author_en,
      author_zh: sr.author_zh,
      raw_text: sr.raw_text,
      summary: sr.summary,
      summary_en: sr.summary_en,
      summary_zh: sr.summary_zh,
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

  const sources = ["ALL", "TWITTER", "WEIBO"];

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
            {sortDesc ? t("sortNewest") : t("sortOldest")}
          </Button>
        </div>

        <div className="flex items-center gap-2.5">
          <Radio className="w-6 h-6 text-red-500 animate-pulse" />
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            {t("rumorsPageTitle")}
          </h1>
          <Badge className="bg-amber-500 text-white font-black border-0 text-xs">
            {filteredRumors.length}
            {t("rumorCountUnit")}
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

      {/* 시간순 오피셜 & 루머 타임라인 리스트 */}
      {filteredRumors.length === 0 ? (
        <div className="w-full p-12 text-center border-2 border-dashed rounded-2xl bg-card text-muted-foreground">
          <p className="font-bold text-sm">{t("emptyFilterRumors")}</p>
        </div>
      ) : (
        <div className="relative pl-4 sm:pl-6 border-l-2 border-amber-500/40 space-y-4">
          {filteredRumors.map((rumor) => {
            const isStay =
              rumor.current_team_short &&
              rumor.current_team_short === rumor.target_team_short;

            const isOfficial = rumor.confidence === 100;

            const sourceBadgeStyle =
              rumor.source === "WEIBO"
                ? "bg-red-600 text-white"
                : rumor.source === "COMMUNITY"
                  ? "bg-emerald-600 text-white"
                  : "bg-sky-600 text-white";

            const displayAuthor =
              language === "zh" && rumor.author_zh
                ? rumor.author_zh
                : language === "en" && rumor.author_en
                  ? rumor.author_en
                  : rumor.author;

            const displaySummary =
              language === "zh" && rumor.summary_zh
                ? rumor.summary_zh
                : language === "en" && rumor.summary_en
                  ? rumor.summary_en
                  : rumor.summary || rumor.raw_text;

            const formattedDate = new Date(rumor.published_at).toLocaleString(
              language === "ko" ? "ko-KR" : language === "zh" ? "zh-CN" : "en-US",
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
                <div
                  className={`absolute -left-[23px] sm:-left-[31px] top-6 w-3.5 h-3.5 rounded-full ring-4 ring-background group-hover:scale-125 transition-transform ${
                    isOfficial ? "bg-emerald-500" : "bg-amber-500"
                  }`}
                />

                <div className="flex flex-col gap-2.5">
                  {/* 상단 메타 정보 (시간, 출처, 작성자, 리그, 적중 신뢰도) */}
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="inline-flex items-center gap-1 text-xs font-mono font-bold text-muted-foreground bg-secondary px-2 py-0.5 rounded-md">
                        <Clock className="w-3 h-3 text-amber-600" />
                        {formattedDate}
                      </span>

                      {/* 오피셜 / 루머 식별 배지 */}
                      <Badge
                        className={`text-[10px] px-2 py-0.5 font-black border-0 ${
                          isOfficial
                            ? "bg-emerald-600 text-white"
                            : "bg-amber-500 text-white"
                        }`}
                      >
                        {isOfficial
                          ? language === "zh"
                            ? "官宣"
                            : language === "ko"
                              ? "오피셜"
                              : "OFFICIAL"
                          : language === "zh"
                            ? "流言"
                            : language === "ko"
                              ? "루머"
                              : "RUMOR"}
                      </Badge>

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
                        {displayAuthor}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      {rumor.confidence > 0 && (
                        <span
                          className={`text-xs font-black px-2.5 py-0.5 rounded-full ${
                            rumor.confidence >= 95
                              ? "bg-emerald-500/15 text-emerald-700 border border-emerald-500/30"
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
                    {displaySummary}
                  </h3>

                  {/* 원문 인용구 */}
                  {rumor.raw_text && (
                    <p className="text-xs text-muted-foreground bg-secondary/50 p-3 rounded-xl border border-border/60 leading-relaxed font-medium">
                      “{rumor.raw_text}”
                    </p>
                  )}
                </div>
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
}

