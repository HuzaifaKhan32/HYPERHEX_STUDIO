import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import NavbarServer from '@/components/NavbarServer';
import FooterServer from '@/components/FooterServer';
import SectionPill from '@/components/ui/SectionPill';
import Button3D from '@/components/Button3D';
import YouTubeFacade from '@/components/YouTubeFacade';
import { PROJECTS, SERVICES, getProjectBySlug } from '@/lib/content-data';
import { SITE_CONFIG } from '@/lib/site-config';

import ContactPreHeaderBanner from '@/components/ContactPreHeaderBanner';

const ContactForm = dynamic(() => import('@/components/ContactForm'), {
  loading: () => (
    <div className="w-full py-24 bg-surface flex items-center justify-center min-h-[400px]">
      <div className="w-8 h-8 rounded-full border-2 border-accent border-t-transparent animate-spin" />
    </div>
  ),
});

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

const skeuomorphicCardStyle = {
  backgroundColor: 'rgb(244, 244, 245)',
  borderRadius: '24px',
  boxShadow:
    'rgba(255, 255, 255, 0.6) 0px 4px 0px 0px inset, rgba(0, 0, 0, 0.05) 0px -8px 0px 0px inset, rgba(0, 0, 0, 0.1) 0px 3px 3px 0px, rgba(0, 0, 0, 0.06) 0px 7.77px 16px 0px',
};

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
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <NavbarServer />

      <main className="w-full pt-32 md:pt-40 pb-20 md:pb-28">
        <div className="px-4 sm:px-6 md:px-12 max-w-7xl mx-auto space-y-16">
        {/* Header & Meta */}
        <header className="max-w-4xl space-y-6">
          <div className="flex flex-wrap items-center gap-3 text-xs font-semibold text-[#15b6e8]">
            <Link href="/projects" className="hover:underline">Projects</Link>
            <span>/</span>
            <span className="text-muted-foreground">
              {Array.isArray(project.category) ? project.category.join(' • ') : project.category}
            </span>
          </div>

          <h1
            className="text-4xl md:text-6xl font-black text-foreground tracking-tight leading-tight"
            style={{ fontFamily: 'var(--font-zalando-expanded, sans-serif)' }}
          >
            {project.title}
          </h1>

          <p className="text-lg text-muted-foreground leading-relaxed">
            {project.description}
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-6 border-t border-border/40 text-xs">
            <div>
              <span className="text-muted-foreground uppercase block mb-1 font-mono text-[10px]">Brand / Client</span>
              <span className="font-semibold text-foreground">{project.brand}</span>
            </div>
            <div>
              <span className="text-muted-foreground uppercase block mb-1 font-mono text-[10px]">Category</span>
              <span className="font-semibold text-foreground">
                {Array.isArray(project.category) ? project.category[0] : project.category}
              </span>
            </div>
            <div>
              <span className="text-muted-foreground uppercase block mb-1 font-mono text-[10px]">Format</span>
              <span className="font-semibold text-[#15b6e8]">
                {project.isVideo ? 'Cinematic 3D Video' : '3D Render / Interactive'}
              </span>
            </div>
            <div>
              <span className="text-muted-foreground uppercase block mb-1 font-mono text-[10px]">Status</span>
              <span className="font-semibold text-emerald-600">Production Complete</span>
            </div>
          </div>
        </header>

        {/* Media Player or Showcase Image */}
        <section
          aria-label="Media Showcase"
          className="w-full overflow-hidden p-2 sm:p-4"
          style={skeuomorphicCardStyle}
        >
          {project.isVideo && project.embedUrl ? (
            <YouTubeFacade
              embedUrl={project.embedUrl}
              title={project.title}
              thumbnailUrl={project.imageUrl}
            />
          ) : (
            <div className="relative aspect-video w-full rounded-2xl overflow-hidden">
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
          <section aria-label="Project Gallery" className="space-y-6 border-t border-border/40 pt-12">
            <SectionPill label="Stills Suite" className="mb-3" />
            <h2
              className="text-2xl font-bold text-foreground"
              style={{ fontFamily: 'var(--font-zalando-expanded, sans-serif)' }}
            >
              Project Stills &amp; Rendering Suite
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {project.gallery.map((img, i) => (
                <div
                  key={i}
                  className="relative aspect-video overflow-hidden transition-transform duration-200 hover:-translate-y-1"
                  style={skeuomorphicCardStyle}
                >
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
          <section aria-label="Related Services" className="border-t border-border/40 pt-12 space-y-6">
            <SectionPill label="Services Applied" className="mb-3" />
            <h2
              className="text-2xl font-bold text-foreground"
              style={{ fontFamily: 'var(--font-zalando-expanded, sans-serif)' }}
            >
              Disciplines &amp; Services Applied
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedServices.map((service) => (
                <Link
                  key={service.id}
                  href={`/services/${service.slug}`}
                  className="p-5 flex items-center justify-between transition-transform duration-200 hover:-translate-y-1 text-[#161d1e]"
                  style={skeuomorphicCardStyle}
                >
                  <div>
                    <SectionPill label={service.counter} className="mb-2" />
                    <h3 className="text-lg font-bold text-[#161d1e]">{service.title}</h3>
                    <p className="text-xs text-[#3b494c] mt-1">{service.description}</p>
                  </div>
                  <span className="text-[#15b6e8] text-xl font-bold">→</span>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Related Projects */}
        {relatedProjects.length > 0 && (
          <section aria-label="Related Case Studies" className="border-t border-border/40 pt-12 space-y-6">
            <div className="flex items-center justify-between">
              <h2
                className="text-2xl font-bold text-foreground"
                style={{ fontFamily: 'var(--font-zalando-expanded, sans-serif)' }}
              >
                Related Case Studies
              </h2>
              <Link href="/projects" className="text-sm text-[#15b6e8] font-semibold hover:underline">
                View All →
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedProjects.map((rel) => (
                <article
                  key={rel.id}
                  className="group flex flex-col justify-between p-4 overflow-hidden transition-transform duration-200 hover:-translate-y-1 text-[#161d1e]"
                  style={skeuomorphicCardStyle}
                >
                  <div>
                    <Link href={`/projects/${rel.slug}`} className="block relative aspect-video bg-white/60 rounded-xl overflow-hidden mb-3">
                      <Image src={rel.imageUrl} alt={rel.title} fill className="object-cover group-hover:scale-105 transition-transform" />
                    </Link>
                    <div className="space-y-1 mb-3">
                      <h3 className="text-sm font-bold text-[#161d1e] group-hover:text-[#15b6e8]">
                        <Link href={`/projects/${rel.slug}`}>{rel.title}</Link>
                      </h3>
                    </div>
                  </div>
                  <Button3D href={`/projects/${rel.slug}`} className="w-full justify-center">
                    Explore
                  </Button3D>
                </article>
              ))}
            </div>
          </section>
        )}
        </div>

        <ContactPreHeaderBanner />
        <ContactForm />
      </main>

      <FooterServer />
    </div>
  );
}
