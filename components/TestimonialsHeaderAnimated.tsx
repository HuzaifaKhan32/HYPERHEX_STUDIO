'use client';

import { motion, useReducedMotion } from 'framer-motion';
import SectionPill from '@/components/ui/SectionPill';

const SMOOTH_EASE = [0.22, 1, 0.36, 1] as const;

export default function TestimonialsHeaderAnimated() {
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
      className="flex flex-col items-center text-center gap-3 mb-8"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.18 }}
    >
      <motion.div variants={revealVariants}>
        <SectionPill label="Testimonials" />
      </motion.div>

      <h2 className="flex flex-col items-center text-5xl md:text-7xl lg:text-8xl 2xl:text-9xl font-black tracking-tight">
        <motion.span variants={revealVariants} className="text-[#161d1e] tracking-wide">
          Don&apos;t Just Take
        </motion.span>
        <motion.span
          variants={revealVariants}
          className="tracking-wider bg-gradient-to-b from-[#15b6e8] to-transparent bg-clip-text text-transparent"
        >
          Our Word
        </motion.span>
      </h2>
    </motion.div>
  );
}
