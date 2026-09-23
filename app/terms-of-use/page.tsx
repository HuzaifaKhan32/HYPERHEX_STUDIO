import { Metadata } from 'next';
import Link from 'next/link';
import NavbarServer from '@/components/NavbarServer';
import FooterServer from '@/components/FooterServer';
import SectionPill from '@/components/ui/SectionPill';
import { SITE_CONFIG } from '@/lib/site-config';

export const metadata: Metadata = {
  title: 'Terms of Use | HyperHex Studio',
  description: 'Terms and Conditions for accessing HyperHex Studio website, 3D configurators, and interactive digital services.',
  alternates: {
    canonical: `${SITE_CONFIG.url}/terms-of-use`,
  },
  openGraph: {
    title: 'Terms of Use | HyperHex Studio',
    description: 'Terms and Conditions for accessing HyperHex Studio website, 3D configurators, and interactive digital services.',
    url: `${SITE_CONFIG.url}/terms-of-use`,
  },
};

const skeuomorphicCardStyle = {
  backgroundColor: 'rgb(244, 244, 245)',
  borderRadius: '24px',
  boxShadow:
    'rgba(255, 255, 255, 0.6) 0px 4px 0px 0px inset, rgba(0, 0, 0, 0.05) 0px -8px 0px 0px inset, rgba(0, 0, 0, 0.1) 0px 3px 3px 0px, rgba(0, 0, 0, 0.06) 0px 7.77px 16px 0px',
};

