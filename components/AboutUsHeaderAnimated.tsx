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
      className="flex w-full flex-col items-center justify-center text-center gap-3"
      variants={headerContainerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
    >
      <motion.div
        variants={revealVariants}
        className="inline-flex w-fit items-center gap-2 px-4 py-2 text-xs font-semibold tracking-wide text-[#3b494c] transition-transform hover:-translate-y-0.5"
        style={{
          backgroundColor: 'var(--token-5c4bbf1d-7534-4d20-87a6-b0deb15d1586, rgb(245, 245, 245))',
          borderRadius: '8px',
          boxShadow: 'rgba(0, 0, 0, 0.14) 0px 3px 3px 0px, rgba(0, 0, 0, 0.12) 0px 2.77px 2.21px 0px, rgb(233, 233, 233) 0px -3px 0px 0px inset',
          opacity: 1,
        }}
      >
        <span className="h-2 w-2 animate-pulse rounded-full bg-[#15b6e8]" />
        <span>About HyperHex</span>
      </motion.div>

      <h2 className="flex flex-col items-center text-center text-5xl md:text-7xl lg:text-8xl 2xl:text-9xl font-black tracking-tight" style={{ fontFamily: 'var(--font-zalando-expanded, sans-serif)' }}>
        <motion.span variants={revealVariants} className="tracking-wide">We Build What&apos;s</motion.span>
        <motion.span variants={revealVariants} className="tracking-wider bg-gradient-to-b from-[#15b6e8] to-transparent bg-clip-text text-transparent">
          Imagined
        </motion.span>
      </h2>
    </motion.div>
  );
}
