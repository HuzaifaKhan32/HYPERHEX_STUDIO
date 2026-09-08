'use client';

// Animated link list wrapper with reveal on scroll
import { motion } from 'framer-motion';
import { type ReactNode } from 'react';

const listVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
};

export default function FooterLinkList({ children }: { children: ReactNode }) {
  return (
    <motion.ul
      variants={listVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
      className="flex flex-col gap-3"
    >
      {children}
    </motion.ul>
  );
}
