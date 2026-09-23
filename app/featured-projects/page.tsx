import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import NavbarServer from '@/components/NavbarServer';
import FooterServer from '@/components/FooterServer';
import SectionPill from '@/components/ui/SectionPill';
import Button3D from '@/components/Button3D';
import { MAIN_CASE_STUDIES, SUB_CASE_STUDIES } from '@/lib/case-studies-data';
import { SITE_CONFIG } from '@/lib/site-config';

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

      <main className="w-full pt-32 md:pt-40 pb-16 md:pb-24 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto">
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
        <header className="mb-12 text-left max-w-3xl">
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

        {/* Featured Projects Grid */}
        <section aria-label="Featured Projects List" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allFeatured.map((item) => (
            <article
              key={item.id}
              className="group flex flex-col justify-between p-5 transition-transform duration-200 hover:-translate-y-1 text-[#161d1e]"
              style={skeuomorphicCardStyle}
            >
              <div>
                <div className="relative w-full aspect-video mb-4 overflow-hidden rounded-xl bg-white/70 shadow-inner">
                  <Image
                    src={item.thumbnail}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {item.isVideo && (
                    <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md text-[10px] font-bold text-white flex items-center gap-1.5">
                      <svg className="w-2.5 h-2.5 fill-white" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                      VIDEO
                    </div>
                  )}
                </div>

                <div className="space-y-2 mb-4">
                  <SectionPill label={item.category} />

                  <h2
                    className="text-lg font-bold text-[#161d1e] group-hover:text-[#15b6e8] transition-colors mt-2"
                    style={{ fontFamily: 'var(--font-zalando-expanded, sans-serif)' }}
                  >
                    {item.title}
                  </h2>
                </div>
              </div>

              <div className="pt-2 flex gap-3">
                <Button3D href={`/projects`} className="w-full justify-center">
                  Watch Project
                </Button3D>
              </div>
            </article>
          ))}
        </section>
      </main>

      <FooterServer />
    </div>
  );
}
