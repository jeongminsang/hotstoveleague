"use client";

import { useLanguage } from "./language-provider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Globe, ChevronDown, Check } from "lucide-react";

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className="h-8 px-2.5 rounded-md bg-[#1e2329] hover:bg-[#2b3139] border border-[#2b3139] text-xs font-semibold text-[#eaecef] transition-colors flex items-center gap-1.5 focus:outline-none focus:ring-1 focus:ring-[#FCD535]"
        >
          <Globe className="w-3.5 h-3.5 text-[#707a8a]" />
          <span>{language === "ko" ? "한국어" : language === "zh" ? "中文" : "English"}</span>
          <ChevronDown className="w-3 h-3 text-[#707a8a] ml-0.5" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[130px] p-1 bg-[#1e2329] border border-[#2b3139] text-white shadow-xl rounded-lg">
        <DropdownMenuItem
          onClick={() => setLanguage("en")}
          className="flex items-center justify-between text-xs font-medium cursor-pointer py-1.5 px-2.5 rounded hover:bg-[#2b3139] focus:bg-[#2b3139]"
        >
          <span>🇺🇸 English</span>
          {language === "en" && <Check className="w-3.5 h-3.5 text-[#FCD535] ml-2" />}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setLanguage("ko")}
          className="flex items-center justify-between text-xs font-medium cursor-pointer py-1.5 px-2.5 rounded hover:bg-[#2b3139] focus:bg-[#2b3139]"
        >
          <span>🇰🇷 한국어</span>
          {language === "ko" && <Check className="w-3.5 h-3.5 text-[#FCD535] ml-2" />}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setLanguage("zh")}
          className="flex items-center justify-between text-xs font-medium cursor-pointer py-1.5 px-2.5 rounded hover:bg-[#2b3139] focus:bg-[#2b3139]"
        >
          <span>🇨🇳 中文</span>
          {language === "zh" && <Check className="w-3.5 h-3.5 text-[#FCD535] ml-2" />}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
