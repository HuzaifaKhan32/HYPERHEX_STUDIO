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
      <span className={`inline-block ${className ?? ''}`} style={{ color: targetColor }}>
        {children}
      </span>
    );
  }

  return (
    <motion.span className={`inline-block will-change-transform ${className ?? ''}`} style={{ color, y, opacity }}>
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
    <h2 ref={ref} className={`${headingBase} w-full overflow-hidden`}>
      {/* Mobile — tight reverse-pyramid hierarchy */}
      <span className="flex flex-col items-center text-center md:hidden">
        <RevealWord
          progress={scrollYProgress}
          range={[0, 0.35]}
          targetColor={BLACK}
          className="text-[clamp(26px,7vw,30px)] tracking-[0.18em]"
        >
          Pushing
        </RevealWord>
        <RevealWord
          progress={scrollYProgress}
          range={[0.15, 0.5]}
          targetColor={BLACK}
          className="mt-1 text-[clamp(20px,6vw,28px)] tracking-[0.08em]"
        >
          the
        </RevealWord>
        <RevealLine
          progress={scrollYProgress}
          range={[0.35, 1]}
          className="mt-1 text-[clamp(36px,11vw,52px)] leading-[0.9] tracking-[-0.03em]"
          style={{ color: ACCENT }}
        >
          Boundaries
        </RevealLine>
      </span>

      {/* Desktop — unmodified */}
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