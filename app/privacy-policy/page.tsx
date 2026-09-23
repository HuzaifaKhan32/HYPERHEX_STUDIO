import { Metadata } from 'next';
import Link from 'next/link';
import NavbarServer from '@/components/NavbarServer';
import FooterServer from '@/components/FooterServer';
import SectionPill from '@/components/ui/SectionPill';
import { SITE_CONFIG } from '@/lib/site-config';

export const metadata: Metadata = {
  title: 'Privacy Policy | HyperHex Studio',
  description: 'Learn how HyperHex Studio collects, uses, and protects your personal information and analytics data across our digital solutions.',
  alternates: {
    canonical: `${SITE_CONFIG.url}/privacy-policy`,
  },
  openGraph: {
    title: 'Privacy Policy | HyperHex Studio',
    description: 'Learn how HyperHex Studio collects, uses, and protects your personal information and analytics data.',
    url: `${SITE_CONFIG.url}/privacy-policy`,
  },
};

const skeuomorphicCardStyle = {
  backgroundColor: 'rgb(244, 244, 245)',
  borderRadius: '24px',
  boxShadow:
    'rgba(255, 255, 255, 0.6) 0px 4px 0px 0px inset, rgba(0, 0, 0, 0.05) 0px -8px 0px 0px inset, rgba(0, 0, 0, 0.1) 0px 3px 3px 0px, rgba(0, 0, 0, 0.06) 0px 7.77px 16px 0px',
};

