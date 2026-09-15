import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Golos_Text, Playfair_Display } from "next/font/google";
import "./globals.css";

const display = Playfair_Display({
  subsets: ["latin", "cyrillic"],
  variable: "--font-display",
  weight: ["500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
});

const sans = Golos_Text({
  subsets: ["latin", "cyrillic"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title:
    "Присвоить звание Героя России Кривоусову Н. А. — народная петиция | ГОЛОС",
  description:
    "Народная петиция о присвоении звания Героя Российской Федерации Кривоусову Николаю Александровичу. Подпишите и поделитесь — каждая подпись приближает решение.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ru" className={`${display.variable} ${sans.variable}`}>
      <body className="grain bg-paper font-[family-name:var(--font-sans)] text-ink antialiased">
        {children}
      </body>
    </html>
  );
}
