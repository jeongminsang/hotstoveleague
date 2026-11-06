"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "./language-provider";
import { LanguageSwitcher } from "./language-switcher";
import { Button } from "./ui/button";

export default function Navbar() {
  const { t } = useLanguage();
  const pathname = usePathname();
  const isRumors = pathname === "/rumors";

  return (
    <nav className="w-full flex justify-center border-b border-border/40 h-16 bg-background/80 backdrop-blur sticky top-0 z-50">
      <div className="w-full max-w-5xl flex justify-between items-center p-3 px-5 text-sm">
        <div className="flex gap-2 sm:gap-3 items-center font-semibold">
          <Button
            size="sm"
            variant={isRumors ? "ghost" : "outline"}
            className="font-extrabold tracking-tight text-xs sm:text-sm"
            asChild
          >
            <Link href="/">{t("navHome")}</Link>
          </Button>

          <Button
            size="sm"
            variant={isRumors ? "default" : "ghost"}
            className={`font-bold tracking-tight text-xs sm:text-sm transition-all ${
              isRumors
                ? "bg-amber-500 hover:bg-amber-600 text-white shadow-sm"
                : "text-amber-800 hover:text-amber-900 hover:bg-amber-500/10"
            }`}
            asChild
          >
            <Link href="/rumors">{t("navOfficialAndRumors")}</Link>
          </Button>
        </div>

        <div className="flex items-center">
          <LanguageSwitcher />
        </div>
      </div>
    </nav>
  );
}
