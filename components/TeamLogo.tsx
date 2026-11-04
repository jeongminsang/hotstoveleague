"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Team } from "@/lib/types";

export default function TeamLogo({ team }: { team: Team }) {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  const currentTheme = resolvedTheme || theme || "light";

  // 테마가 바뀔 때 시도 횟수를 리셋하여 테마 맞춤 로고를 다시 시도
  useEffect(() => {
    setAttempt(0);
  }, [currentTheme]);

  if (!mounted) {
    return <div className="w-[160px] h-16" />;
  }

  const isDark = currentTheme === "dark";
  const shortLower = team.short_name.toLowerCase();

  // 1순위: 테마 맞춤 SVG (/logos/gen_light.svg 또는 /logos/gen_dark.svg)
  // 2순위: 기본 SVG (/logos/gen.svg)
  // 3순위: 테마 맞춤 PNG
  // 4순위: 기본 PNG (/logos/gen.png)
  // 5순위: DB URL
  const sources = [
    `/logos/${shortLower}_${isDark ? "dark" : "light"}.svg`,
    `/logos/${shortLower}.svg`,
    `/logos/${shortLower}_${isDark ? "dark" : "light"}.png`,
    `/logos/${shortLower}.png`,
    isDark
      ? team.dark_logo_url || team.light_logo_url
      : team.light_logo_url || team.dark_logo_url,
  ].filter(Boolean) as string[];

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
      key={`${team.short_name}-${currentTheme}-${attempt}`}
      src={currentSrc}
      alt={`${team.name} logo`}
      className="w-[160px] max-h-16 object-contain drop-shadow transition-transform duration-300 hover:scale-105"
      onError={() => {
        setAttempt((prev) => prev + 1);
      }}
    />
  );
}
