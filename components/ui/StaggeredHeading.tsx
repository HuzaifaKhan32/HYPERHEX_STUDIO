'use client';

import React from 'react';
import { motion, type Variants } from 'framer-motion';

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
  viewportMargin?: string;
  dataCursor?: string;
}

const defaultEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

export const wordVariants: Variants = {
  hidden: {
    opacity: 0,
    filter: 'blur(8px)',
    y: 20,
  },
  visible: {
    opacity: 1,
    filter: 'blur(0px)',
    y: 0,
    transition: {
      duration: 0.55,
      ease: defaultEase,
    },
  },
};

export default function StaggeredHeading({
  lines,
  className = '',
  staggerDelay = 0.07,
  wordDuration = 0.55,
  viewportMargin = '-40px',
  dataCursor = 'text',
}: StaggeredHeadingProps) {
  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: 0.05,
      },
    },
  };

  const customWordVariants: Variants = {
    hidden: {
      opacity: 0,
      filter: 'blur(8px)',
      y: 20,
    },
    visible: {
      opacity: 1,
      filter: 'blur(0px)',
      y: 0,
      transition: {
        duration: wordDuration,
        ease: defaultEase,
      },
    },
  };

  return (
    <motion.h2
      data-cursor={dataCursor}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: viewportMargin }}
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
                  variants={customWordVariants}
                  className={`inline-block will-change-[transform,opacity,filter] mr-[0.25em] last:mr-0 ${wordClass}`}
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
