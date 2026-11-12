"use client";

import { useState, useMemo } from "react";
import { Rumor, Team, Player } from "@/lib/types";
import { INITIAL_RUMORS, SeedRumor } from "@/lib/rumors-data";
import { LEAGUES, useLanguage } from "./language-provider";
import {
  ExternalLink,
  Clock,
  ArrowLeft,
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
        const timeA = new Date(a.published_at || 0).getTime();
        const timeB = new Date(b.published_at || 0).getTime();
        return sortDesc ? timeB - timeA : timeA - timeB;
      });
  }, [allRumors, selectedLeague, selectedSource, sortDesc]);

  return (
    <div className="w-full flex flex-col gap-4 sm:gap-6">
      {/* Top Breadcrumb & Page Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 sm:pb-4 border-b border-[#2b3139]">
        <div>
          <Link
            href="/"
            prefetch={true}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#707a8a] hover:text-[#FCD535] transition-colors mb-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{t("navHome")}</span>
          </Link>
          <div className="flex items-center gap-2.5 sm:gap-3 flex-wrap">
            <h1 className="text-xl sm:text-3xl md:text-4xl font-black text-white uppercase tracking-tight">
              {t("navOfficialAndRumors")}
            </h1>
            <span className="px-2 py-0.5 rounded bg-[#FCD535] text-[#181a20] font-mono text-[11px] sm:text-xs font-bold">
              {filteredRumors.length} {t("rumorCountUnit").trim().toUpperCase()}
            </span>
          </div>
          <p className="text-[11px] sm:text-xs md:text-sm text-[#929aa5] mt-1">
            {t("rumorsPageSubtitle")}
          </p>
        </div>

        {/* Stats Ticker Mini-Card (Tablet & Desktop) */}
        <div className="hidden sm:flex items-center gap-3 shrink-0">
          <div className="p-2.5 sm:p-3 rounded-lg bg-[#1e2329] border border-[#2b3139] text-right">
            <div className="text-[10px] text-[#707a8a] font-mono uppercase">{t("accuracyRate")}</div>
            <div className="text-base sm:text-lg font-bold text-[#0ecb81] binance-num">94.8%</div>
          </div>
        </div>
      </div>

      {/* Filter and Control Bar (Horizontally scrollable on Mobile) */}
      <div className="p-2.5 sm:p-3 rounded-xl bg-[#1e2329] border border-[#2b3139] flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
        {/* League Selector Tabs */}
        <div className="overflow-x-auto scrollbar-none py-0.5">
          <div className="flex items-center gap-1 shrink-0">
            <button
              onClick={() => setSelectedLeague("ALL")}
              className={`px-2.5 sm:px-3 py-1.5 rounded-md text-xs font-bold transition-all shrink-0 ${
                selectedLeague === "ALL"
                  ? "bg-[#FCD535] text-[#181a20]"
                  : "text-[#707a8a] hover:text-white hover:bg-[#2b3139]"
              }`}
            >
              {t("allLeagues")}
            </button>
            {LEAGUES.map((lg) => (
              <button
                key={lg.key}
                onClick={() => setSelectedLeague(lg.key)}
                className={`px-2.5 sm:px-3 py-1.5 rounded-md text-xs font-bold transition-all shrink-0 ${
                  selectedLeague === lg.key
                    ? "bg-[#FCD535] text-[#181a20]"
                    : "text-[#707a8a] hover:text-white hover:bg-[#2b3139]"
                }`}
              >
                {lg.name}
              </button>
            ))}
          </div>
        </div>

        {/* Source Filter & Sort Toggle */}
        <div className="flex items-center justify-between sm:justify-end gap-2 pt-1 sm:pt-0 border-t sm:border-t-0 border-[#2b3139]/50">
          <div className="flex items-center gap-0.5 sm:gap-1 text-xs bg-[#0b0e11] p-1 rounded-md border border-[#2b3139]">
            {["ALL", "X", "WEIBO", "NEWS"].map((src) => (
              <button
                key={src}
                onClick={() => setSelectedSource(src)}
                className={`px-1.5 sm:px-2 py-0.5 sm:py-1 rounded text-[10px] sm:text-[11px] font-mono font-bold transition-all ${
                  selectedSource === src
                    ? "bg-[#2b3139] text-[#FCD535]"
                    : "text-[#707a8a] hover:text-white"
                }`}
              >
                {src}
              </button>
            ))}
          </div>

          <button
            onClick={() => setSortDesc(!sortDesc)}
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-md bg-[#2b3139] hover:bg-[#3b414a] text-xs font-semibold text-white transition-colors shrink-0"
          >
            <ArrowUpDown className="w-3.5 h-3.5 text-[#FCD535]" />
            <span>{sortDesc ? t("sortNewest") : t("sortOldest")}</span>
          </button>
        </div>
      </div>

      {/* Markets Style Detailed List */}
      <div className="rounded-xl border border-[#2b3139] bg-[#1e2329] overflow-hidden divide-y divide-[#2b3139]">
        {filteredRumors.length === 0 ? (
          <div className="p-8 text-center text-sm text-[#707a8a]">
            {t("emptyFilterRumors")}
          </div>
        ) : (
          filteredRumors.map((rumor) => {
            const isOfficial = rumor.confidence === 100;
            const displayAuthor =
              language === "en"
                ? rumor.author_en || rumor.author
                : language === "zh"
                ? rumor.author_zh || rumor.author
                : rumor.author;

            const displaySummary =
              language === "en"
                ? rumor.summary_en || rumor.summary
                : language === "zh"
                ? rumor.summary_zh || rumor.summary
                : rumor.summary;

            return (
              <div
                key={rumor.id || rumor.post_id}
                className="p-3.5 sm:p-5 hover:bg-[#2b3139]/40 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-3 md:gap-4"
              >
                {/* Left Block: Meta & Summary */}
                <div className="space-y-1.5 flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                    <span className="px-1.5 py-0.5 rounded text-[9px] sm:text-[10px] font-mono font-bold bg-[#0b0e11] text-[#707a8a] border border-[#2b3139]">
                      {rumor.league || "LCK"}
                    </span>

                    <span
                      className={`text-[9px] sm:text-[10px] font-mono font-bold px-1.5 sm:px-2 py-0.5 rounded ${
                        isOfficial
                          ? "bg-[#0ecb81]/15 text-[#0ecb81] border border-[#0ecb81]/30"
                          : "bg-[#FCD535]/15 text-[#FCD535] border border-[#FCD535]/30"
                      }`}
                    >
                      {isOfficial ? "OFFICIAL" : "RUMOR"}
                    </span>

                    <span className="text-xs font-bold text-white">
                      {displayAuthor}
                    </span>

                    <span className="text-[10px] font-mono text-[#707a8a]">
                      ({rumor.source || "X"})
                    </span>

                    {rumor.player_name && (
                      <span className="text-[11px] sm:text-xs font-mono font-bold text-[#FCD535] bg-[#0b0e11] px-1.5 sm:px-2 py-0.5 rounded border border-[#2b3139]">
                        {rumor.player_name}
                        {rumor.target_team_short ? ` → ${rumor.target_team_short}` : ""}
                      </span>
                    )}
                  </div>

                  <p className="text-xs sm:text-sm text-[#eaecef] font-medium leading-relaxed">
                    {displaySummary}
                  </p>

                  <div className="flex items-center gap-2 text-[10px] sm:text-[11px] text-[#707a8a] font-mono">
                    <Clock className="w-3 h-3" />
                    <span>
                      {new Date(rumor.published_at || Date.now()).toLocaleDateString(
                        language === "ko" ? "ko-KR" : language === "zh" ? "zh-CN" : "en-US",
                        {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        }
                      )}
                    </span>
                  </div>
                </div>

                {/* Right Block: Confidence Ticker & Source Button */}
                <div className="flex md:flex-col items-center md:items-end justify-between w-full md:w-auto gap-2 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-[#2b3139]/50">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] sm:text-[11px] text-[#707a8a] font-mono">
                      {t("confidence")}:
                    </span>
                    <span
                      className={`font-mono text-xs sm:text-sm font-bold ${
                        isOfficial
                          ? "text-[#0ecb81]"
                          : (rumor.confidence || 0) >= 80
                          ? "text-[#FCD535]"
                          : "text-[#f6465d]"
                      }`}
                    >
                      {isOfficial ? "100%" : `${rumor.confidence || 75}%`}
                    </span>
                  </div>

                  {rumor.post_url ? (
                    <a
                      href={rumor.post_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-md bg-[#2b3139] hover:bg-[#FCD535] hover:text-[#181a20] text-[11px] sm:text-xs font-semibold text-white transition-all min-h-[32px] sm:min-h-[36px]"
                    >
                      <span>{t("viewOriginalPost")}</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  ) : null}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
