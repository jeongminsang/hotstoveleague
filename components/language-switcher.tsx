"use client";

import { useLanguage } from "./language-provider";
import { Button } from "./ui/button";
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
        <Button
          variant="outline"
          size="sm"
          className="h-9 px-3 gap-1.5 text-xs font-semibold shadow-sm hover:bg-accent"
        >
          <Globe className="w-3.5 h-3.5 text-muted-foreground" />
          <span>{language === "ko" ? "한국어" : language === "zh" ? "中文" : "English"}</span>
          <ChevronDown className="w-3.5 h-3.5 text-muted-foreground opacity-60 ml-0.5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[130px] p-1 shadow-md">
        <DropdownMenuItem
          onClick={() => setLanguage("en")}
          className="flex items-center justify-between text-xs font-medium cursor-pointer py-1.5 px-2.5 rounded-sm"
        >
          <span>🇺🇸 English</span>
          {language === "en" && <Check className="w-3.5 h-3.5 text-primary ml-2" />}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setLanguage("ko")}
          className="flex items-center justify-between text-xs font-medium cursor-pointer py-1.5 px-2.5 rounded-sm"
        >
          <span>🇰🇷 한국어</span>
          {language === "ko" && <Check className="w-3.5 h-3.5 text-primary ml-2" />}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setLanguage("zh")}
          className="flex items-center justify-between text-xs font-medium cursor-pointer py-1.5 px-2.5 rounded-sm"
        >
          <span>🇨🇳 中文</span>
          {language === "zh" && <Check className="w-3.5 h-3.5 text-primary ml-2" />}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
