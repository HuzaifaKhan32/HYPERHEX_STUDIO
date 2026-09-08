import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "@fontsource-variable/zalando-sans-expanded/wght.css";
import "./globals.css";

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
import CustomCursor from "@/components/CustomCursor";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`light ${dmSans.variable}`}>
      <head>
        {/* FIXED: Preconnect to media domains for faster image loading */}
        <link rel="preconnect" href="https://images.unsplash.com" crossOrigin="anonymous" />

        {/* Preload first hero carousel slide (fastest possible LCP) */}
        <link rel="preload" href="/media/hero-loop-4-thumbnail.webp" as="image" fetchPriority="high" />

        {/* ADDED: Preload client logos for faster marquee rendering */}
        <link rel="preload" href="/logos/client-1.svg" as="image" />
        <link rel="preload" href="/logos/client-2.svg" as="image" />
        <link rel="preload" href="/logos/client-3.svg" as="image" />
        <link rel="preload" href="/logos/client-4.svg" as="image" />
        <link rel="preload" href="/logos/client-5.svg" as="image" />

        {/* DNS prefetch for video assets */}
        <link rel="dns-prefetch" href="https://www.youtube.com" />
      </head>
      <body suppressHydrationWarning className="antialiased relative" style={{ fontFamily: 'var(--font-dm-sans)' }}>
        <ThemeProvider>
          {/* <AmbientCursorGlow /> */}
          <CustomCursor />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
