import { Metadata } from 'next';
import Link from 'next/link';
import NavbarServer from '@/components/NavbarServer';
import FooterServer from '@/components/FooterServer';
import SectionPill from '@/components/ui/SectionPill';
import { SITE_CONFIG } from '@/lib/site-config';

export const metadata: Metadata = {
  title: 'Cookie Policy | HyperHex Studio',
  description: 'Learn how HyperHex Studio uses cookies, local storage, and WebGL asset caching to optimize site performance and 3D rendering.',
  alternates: {
    canonical: `${SITE_CONFIG.url}/cookie-policy`,
  },
  openGraph: {
    title: 'Cookie Policy | HyperHex Studio',
    description: 'Learn how HyperHex Studio uses cookies, local storage, and WebGL asset caching to optimize site performance.',
    url: `${SITE_CONFIG.url}/cookie-policy`,
  },
};

const skeuomorphicCardStyle = {
  backgroundColor: 'rgb(244, 244, 245)',
  borderRadius: '24px',
  boxShadow:
    'rgba(255, 255, 255, 0.6) 0px 4px 0px 0px inset, rgba(0, 0, 0, 0.05) 0px -8px 0px 0px inset, rgba(0, 0, 0, 0.1) 0px 3px 3px 0px, rgba(0, 0, 0, 0.06) 0px 7.77px 16px 0px',
};

