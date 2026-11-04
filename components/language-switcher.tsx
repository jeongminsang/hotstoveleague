"use client";

import { useLanguage } from "./language-provider";

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <select
      value={language}
      onChange={(e) => setLanguage(e.target.value as "ko" | "en")}
      aria-label="Select Language"
      className="h-9 px-2.5 py-1 text-xs font-semibold rounded-md border border-input bg-background hover:bg-accent text-foreground focus:outline-none focus:ring-1 focus:ring-ring cursor-pointer transition-colors shadow-sm"
    >
      <option value="ko">🇰🇷 한국어</option>
      <option value="en">🇺🇸 English</option>
    </select>
  );
}
