"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function TeamLogo({ team }: any) {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const logoURL =
    theme === "light" ? team.light_mode_logo_url : team.dark_mode_logo_url;

  return (
    <img src={logoURL} alt={`${logoURL} logo`} className="w-[150px] max-h-24" />
  );
}
