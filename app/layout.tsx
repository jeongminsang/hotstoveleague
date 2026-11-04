import { ThemeSwitcher } from "@/components/theme-switcher";
import { LanguageSwitcher } from "@/components/language-switcher";
import { LanguageProvider } from "@/components/language-provider";
import { GeistSans } from "geist/font/sans";
import { ThemeProvider } from "@/components/theme-provider";
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
    <html lang="en" className={GeistSans.className} suppressHydrationWarning>
      <body className="bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <LanguageProvider>
            <main className="min-h-screen flex flex-col items-center">
              <div className="flex-1 w-full flex flex-col items-center">
                <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
                  <div className="w-full max-w-5xl flex justify-between items-center p-3 px-5 text-sm">
                    <div className="flex gap-5 items-center font-semibold">
                      <Button size="sm" variant={"outline"} asChild>
                        <Link href="/" className="font-extrabold tracking-tight">
                          🔥 HotStoveLeague
                        </Link>
                      </Button>
                    </div>
                    <div className="flex items-center gap-2 sm:gap-3">
                      <LanguageSwitcher />
                      <ThemeSwitcher />
                    </div>
                  </div>
                </nav>
                <div className="flex flex-col gap-20 w-full p-5 flex-center">
                  {children}
                </div>

                <footer className="w-full flex items-center justify-center border-t mx-auto text-center text-xs gap-8 py-16 text-muted-foreground">
                  <p>HotStoveLeague © 2026 • LCK Transfer Predictions</p>
                </footer>
              </div>
            </main>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