export default function TermsOfUsePage() {
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
          <SectionPill label="Legal & Governance" className="mb-4" />
          <h1
            className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-tight mb-4 text-foreground"
            style={{ fontFamily: 'var(--font-zalando-expanded, sans-serif)' }}
          >
            Terms &amp; Conditions
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
              <span>1. Agreement to Terms</span>
            </h2>
            <div className="text-base text-muted-foreground leading-relaxed space-y-4">
              <p>
                By accessing, browsing, or using the HyperHex Studio website ({' '}
                <Link
                  href="https://hyperhexstudios.vercel.app"
                  className="font-medium text-[#15b6e8] hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  hyperhexstudios.vercel.app
                </Link>{' '}
                ) and engaging our digital solutions, you agree to be bound by these Terms &amp; Conditions. If you do not agree with any part of these terms, you must discontinue the use of our website and services immediately.
              </p>
            </div>
          </section>

          {/* Section 2 */}
          <section id="section-2" className="scroll-mt-32">
            <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-3 text-foreground">
              <SectionPill label="02" />
              <span>2. Services</span>
            </h2>
            <p className="text-base text-muted-foreground mb-6">
              HyperHex Studio delivers specialized 3D design, real-time graphics, interactive web, and visual media solutions. Our core services include:
            </p>
            <ul className="grid grid-cols-1 gap-4 text-muted-foreground mb-6">
              {[
                {
                  title: 'Architectural Visualization',
                  desc: 'Photorealistic interior & exterior rendering, spatial walkthroughs, and lighting simulations',
                },
                {
                  title: '3D Product Visualization',
                  desc: 'Studio-grade product renders, ray-traced materials, and exploded-view visual showcases',
                },
                {
                  title: '3D Product Configurators',
                  desc: 'Interactive WebGL/Three.js engines with instant material, color, and trim customization',
                },
                {
                  title: 'Interactive Web Experiences',
                  desc: 'GPU-accelerated 3D web stages, micro-interactions, and visual storytelling interfaces',
                },
                {
                  title: 'VR Development',
                  desc: 'WebXR and spatial virtual reality environments, virtual showrooms, and headset walkthroughs',
                },
                {
                  title: 'Drone Animation',
                  desc: 'Cinematic aerial drone animations, masterplan fly-throughs, and FPV site showcases',
                },
                {
                  title: 'Web Development',
                  desc: 'Performant, full-stack digital platforms engineered with Next.js, TypeScript, and modern headless CMS architecture',
                },
                {
                  title: 'Real-Time 3D',
                  desc: 'High-performance real-time 3D graphics engines, shader controls, and physically based rendering pipelines',
                },
                {
                  title: 'Marketing & Sales',
                  desc: 'Digital sales toolkits, pitch media, brand motion assets, and conversion landing stages',
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
            <p className="text-base text-muted-foreground leading-relaxed">
              All service deliveries, asset handovers, and interactive deployments are governed by individual project proposals and client agreements.
            </p>
          </section>

          {/* Section 3 */}
          <section id="section-3" className="scroll-mt-32">
            <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-3 text-foreground">
              <SectionPill label="03" />
              <span>3. Intellectual Property Rights</span>
            </h2>
            <ul className="space-y-3 pl-2 text-muted-foreground">
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#15b6e8] mt-2.5 shrink-0" />
                <div>
                  <strong className="text-foreground font-semibold">Website Content:</strong> All content featured on this website—including codebases, 3D assets, shader scripts, motion graphics, video renders, branding, text, and visual layouts—is the exclusive property of HyperHex Studio or its licensors and is protected by intellectual property laws.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#15b6e8] mt-2.5 shrink-0" />
                <div>
                  <strong className="text-foreground font-semibold">Restrictions:</strong> You may not reproduce, decompile, extract, reverse-engineer, distribute, or create derivative works from any website asset or interactive WebGL stage without express written consent from HyperHex Studio.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#15b6e8] mt-2.5 shrink-0" />
                <div>
                  <strong className="text-foreground font-semibold">Client Deliverables:</strong> Ownership and licensing of customized 3D models, codebases, source files, and rendered assets transferred to clients are defined explicitly within individual project contracts upon full payment.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#15b6e8] mt-2.5 shrink-0" />
                <div>
                  <strong className="text-foreground font-semibold">Portfolio Demonstration:</strong> HyperHex Studio retains the right to display completed project renders, WebGL environments, and visual assets within our online portfolio, social media channels, and marketing materials, unless restricted by a signed Non-Disclosure Agreement (NDA).
                </div>
              </li>
            </ul>
          </section>

          {/* Section 4 */}
          <section id="section-4" className="scroll-mt-32">
            <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-3 text-foreground">
              <SectionPill label="04" />
              <span>4. Project Engagements &amp; Payment Terms</span>
            </h2>
            <ul className="space-y-3 pl-2 text-muted-foreground">
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#15b6e8] mt-2.5 shrink-0" />
                <div>
                  <strong className="text-foreground font-semibold">Scope &amp; Proposals:</strong> Project deliverables, technical specifications, timelines, and milestones are outlined in individual project proposals or contracts.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#15b6e8] mt-2.5 shrink-0" />
                <div>
                  <strong className="text-foreground font-semibold">Payment Structure:</strong> Payment schedules, deposit requirements, and milestone releases are established before project initiation. Work begins upon receipt of the agreed initial deposit.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#15b6e8] mt-2.5 shrink-0" />
                <div>
                  <strong className="text-foreground font-semibold">Revisions &amp; Scope Creep:</strong> Requested additions, extra rendering passes, or feature modifications outside the agreed scope will be evaluated and billed as project additions.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#15b6e8] mt-2.5 shrink-0" />
                <div>
                  <strong className="text-foreground font-semibold">Cancellations:</strong> In the event of project termination by the client, payment for all completed milestones and non-refundable deposits will be retained according to the project agreement.
                </div>
              </li>
            </ul>
          </section>

          {/* Section 5 */}
          <section id="section-5" className="scroll-mt-32">
            <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-3 text-foreground">
              <SectionPill label="05" />
              <span>5. User Conduct</span>
            </h2>
            <p className="text-base text-muted-foreground mb-4">
              When using our website and interactive stages, you agree not to:
            </p>
            <ul className="space-y-3 pl-2 text-muted-foreground">
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#15b6e8] mt-2.5 shrink-0" />
                <div>Use the site or services for any unlawful or unauthorized purpose</div>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#15b6e8] mt-2.5 shrink-0" />
                <div>Attempt to breach, probe, or scan the security of our site, server infrastructure, or WebGL stages</div>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#15b6e8] mt-2.5 shrink-0" />
                <div>Upload, transmit, or inject malicious code, scripts, or viruses</div>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#15b6e8] mt-2.5 shrink-0" />
                <div>Scrape, farm, or harvest website content, 3D assets, textures, or code snippets without authorization</div>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#15b6e8] mt-2.5 shrink-0" />
                <div>Interfere with or disrupt system performance or server-side microservices</div>
              </li>
            </ul>
          </section>

          {/* Section 6 */}
          <section id="section-6" className="scroll-mt-32">
            <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-3 text-foreground">
              <SectionPill label="06" />
              <span>6. Confidentiality</span>
            </h2>
            <p className="text-base text-muted-foreground leading-relaxed">
              Both HyperHex Studio and the client agree to protect and keep confidential any proprietary information, technical specifications, CAD models, business strategies, and pre-release materials shared during consultation or production. Confidential details will not be disclosed to third parties without prior written approval.
            </p>
          </section>

          {/* Section 7 */}
          <section id="section-7" className="scroll-mt-32">
            <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-3 text-foreground">
              <SectionPill label="07" />
              <span>7. Limitation of Liability</span>
            </h2>
            <p className="text-base text-muted-foreground leading-relaxed">
              To the fullest extent permitted by law, HyperHex Studio, its team, and its partners shall not be liable for any indirect, incidental, consequential, special, or punitive damages arising out of your access to, or inability to access, our website, interactive 3D configurators, or digital deliverables. Our total liability for any claim shall not exceed the amount paid by you for the specific service giving rise to the claim.
            </p>
          </section>

          {/* Section 8 */}
          <section id="section-8" className="scroll-mt-32">
            <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-3 text-foreground">
              <SectionPill label="08" />
              <span>8. Warranty Disclaimer</span>
            </h2>
            <p className="text-base text-muted-foreground leading-relaxed">
              Our website, interactive WebGL experiences, and services are provided on an &quot;as is&quot; and &quot;as available&quot; basis without warranties of any kind, either express or implied. While we optimize for cross-device GPU performance, we do not warrant that 3D viewports or web stages will render uninterrupted, error-free, or identically across all legacy hardware and browser configurations.
            </p>
          </section>

          {/* Section 9 */}
          <section id="section-9" className="scroll-mt-32">
            <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-3 text-foreground">
              <SectionPill label="09" />
              <span>9. Governing Law</span>
            </h2>
            <p className="text-base text-muted-foreground leading-relaxed">
              These Terms &amp; Conditions shall be governed by and construed in accordance with the laws of Pakistan. Any legal disputes or claims arising out of or related to these terms shall be subject to the exclusive jurisdiction of the competent courts in Karachi, Pakistan.
            </p>
          </section>

          {/* Section 10 */}
          <section id="section-10" className="scroll-mt-32">
            <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-3 text-foreground">
              <SectionPill label="10" />
              <span>10. Changes to Terms</span>
            </h2>
            <p className="text-base text-muted-foreground leading-relaxed">
              We reserve the right to update or modify these Terms &amp; Conditions at any time without prior notice. Changes take effect immediately upon being posted on this page. Your continued use of the HyperHex Studio website following updates signifies your acceptance of the revised terms.
            </p>
          </section>

          {/* Section 11 */}
          <section id="section-11" className="scroll-mt-32">
            <div
              className="p-6 md:p-8 text-[#161d1e] transition-all duration-200"
              style={skeuomorphicCardStyle}
            >
              <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-3 text-[#161d1e]">
                <SectionPill label="11" />
                <span>11. Contact Us</span>
              </h2>
              <p className="text-base text-[#3b494c] mb-6 font-medium">
                For questions or inquiries regarding these Terms &amp; Conditions, please contact us at:
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
