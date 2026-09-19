import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import NavbarServer from '@/components/NavbarServer';
import FooterServer from '@/components/FooterServer';
import { SERVICES, getServiceBySlug, getProjectsByService } from '@/lib/content-data';
import { SITE_CONFIG } from '@/lib/site-config';

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return SERVICES.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    return {
      title: 'Service Not Found',
    };
  }

  const pageUrl = `${SITE_CONFIG.url}/services/${service.slug}`;

  return {
    title: `${service.title} | Services | HyperHex Studio`,
    description: service.description,
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: `${service.title} — HyperHex Studio`,
      description: service.description,
      url: pageUrl,
      images: [
        {
          url: service.imageSrc,
          alt: service.title,
        },
      ],
    },
  };
}

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  const relatedProjects = getProjectsByService(service.id);
  const currentIndex = SERVICES.findIndex((s) => s.id === service.id);
  const nextService = SERVICES[(currentIndex + 1) % SERVICES.length];
  const prevService = SERVICES[(currentIndex - 1 + SERVICES.length) % SERVICES.length];

  return (
    <div className="min-h-screen bg-[#0b0f10] text-[#e0f7fa]">
      <NavbarServer />

      <main className="w-full pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto space-y-24">
        {/* Service Hero Section */}
        <section aria-label="Service Hero" className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#15b6e8]/30 bg-[#15b6e8]/10 px-4 py-2 text-xs font-semibold text-[#15b6e8]">
              Discipline {service.counter}
            </div>

            <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight leading-tight">
              {service.title}
            </h1>

            <p className="text-lg md:text-xl text-[#a0b0b5] leading-relaxed">
              {service.longDescription}
            </p>

            <div className="pt-4 flex flex-wrap gap-4">
              <Link
                href="/#contact"
                className="px-8 py-4 rounded-full bg-[#15b6e8] text-[#0b0f10] font-bold text-sm transition-transform hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(21,182,232,0.4)]"
              >
                Initiate Project Brief
              </Link>
              <Link
                href="/services"
                className="px-8 py-4 rounded-full border border-white/20 bg-white/5 text-white font-semibold text-sm transition-colors hover:bg-white/10"
              >
                All Capabilities
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md aspect-square rounded-3xl border border-white/10 bg-[#12181a] p-8 shadow-[0_0_50px_rgba(21,182,232,0.1)] flex items-center justify-center">
              <Image
                src={service.imageSrc}
                alt={service.title}
                width={360}
                height={360}
                className="object-contain filter drop-shadow-[0_10px_25px_rgba(21,182,232,0.2)]"
                priority
              />
            </div>
          </div>
        </section>

        {/* Core Capabilities */}
        <section aria-label="Capabilities" className="border-t border-white/10 pt-16">
          <div className="max-w-3xl mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Core Deliverables & Specifications</h2>
            <p className="text-[#a0b0b5] text-sm">
              Tailored capabilities engineered to exceed commercial standards and client performance targets.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {service.capabilities.map((cap, i) => (
              <div
                key={i}
                className="p-6 rounded-xl border border-white/10 bg-[#12181a] space-y-3 transition-colors hover:border-[#15b6e8]/40"
              >
                <div className="w-8 h-8 rounded-lg bg-[#15b6e8]/20 border border-[#15b6e8]/40 flex items-center justify-center text-[#15b6e8] font-bold text-xs">
                  0{i + 1}
                </div>
                <h3 className="text-lg font-semibold text-white">{cap}</h3>
              </div>
            ))}
          </div>
        </section>

        {/* Service Related Projects */}
        <section aria-label="Related Projects" className="border-t border-white/10 pt-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <div className="text-xs font-semibold text-[#15b6e8] tracking-wider uppercase mb-2">
                Portfolio Showcase
              </div>
              <h2 className="text-3xl font-bold text-white">Featured Projects</h2>
            </div>
            <Link
              href="/projects"
              className="text-sm font-semibold text-[#15b6e8] hover:underline inline-flex items-center gap-2"
            >
              View All Projects →
            </Link>
          </div>

          {relatedProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedProjects.map((project) => (
                <article
                  key={project.id}
                  className="group rounded-2xl border border-white/10 bg-[#12181a] overflow-hidden transition-all duration-300 hover:border-[#15b6e8]/40 hover:bg-[#162023]"
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

                  <div className="p-6 space-y-3">
                    <span className="text-xs font-semibold text-[#15b6e8]">
                      {Array.isArray(project.category) ? project.category.join(' • ') : project.category}
                    </span>
                    <h3 className="text-xl font-bold text-white group-hover:text-[#15b6e8] transition-colors">
                      <Link href={`/projects/${project.slug}`}>
                        {project.title}
                      </Link>
                    </h3>
                    <p className="text-xs text-[#a0b0b5] line-clamp-2">
                      {project.description}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="p-8 rounded-xl border border-white/10 bg-[#12181a] text-center text-[#a0b0b5] text-sm">
              Additional project case studies for this discipline are being prepared.
            </div>
          )}
        </section>

        {/* Adjacent Navigation */}
        <section aria-label="Discipline Navigation" className="border-t border-white/10 pt-12 flex justify-between items-center text-sm">
          <Link
            href={`/services/${prevService.slug}`}
            className="flex items-center gap-3 text-[#a0b0b5] hover:text-[#15b6e8] transition-colors"
          >
            <span>←</span>
            <div className="text-left">
              <div className="text-[10px] text-[#60757c] uppercase">Previous</div>
              <div className="font-semibold text-white">{prevService.title}</div>
            </div>
          </Link>

          <Link
            href={`/services/${nextService.slug}`}
            className="flex items-center gap-3 text-[#a0b0b5] hover:text-[#15b6e8] transition-colors text-right"
          >
            <div className="text-right">
              <div className="text-[10px] text-[#60757c] uppercase">Next</div>
              <div className="font-semibold text-white">{nextService.title}</div>
            </div>
            <span>→</span>
          </Link>
        </section>
      </main>

      <FooterServer />
    </div>
  );
}
