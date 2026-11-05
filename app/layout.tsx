import { LanguageSwitcher } from "@/components/language-switcher";
import { LanguageProvider } from "@/components/language-provider";
import { GeistSans } from "geist/font/sans";
import Link from "next/link";
import "./globals.css";
import { Button } from "@/components/ui/button";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "HotStoveLeague - 2026 LCK Stove League Tracker",
  description: "Real-time AI transfer predictions and insider rumors for LCK 2026",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={GeistSans.className}>
      <body className="bg-background text-foreground antialiased min-h-screen">
        <LanguageProvider>
          <main className="min-h-screen flex flex-col items-center">
            <div className="flex-1 w-full flex flex-col items-center">
              <nav className="w-full flex justify-center border-b border-border/40 h-16 bg-background/80 backdrop-blur sticky top-0 z-50">
                <div className="w-full max-w-5xl flex justify-between items-center p-3 px-5 text-sm">
                  <div className="flex gap-3 items-center font-semibold">
                    <Button size="sm" variant={"outline"} asChild>
                      <Link href="/" className="font-extrabold tracking-tight">
                        🔥 HotStoveLeague
                      </Link>
                    </Button>
                    <Button size="sm" variant={"ghost"} asChild>
                      <Link
                        href="/rumors"
                        className="font-bold tracking-tight text-amber-700 hover:text-amber-800 hover:bg-amber-500/10"
                      >
                        ⚡ 찌라시 리스트 (Rumors)
                      </Link>
                    </Button>
                  </div>
                  <div className="flex items-center">
                    <LanguageSwitcher />
                  </div>
                </div>
              </nav>
              <div className="flex flex-col gap-16 w-full p-5 max-w-5xl">
                {children}
              </div>

              <footer className="w-full flex items-center justify-center border-t mx-auto text-center text-xs gap-8 py-12 text-muted-foreground mt-auto">
                <p>HotStoveLeague © 2026 • LCK Transfer Predictions</p>
              </footer>
            </div>
          </main>
        </LanguageProvider>
      </body>
    </html>
  );
}