export default function PrivacyPolicyPage() {
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
          <SectionPill label="Data Protection & Privacy" className="mb-4" />
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-tight mb-4 text-foreground">
            Privacy Policy
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
              <span>1. Introduction</span>
            </h2>
            <div className="text-base text-muted-foreground leading-relaxed space-y-4">
              <p>
                HyperHex Studio (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) is committed to protecting and respecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website{' '}
                <Link
                  href="https://hyperhexstudios.vercel.app"
                  className="font-medium text-[#15b6e8] hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  hyperhexstudios.vercel.app
                </Link>{' '}
                and engage with our digital solutions, including architectural visualization, 3D product configurators, interactive WebGL experiences, VR development, drone animations, full-stack web development, and digital marketing services.
              </p>
            </div>
          </section>

          {/* Section 2 */}
          <section id="section-2" className="scroll-mt-32">
            <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-3 text-foreground">
              <SectionPill label="02" />
              <span>2. Information We Collect</span>
            </h2>
            <p className="text-base text-muted-foreground mb-4">
              We collect and process the following types of information:
            </p>
            <ul className="space-y-3 pl-2 text-muted-foreground">
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#15b6e8] mt-2.5 shrink-0" />
                <div>
                  <strong className="text-foreground font-semibold">Personal Information:</strong> Name, email address, phone number, company name, project budget, and any details you submit through project inquiries, contact forms, or direct correspondence.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#15b6e8] mt-2.5 shrink-0" />
                <div>
                  <strong className="text-foreground font-semibold">Usage Data &amp; Device Information:</strong> Technical data regarding your interaction with our site, including IP address, browser type, operating system, referring URLs, pages visited, and session duration.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#15b6e8] mt-2.5 shrink-0" />
                <div>
                  <strong className="text-foreground font-semibold">Analytics &amp; Tracking Technologies:</strong> We use Google Analytics and performance monitoring cookies to collect aggregated, anonymized interaction metrics to evaluate site performance and optimize WebGL/3D render loading speeds across devices.
                </div>
              </li>
            </ul>
          </section>

          {/* Section 3 */}
          <section id="section-3" className="scroll-mt-32">
            <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-3 text-foreground">
              <SectionPill label="03" />
              <span>3. How We Use Your Information</span>
            </h2>
            <p className="text-base text-muted-foreground mb-6">
              We use the collected information for the following purposes:
            </p>
            <ul className="grid grid-cols-1 gap-4 text-muted-foreground">
              {[
                'To evaluate project briefs, deliver proposals, and fulfill client services',
                'To communicate updates, milestone releases, and technical documentation',
                'To analyze web performance, optimize real-time 3D graphics stages, and enhance user experience',
                'To detect, prevent, and address technical issues or unauthorized activity',
                'To comply with applicable legal obligations and operational standard procedures',
              ].map((item, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-4 p-5 md:p-6 text-[#161d1e] transition-transform duration-200 hover:-translate-y-0.5"
                  style={skeuomorphicCardStyle}
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-[#15b6e8] mt-1.5 shrink-0 shadow-[0_0_8px_#15b6e8]" />
                  <span className="text-base font-semibold leading-relaxed text-[#161d1e]">{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Section 4 */}
          <section id="section-4" className="scroll-mt-32">
            <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-3 text-foreground">
              <SectionPill label="04" />
              <span>4. Information Sharing &amp; Disclosure</span>
            </h2>
            <p className="text-base text-muted-foreground mb-4">
              We do not sell, rent, or trade your personal information to third parties. We disclose data strictly under the following conditions:
            </p>
            <ul className="space-y-3 pl-2 text-muted-foreground">
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#15b6e8] mt-2.5 shrink-0" />
                <div>
                  <strong className="text-foreground font-semibold">Service Providers:</strong> Trusted third-party vendors and platforms (such as Google Analytics, hosting providers, and deployment infrastructure) that assist in operating our site and rendering services.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#15b6e8] mt-2.5 shrink-0" />
                <div>
                  <strong className="text-foreground font-semibold">Legal Compliance:</strong> When required by law, subpoena, or legal proceedings, or to protect the rights, property, and safety of HyperHex Studio, our clients, or others.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#15b6e8] mt-2.5 shrink-0" />
                <div>
                  <strong className="text-foreground font-semibold">Business Transfers:</strong> In connection with any strategic reorganization, merger, or asset transfer, where client records are evaluated among transferred operational assets.
                </div>
              </li>
            </ul>
          </section>

          {/* Section 5 */}
          <section id="section-5" className="scroll-mt-32">
            <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-3 text-foreground">
              <SectionPill label="05" />
              <span>5. Data Security</span>
            </h2>
            <p className="text-base text-muted-foreground leading-relaxed">
              We employ industry-standard technical and organizational security measures—including SSL/TLS encryption across all site endpoints and secure hosting environment controls—to guard your personal information against unauthorized access, loss, or alteration. However, no internet transmission or digital storage system is 100% secure, and absolute security cannot be guaranteed.
            </p>
          </section>

          {/* Section 6 */}
          <section id="section-6" className="scroll-mt-32">
            <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-3 text-foreground">
              <SectionPill label="06" />
              <span>6. Your Rights &amp; Options</span>
            </h2>
            <p className="text-base text-muted-foreground mb-4">
              Depending on your jurisdiction, you have the right to:
            </p>
            <ul className="space-y-3 pl-2 text-muted-foreground mb-6">
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#15b6e8] mt-2.5 shrink-0" />
                <div>
                  <strong className="text-foreground font-semibold">Access &amp; Correction:</strong> Request access to or correction of any personal data we hold about you.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#15b6e8] mt-2.5 shrink-0" />
                <div>
                  <strong className="text-foreground font-semibold">Deletion:</strong> Request the deletion of your personal information from our systems.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#15b6e8] mt-2.5 shrink-0" />
                <div>
                  <strong className="text-foreground font-semibold">Opt-Out:</strong> Disable analytics tracking via browser cookie controls or opt out of Google Analytics data collection using standard browser add-ons.
                </div>
              </li>
            </ul>
            <p className="text-base text-muted-foreground">
              To exercise these rights, please reach out to us at{' '}
              <a
                href="mailto:hyperhexstudios@gmail.com"
                className="font-bold text-[#15b6e8] hover:underline"
              >
                hyperhexstudios@gmail.com
              </a>.
            </p>
          </section>

          {/* Section 7 */}
          <section id="section-7" className="scroll-mt-32">
            <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-3 text-foreground">
              <SectionPill label="07" />
              <span>7. Third-Party Links &amp; External Content</span>
            </h2>
            <p className="text-base text-muted-foreground leading-relaxed">
              Our website contains links to external sites, portfolio demonstrations, and third-party media embeds. We do not control and are not responsible for the privacy practices, cookie policies, or content of external websites. We encourage you to review the privacy notices of any third-party links you access.
            </p>
          </section>

          {/* Section 8 */}
          <section id="section-8" className="scroll-mt-32">
            <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-3 text-foreground">
              <SectionPill label="08" />
              <span>8. Changes to This Policy</span>
            </h2>
            <p className="text-base text-muted-foreground leading-relaxed">
              We reserve the right to modify this Privacy Policy at any time. Any changes will be published directly on this page with an updated &quot;Last updated&quot; date. Continued use of our website following any updates constitutes acceptance of the modified policy.
            </p>
          </section>

          {/* Section 9 */}
          <section id="section-9" className="scroll-mt-32">
            <div
              className="p-6 md:p-8 text-[#161d1e] transition-all duration-200"
              style={skeuomorphicCardStyle}
            >
              <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-3 text-[#161d1e]">
                <SectionPill label="09" />
                <span>9. Contact Us</span>
              </h2>
              <p className="text-base text-[#3b494c] mb-6 font-medium">
                If you have questions, feedback, or concerns regarding this Privacy Policy, contact us at:
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
