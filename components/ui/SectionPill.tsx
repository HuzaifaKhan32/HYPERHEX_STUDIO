'use client';

import { motion, type HTMLMotionProps, Variants } from 'framer-motion';
import React from 'react';

export const pillVariants: Variants = {
  hidden: { opacity: 0, scale: 0, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 150,
      damping: 14,
      mass: 1,
    },
  },
};

interface SectionPillProps extends HTMLMotionProps<'div'> {
  label: string;
  dotColor?: string;
  className?: string;
}

export default function SectionPill({
  label,
  dotColor = '#15b6e8',
  className = '',
  style,
  ...props
}: SectionPillProps) {
  return (
    <motion.div
      variants={pillVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
      whileHover={{ scale: 1.08, y: -2 }}
      whileTap={{ scale: 0.95 }}
      className={`inline-flex w-fit items-center gap-2 px-4 py-2 text-xs font-semibold tracking-wide text-[#3b494c] transition-shadow cursor-default ${className}`}
      style={{
        backgroundColor: 'var(--token-5c4bbf1d-7534-4d20-87a6-b0deb15d1586, rgb(245, 245, 245))',
        borderRadius: '8px',
        boxShadow:
          'rgba(0, 0, 0, 0.14) 0px 3px 3px 0px, rgba(0, 0, 0, 0.12) 0px 2.77px 2.21px 0px, rgb(233, 233, 233) 0px -3px 0px 0px inset',
        transformOrigin: 'center center',
        ...style,
      }}
      {...props}
    >
      <span className="h-2 w-2 animate-pulse rounded-full" style={{ backgroundColor: dotColor }} />
      <span>{label}</span>
    </motion.div>
  );
}
