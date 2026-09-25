'use client';

import { motion } from 'framer-motion';
import SectionPill from '@/components/ui/SectionPill';

export default function ContactPreHeaderBanner() {
  const scrollToContact = () => {
    const contactEl = document.getElementById('contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="w-full pt-16 md:pt-24 pb-4 px-4 sm:px-6 md:px-12 flex flex-col items-center justify-center text-center select-none overflow-hidden">
      {/* Section Badge Pill */}
      <div className="mb-6">
        <SectionPill label="Ready To Start?" />
      </div>

      {/* Inverted Pyramid Heading */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col items-center justify-center font-black tracking-tight leading-none max-w-5xl mx-auto"
        style={{ fontFamily: 'var(--font-zalando-expanded, sans-serif)' }}
      >
        {/* Line 1 — Largest font size, strictly on one line */}
        <span
          className="text-[#161d1e] tracking-tight uppercase whitespace-nowrap"
          style={{ fontSize: 'clamp(1.75rem, 5.5vw, 6.2rem)', lineHeight: 1 }}
        >
          Enough scrolling—
        </span>

        {/* Line 2 — Medium font size */}
        <span
          className="text-[#161d1e] tracking-tight uppercase whitespace-nowrap my-2 md:my-3"
          style={{ fontSize: 'clamp(1.35rem, 4.2vw, 4.4rem)', lineHeight: 1 }}
        >
          let&apos;s build something
        </span>

        {/* Line 3 — Smallest font size with cyan gradient accent */}
        <span
          className="bg-gradient-to-b from-[#15b6e8] via-[#0ea5e9] to-[#0c86ac] bg-clip-text text-transparent tracking-wider uppercase whitespace-nowrap"
          style={{ fontSize: 'clamp(1.15rem, 3.2vw, 3.4rem)', lineHeight: 1 }}
        >
          great together.
        </span>
      </motion.div>

      {/* Reverse Pyramid Scroll Down Indicator */}
      <motion.button
        onClick={scrollToContact}
        aria-label="Scroll to contact form"
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.6 }}
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.9 }}
        className="mt-8 md:mt-12 group cursor-pointer flex flex-col items-center gap-1 focus:outline-none"
      >
        {/* Reverse Pyramid Triple Chevron Stack */}
        <div className="flex flex-col items-center justify-center gap-[3px]">
          {/* Top wide chevron */}
          <motion.svg
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            className="w-8 h-4 text-[#15b6e8] group-hover:text-[#0c86ac] transition-colors"
            viewBox="0 0 24 12"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M2 2l10 8 10-8" />
          </motion.svg>

          {/* Middle medium chevron */}
          <motion.svg
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut', delay: 0.15 }}
            className="w-6 h-3 text-[#15b6e8]/80 group-hover:text-[#0c86ac] transition-colors"
            viewBox="0 0 24 12"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M2 2l10 8 10-8" />
          </motion.svg>

          {/* Bottom narrow chevron point */}
          <motion.svg
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
            className="w-4 h-2.5 text-[#15b6e8]/60 group-hover:text-[#0c86ac] transition-colors"
            viewBox="0 0 24 12"
            fill="none"
            stroke="currentColor"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M2 2l10 8 10-8" />
          </motion.svg>
        </div>
      </motion.button>
    </section>
  );
}
