'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { usePageTransition } from '@/components/PageTransition';

export default function Template({ children }: { children: React.ReactNode }) {
  const { direction } = usePageTransition();

  // Forward navigation in navbar order (e.g. Home -> Services -> Works -> Featured Projects):
  // New page slides in from the RIGHT (x: '100%')
  // Backward navigation: New page slides in from the LEFT (x: '-100%')
  const initialX = direction === 'forward' ? '100%' : '-100%';
  const exitX = direction === 'forward' ? '-100%' : '100%';

  return (
    <motion.div
      initial={{ opacity: 0, x: initialX }}
      animate={{ opacity: 1, x: '0%' }}
      exit={{ opacity: 0, x: exitX }}
      transition={{
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="w-full min-h-screen overflow-x-hidden"
    >
      {children}
    </motion.div>
  );
}
