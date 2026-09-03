'use client';

import Link from 'next/link';
import { motion, AnimatePresence, useMotionValueEvent, useScroll } from 'framer-motion';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Button3D from './Button3D';
// import { ThemeToggle } from './ThemeToggle';

// ── Animated hamburger → X ─────────────────────────────────────────────────
function HamburgerIcon({ isOpen, scrolled }: { isOpen: boolean; scrolled: boolean }) {
  return (
    <div className="flex flex-col justify-center items-center w-6 h-6 gap-[5px]">
      <motion.span
        className="block h-[2px] w-6 rounded-full origin-center"
        animate={{
          rotate: isOpen ? 45 : 0,
          y: isOpen ? 7 : 0,
          backgroundColor: scrolled || isOpen ? 'var(--color-on-surface)' : '#ffffff',
        }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      />
      <motion.span
        className="block h-[2px] rounded-full origin-center"
        animate={{
          opacity: isOpen ? 0 : 1,
          scaleX: isOpen ? 0 : 1,
          backgroundColor: scrolled || isOpen ? 'var(--color-on-surface)' : '#ffffff',
          width: 18,
        }}
        transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
      />
      <motion.span
        className="block h-[2px] w-6 rounded-full origin-center"
        animate={{
          rotate: isOpen ? -45 : 0,
          y: isOpen ? -7 : 0,
          backgroundColor: scrolled || isOpen ? 'var(--color-on-surface)' : '#ffffff',
        }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      />
    </div>
  );
}

// ── Mobile drawer ──────────────────────────────────────────────────────────
function MobileMenu({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const links = [
    { id: 'home',         label: 'Home',         href: '#'             },
    { id: 'services',     label: 'Services',     href: '#services'     },
    { id: 'works',        label: 'Works',        href: '#works'        },
    { id: 'case-studies', label: 'Case Studies', href: '#case-studies' },
  ];

  const handleNav = (href: string) => {
    onClose();
    if (href === '#') { window.scrollTo({ top: 0, behavior: 'smooth' }); return; }
    document.getElementById(href.replace('#', ''))?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            className="fixed inset-0 z-40 bg-black/25 backdrop-blur-[2px] md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            key="panel"
            className="fixed left-0 right-0 z-50 md:hidden"
            style={{ top: 0 }}
            initial={{ opacity: 0, y: -20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0,   scale: 1    }}
            exit={{   opacity: 0, y: -20, scale: 0.97 }}
            transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
          >
            <div
              className="mx-3 mt-3 rounded-2xl border border-outline-variant/30 overflow-hidden"
              style={{
                background: 'var(--color-surface)',
                boxShadow: '0 8px 40px var(--color-surface-dim), 0 2px 8px var(--color-surface-dim)',
                backdropFilter: 'blur(24px)',
                WebkitBackdropFilter: 'blur(24px)',
              }}
            >
              {/* Panel top bar */}
              <div className="flex items-center justify-between px-4 pt-4 pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="relative h-9 w-9 rounded-full overflow-hidden border border-black/10">
                    <Image
                      src="/logo/hyperhex-logo-H.png"
                      alt="HyperHex"
                      fill
                      sizes="36px"
                      quality={90}
                      className="object-contain"
                    />
                  </div>
                  <span
                    className="font-black uppercase tracking-[-0.04em] text-base"
                    style={{ fontFamily: 'var(--font-syne, sans-serif)', color: 'var(--color-on-surface)' }}
                  >
                    HyperHex Studio
                  </span>
                </div>

                {/* Close — always dark since panel is white */}
                <button
                  onClick={onClose}
                  aria-label="Close menu"
                  className="flex items-center justify-center w-8 h-8 rounded-full bg-black/[0.05] hover:bg-black/10 transition-colors duration-200"
                >
                  <HamburgerIcon isOpen={true} scrolled={true} />
                </button>
              </div>

              {/* Hairline */}
              <div className="h-px mx-4 bg-black/[0.07]" />

              {/* Nav links */}
              <nav className="flex flex-col px-3 pt-2 pb-2">
                {links.map((link, i) => (
                  <motion.button
                    key={link.id}
                    onClick={() => handleNav(link.href)}
                    className="group flex items-center justify-between w-full px-4 py-3.5 rounded-xl text-left font-bold text-[15px] text-on-surface/75 hover:text-on-surface hover:bg-inverse-surface/5 transition-all duration-200 uppercase tracking-tight"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1,  x: 0   }}
                    transition={{ delay: 0.06 + i * 0.055, duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
                  >
                    <span>{link.label}</span>
                    <svg
                      className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                      style={{ color: 'var(--color-accent)' }}
                      fill="none" viewBox="0 0 24 24" stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </motion.button>
                ))}
              </nav>

              {/* Hairline */}
              <div className="h-px mx-4 bg-black/[0.07]" />

              {/* CTA row */}
              <motion.div
                className="flex items-center justify-center gap-3 px-4 py-4"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1,  y: 0 }}
                transition={{ delay: 0.28, duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              >
                <Button3D
                  href="#contact"
                  onClick={onClose}
                  className="flex-1 justify-center"
                >
                  Contact Us
                </Button3D>
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// ── Main Navbar ────────────────────────────────────────────────────────────
export default function Navbar() {
  const [activeLink, setActiveLink] = useState('home');
  const [isLogoHovered, setIsLogoHovered] = useState(false); // ← restored
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrolled(latest > 48);
    // Close menu when user scrolls past threshold
    if (latest > 80 && menuOpen) setMenuOpen(false);
  });

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setMenuOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const links = [
    { id: 'home',         label: 'Home',         href: '#'             },
    { id: 'services',     label: 'Services',     href: '#services'     },
    { id: 'works',        label: 'Works',        href: '#works'        },
    { id: 'case-studies', label: 'Case Studies', href: '#case-studies' },
  ];

  return (
    <>
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
              ? 'bg-surface rounded-xl border-2 border-accent shadow-[0_6px_0_0_rgba(21,182,232,1)] backdrop-blur-md'
              : 'bg-transparent rounded-xl'
          }`}
        >

          {/* ── Logo with hover-expand text ── */}
          <motion.div
            className="group flex cursor-pointer items-center gap-5"
            onHoverStart={() => setIsLogoHovered(true)}
            onHoverEnd={() => setIsLogoHovered(false)}
          >
            <Link
              href="#"
              onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              aria-label="HyperHex Studio — back to top"
              className="relative z-10 flex h-11 w-11 2xl:h-14 2xl:w-14 shrink-0 items-center justify-center overflow-hidden rounded-full border border-white/20 bg-black/10 hover:scale-105 transition-transform duration-200"
            >
              <Image
                src="/logo/hyperhex-logo-H.png"
                alt="HyperHex Logo"
                fill
                sizes="56px"
                quality={90}
                className="object-cover rounded-full"
              />
            </Link>

            {/* Slide-out label — desktop only so it never fights the hamburger */}
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{
                width: isLogoHovered ? 'auto' : 0,
                opacity: isLogoHovered ? 1 : 0,
              }}
              transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
              className="hidden overflow-hidden sm:inline-flex shrink-0"
            >
              {/* Button3D-styled label badge — visual only, logo Link above is the click target */}
              <div className="relative inline-flex items-center gap-3 rounded-[100px] py-1.5 pl-4 pr-1.5 pointer-events-none select-none shrink-0 whitespace-nowrap">

                {/* Base Ring — 3D bottom edge */}
                <div
                  className="absolute inset-0 z-0 rounded-[100px]"
                  style={{ background: 'linear-gradient(180deg, #6cdcfb 0%, #0d8ec4 100%)' }}
                />

                {/* Main cyan body with inner highlight */}
                <div
                  className="absolute inset-[1px] z-0 rounded-[100px]"
                  style={{
                    backgroundColor: '#15b6e8',
                    boxShadow: 'rgba(255, 255, 255, 0.4) 0px 4px 6px 0px inset',
                  }}
                />

                {/* Content */}
                <div className="relative z-10 flex items-center justify-between gap-3">
                  {/* Rolling text */}
                  <div className="relative overflow-hidden py-0.5">
                    <div className="flex items-center transition-transform duration-500 ease-in-out group-hover:-translate-y-full">
                      <span className="flex items-center gap-2 font-[family-name:var(--font-dm-sans)] text-xs font-bold uppercase tracking-wide text-white">
                        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-white" />
                        HYPERHex Studio
                      </span>
                    </div>
                    <div className="absolute left-0 top-full flex h-full w-full items-center transition-transform duration-500 ease-in-out group-hover:-translate-y-full">
                      <span className="flex items-center gap-2 font-[family-name:var(--font-dm-sans)] text-xs font-bold uppercase tracking-wide text-white">
                        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-white" />
                        HYPERHex Studio
                      </span>
                    </div>
                  </div>

                  {/* Icon puck */}
                  <div
                    className="relative flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full"
                    style={{
                      backgroundColor: 'rgb(255, 255, 255)',
                      boxShadow: 'rgba(255, 255, 255, 0.3) 0px 4px 6px 0px',
                    }}
                  >
                    <div className="flex h-full w-full items-center justify-center transition-transform duration-500 ease-in-out group-hover:-translate-x-full">
                      <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none">
                        <path d="M7 17L17 7M17 7H8M17 7V16" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <div className="absolute left-full top-0 flex h-full w-full items-center justify-center transition-transform duration-500 ease-in-out group-hover:-translate-x-full">
                      <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none">
                        <path d="M7 17L17 7M17 7H8M17 7V16" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </div>
                </div>

              </div>
            </motion.div>
          </motion.div>

          {/* ── Desktop nav pill ── */}
<nav className="hidden items-center gap-2 2xl:gap-3 max-w-full rounded-[100px] p-1 2xl:p-1.5 backdrop-blur-2xl md:flex" style={{ backgroundColor: 'rgba(0,0,0,0.04)', boxShadow: '0px 5px 6px 0px rgba(0,0,0,0.1),0px 24px 20px 0px rgba(0,0,0,0.12),0px 3px 0px 0px #F5F5F5' }}>
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
              document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          }
        }}
        aria-current={isActive ? 'page' : undefined}
        className={`relative flex items-center gap-2 rounded-full px-4 py-2 2xl:px-6 2xl:py-3 font-[family-name:var(--font-dm-sans)] transition-colors duration-200 ${
          isActive ? 'text-[var(--color-paper)]' : 'text-[#4a4a4a] hover:text-black'
        }`}
      >
        {isActive && (
          <motion.span
            layoutId="nav-active-pill"
            className="absolute inset-0 rounded-full border-t border-b-2 border-t-white/10 border-b-[#3e3e3e] bg-gradient-to-b from-[#0a0a0a] to-[#616161] shadow-[inset_0_2px_4px_rgba(0,0,0,0.4),_0_1px_0_rgba(255,255,255,0.1)]"
            transition={{ type: 'spring', stiffness: 420, damping: 32 }}
          />
        )}
        <span className="relative z-10 flex items-center gap-2 2xl:gap-3 py-1 2xl:py-1.5 text-xs 2xl:text-sm font-bold tracking-tight uppercase">
          {isActive && <span className="h-2 w-2 2xl:h-2.5 2xl:w-2.5 rounded-full bg-[var(--color-accent)]" />}
          {link.label}
        </span>
      </Link>
    );
  })}
</nav>

          {/* ── Right side ── */}
          <div className="flex items-center gap-4">
            {/* Theme Toggle — desktop only */}
            {/* <div className="hidden md:flex">
              <ThemeToggle />
            </div> */}

            {/* Contact — desktop only */}
            <div className="hidden md:flex">
              <Button3D href="#contact">
                Contact Us
              </Button3D>
            </div>

            {/* Hamburger — mobile only */}
            <button
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              className={`flex md:hidden items-center justify-center w-10 h-10 rounded-xl transition-colors duration-200 ${
                scrolled || menuOpen ? 'hover:bg-inverse-surface/10' : 'hover:bg-white/10'
              }`}
            >
              <HamburgerIcon isOpen={menuOpen} scrolled={scrolled} />
            </button>
          </div>

        </motion.div>
      </motion.header>

      {/* Mobile drawer */}
      <div id="mobile-menu">
        <MobileMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
      </div>
    </>
  );
}