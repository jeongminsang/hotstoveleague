"use client";

import { useEffect, useState } from "react";
import { Team } from "@/lib/types";

export default function TeamLogo({
  team,
  className,
}: {
  team: Team;
  className?: string;
}) {
  const [mounted, setMounted] = useState(false);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className={className || "w-full h-full"} />;
  }

  const shortLower = team.short_name.toLowerCase();

  // Alias mappings (e.g., MKOI -> MDK, SOOP -> DNS)
  const aliasMap: Record<string, string[]> = {
    mkoi: ["mdk", "mkoi"],
    mdk: ["mdk", "mkoi"],
    dns: ["dns", "soop"],
  };
  const aliases = aliasMap[shortLower] || [shortLower];

  // DB에 저장된 지정 로고 URL 우선 -> 확장자 fallback 순환
  const dbUrl = team.light_logo_url || team.dark_logo_url;
  const sources = Array.from(
    new Set([
      dbUrl,
      ...aliases.map((a) => `/logos/${a}.svg`),
      ...aliases.map((a) => `/logos/${a}.png`),
    ].filter(Boolean))
  ) as string[];

  const currentSrc = sources[attempt];

  if (!currentSrc || attempt >= sources.length) {
    return (
      <div
        className="w-full h-full rounded font-black text-xs tracking-wider text-white shadow-sm flex items-center justify-center p-0.5"
        style={{ backgroundColor: team.primary_color || "#333" }}
      >
        {team.short_name}
      </div>
    );
  }

  return (
    <img
      key={`${team.short_name}-${attempt}`}
      src={currentSrc}
      alt={`${team.name} logo`}
      className={
        className ||
        "w-full h-full max-w-full max-h-full object-contain drop-shadow-sm transition-transform duration-200 hover:scale-105"
      }
      onError={() => {
        setAttempt((prev) => prev + 1);
      }}
    />
  );
}
