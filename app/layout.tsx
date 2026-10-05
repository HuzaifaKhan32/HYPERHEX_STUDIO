import type { Metadata, Viewport } from "next";
import { Suspense } from "react";
import { DM_Sans } from "next/font/google";
import "@fontsource-variable/zalando-sans-expanded/wght.css";
import "./globals.css";
import { SITE_CONFIG } from "@/lib/site-config";
import CustomCursor from "@/components/CustomCursor";
import PageTransitionProvider from "@/components/PageTransition";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: 'swap',
  preload: true,
});

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: {
    default: "HyperHex Studio — Next-Gen 3D, Visualization & Interactive Digital Experiences",
    template: "%s | HyperHex Studio",
  },
  description: SITE_CONFIG.description,
  keywords: [
    "HyperHex Studio",
    "3D Architectural Visualization",
    "3D Product Configurator",
    "Real-Time 3D Engine",
    "Interactive Web Experiences",
    "VR Development",
    "Cinematic 3D Animation",
    "Web Development Agency",
  ],
  authors: [{ name: "HyperHex Studio", url: SITE_CONFIG.url }],
  creator: SITE_CONFIG.creator,
  publisher: "HyperHex Studio",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_CONFIG.url,
    title: "HyperHex Studio — Next-Gen 3D & Digital Experiences",
    description: SITE_CONFIG.description,
    siteName: SITE_CONFIG.name,
    images: [
      {
        url: SITE_CONFIG.ogImage,
        width: 1200,
        height: 630,
        alt: "HyperHex Studio Showcase",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "HyperHex Studio — Next-Gen 3D & Digital Experiences",
    description: SITE_CONFIG.description,
    images: [SITE_CONFIG.ogImage],
    creator: "@hyperhexstudio",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/hyperhex-logo.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={dmSans.variable}>
      <head>
        {/* Preconnect to media domains for faster asset loading */}
        <link rel="preconnect" href="https://images.unsplash.com" crossOrigin="anonymous" />

        {/* Preload first hero thumbnail */}
        <link rel="preload" href="/media/hero-loop-4-thumbnail.webp" as="image" fetchPriority="high" />

        {/* DNS prefetch for YouTube */}
        <link rel="dns-prefetch" href="https://www.youtube.com" />

        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Organization",
                  "@id": `${SITE_CONFIG.url}/#organization`,
                  "name": SITE_CONFIG.name,
                  "url": SITE_CONFIG.url,
                  "logo": `${SITE_CONFIG.url}/hyperhex-logo.png`,
                  "description": SITE_CONFIG.description,
                  "sameAs": [
                    SITE_CONFIG.links.twitter,
                    SITE_CONFIG.links.github,
                  ]
                },
                {
                  "@type": "WebSite",
                  "@id": `${SITE_CONFIG.url}/#website`,
                  "url": SITE_CONFIG.url,
                  "name": SITE_CONFIG.name,
                  "publisher": {
                    "@id": `${SITE_CONFIG.url}/#organization`
                  }
                }
              ]
            }),
          }}
        />
      </head>
      <body suppressHydrationWarning className="antialiased relative bg-background text-foreground" style={{ fontFamily: 'var(--font-dm-sans)' }}>
        <CustomCursor />
        <Suspense fallback={null}>
          <PageTransitionProvider>{children}</PageTransitionProvider>
        </Suspense>
      </body>
    </html>
  );
}
