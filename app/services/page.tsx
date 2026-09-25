import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import NavbarServer from '@/components/NavbarServer';
import FooterServer from '@/components/FooterServer';
import SectionPill from '@/components/ui/SectionPill';
import Button3D from '@/components/Button3D';
import { SERVICES } from '@/lib/content-data';
import { SITE_CONFIG } from '@/lib/site-config';

import ToolsAndTechSection from '@/components/ToolsAndTechSection';
import OurProcessSection from '@/components/OurProcessSection';
import ContactPreHeaderBanner from '@/components/ContactPreHeaderBanner';

const ContactForm = dynamic(() => import('@/components/ContactForm'), {
  loading: () => (
    <div className="w-full py-24 bg-surface flex items-center justify-center min-h-[400px]">
      <div className="w-8 h-8 rounded-full border-2 border-accent border-t-transparent animate-spin" />
    </div>
  ),
});

export const metadata: Metadata = {
  title: 'Our Services | HyperHex Studio',
  description: 'Explore our 9 core 3D visualization, real-time product configuration, web development, and digital media service capabilities.',
  alternates: {
    canonical: `${SITE_CONFIG.url}/services`,
  },
  openGraph: {
    title: 'Our Services | HyperHex Studio',
    description: 'Explore our 9 core 3D visualization, real-time product configuration, web development, and digital media service capabilities.',
    url: `${SITE_CONFIG.url}/services`,
  },
};

const skeuomorphicCardStyle = {
  backgroundColor: 'rgb(244, 244, 245)',
  borderRadius: '24px',
  boxShadow:
    'rgba(255, 255, 255, 0.6) 0px 4px 0px 0px inset, rgba(0, 0, 0, 0.05) 0px -8px 0px 0px inset, rgba(0, 0, 0, 0.1) 0px 3px 3px 0px, rgba(0, 0, 0, 0.06) 0px 7.77px 16px 0px',
};

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <NavbarServer />

      <main className="w-full pt-32 md:pt-40 pb-16 md:pb-24">
        <div className="px-4 sm:px-6 md:px-12 max-w-7xl mx-auto">
        {/* Header section */}
        <header className="mb-10 text-left max-w-3xl">
          <SectionPill label="Capabilities & Disciplines" className="mb-3" />
          <h1
            className="text-4xl md:text-6xl lg:text-7xl font-black text-foreground tracking-tight leading-tight"
            style={{ fontFamily: 'var(--font-zalando-expanded, sans-serif)' }}
          >
            Engineered Visual <span className="text-[#15b6e8]">Capabilities</span>
          </h1>
          <p className="mt-3 text-muted-foreground text-base md:text-lg leading-relaxed">
            From photorealistic 3D architectural rendering and interactive WebGL engines to high-converting commercial media — explore our end-to-end digital production disciplines.
          </p>
        </header>

        {/* Services Grid (Compact cards to fit row in frame) */}
        <section aria-label="Services List" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service) => (
            <article
              key={service.id}
              className="group relative flex flex-col justify-between p-5 transition-transform duration-200 hover:-translate-y-1 text-[#161d1e]"
              style={skeuomorphicCardStyle}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <SectionPill label={service.counter} />
                </div>

                <div className="relative w-full h-32 mb-4 overflow-hidden rounded-xl bg-white/70 shadow-inner">
                  <Image
                    src={service.imageSrc}
                    alt={service.title}
                    fill
                    className="object-contain p-2.5 transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                <h2
                  className="text-xl font-bold text-[#161d1e] mb-2 group-hover:text-[#15b6e8] transition-colors"
                  style={{ fontFamily: 'var(--font-zalando-expanded, sans-serif)' }}
                >
                  {service.title}
                </h2>

                <p className="text-xs text-[#3b494c] leading-relaxed mb-4 line-clamp-2 font-medium">
                  {service.description}
                </p>

                {/* Capabilities snippet */}
                <div className="space-y-1.5 mb-5">
                  {service.capabilities.slice(0, 3).map((cap, i) => (
                    <div key={i} className="flex items-center text-xs font-semibold text-[#161d1e]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#15b6e8] mr-2 shrink-0 shadow-[0_0_6px_#15b6e8]" />
                      <span className="truncate">{cap}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-2">
                <Button3D href={`/services/${service.slug}`} className="w-full justify-center">
                  Explore Discipline
                </Button3D>
              </div>
            </article>
          ))}
        </section>
        </div>

        {/* Tools & Technologies Section */}
        <ToolsAndTechSection />

        {/* Our Process Section */}
        <OurProcessSection />

        <ContactPreHeaderBanner />
        <ContactForm />
      </main>

      <FooterServer />
    </div>
  );
}
