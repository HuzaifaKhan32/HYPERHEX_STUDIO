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
