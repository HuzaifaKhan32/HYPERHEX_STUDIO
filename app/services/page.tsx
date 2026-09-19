import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import NavbarServer from '@/components/NavbarServer';
import FooterServer from '@/components/FooterServer';
import { SERVICES } from '@/lib/content-data';
import { SITE_CONFIG } from '@/lib/site-config';

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

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-[#0b0f10] text-[#e0f7fa]">
      <NavbarServer />
      
      <main className="w-full pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto">
        {/* Header section */}
        <header className="mb-16 text-left max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#15b6e8]/30 bg-[#15b6e8]/10 px-4 py-2 text-xs font-semibold text-[#15b6e8] mb-4">
            Capabilities & Disciplines
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tight leading-tight">
            Engineered Visual <span className="text-[#15b6e8]">Capabilities</span>
          </h1>
          <p className="mt-4 text-[#a0b0b5] text-lg leading-relaxed">
            From photorealistic 3D architectural rendering and interactive WebGL engines to high-converting commercial media — explore our end-to-end digital production disciplines.
          </p>
        </header>

        {/* Services Grid */}
        <section aria-label="Services List" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((service) => (
            <article
              key={service.id}
              className="group relative flex flex-col justify-between rounded-2xl border border-white/10 bg-[#12181a] p-6 transition-all duration-300 hover:border-[#15b6e8]/50 hover:bg-[#162023] hover:shadow-[0_0_30px_rgba(21,182,232,0.15)]"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold tracking-widest text-[#15b6e8]">
                    {service.counter}
                  </span>
                </div>
                <div className="relative w-full h-48 mb-6 overflow-hidden rounded-xl bg-[#0b0f10]">
                  <Image
                    src={service.imageSrc}
                    alt={service.title}
                    fill
                    className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <h2 className="text-2xl font-bold text-white mb-3 group-hover:text-[#15b6e8] transition-colors">
                  {service.title}
                </h2>
                <p className="text-sm text-[#a0b0b5] leading-relaxed mb-6">
                  {service.description}
                </p>

                {/* Capabilities snippet */}
                <div className="space-y-1.5 mb-6">
                  {service.capabilities.slice(0, 3).map((cap, i) => (
                    <div key={i} className="flex items-center text-xs text-[#80959c]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#15b6e8] mr-2" />
                      {cap}
                    </div>
                  ))}
                </div>
              </div>

              <Link
                href={`/services/${service.slug}`}
                className="inline-flex items-center justify-between w-full py-3 px-4 rounded-xl border border-white/10 bg-white/5 text-xs font-semibold text-white transition-all group-hover:border-[#15b6e8] group-hover:bg-[#15b6e8] group-hover:text-[#0b0f10]"
              >
                <span>Explore Discipline</span>
                <span>→</span>
              </Link>
            </article>
          ))}
        </section>
      </main>

      <FooterServer />
    </div>
  );
}
