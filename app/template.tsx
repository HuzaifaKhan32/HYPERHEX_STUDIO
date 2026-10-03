'use client';

import React, { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { usePageTransition } from '@/components/PageTransition';

export default function Template({ children }: { children: React.ReactNode }) {
  const { direction } = usePageTransition();
  const shouldReduceMotion = useReducedMotion();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true);
  }, []);

  if (shouldReduceMotion || !isMounted) {
    return <div className="w-full min-h-screen overflow-x-hidden">{children}</div>;
  }

  const initialX = direction === 'forward' ? '4%' : '-4%';

  return (
    <motion.div
      initial={{ opacity: 0, x: initialX }}
      animate={{ opacity: 1, x: '0%' }}
      transition={{
        duration: 0.35,
        ease: [0.22, 1, 0.36, 1],
      }}
      style={{ willChange: 'transform, opacity' }}
      className="w-full min-h-screen overflow-x-hidden"
    >
      {children}
    </motion.div>
  );
}
