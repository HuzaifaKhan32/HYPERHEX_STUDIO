'use client';

import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'framer-motion';

const BLACK = '#000000';
const ACCENT = 'var(--color-accent)';
const MIST = '#9a9fa5';

function RevealLine({
  children,
  progress,
  range,
  className,
  style,
}: {
  children: React.ReactNode;
  progress: MotionValue<number>;
  range: [number, number];
  className?: string;
  style?: React.CSSProperties;
}) {
  const reduced = useReducedMotion();
  const y = useTransform(progress, range, [28, 0]);
  const opacity = useTransform(progress, range, [0.4, 1]);

  if (reduced) {
    return (
      <span className={className} style={style}>
        {children}
      </span>
    );
  }

  return (
    <motion.span className={`block will-change-transform ${className ?? ''}`} style={{ y, opacity, ...style }}>
      {children}
    </motion.span>
  );
}

function RevealWord({
  children,
  progress,
  range,
  className,
  targetColor,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
  className?: string;
  targetColor: string;
}) {
  const reduced = useReducedMotion();
  const color = useTransform(progress, range, [MIST, targetColor]);
  const y = useTransform(progress, range, [24, 0]);
  const opacity = useTransform(progress, range, [0.45, 1]);

  if (reduced) {
    return (
      <span className={`block ${className ?? ''}`} style={{ color: targetColor }}>
        {children}
      </span>
    );
  }

  return (
    <motion.span className={`block will-change-transform ${className ?? ''}`} style={{ color, y, opacity }}>
      {children}
    </motion.span>
  );
}

const headingBase =
  'font-[family-name:var(--font-zalando-expanded)] font-black uppercase tracking-[-0.04em]';

export default function ServicesHeading() {
  const ref = useRef<HTMLHeadingElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.85', 'start 0.4'],
  });

  return (
    <h2 ref={ref} className={`${headingBase} w-full`}>
      {/* Mobile — centered reverse pyramid: narrow top → wide bottom */}
      <span className="flex flex-col items-center text-center md:hidden">
        <RevealWord
          progress={scrollYProgress}
          range={[0, 0.35]}
          targetColor={BLACK}
          className="text-[clamp(18px,4.8vw,26px)] leading-none tracking-[0.14em]"
        >
          Pushing
        </RevealWord>
        <RevealWord
          progress={scrollYProgress}
          range={[0.15, 0.5]}
          targetColor={BLACK}
          className="-mt-0.5 text-[clamp(28px,7.8vw,40px)] leading-none tracking-[0.06em]"
        >
          the
        </RevealWord>
        <RevealLine
          progress={scrollYProgress}
          range={[0.35, 1]}
          className="mt-2 text-[clamp(56px,18vw,84px)] leading-[0.92] tracking-[-0.05em]"
          style={{ color: ACCENT }}
        >
          Boundaries
        </RevealLine>
      </span>

      {/* Desktop — two rows: "Pushing the" then "Boundaries" */}
      <span className="hidden flex-col md:flex">
        <RevealLine
          progress={scrollYProgress}
          range={[0, 0.55]}
          className="text-[clamp(72px,6vw,120px)] leading-[0.95]"
          style={{ color: BLACK }}
        >
          Pushing the
        </RevealLine>
        <RevealLine
          progress={scrollYProgress}
          range={[0.35, 1]}
          className="text-[clamp(72px,6vw,120px)] leading-[0.95]"
          style={{ color: ACCENT }}
        >
          Boundaries
        </RevealLine>
      </span>
    </h2>
  );
}
