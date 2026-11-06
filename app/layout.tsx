import { LanguageProvider } from "@/components/language-provider";
import Navbar from "@/components/Navbar";
import { GeistSans } from "geist/font/sans";
import "./globals.css";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "HotStoveLeague • LoL 2026/27 Transfer Terminal",
  description: "Real-time AI transfer predictions, official rosters and insider rumors for LCK, LPL, LEC, LCS",
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

          {/* Light-gray Footer Inversion on Dark Canvas (Exact Binance design.md spec) */}
          <footer className="w-full bg-[#fafafa] text-[#181a20] border-t border-[#eaecef] mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-[#707a8a]">
              <div className="flex flex-col gap-1 text-center sm:text-left">
                <span className="font-extrabold tracking-tight text-sm text-[#181a20]">
                  HOTSTOVE<span className="text-[#f0b90b]">.LEAGUE</span>
                </span>
                <p className="text-[11px] text-[#707a8a]">
                  Professional League of Legends Off-season Roster & Intelligence Terminal
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-6 font-medium text-[#181a20]">
                <span>LCK</span>
                <span>LPL</span>
                <span>LEC</span>
                <span>LCS</span>
                <span className="text-[#707a8a]">|</span>
                <span className="text-[#707a8a]">HotStoveLeague © 2026</span>
              </div>
            </div>
          </footer>
        </LanguageProvider>
      </body>
    </html>
  );
}
