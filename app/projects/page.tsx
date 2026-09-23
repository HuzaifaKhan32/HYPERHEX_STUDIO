import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import NavbarServer from '@/components/NavbarServer';
import FooterServer from '@/components/FooterServer';
import SectionPill from '@/components/ui/SectionPill';
import Button3D from '@/components/Button3D';
import { PROJECTS } from '@/lib/content-data';
import { SITE_CONFIG } from '@/lib/site-config';

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

const skeuomorphicCardStyle = {
  backgroundColor: 'rgb(244, 244, 245)',
  borderRadius: '24px',
  boxShadow:
    'rgba(255, 255, 255, 0.6) 0px 4px 0px 0px inset, rgba(0, 0, 0, 0.05) 0px -8px 0px 0px inset, rgba(0, 0, 0, 0.1) 0px 3px 3px 0px, rgba(0, 0, 0, 0.06) 0px 7.77px 16px 0px',
};

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <NavbarServer />

      <main className="w-full pt-32 md:pt-40 pb-16 md:pb-24 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto">
        <header className="mb-12 text-left max-w-3xl">
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

        <section aria-label="Projects Grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROJECTS.map((project) => (
            <article
              key={project.id}
              className="group flex flex-col justify-between p-5 transition-transform duration-200 hover:-translate-y-1 text-[#161d1e]"
              style={skeuomorphicCardStyle}
            >
              <div>
                <Link href={`/projects/${project.slug}`} className="block relative aspect-video bg-white/60 rounded-xl overflow-hidden mb-4">
                  <Image
                    src={project.imageUrl}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {project.isVideo && (
                    <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md text-[10px] font-bold text-white">
                      VIDEO
                    </div>
                  )}
                </Link>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-[#15b6e8]">
                      {Array.isArray(project.category) ? project.category.join(' • ') : project.category}
                    </span>
                    <span className="text-[#3b494c] font-semibold">{project.brand}</span>
                  </div>

                  <h2
                    className="text-lg font-bold text-[#161d1e] group-hover:text-[#15b6e8] transition-colors"
                    style={{ fontFamily: 'var(--font-zalando-expanded, sans-serif)' }}
                  >
                    <Link href={`/projects/${project.slug}`}>
                      {project.title}
                    </Link>
                  </h2>

                  <p className="text-xs text-[#3b494c] line-clamp-2 leading-relaxed font-medium">
                    {project.description}
                  </p>
                </div>
              </div>

              <div className="pt-2">
                <Button3D href={`/projects/${project.slug}`} className="w-full justify-center">
                  Explore Case Study
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
