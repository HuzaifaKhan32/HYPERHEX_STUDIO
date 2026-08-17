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
    { id: 'studio', label: 'Studio', href: '#services' },
    { id: 'works', label: 'Works', href: '#works' },
    { id: 'blog', label: 'Blog', href: '#blog' },
  ];

  return (
    <header className="fixed top-0 z-50 flex w-full justify-center px-5 pt-4 sm:px-8 md:px-12 md:pt-5">
      <motion.div
        // animate={{
        //   backgroundColor: scrolled ? 'rgba(255,255,255,0.82)' : 'rgba(255,255,255,0)',
        //   boxShadow: scrolled ? '0 8px 32px rgba(10,10,10,0.08)' : '0 0 0 rgba(0,0,0,0)',
        // }}
        transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
        className={`flex w-full max-w-[1280px] items-center justify-between rounded-full px-2 py-1 ${
          scrolled ? 'backdrop-blur-md' : ''
        }`}
      >
        <motion.div
          className="flex cursor-pointer items-center gap-2"
          onHoverStart={() => setIsLogoHovered(true)}
          onHoverEnd={() => setIsLogoHovered(false)}
        >
          <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full border border-outline-variant/30 bg-background">
            <Image
              src="/logo/hyperhex-logo-H.png"
              alt="HyperHex Logo"
              width={48}
              height={48}
              className="object-contain"
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
            <div className="whitespace-nowrap rounded-full px-4 py-2" style={{ backgroundColor: 'var(--color-void)' }}>
              <span className="font-[family-name:var(--font-syne)] text-sm font-bold tracking-tight uppercase" style={{ color: 'var(--color-accent)' }}>
                HYPERHex Studio
              </span>
            </div>
          </motion.div>
        </motion.div>

        <nav className="hidden h-13 items-center gap-2 rounded-full border border-outline-variant/30 bg-surface-container-low/80 p-1 shadow-[0_4px_10px_rgba(0,0,0,0.25)] backdrop-blur-2xl md:flex">
  {links.map((link) => {
    const isActive = activeLink === link.id;

    return (
      <Link
        key={link.id}
        href={link.href}
        onClick={() => setActiveLink(link.id)}
        aria-current={isActive ? 'page' : undefined}
        className={`relative flex items-center gap-2 rounded-full px-4 py-2 font-[family-name:var(--font-dm-sans)] transition-colors duration-200 ${
          isActive ? 'text-[var(--color-paper)]' : 'text-[var(--color-mist)]'
        }`}
      >
        {isActive && (
          <motion.span
            layoutId="nav-active-pill"
            className="absolute inset-0 rounded-full border-b-2 border-white/10 border-b-[#3e3e3e] bg-gradient-to-b from-[#0a0a0a] to-[#616161] shadow-[inset_0_2px_4px_rgba(0,0,0,0.4),0_1px_0_rgba(255,255,255,0.1)]"
            transition={{ type: 'spring', stiffness: 420, damping: 32 }}
          />
        )}
        <span className="relative z-10 flex items-center gap-2 py-1 text-xs font-bold tracking-tight uppercase">
          {isActive && (
            <span className="h-2 w-2 rounded-full bg-[var(--color-accent)]" />
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
    </header>
  );
}
