'use client';

import { motion, useReducedMotion } from 'framer-motion';
import SectionPill from '@/components/ui/SectionPill';

const SMOOTH_EASE = [0.22, 1, 0.36, 1] as const;

export default function ServicesHeaderAnimated() {
  const shouldReduceMotion = useReducedMotion();

  const revealVariants = {
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : -36,
      filter: shouldReduceMotion ? 'none' : 'blur(12px)',
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.7,
        ease: SMOOTH_EASE,
      },
    },
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

  return (
    <motion.div
      className="flex flex-col items-center gap-3 select-none text-center"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.18 }}
    >
      <motion.div variants={revealVariants}>
        <SectionPill label="SERVICES" />
      </motion.div>

      <h2
        className="flex flex-col items-center text-center text-4xl sm:text-5xl md:text-6xl lg:text-7xl 2xl:text-8xl font-black tracking-tight"
        style={{ fontFamily: 'var(--font-zalando-expanded, sans-serif)' }}
      >
        <motion.span variants={revealVariants} className="text-[#161d1e] tracking-wide">
          Design. Build.
        </motion.span>
        <motion.span
          variants={revealVariants}
          className="tracking-wider bg-gradient-to-b from-[#15b6e8] to-transparent bg-clip-text text-transparent"
        >
          Grow.
        </motion.span>
      </h2>

      <motion.p
        variants={revealVariants}
        className="text-[#3b494c] font-medium text-center max-w-lg xl:max-w-xl text-xs md:text-sm xl:text-base leading-relaxed"
      >
        We craft digital experiences and products that look great, perform better, and grow your brand.
      </motion.p>
    </motion.div>
  );
}
