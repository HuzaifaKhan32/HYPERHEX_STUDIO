'use client';

// Wrapper for card entrance reveal animations from upside
import { motion, useReducedMotion } from 'framer-motion';
import { type ReactNode } from 'react';

const SMOOTH_EASE = [0.22, 1, 0.36, 1] as const;

interface AboutUsCardRevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
}

export default function AboutUsCardReveal({ children, delay = 0, className = '', style }: AboutUsCardRevealProps) {
  const shouldReduceMotion = useReducedMotion();

  const revealVariants = {
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : -40,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.65,
        ease: SMOOTH_EASE,
        delay,
      },
    },
  };

  return (
    <motion.div
      variants={revealVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.18 }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}


