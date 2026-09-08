'use client';

// Mobile menu with hamburger button and animated drawer
import { motion, AnimatePresence, useMotionValueEvent, useScroll } from 'framer-motion';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Button3D from './Button3D';

type NavLink = {
  id: string;
  label: string;
  href: string;
};

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

function MobileMenuDrawer({ isOpen, onClose, links }: { isOpen: boolean; onClose: () => void; links: NavLink[] }) {
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
                      src="/logo/hyperhex-logo-H.avif"
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

                {/* Close button */}
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

export default function NavbarMobileMenu({ links }: { links: NavLink[] }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrolled((prev) => (prev ? latest > 24 : latest > 48));
    if (latest > 80 && menuOpen) setMenuOpen(false);
  });

  // Lock body scroll when menu is open
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

  return (
    <>
      {/* Hamburger button — mobile only */}
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

      {/* Mobile drawer */}
      <div id="mobile-menu">
        <MobileMenuDrawer isOpen={menuOpen} onClose={() => setMenuOpen(false)} links={links} />
      </div>
    </>
  );
}
