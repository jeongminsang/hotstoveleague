"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "./language-provider";
import { LanguageSwitcher } from "./language-switcher";
import { Flame, ShieldCheck, TrendingUp, Menu, X, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const { t } = useLanguage();
  const pathname = usePathname();
  const isRumors = pathname === "/rumors";
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="w-full border-b border-[#2b3139] bg-[#0b0e11] sticky top-0 z-50 h-16">
      <div className="w-full max-w-7xl mx-auto flex items-center justify-between px-3 sm:px-6 h-full text-sm">
        {/* Left: Brand Wordmark & Desktop Navigation */}
        <div className="flex items-center gap-4 sm:gap-8">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2 group select-none min-w-0"
          >
            <div className="w-8 h-8 rounded-md bg-[#FCD535] flex items-center justify-center font-black text-[#181a20] text-lg tracking-tighter shadow-sm group-hover:bg-[#f0b90b] transition-colors shrink-0">
              <Flame className="w-5 h-5 fill-current" />
            </div>
            <div className="flex flex-col truncate">
              <span className="font-extrabold tracking-tight text-sm sm:text-base text-white group-hover:text-[#FCD535] transition-colors truncate">
                HOTSTOVE<span className="text-[#FCD535]">.LEAGUE</span>
              </span>
              <span className="text-[9px] sm:text-[10px] uppercase font-mono text-[#707a8a] tracking-wider leading-none">
                LoL Transfer Terminal
              </span>
            </div>
          </Link>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center gap-1 font-medium text-sm">
            <Link
              href="/"
              className={`px-3 py-1.5 rounded-md transition-colors ${
                !isRumors
                  ? "text-[#FCD535] bg-[#1e2329] font-semibold"
                  : "text-[#eaecef] hover:text-[#FCD535] hover:bg-[#1e2329]/60"
              }`}
            >
              {t("navHome")}
            </Link>

            <Link
              href="/rumors"
              className={`px-3 py-1.5 rounded-md transition-colors flex items-center gap-1.5 ${
                isRumors
                  ? "text-[#181a20] bg-[#FCD535] font-semibold"
                  : "text-[#eaecef] hover:text-[#FCD535] hover:bg-[#1e2329]/60"
              }`}
            >
              <TrendingUp className="w-3.5 h-3.5" />
              <span>{t("navOfficialAndRumors")}</span>
            </Link>
          </nav>
        </div>

        {/* Right side cluster */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Market Window Trust Badge (Desktop & Tablet) */}
          <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#1e2329] border border-[#2b3139] text-[11px] text-[#707a8a]">
            <ShieldCheck className="w-3.5 h-3.5 text-[#FCD535]" />
            <span className="font-mono text-[#eaecef]">2026/27 OFFSEASON</span>
          </div>

          <LanguageSwitcher />

          {/* Mobile Hamburger Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-md bg-[#1e2329] border border-[#2b3139] text-[#eaecef] hover:text-[#FCD535] transition-colors focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Binance-Style Fullscreen Mobile Sheet Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15 }}
            className="md:hidden fixed inset-x-0 top-16 bg-[#0b0e11] border-b border-[#2b3139] p-4 flex flex-col gap-3 shadow-2xl z-50 max-h-[calc(100vh-4rem)] overflow-y-auto"
          >
            <div className="flex flex-col gap-1 text-sm font-semibold">
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className={`p-3 rounded-lg flex items-center justify-between transition-colors ${
                  !isRumors
                    ? "bg-[#1e2329] text-[#FCD535] border border-[#FCD535]/30 font-bold"
                    : "text-[#eaecef] hover:bg-[#1e2329]"
                }`}
              >
                <span>{t("navHome")}</span>
                {!isRumors && <span className="w-1.5 h-1.5 rounded-full bg-[#FCD535]" />}
              </Link>

              <Link
                href="/rumors"
                onClick={() => setMobileMenuOpen(false)}
                className={`p-3 rounded-lg flex items-center justify-between transition-colors ${
                  isRumors
                    ? "bg-[#1e2329] text-[#FCD535] border border-[#FCD535]/30 font-bold"
                    : "text-[#eaecef] hover:bg-[#1e2329]"
                }`}
              >
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  <span>{t("navOfficialAndRumors")}</span>
                </div>
                {isRumors && <span className="w-1.5 h-1.5 rounded-full bg-[#FCD535]" />}
              </Link>
            </div>

            {/* Mobile Sheet Footer CTA */}
            <div className="pt-3 border-t border-[#2b3139] flex flex-col gap-2">
              <div className="flex items-center justify-between text-xs text-[#707a8a] font-mono px-1">
                <span>TERMINAL STATUS</span>
                <span className="text-[#0ecb81] font-bold">ONLINE (2026/27)</span>
              </div>
              <Link
                href="/rumors"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-2.5 rounded-md bg-[#FCD535] hover:bg-[#f0b90b] text-[#181a20] font-bold text-center text-xs flex items-center justify-center gap-1.5 transition-colors"
              >
                <span>{t("viewAllRumors")}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
