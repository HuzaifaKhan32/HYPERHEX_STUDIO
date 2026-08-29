import type { Metadata } from "next";
import { Syne, Hanken_Grotesk, JetBrains_Mono, DM_Sans } from "next/font/google";
import "@fontsource-variable/zalando-sans-expanded/wght.css";
import "./globals.css";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "500", "700", "800"],
});

const hankenGrotesk = Hanken_Grotesk({
  variable: "--font-hanken",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "HyperHex Studio — Modern Agency",
  description: "Building stunning websites that every shot drives income forwards.",
};

import { ThemeProvider } from "../components/ThemeProvider";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`light ${syne.variable} ${hankenGrotesk.variable} ${jetbrainsMono.variable} ${dmSans.variable}`}>
      <body className="antialiased" style={{ fontFamily: 'var(--font-dm-sans)' }}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
