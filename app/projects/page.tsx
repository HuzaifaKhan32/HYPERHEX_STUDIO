import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import NavbarServer from '@/components/NavbarServer';
import FooterServer from '@/components/FooterServer';
import SectionPill from '@/components/ui/SectionPill';
import { SITE_CONFIG } from '@/lib/site-config';

import ContactPreHeaderBanner from '@/components/ContactPreHeaderBanner';

const ContactForm = dynamic(() => import('@/components/ContactForm'), {
  loading: () => (
    <div className="w-full py-24 bg-surface flex items-center justify-center min-h-[400px]">
      <div className="w-8 h-8 rounded-full border-2 border-accent border-t-transparent animate-spin" />
    </div>
  ),
});

export const metadata: Metadata = {
  title: 'Portfolio & Case Studies | HyperHex Studio',
  description: 'Explore our full portfolio of 3D visualization, architectural renders, commercial animations, WebGL configurators, and web apps.',
  alternates: {
    canonical: `${SITE_CONFIG.url}/projects`,
  },
  openGraph: {
    title: 'Portfolio & Case Studies | HyperHex Studio',
    description: 'Explore our full portfolio of 3D visualization, architectural renders, commercial animations, WebGL configurators, and web apps.',
    url: `${SITE_CONFIG.url}/projects`,
  },
};

const LatestWorkGallery = dynamic(() => import('@/components/LatestWorkGallery'), {
  loading: () => (
    <div className="w-full py-24 bg-surface flex items-center justify-center min-h-[400px]">
      <div className="w-8 h-8 rounded-full border-2 border-accent border-t-transparent animate-spin" />
    </div>
  ),
});

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-white text-foreground transition-colors duration-300">
      <NavbarServer />

      <main className="w-full pt-32 md:pt-40 pb-16 md:pb-24 bg-white">
        <div className="px-4 sm:px-6 md:px-12 max-w-7xl mx-auto mb-10">
          <header className="text-left max-w-3xl">
            <SectionPill label="Curated Works" className="mb-3" />
            <h1
              className="text-4xl md:text-6xl lg:text-7xl font-black text-foreground tracking-tight leading-tight"
              style={{ fontFamily: 'var(--font-zalando-expanded, sans-serif)' }}
            >
              Selected <span className="text-[#15b6e8]">Projects</span> &amp; Showcase
            </h1>
            <p className="mt-3 text-muted-foreground text-base md:text-lg leading-relaxed">
              A comprehensive record of photorealistic architectural visualisations, 3D commercial animations, WebGL engines, and interactive web applications built for industry leaders.
            </p>
          </header>
        </div>

        {/* Portfolio Showcase Grid (All projects on a single scrollable grid with white background & enlarged card styling) */}
        <section aria-label="Portfolio Showcase Gallery" className="w-full mb-12 bg-white">
          <LatestWorkGallery
            hideHeader={true}
            hideFilters={true}
            showAll={true}
            hidePagination={true}
            bgClass="bg-white"
            gridColsClass="grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8"
            cardAspectClass="aspect-[16/10] min-h-[260px] sm:min-h-[340px]"
          />
        </section>

        <ContactPreHeaderBanner />
        <ContactForm />
      </main>

      <FooterServer />
    </div>
  );
}
