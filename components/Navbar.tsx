'use client';

import Link from 'next/link';
import { motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { useState } from 'react';
import Image from 'next/image';
import Button3D from './Button3D';

export default function Navbar() {
  const [activeLink, setActiveLink] = useState('home');
  const [isLogoHovered, setIsLogoHovered] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrolled(latest > 48);
  });

  const links = [
    { id: 'home', label: 'Home', href: '#' },
    { id: 'services', label: 'Services', href: '#services' },
    { id: 'works', label: 'Works', href: '#works' },
    { id: 'case-studies', label: 'Case Studies', href: '#case-studies' },
  ];

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
      className={`fixed left-0 right-0 z-50 flex w-full justify-center transition-all duration-350 ${
        scrolled
          ? 'top-2 md:top-3 px-4 sm:px-8 md:px-12 2xl:px-16'
          : 'top-2 sm:top-3 px-5 sm:px-8 md:px-12 2xl:px-16'
      }`}
    >
      <motion.div
        transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
        className={`flex w-full max-w-[1280px] xl:max-w-[1400px] 2xl:max-w-none items-center justify-between px-2 py-2 md:py-3 transition-all duration-350 ${
          scrolled 
            ? 'bg-white rounded-xl border-2 border-accent shadow-[0_6px_0_0_rgba(21,182,232,1)] backdrop-blur-md' 
            : 'bg-transparent rounded-xl'
        }`}
      >
        <motion.div
          className="flex cursor-pointer items-center gap-2 2xl:gap-3"
          onHoverStart={() => setIsLogoHovered(true)}
          onHoverEnd={() => setIsLogoHovered(false)}
        >
          <div className="relative z-10 flex h-12 w-12 2xl:h-16 2xl:w-16 shrink-0 items-center justify-center overflow-hidden rounded-full border border-outline-variant/30 bg-background">
            <Image
              src="/logo/hyperhex-logo-H.png"
              alt="HyperHex Logo"
              fill
              className="object-cover rounded-full"
            />
          </div>
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{
              width: isLogoHovered ? 'auto' : 0,
              opacity: isLogoHovered ? 1 : 0,
            }}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            className="hidden overflow-hidden sm:block"
          >
            <div className="whitespace-nowrap rounded-full px-4 py-2 2xl:px-6 2xl:py-3" style={{ backgroundColor: 'var(--color-void)' }}>
              <span className="font-[family-name:var(--font-syne)] text-sm 2xl:text-base font-bold tracking-tight uppercase" style={{ color: 'var(--color-accent)' }}>
                HYPERHex Studio
              </span>
            </div>
          </motion.div>
        </motion.div>

        <nav className="hidden items-center gap-2 2xl:gap-3 rounded-full border border-outline-variant/30 bg-surface-container-low/80 p-1 2xl:p-1.5 shadow-[0_14px_30px_-3px_rgba(0,0,0,0.35)] backdrop-blur-2xl md:flex">
  {links.map((link) => {
  const isActive = activeLink === link.id;

  return (
    <Link
      key={link.id}
      href={link.href}
      onClick={(e) => {
        setActiveLink(link.id);
        if (link.href.startsWith('#')) {
          e.preventDefault();
          const targetId = link.href === '#' ? 'home' : link.href.substring(1);
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
      aria-current={isActive ? 'page' : undefined}
      className={`relative flex items-center gap-2 rounded-full px-4 py-2 2xl:px-6 2xl:py-3 font-[family-name:var(--font-dm-sans)] transition-colors duration-200 ${
        isActive ? 'text-[var(--color-paper)]' : 'text-[var(--color-mist)]'
      }`}
    >
      {isActive && (
        <motion.span
          layoutId="nav-active-pill"
          className="absolute inset-0 rounded-full border-t border-b-2 border-t-white/10 border-b-[#3e3e3e] bg-gradient-to-b from-[#0a0a0a] to-[#616161] shadow-[inset_0_2px_4px_rgba(0,0,0,0.4),0_1px_0_rgba(255,255,255,0.1)]"
          transition={{ type: 'spring', stiffness: 420, damping: 32 }}
        />
      )}
      <span className="relative z-10 flex items-center gap-2 2xl:gap-3 py-1 2xl:py-1.5 text-xs 2xl:text-sm font-bold tracking-tight uppercase">
        {isActive && (
          <span className="h-2 w-2 2xl:h-2.5 2xl:w-2.5 rounded-full bg-[var(--color-accent)]" />
        )}
        {link.label}
      </span>
    </Link>
  );
})}
</nav>

        <Button3D href="#contact" className="hidden sm:flex">
          Contact Us
        </Button3D>
      </motion.div>
    </motion.header>
  );
}
