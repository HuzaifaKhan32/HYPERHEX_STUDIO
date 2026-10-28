'use client';

import { motion, useReducedMotion } from 'framer-motion';
import SectionPill from '@/components/ui/SectionPill';

const SMOOTH_EASE = [0.22, 1, 0.36, 1] as const;

export default function ContactPreHeaderBanner() {
  const shouldReduceMotion = useReducedMotion();

  const scrollToContact = () => {
    const contactEl = document.getElementById('contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.14,
        delayChildren: 0.05,
      },
    },
  };

  const revealVariants = {
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : -24,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: SMOOTH_EASE,
      },
    },
  };

  return (
    <section className="w-full pt-12 sm:pt-16 md:pt-24 pb-4 px-4 sm:px-6 md:px-12 flex flex-col items-center justify-center text-center select-none overflow-hidden">
      <motion.div
        className="flex flex-col items-center gap-3 select-none text-center w-full max-w-7xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.18 }}
      >
        {/* Section Badge Pill */}
        <motion.div variants={revealVariants}>
          <SectionPill label="Ready To Start?" />
        </motion.div>

        {/* Heading — Reverse Pyramid */}
        <h2
          className="flex flex-col items-center text-center font-black tracking-tight uppercase"
          style={{ fontFamily: 'var(--font-zalando-expanded, sans-serif)' }}
        >
          {/* Tier 1 — Top Base of Inverted Pyramid (Largest, No Hyphen) */}
          <motion.span
            variants={revealVariants}
            className="text-[#161d1e] tracking-tight uppercase text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-5xl 2xl:text-6xl leading-tight"
          >
            Enough scrolling
          </motion.span>

          {/* Tier 2 — Middle Tier */}
          <motion.span
            variants={revealVariants}
            className="text-[#161d1e] tracking-tight uppercase text-lg sm:text-2xl md:text-3xl lg:text-4xl xl:text-4xl 2xl:text-5xl leading-tight my-1 sm:my-1.5 md:my-2"
          >
            let&apos;s build something
          </motion.span>

          {/* Tier 3 — Tip of Inverted Pyramid with Signature Cyan Gradient */}
          <motion.span
            variants={revealVariants}
            className="tracking-wider uppercase bg-gradient-to-b from-[#15b6e8] to-[#15b6e8]/40 bg-clip-text text-transparent text-sm sm:text-xl md:text-2xl lg:text-3xl xl:text-3xl 2xl:text-4xl leading-tight pb-1"
          >
            great together.
          </motion.span>
        </h2>
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
