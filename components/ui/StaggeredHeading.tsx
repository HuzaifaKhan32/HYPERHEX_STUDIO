'use client';

import React from 'react';
import { motion, useReducedMotion, type Variants } from 'framer-motion';

export interface StaggeredWordItem {
  text: string;
  className?: string;
  color?: string;
}

export interface StaggeredLineItem {
  words: (string | StaggeredWordItem)[];
  className?: string;
}

interface StaggeredHeadingProps {
  lines: (string | StaggeredLineItem)[];
  className?: string;
  staggerDelay?: number;
  wordDuration?: number;
  dataCursor?: string;
}

const SMOOTH_EASE = [0.22, 1, 0.36, 1] as const;

export default function StaggeredHeading({
  lines,
  className = '',
  staggerDelay = 0.12,
  wordDuration = 0.7,
  dataCursor = 'text',
}: StaggeredHeadingProps) {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: 0.05,
      },
    },
  };

  const wordVariants: Variants = {
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : -36,
      filter: shouldReduceMotion ? 'none' : 'blur(12px)',
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: wordDuration,
        ease: SMOOTH_EASE as unknown as [number, number, number, number],
      },
    },
  };

  return (
    <motion.h2
      data-cursor={dataCursor}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.18 }}
      className={`font-[family-name:var(--font-zalando-expanded)] font-black uppercase tracking-[-0.04em] ${className}`}
    >
      {lines.map((line, lineIdx) => {
        const isLineObj = typeof line !== 'string' && 'words' in line;
        const lineClass = isLineObj ? line.className ?? '' : '';
        const rawWords = isLineObj ? line.words : line.split(' ');

        return (
          <span key={`line-${lineIdx}`} className={`block overflow-visible ${lineClass}`}>
            {rawWords.map((wordItem, wordIdx) => {
              const isObj = typeof wordItem !== 'string';
              const text = isObj ? wordItem.text : wordItem;
              const wordClass = isObj ? wordItem.className ?? '' : '';
              const wordColor = isObj ? wordItem.color : undefined;

              return (
                <motion.span
                  key={`w-${lineIdx}-${wordIdx}`}
                  variants={wordVariants}
                  className={`inline-block mr-[0.25em] last:mr-0 ${wordClass}`}
                  style={wordColor ? { color: wordColor } : undefined}
                >
                  {text}
                </motion.span>
              );
            })}
          </span>
        );
      })}
    </motion.h2>
  );
}

