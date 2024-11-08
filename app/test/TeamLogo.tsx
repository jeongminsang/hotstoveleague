"use client";

import { useTheme } from "next-themes";

export default function TeamLogo({ team }: any) {
  const { theme } = useTheme();
  const logoURL =
    theme === "light" ? team.light_mode_logo_url : team.dark_mode_logo_url;
  return (
    <img src={logoURL} alt={`${logoURL} logo`} className="w-[150px] max-h-24" />
  );
}
