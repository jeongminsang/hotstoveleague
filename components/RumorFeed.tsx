"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { Rumor } from "@/lib/types";
import { Badge } from "./ui/badge";
import { ExternalLink, Radio, ArrowRight } from "lucide-react";
import { useLanguage } from "./language-provider";
import Link from "next/link";
import { Button } from "./ui/button";
import { INITIAL_RUMORS } from "@/lib/rumors-data";

export default function RumorFeed({ initialRumors = [] }: { initialRumors: Rumor[] }) {
  const [rumors, setRumors] = useState<Rumor[]>(initialRumors);
  const { t, language } = useLanguage();
  const supabase = createClient();

  const seedByPostId = new Map(INITIAL_RUMORS.map((s) => [s.post_id, s]));

  useEffect(() => {
    // Supabase Realtime 구독: rumors 테이블에 새 행이 INSERT되면 즉시 피드 맨 앞에 추가
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
          setRumors((prev) => [newRumor, ...prev.slice(0, 19)]); // 최대 20개 유지
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase]);

  if (rumors.length === 0) {
    return (
      <div className="w-full max-w-5xl p-4 rounded-xl border bg-card text-card-foreground text-center text-xs text-muted-foreground">
        <div className="flex items-center justify-center gap-2 mb-1">
          <Radio className="w-4 h-4 text-emerald-500 animate-pulse" />
          <span className="font-bold text-foreground">{t("liveRadar")}</span>
        </div>
        {t("noRumors")}
      </div>
    );
  }

  return (
    <div className="w-full max-w-5xl rounded-xl border bg-card text-card-foreground shadow-sm p-4">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3 border-b pb-2.5">
        <div className="flex items-center gap-2">
          <Radio className="w-4 h-4 text-red-500 animate-pulse" />
          <h2 className="font-bold text-sm tracking-tight">{t("latestRumors")}</h2>
          <Badge variant="outline" className="text-[10px] px-1.5 py-0 border-primary text-primary">
            LIVE
          </Badge>
          <span className="text-[11px] text-muted-foreground ml-1">
            ({rumors.length}
            {t("rumorCountUnit")})
          </span>
        </div>
        <Button variant="outline" size="sm" className="h-7 text-xs font-bold gap-1" asChild>
          <Link href="/rumors">
            {t("viewAllRumors")}
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </Button>
      </div>

      <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
        {rumors.slice(0, 12).map((rumor) => {
          const isOfficial = rumor.confidence === 100;
          const seed = seedByPostId.get(rumor.post_id || "");
          const author_en = rumor.author_en || seed?.author_en;
          const summary_en = rumor.summary_en || seed?.summary_en;
          const league = rumor.league || seed?.league;
          const playerName = rumor.player_name || seed?.player_name;
          const currentTeam = rumor.current_team_short || seed?.current_team_short;
          const targetTeam = rumor.target_team_short || seed?.target_team_short;
          const isStay = currentTeam && currentTeam === targetTeam;

          const badgeClass =
            rumor.source === "WEIBO"
              ? "bg-red-600 text-white hover:bg-red-700"
              : rumor.source === "COMMUNITY"
                ? "bg-emerald-600 text-white hover:bg-emerald-700"
                : "bg-sky-600 text-white hover:bg-sky-700";

          const displayAuthor =
            language === "en" && author_en
              ? author_en
              : rumor.author || seed?.author || "";

          const displaySummary =
            language === "en" && summary_en
              ? summary_en
              : rumor.summary || seed?.summary || rumor.raw_text || "";

          const content = (
            <>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-1.5 mb-1.5">
                  <Badge
                    className={`text-[9px] px-1.5 py-0 font-black border-0 ${
                      isOfficial
                        ? "bg-emerald-600 text-white hover:bg-emerald-700"
                        : "bg-amber-500 text-white hover:bg-amber-600"
                    }`}
                  >
                    {isOfficial
                      ? language === "ko"
                        ? "오피셜"
                        : "OFFICIAL"
                      : language === "ko"
                        ? "루머"
                        : "RUMOR"}
                  </Badge>
                  {league && (
                    <Badge variant="outline" className="text-[9px] px-1 py-0 font-bold border-primary/40 text-primary">
                      {league}
                    </Badge>
                  )}
                  <Badge className={`text-[9px] px-1.5 py-0 font-bold border-0 ${badgeClass}`}>
                    {rumor.source}
                  </Badge>
                  <span className="font-bold text-foreground text-xs truncate">
                    {displayAuthor}
                  </span>
                  <span className="text-[10px] text-muted-foreground font-mono">
                    {new Date(rumor.published_at).toLocaleDateString(
                      language === "ko" ? "ko-KR" : "en-US",
                      {
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      }
                    )}
                  </span>
                  {rumor.confidence > 0 && (
                    <span
                      className={`text-[10px] font-extrabold px-1.5 py-0.2 rounded ${
                        isOfficial
                          ? "text-emerald-700 bg-emerald-500/10"
                          : "text-amber-600 bg-amber-500/10"
                      }`}
                    >
                      {t("confidence")} {rumor.confidence}%
                    </span>
                  )}
                </div>

                {playerName && (
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className="px-2 py-0.2 rounded bg-amber-500/15 border border-amber-500/30 text-amber-950 font-black text-[11px]">
                      {playerName}
                    </span>
                    {currentTeam && targetTeam && (
                      <div className="flex items-center gap-1 text-[11px] font-extrabold">
                        <span className="px-1.5 py-0.2 rounded bg-secondary text-foreground text-[10px]">
                          {currentTeam}
                        </span>
                        <ArrowRight className="w-3 h-3 text-amber-600" />
                        <span
                          className={`px-1.5 py-0.2 rounded text-[10px] ${
                            isStay
                              ? "bg-emerald-500/15 text-emerald-800 border border-emerald-500/30 font-bold"
                              : "bg-amber-500 text-white font-bold"
                          }`}
                        >
                          {targetTeam} {isStay ? `(${t("stay")})` : ""}
                        </span>
                      </div>
                    )}
                  </div>
                )}

                <p className="text-foreground/90 font-medium leading-snug">
                  {displaySummary}
                </p>
              </div>

              {rumor.post_url && (
                <span
                  className="text-muted-foreground group-hover:text-primary shrink-0 p-1 transition-colors flex items-center gap-1 text-[10px] font-semibold"
                  title={t("viewOriginalPost")}
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </span>
              )}
            </>
          );

          return rumor.post_url ? (
            <a
              key={rumor.id || rumor.post_id}
              href={rumor.post_url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-start justify-between gap-3 p-2.5 rounded-lg bg-secondary/40 hover:bg-amber-500/10 border border-transparent hover:border-amber-500/40 transition-all text-xs cursor-pointer"
            >
              {content}
            </a>
          ) : (
            <div
              key={rumor.id || rumor.post_id}
              className="flex items-start justify-between gap-3 p-2.5 rounded-lg bg-secondary/40 transition-colors text-xs"
            >
              {content}
            </div>
          );
        })}
      </div>
    </div>
  );
}
