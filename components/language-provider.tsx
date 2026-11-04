"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export type Language = "ko" | "en";

export const translations = {
  ko: {
    title: "LCK 스토브리그 이적 예측 뷰어",
    subtitle: "웨이보·트위터 썰쟁이 데이터를 AI로 실시간 정제하여 나무위키보다 빠르게 제공합니다.",
    liveRadar: "⚡ 실시간 썰쟁이 레이더",
    latestRumors: "최신 찌라시 타임라인",
    noRumors: "등록된 최신 찌라시가 없습니다.",
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
    title: "LCK Stove League Transfer Predictions",
    subtitle: "Real-time AI-extracted insider transfer rumors from Twitter and Weibo, faster than Namuwiki.",
    liveRadar: "⚡ Live Insider Radar",
    latestRumors: "Latest Rumors Timeline",
    noRumors: "No transfer rumors recorded yet.",
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

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: keyof typeof translations.ko) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  language: "ko",
  setLanguage: () => {},
  t: (key) => translations.ko[key] || "",
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

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}

