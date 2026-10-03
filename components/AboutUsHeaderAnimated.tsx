'use client';

// Animated header with badge and heading blur reveal from upside
import { motion, useReducedMotion } from 'framer-motion';
import SectionPill from '@/components/ui/SectionPill';

// Ultra-smooth custom cubic-bezier ease for silky entrance from above
const SMOOTH_EASE = [0.22, 1, 0.36, 1] as const;

export default function AboutUsHeaderAnimated() {
  const shouldReduceMotion = useReducedMotion();

  const revealVariants = {
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : -36,
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

  const headerContainerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.14,
        delayChildren: 0.05,
      },
    },
  };

  return (
    <motion.div
      className="flex w-full flex-col items-center justify-center text-center gap-3"
      variants={headerContainerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.18 }}
    >
      <motion.div variants={revealVariants}>
        <SectionPill label="About HyperHex" />
      </motion.div>

      <h2
        className="flex flex-col items-center text-center text-5xl md:text-7xl lg:text-8xl 2xl:text-9xl font-black tracking-tight"
        style={{ fontFamily: 'var(--font-zalando-expanded, sans-serif)' }}
      >
        <motion.span variants={revealVariants} className="tracking-wide">
          We Build What&apos;s
        </motion.span>
        <motion.span
          variants={revealVariants}
          className="tracking-wider bg-gradient-to-b from-[#15b6e8] to-transparent bg-clip-text text-transparent"
        >
          Imagined
        </motion.span>
      </h2>
    </motion.div>
  );
}



