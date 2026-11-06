"use client";

import { useLanguage } from "./language-provider";
import { TrendingUp, Users, ShieldAlert, Award } from "lucide-react";

export default function HomeHero() {
  const { t } = useLanguage();

  return (
    <div className="w-full pt-2 sm:pt-4 pb-2">
      {/* Top Banner Alert / Trust Header (Responsive Wrap) */}
      <div className="flex items-center justify-between flex-wrap gap-2 mb-3 sm:mb-4 pb-2.5 sm:pb-3 border-b border-[#2b3139]">
        <div className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-mono">
          <span className="text-[#0ecb81] font-bold">{t("terminalLive")}</span>
          <span className="text-[#707a8a] hidden xs:inline">|</span>
          <span className="text-[#929aa5] truncate max-w-[200px] sm:max-w-none">
            {t("intelSubtitle")}
          </span>
        </div>
        <div className="text-[10px] sm:text-[11px] font-mono text-[#707a8a]">
          {t("marketActive")}
        </div>
      </div>

      {/* Hero Display Header - Drop from 5xl down to 28px/36px on mobile as per design.md */}
      <div className="space-y-2 sm:space-y-3">
        <h1 className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight text-white uppercase leading-tight">
          {t("title")}
        </h1>
        <p className="text-xs sm:text-sm md:text-base text-[#929aa5] max-w-2xl leading-relaxed">
          {t("subtitle")}
        </p>
      </div>

      {/* Binance-style Stat Callout Row: 2-up on mobile, 4-up on tablet/desktop */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3 mt-4 sm:mt-6">
        <div className="p-3 sm:p-3.5 rounded-lg bg-[#1e2329] border border-[#2b3139]">
          <div className="flex items-center justify-between text-[#707a8a] text-[10px] sm:text-xs mb-1 font-medium">
            <span className="truncate">{t("statTrackedTeams")}</span>
            <Users className="w-3.5 h-3.5 text-[#FCD535] shrink-0 ml-1" />
          </div>
          <div className="text-xl sm:text-2xl font-bold text-white binance-num">34</div>
          <div className="text-[9px] sm:text-[10px] text-[#0ecb81] font-mono mt-0.5 truncate">
            {t("statTrackedTeamsSub")}
          </div>
        </div>

        <div className="p-3 sm:p-3.5 rounded-lg bg-[#1e2329] border border-[#2b3139]">
          <div className="flex items-center justify-between text-[#707a8a] text-[10px] sm:text-xs mb-1 font-medium">
            <span className="truncate">{t("statConfirmed")}</span>
            <Award className="w-3.5 h-3.5 text-[#0ecb81] shrink-0 ml-1" />
          </div>
          <div className="text-xl sm:text-2xl font-bold text-[#0ecb81] binance-num">100%</div>
          <div className="text-[9px] sm:text-[10px] text-[#707a8a] font-mono mt-0.5 truncate">
            {t("statConfirmedSub")}
          </div>
        </div>

        <div className="p-3 sm:p-3.5 rounded-lg bg-[#1e2329] border border-[#2b3139]">
          <div className="flex items-center justify-between text-[#707a8a] text-[10px] sm:text-xs mb-1 font-medium">
            <span className="truncate">{t("statLeaks")}</span>
            <TrendingUp className="w-3.5 h-3.5 text-[#FCD535] shrink-0 ml-1" />
          </div>
          <div className="text-xl sm:text-2xl font-bold text-[#FCD535] binance-num">ACTIVE</div>
          <div className="text-[9px] sm:text-[10px] text-[#707a8a] font-mono mt-0.5 truncate">
            {t("statLeaksSub")}
          </div>
        </div>

        <div className="p-3 sm:p-3.5 rounded-lg bg-[#1e2329] border border-[#2b3139]">
          <div className="flex items-center justify-between text-[#707a8a] text-[10px] sm:text-xs mb-1 font-medium">
            <span className="truncate">{t("statIntegrity")}</span>
            <ShieldAlert className="w-3.5 h-3.5 text-[#2dbdb6] shrink-0 ml-1" />
          </div>
          <div className="text-xl sm:text-2xl font-bold text-white binance-num">1-TO-1</div>
          <div className="text-[9px] sm:text-[10px] text-[#2dbdb6] font-mono mt-0.5 truncate">
            {t("statIntegritySub")}
          </div>
        </div>
      </div>
    </div>
  );
}
