import { Metadata } from 'next';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import NavbarServer from '@/components/NavbarServer';
import FooterServer from '@/components/FooterServer';
import SectionPill from '@/components/ui/SectionPill';
import Button3D from '@/components/Button3D';
import AboutUsServer from '@/components/AboutUsServer';
import ContactPreHeaderBanner from '@/components/ContactPreHeaderBanner';
import { SITE_CONFIG } from '@/lib/site-config';

const ContactForm = dynamic(() => import('@/components/ContactForm'), {
  loading: () => (
    <div className="w-full py-24 bg-surface flex items-center justify-center min-h-[400px]">
      <div className="w-8 h-8 rounded-full border-2 border-accent border-t-transparent animate-spin" />
    </div>
  ),
});

export const metadata: Metadata = {
  title: 'About Us | HyperHex Studio',
  description: 'HyperHex Studio is a cutting-edge 3D visualization, animation, and interactive digital experience studio. We transform ideas into immersive visual realities.',
  alternates: {
    canonical: `${SITE_CONFIG.url}/about`,
  },
  openGraph: {
    title: 'About Us | HyperHex Studio',
    description: 'HyperHex Studio is a cutting-edge 3D visualization, animation, and interactive digital experience studio.',
    url: `${SITE_CONFIG.url}/about`,
  },
};

const stats = [
  { value: '150+', label: 'Projects Delivered' },
  { value: '60+', label: 'Global Clients' },
  { value: '9', label: 'Core Disciplines' },
  { value: '5+', label: 'Years of Craft' },
];

const values = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
      </svg>
    ),
    title: 'Pixel-Perfect Precision',
    description: 'Every render, every frame, every shader is scrutinised until it meets our uncompromising visual standard.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
    title: 'Relentless Innovation',
    description: 'We push boundaries — from real-time WebGL configurators to AI-augmented content pipelines — staying ahead so our clients always are.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
      </svg>
    ),
    title: 'Client Partnership',
    description: 'We embed ourselves into every brief, treating your vision as our creative mission from first call to final delivery.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
      </svg>
    ),
    title: 'Delivery Excellence',
    description: 'Structured pipelines, transparent timelines, and a culture of over-delivery keep our clients coming back.',
  },
];

const milestones = [
  { year: '2019', title: 'Studio Founded', description: 'HyperHex was born from a shared obsession with photorealism and spatial storytelling.' },
  { year: '2020', title: 'First 50 Projects', description: 'Rapid growth across architectural visualization and 3D product renders for regional developers.' },
  { year: '2021', title: 'WebGL & Real-Time', description: 'Launched our first real-time 3D configurator, opening an entirely new interactive dimension for clients.' },
  { year: '2022', title: 'VR & 360 Expansion', description: 'Added immersive VR walkthroughs and 360° virtual tours to our service stack.' },
  { year: '2023', title: 'Global Client Reach', description: 'Delivered projects for clients across South Asia, the Middle East, and Europe.' },
  { year: '2024', title: 'AI-Augmented Pipeline', description: 'Integrated generative AI into our content creation workflow, dramatically accelerating iteration speed.' },
];

const disciplines = [
  'Architectural Visualization',
  '3D Product Visualization',
  '3D Animation & Motion',
  'Real-Time WebGL Configurators',
  'VR & 360° Experiences',
  'Interactive Web Experiences',
  'Drone & Aerial Cinematics',
  'AI Content Creation',
  'Web Development',
];

