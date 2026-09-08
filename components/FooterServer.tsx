// Server Component - Footer with static structure
// Client components handle animations and interactivity

import FooterBrandCard from './FooterBrandCard';
import FooterLinkList from './FooterLinkList';
import FooterLink from './FooterLink';
import FooterSocialLinks from './FooterSocialLinks';
import FooterInteractiveTitle from './FooterInteractiveTitle';
import FooterTermsLinks from './FooterTermsLinks';
import FooterScrollTopButton from './FooterScrollTopButton';

const companyLinks = [
  { label: 'About Us', href: '#' },
  { label: 'Portfolio', href: '#works' },
  { label: 'Case Studies', href: '#case-studies' },
  { label: 'Contact', href: '#contact' },
];

const serviceLinks = [
  { label: 'All Services', href: '#' },
  { label: 'Architectural Visualization', href: '#' },
  { label: '3D Product Visualization', href: '#' },
  { label: '3D Animation', href: '#' },
  { label: 'Custom Software Development', href: '#' },
  { label: 'Website Development', href: '#' },
  { label: 'Mobile App Development', href: '#' },
];

const socialLinks = [
  {
    label: 'Twitter / X',
    href: '#',
    icon: (
      <svg className="h-3.5 w-3.5 fill-white" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/share/1BbE46Vqqg/',
    icon: (
      <svg className="h-3.5 w-3.5 fill-white" viewBox="0 0 24 24">
        <path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036c-2.048 0-2.433.824-2.433 2.2v1.77h3.769l-.491 3.667h-3.278v7.98c-1.802.285-3.57.285-5.373 0z" />
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/hyperhex_studios?utm_source=qr&igsi=dWNtMjdvYXl2MmNr',
    icon: (
      <svg className="h-3.5 w-3.5 fill-white" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: '#',
    icon: (
      <svg className="h-3.5 w-3.5 fill-white" viewBox="0 0 24 24">
        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
      </svg>
    ),
  },
  {
    label: 'YouTube',
    href: 'https://www.youtube.com/@HyperhexStudios',
    icon: (
      <svg className="h-3.5 w-3.5 fill-white" viewBox="0 0 24 24">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
];

export default function FooterServer() {
  return (
    <div className="w-full overflow-hidden">
      <footer
        className="relative isolate flex w-full flex-col overflow-hidden bg-[#090A0F]"
        style={{
          borderTopLeftRadius: '45px',
          borderTopRightRadius: '45px',
        }}
      >
        {/* Phantom arc glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0"
          style={{
            background:
              'radial-gradient(ellipse 120% 145% at 50% -50%, rgba(0,0,0,0) 40%, rgba(21,182,232,0.15) 75%, rgba(0,0,0,0) 90%)',
            mixBlendMode: 'screen',
          }}
        />

        {/* Main content */}
        <div className="relative z-10 mx-auto flex w-full max-w-[1400px] flex-col justify-between gap-16 px-5 pt-20 pb-16 lg:flex-row lg:px-16 lg:pt-32 lg:pb-24 xl:gap-24 2xl:px-24">

          {/* Brand card */}
          <FooterBrandCard />

          {/* Navigation columns */}
          <div className="grid flex-1 grid-cols-1 gap-16 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3">

            {/* Company */}
            <div className="flex flex-col gap-5">
              <span className="font-mono text-xs font-bold tracking-[0.2em] uppercase text-zinc-400">
                Company
              </span>
              <FooterLinkList>
                {companyLinks.map((link) => (
                  <FooterLink key={link.label} href={link.href}>
                    {link.label}
                  </FooterLink>
                ))}
              </FooterLinkList>
            </div>

            {/* Services */}
            <div className="flex flex-col gap-5">
              <span className="font-mono text-xs font-bold tracking-[0.2em] uppercase text-zinc-400">
                Our Services
              </span>
              <FooterLinkList>
                {serviceLinks.map((link) => (
                  <FooterLink key={link.label} href={link.href}>
                    {link.label}
                  </FooterLink>
                ))}
              </FooterLinkList>
            </div>

            {/* Operations */}
            <div className="flex flex-col gap-5">
              <span className="font-mono text-xs font-bold tracking-[0.2em] uppercase text-zinc-400">
                South Asia Operations
              </span>
              <div className="flex flex-col gap-3 text-[clamp(14px,1.1vw,16px)]">
                <p className="text-zinc-400 whitespace-nowrap">Regional Development Hub</p>
                <p className="text-zinc-400 whitespace-nowrap">Worldwide Project Delivery</p>
                <a href="tel:+923128881435" className="font-bold text-white transition-colors hover:text-[#15b6e8] whitespace-nowrap">
                  +92 3128881435
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Social media section */}
        <div className="relative z-10">
          <div className="relative z-10 w-full px-5 py-6 lg:px-16 2xl:px-24">
            <div className="mx-auto flex max-w-[1400px] flex-col items-center overflow-hidden bg-[#EDECEC] rounded-[45px] px-6 pt-10 pb-12 sm:pt-12 sm:pb-16 shadow-xl">
              <span className="mb-8 block text-center font-mono text-xs font-bold tracking-[0.2em] uppercase text-zinc-500">
                Social Media
              </span>
              <FooterSocialLinks socialLinks={socialLinks} />
            </div>
          </div>

          {/* Bottom section with interactive title */}
          <div className="relative z-10 w-full overflow-hidden px-5 pt-16 pb-12 lg:px-16 lg:pt-24 lg:pb-16 2xl:px-24">

            {/* Glow effect */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 z-0"
              style={{
                background:
                  'radial-gradient(ellipse 120% 145% at 50% -30%, rgba(0,0,0,0) 40%, rgba(21,182,232,0.12) 75%, rgba(0,0,0,0) 90%)',
                mixBlendMode: 'screen',
              }}
            />

            {/* Interactive kinetic title */}
            <FooterInteractiveTitle />

            {/* Copyright bar */}
            <div className="relative z-10 mx-auto mt-12 flex w-full max-w-[1400px] flex-col items-center justify-between gap-6 border-t border-white/10 pt-6 md:flex-row">
              <p className="text-sm font-medium text-zinc-400">
                © 2026 HyperHex Studio. All Rights Reserved
              </p>
              <div className="flex flex-col items-center gap-6 sm:flex-row md:gap-8">
                <FooterTermsLinks />
                <FooterScrollTopButton />
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
