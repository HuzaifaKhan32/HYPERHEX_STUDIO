import { Metadata } from 'next';
import Link from 'next/link';
import NavbarServer from '@/components/NavbarServer';
import FooterServer from '@/components/FooterServer';
import ContactForm from '@/components/ContactForm';
import SectionPill from '@/components/ui/SectionPill';
import { SITE_CONFIG } from '@/lib/site-config';

export const metadata: Metadata = {
  title: 'Contact Us | HyperHex Studio',
  description: 'Get in touch with HyperHex Studio for 3D architectural visualization, real-time product configurators, web development, and digital media inquiries.',
  alternates: {
    canonical: `${SITE_CONFIG.url}/contact`,
  },
  openGraph: {
    title: 'Contact Us | HyperHex Studio',
    description: 'Get in touch with HyperHex Studio for 3D architectural visualization, real-time product configurators, web development, and digital media inquiries.',
    url: `${SITE_CONFIG.url}/contact`,
  },
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <NavbarServer />

      <main className="w-full pt-32 md:pt-40 pb-16 md:pb-24 max-w-7xl mx-auto">
        {/* Top Breadcrumb Container */}
        <div className="px-4 sm:px-6 md:px-12 mb-6 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#15b6e8] hover:text-[#0c86ac] transition-colors group"
          >
            <span className="transition-transform group-hover:-translate-x-1">←</span>
            <span>Back to Home</span>
          </Link>
          <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest">
            Project Inquiries
          </span>
        </div>

        {/* Header section */}
        <header className="px-4 sm:px-6 md:px-12 mb-8 text-left max-w-3xl">
          <SectionPill label="Get In Touch" className="mb-3" />
          <h1
            className="text-4xl md:text-6xl lg:text-7xl font-black text-foreground tracking-tight leading-tight"
            style={{ fontFamily: 'var(--font-zalando-expanded, sans-serif)' }}
          >
            Let&apos;s Build Something <span className="text-[#15b6e8]">Extraordinary</span>
          </h1>
          <p className="mt-3 text-muted-foreground text-base md:text-lg leading-relaxed">
            Have a project brief, spatial visualization inquiry, or WebGL configurator requirement? Send us a message or reach out to our team directly.
          </p>
        </header>

        {/* Contact Form Section Component */}
        <ContactForm />
      </main>

      <FooterServer />
    </div>
  );
}
