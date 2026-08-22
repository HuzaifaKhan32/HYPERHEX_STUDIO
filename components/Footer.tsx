'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';
import { Globe, Share2, MessageSquare, ExternalLink } from 'lucide-react';

const EASE = [0.4, 0, 0.2, 1] as const;

const reveal = {
  hidden: { opacity: 0, y: 48 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay, ease: EASE },
  }),
};

const navLinks = [
  { label: 'Home', href: '#' },
  { label: 'Studio', href: '#services' },
  { label: 'Works', href: '#works' },
  { label: 'Case Studies', href: '#case-studies' },
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
    href: '#',
    icon: (
      <svg className="h-3.5 w-3.5 fill-white" viewBox="0 0 24 24">
        <path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036c-2.048 0-2.433.824-2.433 2.2v1.77h3.769l-.491 3.667h-3.278v7.98c-1.802.285-3.57.285-5.373 0z" />
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: '#',
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
    href: '#',
    icon: (
      <svg className="h-3.5 w-3.5 fill-white" viewBox="0 0 24 24">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
];

const companyLinks = [
  { label: 'About Us', href: '#' },
  { label: 'Capabilities', href: '#services' },
  { label: 'Portfolio', href: '#works' },
  { label: 'Industries', href: '#' },
  { label: 'Case Studies', href: '#case-studies' },
  { label: 'Blogs', href: '#' },
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

function FooterLink({ href, children, index }: { href: string; children: string; index: number }) {
  return (
    <motion.li
      custom={0.2 + index * 0.08}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
      variants={reveal}
    >
      <motion.a
        href={href}
        onClick={(e) => {
          if (href.startsWith('#')) {
            e.preventDefault();
            const targetId = href === '#' ? 'home' : href.substring(1);
            if (targetId === 'home') {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
              const elem = document.getElementById(targetId);
              if (elem) {
                elem.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }
            }
          }
        }}
        className="inline-block font-semibold drop-shadow-[0_1px_3px_rgba(10,10,10,0.4)] text-[clamp(14px,1.1vw,17px)] whitespace-nowrap"
        style={{ color: '#F4F4F5' }}
        whileHover={{ x: 6, color: '#15b6e8' }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      >
        {children}
      </motion.a>
    </motion.li>
  );
}

export default function Footer() {
  const [isHoveringText, setIsHoveringText] = useState(false);
  const [localMousePosition, setLocalMousePosition] = useState({ x: 0, y: 0 });

  const handleTextMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setLocalMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div className="w-full overflow-hidden">
      <footer
        className="relative isolate flex w-full flex-col overflow-hidden px-5 pt-20 pb-12 lg:px-16 lg:pt-32 lg:pb-16 2xl:px-24"
        style={{
          borderTopLeftRadius: '45px',
          borderTopRightRadius: '45px',
          backgroundColor: '#090A0F',
        }}
      >
        {/* Phantom Arc Glow Effects */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0"
          style={{
            background:
              'radial-gradient(ellipse 120% 145% at 50% -50%, rgba(0,0,0,0) 40%, rgba(21,182,232,0.15) 75%, rgba(0,0,0,0) 90%)',
            mixBlendMode: 'screen',
          }}
        />

        {/* Footer Main Content Stack */}
        <div className="relative z-10 mx-auto flex w-full max-w-[1400px] flex-col justify-between gap-16 lg:flex-row xl:gap-20">
          {/* Brand Visual Card */}
          <motion.div
            custom={0}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={reveal}
            className="flex max-w-xs flex-col gap-6"
          >
            <motion.div
              whileHover={{ scale: 1.03, rotate: -1 }}
              transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
              className="aspect-[1.79] w-full max-w-[280px] overflow-hidden rounded-[24px] border border-white/10 bg-zinc-900/50 shadow-lg backdrop-blur-sm"
            >
              <div className="relative h-full w-full">
                <Image
                  src="/images/image-3.jpg"
                  alt="HyperHex Studio Visual"
                  width={280}
                  height={156}
                  className="h-full w-full object-cover"
                />
              </div>
            </motion.div>

            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-3">
                <div
                  className="h-2 w-2 rounded-full shadow-[0_0_12px_rgba(21,182,232,0.6)]"
                  style={{ backgroundColor: '#15b6e8' }}
                />
                <span className="text-sm font-medium tracking-wide text-zinc-400">
                  Stay connected
                </span>
              </div>
              <motion.a
                href="mailto:info@hyperhex.studio"
                className="font-bold text-[clamp(18px,1.5vw,24px)]"
                style={{ color: '#F4F4F5' }}
                whileHover={{ x: 6, color: '#15b6e8' }}
                transition={{ duration: 0.3 }}
              >
                info@hyperhex.studio
              </motion.a>
            </div>
          </motion.div>

          {/* Navigation Links Columns */}
          <div className="grid flex-1 grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
            {/* Navigation */}
            <div className="flex flex-col gap-5">
              <span className="font-mono text-xs font-bold tracking-[0.2em] uppercase text-zinc-400">
                Navigation
              </span>
              <ul className="flex flex-col gap-3">
                {navLinks.map((link, index) => (
                  <FooterLink key={link.label} href={link.href} index={index}>
                    {link.label}
                  </FooterLink>
                ))}
              </ul>
            </div>

            {/* Company Section */}
            <div className="flex flex-col gap-5">
              <span className="font-mono text-xs font-bold tracking-[0.2em] uppercase text-zinc-400">
                Company
              </span>
              <ul className="flex flex-col gap-3">
                {companyLinks.map((link, index) => (
                  <FooterLink key={link.label} href={link.href} index={index}>
                    {link.label}
                  </FooterLink>
                ))}
              </ul>
            </div>

            {/* Our Services Section */}
            <div className="flex flex-col gap-5">
              <span className="font-mono text-xs font-bold tracking-[0.2em] uppercase text-zinc-400">
                Our Services
              </span>
              <ul className="flex flex-col gap-3">
                {serviceLinks.map((link, index) => (
                  <FooterLink key={link.label} href={link.href} index={index}>
                    {link.label}
                  </FooterLink>
                ))}
              </ul>
            </div>

            {/* South Asia Operations Section */}
            <div className="flex flex-col gap-5">
              <span className="font-mono text-xs font-bold tracking-[0.2em] uppercase text-zinc-400">
                South Asia Operations
              </span>
              <div className="flex flex-col gap-3 text-[clamp(14px,1.1vw,16px)]">
                <p className="text-zinc-400 whitespace-nowrap">Regional Development Hub</p>
                <p className="text-zinc-400 whitespace-nowrap">Worldwide Project Delivery</p>
                <a href="tel:+923471245257" className="font-bold text-white transition-colors hover:text-[#15b6e8] whitespace-nowrap">
                  +92 3471245257
                </a>
                <a href="tel:+923323141556" className="font-bold text-white transition-colors hover:text-[#15b6e8] whitespace-nowrap">
                  +92 3323141556
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Social Media Links Row Style */}
<div className="relative z-10 mx-auto mt-16 w-full max-w-[1400px]">
  <span className="mb-6 block font-mono text-xs font-bold tracking-[0.2em] uppercase text-zinc-400">
    Social Media
  </span>
  <div className="flex flex-wrap items-center gap-4">
    {socialLinks.map((social) => (
      <motion.a
        key={social.label}
        href={social.href}
        whileHover={{ scale: 1.03, y: -2 }}
        whileTap={{ scale: 0.97 }}
        className="group flex items-center justify-between gap-5 rounded-[22px] bg-[#EFEFEF] px-6 py-3.5 shadow-[0_10px_25px_-5px_rgba(0,0,0,0.3),_inset_0_2px_2px_rgba(255,255,255,1),_inset_0_-2px_4px_rgba(0,0,0,0.1)] transition-all hover:bg-white"
      >
        <span className="font-semibold text-sm text-[#111111]">
          {social.label}
        </span>
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#18181B] shadow-[0_8px_16px_-2px_rgba(0,0,0,0.65),_0_3px_6px_rgba(0,0,0,0.4)] transition-transform group-hover:scale-105">
          {social.icon}
        </div>
      </motion.a>
    ))}
  </div>
</div>

        {/* Fully Responsive HyperHex Kinetic Interactive Title */}
        <div className="relative z-10 mt-16 lg:mt-24 flex w-full flex-col items-center justify-center select-none overflow-visible">
          <div
            className="pointer-events-auto relative flex w-full flex-col items-center cursor-pointer"
            onMouseEnter={() => setIsHoveringText(true)}
            onMouseLeave={() => setIsHoveringText(false)}
            onMouseMove={handleTextMouseMove}
          >
            {isHoveringText && (
              <div
                className="pointer-events-none absolute"
                style={{
                  width: '350px',
                  height: '350px',
                  left: `${localMousePosition.x - 175}px`,
                  top: `${localMousePosition.y - 175}px`,
                  background:
                    'radial-gradient(circle, rgba(21, 182, 232, 0.35) 0%, rgba(21, 182, 232, 0.15) 30%, transparent 70%)',
                  filter: 'blur(20px)',
                  zIndex: 0,
                }}
              />
            )}

            <div className="relative z-10 flex w-full flex-col items-center px-2">
              <h1
                className="w-full text-center font-black uppercase tracking-[-0.02em] whitespace-nowrap"
                style={{
                  fontFamily: 'var(--font-syne), sans-serif',
                  fontSize: 'clamp(32px, 8.5vw, 120px)',
                  lineHeight: 0.85,
                  color: '#F4F4F5',
                }}
              >
                HYPERHEX
              </h1>
              <div className="flex w-full justify-end pr-[4%] sm:pr-[8%] mt-2">
                <h2
                  className="font-bold uppercase tracking-[-0.01em] whitespace-nowrap"
                  style={{
                    fontFamily: 'var(--font-syne), sans-serif',
                    fontSize: 'clamp(16px, 4.2vw, 60px)',
                    lineHeight: 0.85,
                    color: '#F4F4F5',
                  }}
                >
                  STUDIOS
                </h2>
              </div>
            </div>

            {isHoveringText && (
              <div
                className="pointer-events-none absolute inset-0 z-20 flex flex-col items-center overflow-visible"
                style={{
                  clipPath: `circle(175px at ${localMousePosition.x}px ${localMousePosition.y}px)`,
                }}
              >
                <h1
                  className="w-full text-center font-black uppercase tracking-[-0.02em] whitespace-nowrap"
                  style={{
                    fontFamily: 'var(--font-syne), sans-serif',
                    fontSize: 'clamp(32px, 8.5vw, 120px)',
                    lineHeight: 0.85,
                    color: '#15b6e8',
                  }}
                >
                  HYPERHEX
                </h1>
                <div className="flex w-full justify-end pr-[4%] sm:pr-[8%] mt-2">
                  <h2
                    className="font-bold uppercase tracking-[-0.01em] whitespace-nowrap"
                    style={{
                      fontFamily: 'var(--font-syne), sans-serif',
                      fontSize: 'clamp(16px, 4.2vw, 60px)',
                      lineHeight: 0.85,
                      color: '#15b6e8',
                    }}
                  >
                    STUDIOS
                  </h2>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Bar: Copyright & Terms Policy */}
        <div className="relative z-10 mx-auto mt-12 flex w-full max-w-[1400px] flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 sm:flex-row">
          <p className="text-sm font-medium text-zinc-400">
            © 2026 HyperHex Studio. All Rights Reserved
          </p>
          <div className="flex gap-8 text-sm font-medium">
            {['Terms of Use', 'Privacy Policy'].map((label) => (
              <motion.a
                key={label}
                href="#"
                className="text-sm font-medium text-zinc-400"
                whileHover={{ y: -2, color: '#15b6e8' }}
                transition={{ duration: 0.25 }}
              >
                {label}
              </motion.a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}