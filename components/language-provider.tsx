"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export type Language = "ko" | "en";

export const LEAGUES = [
  { key: "LCK", name: "LCK", region: "Korea" },
  { key: "LPL", name: "LPL", region: "China" },
  { key: "LEC", name: "LEC", region: "Europe" },
  { key: "LCS", name: "LCS", region: "North America" },
  { key: "LCP", name: "LCP", region: "Pacific" },
  { key: "CBLOL", name: "CBLOL", region: "Brazil" },
] as const;

export const translations = {
  ko: {
    title: "글로벌 LoL 스토브리그 이적 예측 뷰어",
    subtitle: "전 세계 리그의 루머 데이터를 AI로 실시간 정제하여 가장 빠르게 제공합니다.",
    liveRadar: "⚡ 실시간 썰쟁이 레이더",
    latestRumors: "최신 찌라시 타임라인",
    noRumors: "등록된 최신 찌라시가 없습니다.",
    noTeamsInLeague: "해당 리그에 등록된 구단 정보가 없습니다.",
    source: "출처",
    confidence: "신뢰도",
    officialRoster: "📋 오피셜 로스터 보기",
    predictedRoster: "🔄 예측 로스터 보기",
    officialSubtitle: "2026 오피셜 등록 로스터",
    predictedSubtitle: "2026 스토브리그 이적 예측 로스터",
    headCoach: "감독",
    coach: "코치",
    transferredNotice: "➔ 이적 유력",
    likely: "🔥 유력",
    rumor: "⚡ 루머",
    vacant: "공석",
    playersCount: "명",
    envRequiredTitle: "Supabase 환경변수 설정이 필요합니다",
    envRequiredDesc: "프로젝트 루트에 .env.local 파일을 생성하고 Supabase 키를 등록해주세요.",
    dbInitRequired: "데이터베이스 초기화가 필요합니다",
    dbInitDesc: "Supabase 대시보드 SQL Editor에서 schema.sql과 seed.sql을 실행해주세요.",
  },
  en: {
    title: "Global LoL Stove League Transfer Predictions",
    subtitle: "Real-time AI-extracted insider transfer rumors across global leagues, faster than Namuwiki.",
    liveRadar: "⚡ Live Insider Radar",
    latestRumors: "Latest Rumors Timeline",
    noRumors: "No transfer rumors recorded yet.",
    noTeamsInLeague: "No teams registered in this league yet.",
    source: "Source",
    confidence: "Confidence",
    officialRoster: "📋 Official Roster",
    predictedRoster: "🔄 Predicted Roster",
    officialSubtitle: "2026 Official Registered Roster",
    predictedSubtitle: "2026 Stove League Predicted Roster",
    headCoach: "Head Coach",
    coach: "Coach",
    transferredNotice: "➔ Predicted Transfer",
    likely: "🔥 Likely",
    rumor: "⚡ Rumor",
    vacant: "Vacant",
    playersCount: " players",
    envRequiredTitle: "Supabase Environment Setup Required",
    envRequiredDesc: "Please create a .env.local file in the project root and add your Supabase keys.",
    dbInitRequired: "Database Initialization Required",
    dbInitDesc: "Please run schema.sql and seed.sql in the Supabase SQL Editor.",
  },
};

export const teamNames: Record<Language, Record<string, string>> = {
  ko: {
    T1: "T1",
    GEN: "Gen.G",
    HLE: "한화생명e스포츠",
    DK: "디플러스 기아",
    KT: "kt 롤스터",
    BFX: "BNK 피어엑스",
    BRO: "한진 브리온",
    KRX: "키움 DRX",
    NS: "농심 레드포스",
    DNS: "DN 수퍼스",
  },
  en: {
    T1: "T1",
    GEN: "Gen.G",
    HLE: "Hanwha Life Esports",
    DK: "Dplus KIA",
    KT: "kt Rolster",
    BFX: "BNK FEARX",
    BRO: "Hanjin BRION",
    KRX: "Kiwoom DRX",
    NS: "Nongshim RedForce",
    DNS: "DN SOOPers",
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: keyof typeof translations.ko) => string;
  getTeamName: (shortName: string, defaultName: string) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  language: "ko",
  setLanguage: () => {},
  t: (key) => translations.ko[key] || "",
  getTeamName: (_, defaultName) => defaultName,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("ko");

  useEffect(() => {
    const saved = localStorage.getItem("stove_league_lang") as Language;
    if (saved === "ko" || saved === "en") {
      setLanguageState(saved);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("stove_league_lang", lang);
  };

  const t = (key: keyof typeof translations.ko): string => {
    return translations[language][key] || translations.ko[key] || "";
  };

  const getTeamName = (shortName: string, defaultName: string): string => {
    return teamNames[language]?.[shortName] || defaultName;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, getTeamName }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
