import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import NavbarServer from '@/components/NavbarServer';
import FooterServer from '@/components/FooterServer';
import SectionPill from '@/components/ui/SectionPill';
import Button3D from '@/components/Button3D';
import { SERVICES, getServiceBySlug, getProjectsByService } from '@/lib/content-data';
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

const skeuomorphicCardStyle = {
  backgroundColor: 'rgb(244, 244, 245)',
  borderRadius: '24px',
  boxShadow:
    'rgba(255, 255, 255, 0.6) 0px 4px 0px 0px inset, rgba(0, 0, 0, 0.05) 0px -8px 0px 0px inset, rgba(0, 0, 0, 0.1) 0px 3px 3px 0px, rgba(0, 0, 0, 0.06) 0px 7.77px 16px 0px',
};

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
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <NavbarServer />

      <main className="w-full pt-32 md:pt-40 pb-20 md:pb-28">
        <div className="px-4 sm:px-6 md:px-12 max-w-7xl mx-auto space-y-16">
        {/* Service Hero Section */}
        <section aria-label="Service Hero" className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-6">
            <SectionPill label={`Discipline ${service.counter}`} />

            <h1
              className="text-4xl md:text-6xl font-black text-foreground tracking-tight leading-tight"
              style={{ fontFamily: 'var(--font-zalando-expanded, sans-serif)' }}
            >
              {service.title}
            </h1>

            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              {service.longDescription}
            </p>

            <div className="pt-2 flex flex-wrap gap-4 items-center">
              <Button3D href="/#contact">
                Initiate Project Brief
              </Button3D>
              <Button3D href="/services" variant="gray">
                All Capabilities
              </Button3D>
            </div>
          </div>

          <div className="lg:col-span-5 flex justify-center">
            <div
              className="relative w-full max-w-md aspect-square p-6 flex items-center justify-center"
              style={skeuomorphicCardStyle}
            >
              <Image
                src={service.imageSrc}
                alt={service.title}
                width={320}
                height={320}
                className="object-contain filter drop-shadow-[0_10px_25px_rgba(21,182,232,0.2)]"
                priority
              />
            </div>
          </div>
        </section>

        {/* Core Capabilities */}
        <section aria-label="Capabilities" className="border-t border-border/40 pt-14">
          <div className="max-w-3xl mb-10">
            <SectionPill label="Specifications" className="mb-3" />
            <h2
              className="text-3xl font-bold text-foreground mb-3"
              style={{ fontFamily: 'var(--font-zalando-expanded, sans-serif)' }}
            >
              Core Deliverables &amp; Specifications
            </h2>
            <p className="text-muted-foreground text-sm">
              Tailored capabilities engineered to exceed commercial standards and client performance targets.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {service.capabilities.map((cap, i) => (
              <div
                key={i}
                className="p-5 space-y-3 text-[#161d1e] transition-transform duration-200 hover:-translate-y-1"
                style={skeuomorphicCardStyle}
              >
                <SectionPill label={`0${i + 1}`} />
                <h3 className="text-base font-bold text-[#161d1e]">{cap}</h3>
              </div>
            ))}
          </div>
        </section>

        {/* Service Related Projects */}
        <section aria-label="Related Projects" className="border-t border-border/40 pt-14">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <SectionPill label="Portfolio Showcase" className="mb-3" />
              <h2
                className="text-3xl font-bold text-foreground"
                style={{ fontFamily: 'var(--font-zalando-expanded, sans-serif)' }}
              >
                Featured Projects
              </h2>
            </div>
            <Link
              href="/projects"
              className="text-sm font-semibold text-[#15b6e8] hover:underline inline-flex items-center gap-2"
            >
              View All Projects →
            </Link>
          </div>

          {relatedProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProjects.map((project) => (
                <article
                  key={project.id}
                  className="group overflow-hidden transition-all duration-200 hover:-translate-y-1"
                  style={skeuomorphicCardStyle}
                >
                  <Link href={`/projects/${project.slug}`} className="block relative aspect-video bg-white/60">
                    <Image
                      src={project.imageUrl}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {project.isVideo && (
                      <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-[10px] font-bold text-white">
                        VIDEO
                      </div>
                    )}
                  </Link>

                  <div className="p-5 space-y-3">
                    <span className="text-xs font-bold text-[#15b6e8]">
                      {Array.isArray(project.category) ? project.category.join(' • ') : project.category}
                    </span>
                    <h3
                      className="text-lg font-bold text-[#161d1e] group-hover:text-[#15b6e8] transition-colors"
                      style={{ fontFamily: 'var(--font-zalando-expanded, sans-serif)' }}
                    >
                      <Link href={`/projects/${project.slug}`}>
                        {project.title}
                      </Link>
                    </h3>
                    <p className="text-xs text-[#3b494c] line-clamp-2 leading-relaxed">
                      {project.description}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center text-muted-foreground text-sm" style={skeuomorphicCardStyle}>
              Additional project case studies for this discipline are being prepared.
            </div>
          )}
        </section>

        {/* Adjacent Navigation */}
        <section aria-label="Discipline Navigation" className="border-t border-border/40 pt-10 flex justify-between items-center text-sm">
          <Link
            href={`/services/${prevService.slug}`}
            className="flex items-center gap-3 text-muted-foreground hover:text-[#15b6e8] transition-colors"
          >
            <span className="text-lg">←</span>
            <div className="text-left">
              <div className="text-[10px] text-muted-foreground uppercase tracking-widest font-mono">Previous</div>
              <div className="font-semibold text-foreground">{prevService.title}</div>
            </div>
          </Link>

          <Link
            href={`/services/${nextService.slug}`}
            className="flex items-center gap-3 text-muted-foreground hover:text-[#15b6e8] transition-colors text-right"
          >
            <div className="text-right">
              <div className="text-[10px] text-muted-foreground uppercase tracking-widest font-mono">Next</div>
              <div className="font-semibold text-foreground">{nextService.title}</div>
            </div>
            <span className="text-lg">→</span>
          </Link>
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
