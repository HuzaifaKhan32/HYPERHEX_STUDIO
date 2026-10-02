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
  { label: 'About Us', href: '/about' },
  { label: 'Portfolio', href: '#works' },
  { label: 'Case Studies', href: '#case-studies' },
  { label: 'Contact', href: '/contact' },
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
    label: 'Whatsapp',
    href: 'https://wa.me/+923128881435',
    icon: (
    <svg className="h-12 w-7 fill-white" viewBox="0 0 512 512" preserveAspectRatio="xMidYMid meet" role="img" aria-label="whatsapp-black-white">
    <path d="M 469.257812 250.492188 C 469.257812 365.242188 375.507812 458.269531 259.839844 458.269531 C 223.132812 458.269531 188.652344 448.878906 158.636719 432.4375 L 42.703125 469.257812 L 80.492188 357.746094 C 61.4375 326.449219 50.460938 289.703125 50.460938 250.476562 C 50.476562 135.726562 144.199219 42.703125 259.867188 42.703125 C 375.523438 42.730469 469.257812 135.742188 469.257812 250.492188 Z M 259.824219 75.832031 C 162.753906 75.832031 83.789062 154.199219 83.789062 250.535156 C 83.789062 288.757812 96.253906 324.140625 117.324219 352.933594 L 95.347656 417.792969 L 162.976562 396.304688 C 190.792969 414.550781 224.078125 425.179688 259.824219 425.179688 C 356.898438 425.179688 435.886719 346.828125 435.886719 250.492188 C 435.917969 154.199219 356.910156 75.832031 259.824219 75.832031 Z M 365.589844 298.355469 C 364.285156 296.253906 360.863281 294.972656 355.742188 292.414062 C 350.636719 289.855469 325.367188 277.546875 320.679688 275.875 C 315.949219 274.164062 312.527344 273.304688 309.105469 278.40625 C 305.726562 283.511719 295.878906 294.972656 292.859375 298.394531 C 289.867188 301.804688 286.878906 302.234375 281.746094 299.71875 C 276.613281 297.128906 260.0625 291.789062 240.449219 274.445312 C 225.191406 260.925781 214.882812 244.273438 211.90625 239.167969 C 208.890625 234.078125 211.601562 231.324219 214.148438 228.792969 C 216.441406 226.5 219.28125 222.839844 221.851562 219.851562 C 224.425781 216.886719 225.273438 214.785156 226.984375 211.378906 C 228.667969 207.972656 227.820312 205.007812 226.554688 202.433594 C 225.273438 199.875 215.023438 174.839844 210.726562 164.644531 C 206.457031 154.460938 202.183594 156.144531 199.179688 156.144531 C 196.191406 156.144531 192.769531 155.726562 189.347656 155.726562 C 185.925781 155.726562 180.363281 156.964844 175.675781 162.070312 C 170.988281 167.175781 157.71875 179.484375 157.71875 204.550781 C 157.71875 229.640625 176.089844 253.832031 178.664062 257.222656 C 181.25 260.605469 214.1875 313.722656 266.363281 334.113281 C 318.5625 354.492188 318.5625 347.691406 327.964844 346.828125 C 337.398438 345.964844 358.34375 334.519531 362.601562 322.640625 C 366.882812 310.707031 366.882812 300.480469 365.589844 298.355469 Z M 365.589844 298.355469"></path>
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
        <div className="relative z-10 mx-auto flex w-full max-w-[1280px] xl:max-w-[1400px] 2xl:max-w-none flex-col justify-between gap-16 px-5 pt-20 pb-16 lg:flex-row lg:px-16 lg:pt-32 lg:pb-24 xl:gap-24 2xl:px-24">

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
            <div className="mx-auto flex max-w-[1280px] xl:max-w-[1400px] 2xl:max-w-none flex-col items-center overflow-hidden bg-[#EDECEC] rounded-[45px] px-6 pt-10 pb-12 sm:pt-12 sm:pb-16 shadow-xl">
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
            <div className="relative z-10 mx-auto mt-12 flex w-full max-w-[1280px] xl:max-w-[1400px] 2xl:max-w-none flex-col items-center justify-between gap-6 border-t border-white/10 pt-6 md:flex-row">
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
