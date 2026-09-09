'use client';

// Animated header with badge and heading stagger reveal
import { motion } from 'framer-motion';

const revealVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
};

const headerContainerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};

export default function AboutUsHeaderAnimated() {
  return (
    <motion.div
      className="flex flex-col gap-3"
      variants={headerContainerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
    >
      <motion.div
        variants={revealVariants}
        className="inline-flex w-fit items-center gap-2 rounded-full border border-[#bac9cc] bg-white px-4 py-2 shadow-sm transition-transform hover:-translate-y-0.5"
      >
        <span className="h-2 w-2 animate-pulse rounded-full bg-[#15b6e8]" />
        <span className="text-xs font-semibold tracking-wide text-[#3b494c]">
          About HyperHex
        </span>
      </motion.div>

      <h2 className="flex flex-col text-4xl font-extrabold tracking-tight md:text-6xl lg:text-7xl 2xl:text-8xl">
        <motion.span variants={revealVariants}>Your Vision</motion.span>
        <motion.span variants={revealVariants} className="bg-gradient-to-b from-[#15b6e8] to-transparent bg-clip-text text-transparent">
          In 3D Reality
        </motion.span>
      </h2>
    </motion.div>
  );
}
