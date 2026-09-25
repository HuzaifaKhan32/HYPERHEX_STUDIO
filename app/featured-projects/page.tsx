import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import NavbarServer from '@/components/NavbarServer';
import FooterServer from '@/components/FooterServer';
import SectionPill from '@/components/ui/SectionPill';
import Button3D from '@/components/Button3D';
import { MAIN_CASE_STUDIES, SUB_CASE_STUDIES } from '@/lib/case-studies-data';
import { SITE_CONFIG } from '@/lib/site-config';

import ContactPreHeaderBanner from '@/components/ContactPreHeaderBanner';

const FeaturedProjectsSubSlider = dynamic(() => import('@/components/FeaturedProjectsSubSlider'), {
  loading: () => (
    <div className="w-full py-12 bg-surface flex items-center justify-center min-h-[240px]">
      <div className="w-8 h-8 rounded-full border-2 border-accent border-t-transparent animate-spin" />
    </div>
  ),
});

const LatestWorkGallery = dynamic(() => import('@/components/LatestWorkGallery'), {
  loading: () => (
    <div className="w-full py-24 bg-surface flex items-center justify-center min-h-[400px]">
      <div className="w-8 h-8 rounded-full border-2 border-accent border-t-transparent animate-spin" />
    </div>
  ),
});

const ContactForm = dynamic(() => import('@/components/ContactForm'), {
  loading: () => (
    <div className="w-full py-24 bg-surface flex items-center justify-center min-h-[400px]">
      <div className="w-8 h-8 rounded-full border-2 border-accent border-t-transparent animate-spin" />
    </div>
  ),
});

export const metadata: Metadata = {
  title: 'Featured Projects | HyperHex Studio',
  description: 'Curated 3D architectural visualisations, high-impact commercial video productions, WebGL experiences, and spatial animations by HyperHex Studio.',
  alternates: {
    canonical: `${SITE_CONFIG.url}/featured-projects`,
  },
  openGraph: {
    title: 'Featured Projects | HyperHex Studio',
    description: 'Curated 3D architectural visualisations, high-impact commercial video productions, WebGL experiences, and spatial animations.',
    url: `${SITE_CONFIG.url}/featured-projects`,
  },
};

const skeuomorphicCardStyle = {
  backgroundColor: 'rgb(244, 244, 245)',
  borderRadius: '24px',
  boxShadow:
    'rgba(255, 255, 255, 0.6) 0px 4px 0px 0px inset, rgba(0, 0, 0, 0.05) 0px -8px 0px 0px inset, rgba(0, 0, 0, 0.1) 0px 3px 3px 0px, rgba(0, 0, 0, 0.06) 0px 7.77px 16px 0px',
};

export default function FeaturedProjectsPage() {
  const allFeatured = [...MAIN_CASE_STUDIES, ...SUB_CASE_STUDIES];

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <NavbarServer />

      <main className="w-full pt-32 md:pt-40 pb-16 md:pb-24">
        {/* Top Header & Breadcrumb Container */}
        <div className="px-4 sm:px-6 md:px-12 max-w-7xl mx-auto">
          {/* Top Breadcrumb */}
          <div className="mb-6 flex items-center justify-between">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#15b6e8] hover:text-[#0c86ac] transition-colors group"
            >
              <span className="transition-transform group-hover:-translate-x-1">←</span>
              <span>Back to Home</span>
            </Link>
            <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest">
              Portfolio Showcase
            </span>
          </div>

          {/* Header section */}
          <header className="mb-10 text-left max-w-3xl">
            <SectionPill label="Featured Projects" className="mb-3" />
            <h1
              className="text-4xl md:text-6xl lg:text-7xl font-black text-foreground tracking-tight leading-tight"
              style={{ fontFamily: 'var(--font-zalando-expanded, sans-serif)' }}
            >
              Featured <span className="text-[#15b6e8]">Projects</span>
            </h1>
            <p className="mt-3 text-muted-foreground text-base md:text-lg leading-relaxed">
              Curated 3D architectural visualisations, high-impact commercial video productions, WebGL experiences, and spatial animations engineered for global brands.
            </p>
          </header>
        </div>

        {/* Featured Projects Sub Slider (Infinite Marquee Slider for All Featured Projects) */}
        <section aria-label="Featured Projects Sub Slider" className="w-full mb-12 md:mb-16">
          <FeaturedProjectsSubSlider />
        </section>

        {/* Latest Work Section */}
        <section aria-label="Latest Work Section" className="w-full mb-16">
          <LatestWorkGallery />
        </section>

        {/* Contact Pre-Header Banner */}
        <ContactPreHeaderBanner />

        {/* Contact Form Section */}
        <ContactForm />
      </main>

      <FooterServer />
    </div>
  );
}
