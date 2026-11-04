"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { Rumor } from "@/lib/types";
import { Badge } from "./ui/badge";
import { ExternalLink, Radio } from "lucide-react";
import { useLanguage } from "./language-provider";

export default function RumorFeed({ initialRumors = [] }: { initialRumors: Rumor[] }) {
  const [rumors, setRumors] = useState<Rumor[]>(initialRumors);
  const { t, language } = useLanguage();
  const supabase = createClient();

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
      <div className="flex items-center justify-between mb-3 border-b pb-2">
        <div className="flex items-center gap-2">
          <Radio className="w-4 h-4 text-red-500 animate-pulse" />
          <h2 className="font-bold text-sm tracking-tight">{t("latestRumors")}</h2>
          <Badge variant="outline" className="text-[10px] px-1.5 py-0 border-primary text-primary">
            LIVE
          </Badge>
        </div>
        <span className="text-[11px] text-muted-foreground">
          {rumors.length} {language === "ko" ? "건 감지됨" : "detected"}
        </span>
      </div>

      <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
        {rumors.map((rumor) => (
          <div
            key={rumor.id || rumor.post_id}
            className="flex items-start justify-between gap-3 p-2.5 rounded-lg bg-secondary/40 hover:bg-secondary/70 transition-colors text-xs"
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <Badge
                  variant={rumor.source === "WEIBO" ? "destructive" : "default"}
                  className="text-[10px] px-1.5 py-0 font-bold"
                >
                  {rumor.source}
                </Badge>
                <span className="font-semibold text-foreground truncate">
                  {rumor.author}
                </span>
                <span className="text-[10px] text-muted-foreground">
                  {new Date(rumor.published_at).toLocaleTimeString(
                    language === "ko" ? "ko-KR" : "en-US",
                    {
                      hour: "2-digit",
                      minute: "2-digit",
                    }
                  )}
                </span>
                {rumor.confidence > 0 && (
                  <span className="text-[10px] font-bold text-amber-500">
                    {t("confidence")} {rumor.confidence}%
                  </span>
                )}
              </div>
              <p className="text-foreground/90 font-medium">
                {rumor.summary || rumor.raw_text}
              </p>
            </div>

            {rumor.post_url && (
              <a
                href={rumor.post_url}
                target="_blank"
                rel="noreferrer"
                className="text-muted-foreground hover:text-foreground shrink-0 p-1 transition-colors"
                title={t("source")}
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
