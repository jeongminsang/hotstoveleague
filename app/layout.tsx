import { LanguageProvider } from "@/components/language-provider";
import Navbar from "@/components/Navbar";
import { GeistSans } from "geist/font/sans";
import "./globals.css";

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
              <Navbar />
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
