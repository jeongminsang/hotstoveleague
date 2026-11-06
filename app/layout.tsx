import { LanguageProvider } from "@/components/language-provider";
import Navbar from "@/components/Navbar";
import { GeistSans } from "geist/font/sans";
import "./globals.css";

export const metadata = {
  metadataBase: new URL("https://www.hotstoveleague.lol"),
  title: "HotStoveLeague • LoL 2026/27 Transfer Terminal",
  description: "Real-time AI transfer predictions, official rosters and insider rumors for LCK, LPL, LEC, LCS",
  applicationName: "HotStoveLeague",
  keywords: [
    "LoL",
    "League of Legends",
    "Stove League",
    "LCK",
    "LPL",
    "LEC",
    "LCS",
    "Roster",
    "Transfer",
    "Rumors",
    "스토브리그",
    "롤 이적시장",
    "2026 LoL",
    "2027 LoL",
  ],
  authors: [{ name: "HotStoveLeague" }],
  creator: "HotStoveLeague",
  publisher: "HotStoveLeague",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: ["ko_KR", "zh_CN"],
    url: "https://www.hotstoveleague.lol",
    siteName: "HotStoveLeague",
    title: "HotStoveLeague • LoL 2026/27 Transfer Terminal",
    description: "Real-time AI transfer predictions, verified official rosters and insider rumors for LCK, LPL, LEC, LCS.",
    images: [
      {
        url: "https://www.hotstoveleague.lol/og-image.png",
        width: 1200,
        height: 630,
        type: "image/png",
        alt: "HotStoveLeague • LoL 2026/27 Transfer Terminal Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "HotStoveLeague • LoL 2026/27 Transfer Terminal",
    description: "Real-time AI transfer predictions, verified official rosters and insider rumors for LCK, LPL, LEC, LCS.",
    images: ["https://www.hotstoveleague.lol/og-image.png"],
    creator: "@HotStoveLeague",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${GeistSans.className} dark`}>
      <body className="bg-[#0b0e11] text-[#eaecef] antialiased min-h-screen flex flex-col selection:bg-[#FCD535] selection:text-[#181a20]">
        <LanguageProvider>
          {/* Top Binance-style Dark Nav */}
          <Navbar />

          {/* Main Content Area (Max Width 1280px / 1440px for Product Density) */}
          <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 flex flex-col gap-8">
            {children}
          </main>

          {/* Footer: Binance design.md spec (Surface Soft Light #fafafa, Hairline Light #eaecef, Vertical padding 64px, Muted #707a8a) */}
          <footer className="w-full bg-[#fafafa] text-[#181a20] border-t border-[#eaecef] mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 flex flex-col md:flex-row items-center justify-between gap-8 text-[13px] text-[#707a8a]">
              {/* Brand & Mission Statement */}
              <div className="flex flex-col gap-1.5 text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-2">
                  <span className="font-extrabold tracking-tight text-base text-[#181a20]">
                    HOTSTOVE<span className="text-[#f0b90b]">.LEAGUE</span>
                  </span>
                  <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-[#f5f5f5] text-[#707a8a] border border-[#eaecef]">
                    TERMINAL
                  </span>
                </div>
                <p className="text-xs text-[#707a8a] max-w-md leading-relaxed">
                  Professional League of Legends Off-season Roster & Intelligence Terminal. Real-time verified rumors & official rosters across global leagues.
                </p>
              </div>

              {/* Leagues & Copyright */}
              <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 text-xs font-medium">
                <div className="flex items-center gap-4 text-[#181a20]">
                  <span className="hover:text-[#f0b90b] cursor-default transition-colors">LCK</span>
                  <span className="hover:text-[#f0b90b] cursor-default transition-colors">LPL</span>
                  <span className="hover:text-[#f0b90b] cursor-default transition-colors">LEC</span>
                  <span className="hover:text-[#f0b90b] cursor-default transition-colors">LCS</span>
                  <span className="hover:text-[#f0b90b] cursor-default transition-colors">LCP</span>
                  <span className="hover:text-[#f0b90b] cursor-default transition-colors">CBLOL</span>
                </div>
                <span className="hidden sm:inline text-[#cdd1d6]">|</span>
                <span className="text-[#707a8a]">HotStoveLeague © 2026. All rights reserved.</span>
              </div>
            </div>
          </footer>
        </LanguageProvider>
      </body>
    </html>
  );
}
