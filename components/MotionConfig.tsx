'use client';

import { LazyMotion, domAnimation } from 'framer-motion';
import { ReactNode } from 'react';

/**
 * Wrap components that use Framer Motion animations with this provider
 * to use the optimized domAnimation features (transforms, opacity only)
 * instead of loading the full animation library.
 *
 * This reduces the Framer Motion bundle from ~30KB to ~5KB.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      {children}
    </LazyMotion>
  );
}
