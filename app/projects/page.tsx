import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import NavbarServer from '@/components/NavbarServer';
import FooterServer from '@/components/FooterServer';
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

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-[#0b0f10] text-[#e0f7fa]">
      <NavbarServer />

      <main className="w-full pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto">
        <header className="mb-16 text-left max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#15b6e8]/30 bg-[#15b6e8]/10 px-4 py-2 text-xs font-semibold text-[#15b6e8] mb-4">
            Curated Works
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tight leading-tight">
            Selected <span className="text-[#15b6e8]">Projects</span> & Showcase
          </h1>
          <p className="mt-4 text-[#a0b0b5] text-lg leading-relaxed">
            A comprehensive record of photorealistic architectural visualisations, 3D commercial animations, WebGL engines, and interactive web applications built for industry leaders.
          </p>
        </header>

        <section aria-label="Projects Grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PROJECTS.map((project) => (
            <article
              key={project.id}
              className="group rounded-2xl border border-white/10 bg-[#12181a] overflow-hidden transition-all duration-300 hover:border-[#15b6e8]/50 hover:bg-[#162023] hover:shadow-[0_0_30px_rgba(21,182,232,0.15)]"
            >
              <Link href={`/projects/${project.slug}`} className="block relative aspect-video bg-[#0b0f10]">
                <Image
                  src={project.imageUrl}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {project.isVideo && (
                  <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-[10px] font-bold text-white border border-white/20">
                    VIDEO
                  </div>
                )}
              </Link>

              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-[#15b6e8]">
                    {Array.isArray(project.category) ? project.category.join(' • ') : project.category}
                  </span>
                  <span className="text-[#60757c]">{project.brand}</span>
                </div>

                <h2 className="text-xl font-bold text-white group-hover:text-[#15b6e8] transition-colors">
                  <Link href={`/projects/${project.slug}`}>
                    {project.title}
                  </Link>
                </h2>

                <p className="text-xs text-[#a0b0b5] line-clamp-2 leading-relaxed">
                  {project.description}
                </p>

                <div className="pt-2 flex items-center justify-between border-t border-white/5 text-xs text-[#80959c]">
                  <span>Explore Case Study</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>
            </article>
          ))}
        </section>
      </main>

      <FooterServer />
    </div>
  );
}
