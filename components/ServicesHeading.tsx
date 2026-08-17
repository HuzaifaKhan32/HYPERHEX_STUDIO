'use client';

import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'framer-motion';

const MIST = '#9a9fa5';
const INK = '#0a0a0a';

function ColorWord({
  children,
  progress,
  range,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const reduced = useReducedMotion();
  const color = useTransform(progress, range, [MIST, INK]);
  const y = useTransform(progress, range, [36, 0]);
  const opacity = useTransform(progress, range, [0.45, 1]);

  if (reduced) {
    return <span className="inline-block text-ink">{children}</span>;
  }

  return (
    <motion.span className="inline-block will-change-transform" style={{ color, y, opacity }}>
      {children}
    </motion.span>
  );
}

export default function ServicesHeading({ compact = false }: { compact?: boolean }) {
  const ref = useRef<HTMLHeadingElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.85', 'start 0.4'],
  });

  return (
    <h2
      ref={ref}
      className={[
        'flex flex-col font-[family-name:var(--font-dm-sans)] font-black tracking-tighter uppercase',
        compact
          ? 'text-4xl leading-[0.95] md:text-[56px] md:leading-[1]'
          : 'text-5xl leading-[0.95] md:text-[80px] md:leading-[88px]',
      ].join(' ')}
    >
      <span className="flex flex-wrap gap-x-[0.22em]">
        <ColorWord progress={scrollYProgress} range={[0, 0.45]}>
          Pushing
        </ColorWord>
        <ColorWord progress={scrollYProgress} range={[0.2, 0.65]}>
          the
        </ColorWord>
      </span>
      <span>
        <ColorWord progress={scrollYProgress} range={[0.4, 1]}>
          Boundaries
        </ColorWord>
      </span>
    </h2>
  );
}