export default function CookiePolicyPage() {
  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <NavbarServer />

      <main className="w-full pt-36 md:pt-44 pb-20 md:pb-28 px-4 sm:px-6 md:px-8 max-w-4xl mx-auto">
        {/* Breadcrumb / Back to Home Link */}
        <div className="mb-8 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#15b6e8] hover:text-[#0c86ac] transition-colors group"
          >
            <span className="transition-transform group-hover:-translate-x-1">←</span>
            <span>Back to Home</span>
          </Link>
          <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest">
            Legal Document
          </span>
        </div>

        {/* Hero / Header Section */}
        <header className="mb-12 border-b border-border/40 pb-8">
          <SectionPill label="Cookies & Telemetry" className="mb-4" />
          <h1
            className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-tight mb-4 text-foreground"
            style={{ fontFamily: 'var(--font-zalando-expanded, sans-serif)' }}
          >
            Cookie Policy
          </h1>
          <p className="text-sm font-medium text-muted-foreground flex items-center gap-2">
            <span>Last updated:</span>
            <span className="font-semibold text-foreground">September 2026</span>
          </p>
        </header>

        {/* Policy Content Sections */}
        <div className="space-y-12 leading-relaxed">
          {/* Section 1 */}
          <section id="section-1" className="scroll-mt-32">
            <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-3 text-foreground">
              <SectionPill label="01" />
              <span>1. What Are Cookies?</span>
            </h2>
            <div className="text-base text-muted-foreground leading-relaxed space-y-4">
              <p>
                Cookies are small text files stored on your device (computer, tablet, or mobile) when you visit a website. They are widely used to ensure websites function smoothly, remember user preferences, optimize high-performance graphics rendering, and provide analytics on how visitors interact with online experiences.
              </p>
            </div>
          </section>

          {/* Section 2 */}
          <section id="section-2" className="scroll-mt-32">
            <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-3 text-foreground">
              <SectionPill label="02" />
              <span>2. How We Use Cookies</span>
            </h2>
            <p className="text-base text-muted-foreground mb-6">
              HyperHex Studio uses cookies and local storage technologies to power our interactive 3D web stages, WebGL configurators, and website infrastructure:
            </p>
            <ul className="grid grid-cols-1 gap-4 text-muted-foreground mb-6">
              {[
                {
                  title: 'Essential Cookies',
                  desc: 'These cookies are strictly necessary for core site navigation, security, and loading foundational assets. The website cannot function properly without them.',
                },
                {
                  title: 'Performance & 3D Stage Optimization',
                  desc: 'We use local storage and caching cookies to store session states for interactive 3D product configurators, shader pre-loads, and WebGL asset caching to ensure fast loading times and zero-latency rendering across devices.',
                },
                {
                  title: 'Analytics Cookies (Google Analytics)',
                  desc: 'These cookies collect anonymized telemetry and behavioral data (such as pages visited, render session duration, device hardware profiles, and traffic sources) to help us analyze site performance and continuously improve user experience.',
                },
                {
                  title: 'Functional Cookies',
                  desc: 'These cookies enable enhanced personalization by remembering your preferences, such as light/dark mode selection, UI configurations, or language settings.',
                },
              ].map((item, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-4 p-5 md:p-6 text-[#161d1e] transition-transform duration-200 hover:-translate-y-0.5"
                  style={skeuomorphicCardStyle}
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-[#15b6e8] mt-1.5 shrink-0 shadow-[0_0_8px_#15b6e8]" />
                  <div>
                    <strong className="text-base font-bold text-[#161d1e] block mb-1">
                      {item.title}
                    </strong>
                    <span className="text-sm font-medium leading-relaxed text-[#3b494c]">
                      {item.desc}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          {/* Section 3 */}
          <section id="section-3" className="scroll-mt-32">
            <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-3 text-foreground">
              <SectionPill label="03" />
              <span>3. Third-Party Cookies &amp; Telemetry</span>
            </h2>
            <p className="text-base text-muted-foreground mb-4">
              In addition to our first-party scripts, trusted third-party services may place cookies or access browser storage when you interact with our site:
            </p>
            <ul className="space-y-3 pl-2 text-muted-foreground">
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#15b6e8] mt-2.5 shrink-0" />
                <div>
                  <strong className="text-foreground font-semibold">Google Analytics:</strong> Used to measure traffic, user engagement, and performance metrics anonymously.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#15b6e8] mt-2.5 shrink-0" />
                <div>
                  <strong className="text-foreground font-semibold">Hosting &amp; Infrastructure Services (Vercel):</strong> Used for performance routing, serverless edge function execution, and security verification.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#15b6e8] mt-2.5 shrink-0" />
                <div>
                  <strong className="text-foreground font-semibold">Embedded Media &amp; Interactive Engines:</strong> External media previews or interactive 3D model loaders may place third-party session tokens to manage media streaming quality.
                </div>
              </li>
            </ul>
          </section>

          {/* Section 4 */}
          <section id="section-4" className="scroll-mt-32">
            <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-3 text-foreground">
              <SectionPill label="04" />
              <span>4. Managing &amp; Disabling Cookies</span>
            </h2>
            <p className="text-base text-muted-foreground mb-4">
              You have the right to accept, refuse, or clear cookies at any time through your web browser settings. Most browsers allow you to:
            </p>
            <ul className="space-y-3 pl-2 text-muted-foreground mb-6">
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#15b6e8] mt-2.5 shrink-0" />
                <div>View saved cookies and delete them individually or en masse</div>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#15b6e8] mt-2.5 shrink-0" />
                <div>Block third-party tracking cookies by default</div>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#15b6e8] mt-2.5 shrink-0" />
                <div>Set preferences to block cookies from specific domains</div>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#15b6e8] mt-2.5 shrink-0" />
                <div>Clear local storage and cookies automatically upon closing your browser</div>
              </li>
            </ul>
            <p className="text-base text-muted-foreground mb-4">
              To opt out of Google Analytics tracking specifically across all websites, you can install the official{' '}
              <Link
                href="https://tools.google.com/dlpage/gaoptout"
                className="font-bold text-[#15b6e8] hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Google Analytics Opt-out Browser Add-on
              </Link>.
            </p>
            <p className="text-sm italic text-muted-foreground bg-surface/60 p-4 rounded-xl border border-border/50">
              Note: Disabling essential cookies or browser storage may impact the performance, real-time rendering speed, or state preservation of our 3D product configurators and interactive WebGL stages.
            </p>
          </section>

          {/* Section 5 */}
          <section id="section-5" className="scroll-mt-32">
            <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-3 text-foreground">
              <SectionPill label="05" />
              <span>5. Changes to This Policy</span>
            </h2>
            <p className="text-base text-muted-foreground leading-relaxed">
              We reserve the right to update this Cookie Policy as our site features, WebGL capabilities, or legal requirements evolve. Any updates will be published on this page with a revised &quot;Last updated&quot; date.
            </p>
          </section>

          {/* Section 6 */}
          <section id="section-6" className="scroll-mt-32">
            <div
              className="p-6 md:p-8 text-[#161d1e] transition-all duration-200"
              style={skeuomorphicCardStyle}
            >
              <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-3 text-[#161d1e]">
                <SectionPill label="06" />
                <span>6. Contact Us</span>
              </h2>
              <p className="text-base text-[#3b494c] mb-6 font-medium">
                If you have questions regarding our use of cookies or tracking technologies, please contact us at:
              </p>
              <div className="space-y-2 text-base">
                <p className="font-bold text-[#161d1e] text-lg">HyperHex Studio</p>
                <p className="text-[#3b494c]">Karachi, Pakistan</p>
                <p className="text-[#3b494c]">
                  <strong className="text-[#161d1e]">Email:</strong>{' '}
                  <a
                    href="mailto:hyperhexstudios@gmail.com"
                    className="font-semibold text-[#15b6e8] hover:underline"
                  >
                    hyperhexstudios@gmail.com
                  </a>
                </p>
                <p className="text-[#3b494c]">
                  <strong className="text-[#161d1e]">Website:</strong>{' '}
                  <Link
                    href="https://hyperhexstudios.vercel.app"
                    className="font-semibold text-[#15b6e8] hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    hyperhexstudios.vercel.app
                  </Link>
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>

      <FooterServer />
    </div>
  );
}
