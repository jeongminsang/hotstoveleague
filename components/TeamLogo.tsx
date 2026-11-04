"use client";

import { useEffect, useState } from "react";
import { Team } from "@/lib/types";

export default function TeamLogo({ team }: { team: Team }) {
  const [mounted, setMounted] = useState(false);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-[160px] h-16" />;
  }

  const shortLower = team.short_name.toLowerCase();

  // DB에 저장된 지정 로고 URL 우선 -> 확장자 fallback 순환
  const dbUrl = team.light_logo_url || team.dark_logo_url;
  const sources = Array.from(
    new Set([
      dbUrl,
      `/logos/${shortLower}.svg`,
      `/logos/${shortLower}.png`,
    ].filter(Boolean))
  ) as string[];

  const currentSrc = sources[attempt];

  if (!currentSrc || attempt >= sources.length) {
    return (
      <div
        className="px-4 py-2 rounded-xl font-black text-xl tracking-wider text-white shadow-sm flex items-center justify-center min-w-[120px]"
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
      className="w-[160px] max-h-16 object-contain drop-shadow transition-transform duration-300 hover:scale-105"
      onError={() => {
        setAttempt((prev) => prev + 1);
      }}
    />
  );
}