const skeuomorphicCardStyle = {
  backgroundColor: 'rgb(244, 244, 245)',
  borderRadius: '24px',
  boxShadow:
    'rgba(255, 255, 255, 0.6) 0px 4px 0px 0px inset, rgba(0, 0, 0, 0.05) 0px -8px 0px 0px inset, rgba(0, 0, 0, 0.1) 0px 3px 3px 0px, rgba(0, 0, 0, 0.06) 0px 7.77px 16px 0px',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <NavbarServer />

      <main className="w-full pt-32 md:pt-40 pb-20 md:pb-28">
        <div className="px-4 sm:px-6 md:px-12 max-w-7xl mx-auto space-y-24">

          {/* Hero */}
          <section aria-label="About Hero" className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-7">
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#15b6e8] hover:text-[#0c86ac] transition-colors group"
              >
                <span className="transition-transform group-hover:-translate-x-1">←</span>
                <span>Back to Home</span>
              </Link>


              <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl">
                HyperHex Studio is a specialist 3D visualization, animation, and interactive digital experience studio. We partner with architects, developers, luxury brands, and technology companies to transform ambitious ideas into immersive, photorealistic realities that command attention.
              </p>

              <div className="flex flex-wrap gap-4 pt-2">
                <Button3D href="/projects">View Our Work</Button3D>
                <Button3D href="/contact" variant="gray">Start a Project</Button3D>
              </div>
            </div>

            {/* Stats */}
            <div className="lg:col-span-5">
              <div className="grid grid-cols-2 gap-4">
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="flex flex-col items-center justify-center p-6 text-center transition-transform duration-200 hover:-translate-y-1"
                    style={skeuomorphicCardStyle}
                  >
                    <span
                      className="text-4xl md:text-5xl font-black text-[#15b6e8] leading-none"
                      style={{ fontFamily: 'var(--font-zalando-expanded, sans-serif)' }}
                    >
                      {stat.value}
                    </span>
                    <span className="mt-2 text-xs font-bold uppercase tracking-widest text-[#3b494c]">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </section>

        </div>{/* end space-y-24 wrapper */}

        {/* About Us Component */}
        <AboutUsServer />

        <div className="px-4 sm:px-6 md:px-12 max-w-7xl mx-auto space-y-24 mt-24">

          {/* Mission */}
          <section aria-label="Mission" className="border-t border-border/40 pt-16">
            <div
              className="relative overflow-hidden rounded-3xl p-10 md:p-16 text-white"
              style={{
                background: 'linear-gradient(135deg, #090A0F 0%, #0f1a2e 50%, #090A0F 100%)',
                boxShadow: '0 0 80px rgba(21, 182, 232, 0.12), inset 0 1px 0 rgba(255,255,255,0.06)',
              }}
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -top-24 -right-24 w-96 h-96 rounded-full opacity-20"
                style={{ background: 'radial-gradient(circle, #15b6e8 0%, transparent 70%)' }}
              />
              <div className="relative z-10 max-w-3xl">
                <SectionPill label="Our Mission" className="mb-6" />
                <blockquote
                  className="text-2xl md:text-4xl font-black leading-tight tracking-tight"
                  style={{ fontFamily: 'var(--font-zalando-expanded, sans-serif)' }}
                >
                  &ldquo;To make the invisible{' '}
                  <span className="text-[#15b6e8]">viscerally real</span> — one pixel, one polygon, one experience at a time.&rdquo;
                </blockquote>
                <p className="mt-6 text-base md:text-lg text-white/60 leading-relaxed">
                  We exist to bridge the gap between imagination and perception — giving architects, brands, and innovators the power to show the world exactly what they see in their minds.
                </p>
              </div>
            </div>
          </section>

          {/* Core Values */}
          <section aria-label="Core Values" className="border-t border-border/40 pt-16">
            <div className="max-w-3xl mb-12">
              <SectionPill label="Our Values" className="mb-3" />
              <h2
                className="text-3xl font-bold text-foreground"
                style={{ fontFamily: 'var(--font-zalando-expanded, sans-serif)' }}
              >
                What Drives Every Pixel
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {values.map((value) => (
                <div
                  key={value.title}
                  className="p-7 flex gap-5 transition-transform duration-200 hover:-translate-y-1"
                  style={skeuomorphicCardStyle}
                >
                  <div className="shrink-0 w-11 h-11 rounded-xl bg-[#15b6e8]/10 border border-[#15b6e8]/20 flex items-center justify-center text-[#15b6e8]">
                    {value.icon}
                  </div>
                  <div>
                    <h3
                      className="text-base font-bold text-[#161d1e] mb-2"
                      style={{ fontFamily: 'var(--font-zalando-expanded, sans-serif)' }}
                    >
                      {value.title}
                    </h3>
                    <p className="text-sm text-[#3b494c] leading-relaxed">{value.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Timeline */}
          <section aria-label="Studio Milestones" className="border-t border-border/40 pt-16">
            <div className="max-w-3xl mb-12">
              <SectionPill label="Our Journey" className="mb-3" />
              <h2
                className="text-3xl font-bold text-foreground"
                style={{ fontFamily: 'var(--font-zalando-expanded, sans-serif)' }}
              >
                From First Render to Full-Stack Studio
              </h2>
            </div>

            <div className="relative">
              {/* Vertical rule */}
              <div className="absolute left-[88px] top-0 bottom-0 w-px bg-border/40 hidden md:block" aria-hidden="true" />

              <div className="flex flex-col gap-8">
                {milestones.map((milestone) => (
                  <div key={milestone.year} className="flex gap-6 md:gap-10 items-start group">
                    {/* Year */}
                    <div className="shrink-0 w-[72px] text-right hidden md:block">
                      <span className="text-xs font-bold font-mono tracking-widest text-[#15b6e8] uppercase">
                        {milestone.year}
                      </span>
                    </div>
                    {/* Dot */}
                    <div className="relative shrink-0 hidden md:flex items-center justify-center">
                      <div className="w-3 h-3 rounded-full bg-[#15b6e8] border-2 border-white shadow-[0_0_0_3px_rgba(21,182,232,0.2)] group-hover:shadow-[0_0_0_5px_rgba(21,182,232,0.25)] transition-shadow" />
                    </div>
                    {/* Card */}
                    <div
                      className="flex-1 p-5 md:p-6 transition-transform duration-200 hover:-translate-y-0.5"
                      style={skeuomorphicCardStyle}
                    >
                      <span className="md:hidden text-xs font-bold font-mono tracking-widest text-[#15b6e8] uppercase block mb-1">
                        {milestone.year}
                      </span>
                      <h3
                        className="text-base font-bold text-[#161d1e] mb-1"
                        style={{ fontFamily: 'var(--font-zalando-expanded, sans-serif)' }}
                      >
                        {milestone.title}
                      </h3>
                      <p className="text-sm text-[#3b494c] leading-relaxed">{milestone.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Disciplines */}
          <section aria-label="Disciplines" className="border-t border-border/40 pt-16">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
              <div>
                <SectionPill label="What We Do" className="mb-3" />
                <h2
                  className="text-3xl font-bold text-foreground"
                  style={{ fontFamily: 'var(--font-zalando-expanded, sans-serif)' }}
                >
                  Our Full Capability Stack
                </h2>
              </div>
              <Link
                href="/services"
                className="text-sm font-semibold text-[#15b6e8] hover:underline inline-flex items-center gap-2 shrink-0"
              >
                Explore All Services →
              </Link>
            </div>

            <div className="flex flex-wrap gap-3">
              {disciplines.map((discipline) => (
                <span
                  key={discipline}
                  className="px-5 py-2.5 text-sm font-bold text-[#161d1e] tracking-wide rounded-xl border-2 border-outline-variant/30 transition-all duration-150 hover:border-[#15b6e8] hover:text-[#15b6e8] cursor-default"
                  style={{ backgroundColor: 'rgb(244, 244, 245)' }}
                >
                  {discipline}
                </span>
              ))}
            </div>
          </section>

        </div>

        {/* Contact */}
        <div className="mt-24">
          <ContactPreHeaderBanner />
          <ContactForm />
        </div>
      </main>

      <FooterServer />
    </div>
  );
}
