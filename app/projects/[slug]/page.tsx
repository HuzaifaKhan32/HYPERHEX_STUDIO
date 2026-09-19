import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import NavbarServer from '@/components/NavbarServer';
import FooterServer from '@/components/FooterServer';
import { PROJECTS, SERVICES, getProjectBySlug } from '@/lib/content-data';
import { SITE_CONFIG } from '@/lib/site-config';

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return PROJECTS.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: 'Project Not Found',
    };
  }

  const pageUrl = `${SITE_CONFIG.url}/projects/${project.slug}`;

  return {
    title: `${project.title} | Case Study | HyperHex Studio`,
    description: project.description || `Case study showcase for ${project.title} by HyperHex Studio.`,
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: `${project.title} — HyperHex Studio Case Study`,
      description: project.description || `Case study showcase for ${project.title}.`,
      url: pageUrl,
      images: [
        {
          url: project.imageUrl,
          alt: project.title,
        },
      ],
    },
  };
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  // Related projects in same category
  const relatedProjects = PROJECTS.filter(
    (p) => p.id !== project.id && (
      Array.isArray(p.category) && Array.isArray(project.category)
        ? p.category.some((c) => project.category.includes(c))
        : p.category === project.category
    )
  ).slice(0, 3);

  // Related services
  const relatedServices = SERVICES.filter((s) => project.serviceIds?.includes(s.id));

  return (
    <div className="min-h-screen bg-[#0b0f10] text-[#e0f7fa]">
      <NavbarServer />

      <main className="w-full pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto space-y-16">
        {/* Header & Meta */}
        <header className="max-w-4xl space-y-6">
          <div className="flex flex-wrap items-center gap-3 text-xs font-semibold text-[#15b6e8]">
            <Link href="/projects" className="hover:underline">Projects</Link>
            <span>/</span>
            <span className="text-[#a0b0b5]">
              {Array.isArray(project.category) ? project.category.join(' • ') : project.category}
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight leading-tight">
            {project.title}
          </h1>

          <p className="text-lg text-[#a0b0b5] leading-relaxed">
            {project.description}
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-6 border-t border-white/10 text-xs">
            <div>
              <span className="text-[#60757c] uppercase block mb-1">Brand / Client</span>
              <span className="font-semibold text-white">{project.brand}</span>
            </div>
            <div>
              <span className="text-[#60757c] uppercase block mb-1">Category</span>
              <span className="font-semibold text-white">
                {Array.isArray(project.category) ? project.category[0] : project.category}
              </span>
            </div>
            <div>
              <span className="text-[#60757c] uppercase block mb-1">Format</span>
              <span className="font-semibold text-[#15b6e8]">
                {project.isVideo ? 'Cinematic 3D Video' : '3D Render / Interactive'}
              </span>
            </div>
            <div>
              <span className="text-[#60757c] uppercase block mb-1">Status</span>
              <span className="font-semibold text-emerald-400">Production Complete</span>
            </div>
          </div>
        </header>

        {/* Media Player or Showcase Image */}
        <section aria-label="Media Showcase" className="w-full rounded-2xl border border-white/10 bg-[#12181a] overflow-hidden shadow-[0_0_50px_rgba(21,182,232,0.1)]">
          {project.isVideo && project.embedUrl ? (
            <div className="relative aspect-video w-full">
              <iframe
                src={project.embedUrl}
                title={project.title}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          ) : (
            <div className="relative aspect-video w-full">
              <Image
                src={project.imageUrl}
                alt={project.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}
        </section>

        {/* Gallery grid if available */}
        {project.gallery && project.gallery.length > 0 && (
          <section aria-label="Project Gallery" className="space-y-6 border-t border-white/10 pt-12">
            <h2 className="text-2xl font-bold text-white">Project Stills & Rendering Suite</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {project.gallery.map((img, i) => (
                <div key={i} className="relative aspect-video rounded-xl overflow-hidden border border-white/10 bg-[#0b0f10]">
                  <Image
                    src={img}
                    alt={`${project.title} Still ${i + 1}`}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Related Services */}
        {relatedServices.length > 0 && (
          <section aria-label="Related Services" className="border-t border-white/10 pt-12 space-y-6">
            <h2 className="text-2xl font-bold text-white">Disciplines & Services Applied</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedServices.map((service) => (
                <Link
                  key={service.id}
                  href={`/services/${service.slug}`}
                  className="p-6 rounded-xl border border-white/10 bg-[#12181a] flex items-center justify-between transition-colors hover:border-[#15b6e8]"
                >
                  <div>
                    <span className="text-xs text-[#15b6e8] font-bold">{service.counter}</span>
                    <h3 className="text-lg font-bold text-white">{service.title}</h3>
                    <p className="text-xs text-[#a0b0b5] mt-1">{service.description}</p>
                  </div>
                  <span className="text-[#15b6e8] text-xl">→</span>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Related Projects */}
        {relatedProjects.length > 0 && (
          <section aria-label="Related Case Studies" className="border-t border-white/10 pt-12 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">Related Case Studies</h2>
              <Link href="/projects" className="text-sm text-[#15b6e8] font-semibold hover:underline">
                View All →
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedProjects.map((rel) => (
                <article key={rel.id} className="group rounded-xl border border-white/10 bg-[#12181a] overflow-hidden">
                  <Link href={`/projects/${rel.slug}`} className="block relative aspect-video">
                    <Image src={rel.imageUrl} alt={rel.title} fill className="object-cover group-hover:scale-105 transition-transform" />
                  </Link>
                  <div className="p-4 space-y-2">
                    <h3 className="text-sm font-bold text-white group-hover:text-[#15b6e8]">
                      <Link href={`/projects/${rel.slug}`}>{rel.title}</Link>
                    </h3>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}
      </main>

      <FooterServer />
    </div>
  );
}
