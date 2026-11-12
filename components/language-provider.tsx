"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export type Language = "ko" | "en" | "zh";

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
    navHome: "🔥 HotStoveLeague",
    navOfficialAndRumors: "⚡ 오피셜 & 루머",
    liveRadar: "⚡ 실시간 썰쟁이 레이더",
    latestRumors: "최신 오피셜 & 루머",
    viewAllRumors: "전체 오피셜 & 루머 보기",
    rumorsPageTitle: "2027 스토브리그 오피셜 & 루머",
    rumorsPageSubtitle: "구단 공식 발표(Official)와 1티어 인사이더들의 이적 루머(Rumor)를 시간순으로 실시간 제공합니다. 클릭 시 원본 게시물로 이동합니다.",
    backToRosters: "← 로스터 뷰어로 돌아가기",
    sortNewest: "최신순 (시간순)",
    sortOldest: "오래된순 (시간순)",
    rumorCountUnit: "건",
    emptyFilterRumors: "선택한 조건에 해당하는 오피셜 및 루머가 없습니다.",
    allSources: "전체 출처",
    allLeagues: "전체 리그",
    viewOriginalPost: "원본글 보기",
    rumorSourceClick: "클릭하여 원본 보기",
    resignNotice: "✓ 재계약/잔류 루머",
    stay: "잔류",
    noRumors: "등록된 최신 소식이 없습니다.",
    noTeamsInLeague: "해당 리그에 등록된 구단 정보가 없습니다.",
    source: "출처",
    confidence: "신뢰도",
    officialRoster: "📋 2026 오피셜 로스터 보기",
    predictedRoster: "🔄 2027 예상 로스터 보기",
    officialSubtitle: "2026 오피셜 등록 로스터",
    predictedSubtitle: "2027 스토브리그 오피셜 및 루머 기반 예상 로스터",
    headCoach: "감독",
    coach: "코치",
    transferredNotice: "➔ 영입 루머",
    likely: "🔥 유력",
    rumor: "⚡ 루머",
    vacant: "공석",
    playersCount: "명",
    envRequiredTitle: "Supabase 환경변수 설정이 필요합니다",
    envRequiredDesc: "프로젝트 루트에 .env.local 파일을 생성하고 Supabase 키를 등록해주세요.",
    dbInitRequired: "데이터베이스 초기화가 필요합니다",
    dbInitDesc: "Supabase 대시보드 SQL Editor에서 schema.sql과 seed.sql을 실행해주세요.",
    // Hero Stats
    statTrackedTeams: "추적 구단",
    statTrackedTeamsSub: "4대 메이저 리그",
    statConfirmed: "확정 완료",
    statConfirmedSub: "공식 오피셜 검증",
    statLeaks: "내부 찌라시",
    statLeaksSub: "1티어 소식통",
    statIntegrity: "로스터 무결성",
    statIntegritySub: "1인 1구단 엄격 원칙",
    terminalLive: "실시간 터미널",
    terminalStatus: "터미널 상태",
    marketActive: "스토브리그 활성화",
    intelSubtitle: "LCK • LPL • LEC • LCS 로스터 소식통",
    rosterStatus: "로스터 상태",
    accuracyRate: "적중률",
  },
  en: {
    title: "Global LoL Stove League Transfer Predictions",
    subtitle: "Real-time AI-extracted insider transfer rumors and official announcements across global leagues.",
    navHome: "🔥 HotStoveLeague",
    navOfficialAndRumors: "⚡ Official & Rumors",
    liveRadar: "⚡ Live Insider Radar",
    latestRumors: "Latest Official & Rumors",
    viewAllRumors: "View All Official & Rumors",
    rumorsPageTitle: "2027 Stove League Official & Rumors",
    rumorsPageSubtitle: "Real-time chronological feed of official team announcements and verified tier-1 insider transfer rumors. Click any item to view original source.",
    backToRosters: "← Back to Roster Viewer",
    sortNewest: "Newest First",
    sortOldest: "Oldest First",
    rumorCountUnit: " items",
    emptyFilterRumors: "No announcements or rumors found for the selected filter.",
    allSources: "All Sources",
    allLeagues: "All Leagues",
    viewOriginalPost: "View Original Post",
    rumorSourceClick: "Click to view original source",
    resignNotice: "✓ Re-signing Rumor",
    stay: "STAY",
    noRumors: "No transfer news recorded yet.",
    noTeamsInLeague: "No teams registered in this league yet.",
    source: "Source",
    confidence: "Confidence",
    officialRoster: "📋 2026 Official Roster",
    predictedRoster: "🔄 2027 Predicted Roster",
    officialSubtitle: "2026 Official Registered Roster",
    predictedSubtitle: "2027 Stove League Official & Rumor-Based Predicted Roster",
    headCoach: "Head Coach",
    coach: "Coach",
    transferredNotice: "➔ Rumored Transfer",
    likely: "🔥 Likely",
    rumor: "⚡ Rumor",
    vacant: "Vacant",
    playersCount: " players",
    envRequiredTitle: "Supabase Environment Setup Required",
    envRequiredDesc: "Please create a .env.local file in the project root and add your Supabase keys.",
    dbInitRequired: "Database Initialization Required",
    dbInitDesc: "Please run schema.sql and seed.sql in the Supabase SQL Editor.",
    // Hero Stats
    statTrackedTeams: "TRACKED TEAMS",
    statTrackedTeamsSub: "4 MAJOR LEAGUES",
    statConfirmed: "CONFIRMED",
    statConfirmedSub: "VERIFIED OFFICIAL",
    statLeaks: "INSIDER LEAKS",
    statLeaksSub: "TIER-1 INTEL",
    statIntegrity: "INTEGRITY",
    statIntegritySub: "ZERO MULTI-SPLIT",
    terminalLive: "TERMINAL LIVE",
    terminalStatus: "TERMINAL STATUS",
    marketActive: "MARKET: ACTIVE",
    intelSubtitle: "LCK • LPL • LEC • LCS ROSTER INTEL",
    rosterStatus: "ROSTER STATUS",
    accuracyRate: "ACCURACY RATE",
  },
  zh: {
    title: "全球英雄联盟转会期预测看板",
    subtitle: "AI实时提炼全球各大联赛一手爆料与官宣数据，快人一步。",
    navHome: "🔥 HotStoveLeague",
    navOfficialAndRumors: "⚡ 官宣与流言",
    liveRadar: "⚡ 实时爆料雷达",
    latestRumors: "最新官宣与流言",
    viewAllRumors: "查看全部官宣与流言",
    rumorsPageTitle: "2027 转会期官宣与流言追踪",
    rumorsPageSubtitle: "按时间线实时呈现俱乐部官方公告(Official)与第一梯队爆料人转会流言(Rumor)。点击直达原帖来源。",
    backToRosters: "← 返回阵容预览",
    sortNewest: "最新优先 (按时间)",
    sortOldest: "最早优先 (按时间)",
    rumorCountUnit: " 条",
    emptyFilterRumors: "当前筛选条件下暂无官宣或流言数据。",
    allSources: "全部来源",
    allLeagues: "全部联赛",
    viewOriginalPost: "查看原帖",
    rumorSourceClick: "点击查看原帖来源",
    resignNotice: "✓ 续约/留队消息",
    stay: "留队",
    noRumors: "暂无最新转会动态。",
    noTeamsInLeague: "该联赛暂无注册战队信息。",
    source: "来源",
    confidence: "可信度",
    officialRoster: "📋 2026 官方注册名单",
    predictedRoster: "🔄 2027 预测阵容",
    officialSubtitle: "2026 赛季官方注册阵容",
    predictedSubtitle: "2027 转会期官宣与流言预测阵容",
    headCoach: "主教练",
    coach: "教练",
    transferredNotice: "➔ 转会流言",
    likely: "🔥 大概率",
    rumor: "⚡ 流言",
    vacant: "待定",
    playersCount: "人",
    envRequiredTitle: "需要配置 Supabase 环境变量",
    envRequiredDesc: "请在项目根目录下创建 .env.local 文件并填入 Supabase 密钥。",
    dbInitRequired: "需要初始化数据库",
    dbInitDesc: "请在 Supabase 控制台的 SQL Editor 中运行 schema.sql 与 seed.sql。",
    // Hero Stats
    statTrackedTeams: "追踪战队",
    statTrackedTeamsSub: "四大主要联赛",
    statConfirmed: "官方官宣",
    statConfirmedSub: "俱乐部权威验证",
    statLeaks: "一手爆料",
    statLeaksSub: "T1级权威知情人",
    statIntegrity: "名单严谨性",
    statIntegritySub: "严禁一人多队原则",
    terminalLive: "实时终端",
    terminalStatus: "终端状态",
    marketActive: "转会期活跃",
    intelSubtitle: "LCK • LPL • LEC • LCS 阵容情报",
    rosterStatus: "阵容状态",
    accuracyRate: "准确率",
  },
};

export const officialEnglishTeamNames: Record<string, string> = {
  T1: "T1",
  GEN: "Gen.G",
  HLE: "Hanwha Life Esports",
  DK: "Dplus KIA",
  KT: "kt Rolster",
  BFX: "BNK FEARX",
  BRO: "Hanjin BRION",
  KRX: "DRX",
  NS: "Nongshim RedForce",
  DNS: "DN SOOPers",
};

// 모든 언어(KO, EN, ZH)에서 팀명은 영문 공식 명칭으로 일관되게 유지
export const teamNames: Record<Language, Record<string, string>> = {
  ko: officialEnglishTeamNames,
  en: officialEnglishTeamNames,
  zh: officialEnglishTeamNames,
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: keyof typeof translations.ko) => string;
  getTeamName: (shortName: string, defaultName: string) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  setLanguage: () => {},
  t: (key) => translations.en[key] || translations.ko[key] || "",
  getTeamName: (_, defaultName) => defaultName,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");

  useEffect(() => {
    const saved = localStorage.getItem("stove_league_lang") as Language;
    if (saved === "ko" || saved === "en" || saved === "zh") {
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
