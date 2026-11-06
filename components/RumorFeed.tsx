"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { Rumor } from "@/lib/types";
import { ExternalLink, Radio, ArrowRight } from "lucide-react";
import { useLanguage } from "./language-provider";
import Link from "next/link";
import { INITIAL_RUMORS } from "@/lib/rumors-data";

export default function RumorFeed({ initialRumors = [] }: { initialRumors: Rumor[] }) {
  const [rumors, setRumors] = useState<Rumor[]>(initialRumors);
  const { t, language } = useLanguage();
  const supabase = createClient();

  const seedByPostId = new Map(INITIAL_RUMORS.map((s) => [s.post_id, s]));

  useEffect(() => {
    const channel = supabase
      .channel("realtime-rumors")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "rumors",
        },
        (payload) => {
          const newRumor = payload.new as Rumor;
          setRumors((prev) => [newRumor, ...prev.slice(0, 19)]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase]);

  if (rumors.length === 0) {
    return (
      <div className="w-full p-4 rounded-xl border border-[#2b3139] bg-[#1e2329] text-center text-xs text-[#707a8a]">
        <div className="flex items-center justify-center gap-2 mb-1">
          <Radio className="w-4 h-4 text-[#0ecb81] animate-pulse" />
          <span className="font-bold text-white">{t("liveRadar")}</span>
        </div>
        {t("noRumors")}
      </div>
    );
  }

  return (
    <div className="w-full rounded-xl border border-[#2b3139] bg-[#1e2329] overflow-hidden">
      {/* Table Header Row (Binance Markets Table Header) */}
      <div className="flex items-center justify-between px-3 sm:px-4 py-2.5 sm:py-3 border-b border-[#2b3139] bg-[#1e2329]">
        <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
          <span className="relative flex h-2 w-2 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0ecb81] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#0ecb81]"></span>
          </span>
          <h2 className="font-bold text-xs sm:text-sm tracking-tight text-white uppercase flex items-center gap-1.5 truncate">
            <span className="truncate">{t("latestRumors")}</span>
            <span className="text-[9px] sm:text-[10px] px-1.5 py-0.2 rounded bg-[#FCD535] text-[#181a20] font-mono font-bold shrink-0">
              LIVE
            </span>
          </h2>
          <span className="text-[11px] sm:text-xs text-[#707a8a] font-mono shrink-0">
            ({rumors.length})
          </span>
        </div>

        <Link
          href="/rumors"
          className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-md bg-[#2b3139] text-[#FCD535] hover:bg-[#FCD535] hover:text-[#181a20] transition-colors shrink-0"
        >
          <span className="hidden xs:inline">{t("viewAllRumors")}</span>
          <span className="xs:hidden">All</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Rows Container */}
      <div className="divide-y divide-[#2b3139] max-h-80 overflow-y-auto">
        {rumors.slice(0, 10).map((rumor) => {
          const isOfficial = rumor.confidence === 100;
          const seed = seedByPostId.get(rumor.post_id || "");

          const displayAuthor =
            language === "en"
              ? rumor.author_en || seed?.author_en || rumor.author
              : language === "zh"
              ? rumor.author_zh || seed?.author_zh || rumor.author
              : rumor.author;

          const displaySummary =
            language === "en"
              ? rumor.summary_en || seed?.summary_en || rumor.summary
              : language === "zh"
              ? rumor.summary_zh || seed?.summary_zh || rumor.summary
              : rumor.summary;

          const league = rumor.league || seed?.league || "LCK";
          const playerName = rumor.player_name || seed?.player_name;
          const targetTeam = rumor.target_team_short || seed?.target_team_short;

          return (
            <div
              key={rumor.id || rumor.post_id}
              className="p-3 sm:px-4 hover:bg-[#2b3139]/40 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-3"
            >
              {/* Row Upper / Left: Tags & Author */}
              <div className="flex items-center justify-between sm:justify-start gap-2 min-w-0">
                <div className="flex items-center gap-1.5 sm:gap-2 min-w-0 truncate">
                  <span className="px-1.5 py-0.5 rounded text-[9px] sm:text-[10px] font-mono font-bold bg-[#0b0e11] text-[#707a8a] border border-[#2b3139] shrink-0">
                    {league}
                  </span>

                  <span
                    className={`text-[9px] sm:text-[10px] font-bold px-1.5 py-0.5 rounded shrink-0 ${
                      isOfficial
                        ? "bg-[#0ecb81]/15 text-[#0ecb81] border border-[#0ecb81]/30"
                        : "bg-[#FCD535]/15 text-[#FCD535] border border-[#FCD535]/30"
                    }`}
                  >
                    {isOfficial ? "OFFICIAL" : "RUMOR"}
                  </span>

                  <span className="text-xs font-semibold text-white truncate max-w-[130px] sm:max-w-[160px]">
                    {displayAuthor}
                  </span>

                  {playerName && (
                    <span className="text-[10px] sm:text-xs font-mono font-bold text-[#FCD535] sm:text-[#eaecef] bg-[#0b0e11] px-1.5 py-0.5 rounded border border-[#2b3139] shrink-0">
                      {playerName}
                      {targetTeam ? ` → ${targetTeam}` : ""}
                    </span>
                  )}
                </div>

                {/* Mobile Right Confidence & Link */}
                <div className="flex sm:hidden items-center gap-2 shrink-0">
                  <span
                    className={`font-mono text-xs font-bold ${
                      isOfficial
                        ? "text-[#0ecb81]"
                        : (rumor.confidence || 0) >= 80
                        ? "text-[#FCD535]"
                        : "text-[#f6465d]"
                    }`}
                  >
                    {isOfficial ? "100%" : `${rumor.confidence || 75}%`}
                  </span>
                  {rumor.post_url && (
                    <a
                      href={rumor.post_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#707a8a] hover:text-[#FCD535] transition-colors p-1"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>

              {/* Row Lower / Right: Summary & Desktop Confidence */}
              <div className="flex items-center justify-between sm:justify-end gap-3 min-w-0">
                <p className="text-xs text-[#929aa5] sm:truncate max-w-full sm:max-w-[340px] leading-relaxed line-clamp-2 sm:line-clamp-1">
                  {displaySummary}
                </p>

                {/* Desktop Confidence Ticker */}
                <div className="hidden sm:flex items-center gap-3 shrink-0">
                  <span
                    className={`font-mono text-xs font-bold ${
                      isOfficial
                        ? "text-[#0ecb81]"
                        : (rumor.confidence || 0) >= 80
                        ? "text-[#FCD535]"
                        : "text-[#f6465d]"
                    }`}
                  >
                    {isOfficial ? "100%" : `${rumor.confidence || 75}%`}
                  </span>

                  {rumor.post_url && (
                    <a
                      href={rumor.post_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#707a8a] hover:text-[#FCD535] transition-colors p-1"
                      title="Source link"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
