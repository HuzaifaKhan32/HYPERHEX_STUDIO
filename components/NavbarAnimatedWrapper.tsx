'use client';

// Handles header-level animations: slide-in and scroll-based background
import { motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { useState, type ReactNode } from 'react';

export default function NavbarAnimatedWrapper({ children }: { children: ReactNode }) {
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (latest) => {
    // Hysteresis to prevent flicker
    setScrolled((prev) => (prev ? latest > 24 : latest > 48));
  });

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
        className={`flex w-full max-w-[1280px] xl:max-w-[1400px] 2xl:max-w-none items-center justify-between px-2 py-2 md:py-3 rounded-xl transition-[background-color,border-color] duration-350 ease-out ${
          scrolled
            ? 'bg-surface border-2 border-accent shadow-[0_6px_0_0_rgba(21,182,232,1)] backdrop-blur-md'
            : 'bg-transparent border-2 border-transparent'
        }`}
      >
        {children}
      </motion.div>
    </motion.header>
  );
}
