'use client';

import React from 'react';
import { motion } from 'framer-motion';
import StaggeredHeading from '@/components/ui/StaggeredHeading';

const BLACK = '#161d1e';
const ACCENT = '#15b6e8';

// Staggered reveal: badge, then "Pushing the", then "Boundaries" — each
// offset slightly so the block reads as a sequence rather than a flat fade.
// This heading previously had no animation at all (a plain static div),
// unlike the matching headings in About Us / Latest Work / Case Studies.
const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};
const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
};

export default function ServicesHeading() {
  return (
    <motion.div
      className="flex flex-col gap-3 select-none"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
    >
      <motion.div
        variants={itemVariants}
        className="inline-flex w-fit items-center gap-2 rounded-full border border-[#bac9cc] bg-white px-4 py-2 shadow-sm transition-transform hover:-translate-y-0.5"
      >
        <span className="h-2 w-2 animate-pulse rounded-full bg-[#15b6e8]" />
        <span className="text-xs font-semibold tracking-wide text-[#3b494c]">
          Our Services
        </span>
      </motion.div>

      <h2 className="flex flex-col text-4xl font-extrabold tracking-tight md:text-6xl lg:text-7xl 2xl:text-8xl">
        <motion.span variants={itemVariants} className="text-[#161d1e]">Pushing the</motion.span>
        <motion.span variants={itemVariants} className="bg-gradient-to-b from-[#15b6e8] to-transparent bg-clip-text text-transparent">Boundaries</motion.span>
      </h2>
    </motion.div>
  );
}