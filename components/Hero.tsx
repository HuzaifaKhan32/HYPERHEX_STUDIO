'use client';

import ImageCarousel from './ImageCarousel';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import Button3D from './Button3D';
import { useRef } from 'react';

const carouselImages = [
  {
    src: '/images/hero-image.jpg',
    alt: 'Hero image 1',
  },
  {
    src: '/images/unnamed.webp',
    alt: 'Hero image 2',
  },
];

const floatAnimation = {
  y: [0, -10, 0],
  transition: {
    duration: 4,
    repeat: Infinity,
  },
};

const floatReverseAnimation = {
  y: [0, -10, 0],
  transition: {
    duration: 5,
    repeat: Infinity,
  },
};

export default function Hero() {
  const frameRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: frameRef,
    offset: ['start start', 'end start'],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.94]);
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.55]);

  return (
    <div className="relative w-full bg-background py-8 px-5 lg:px-16">
      <motion.div
        ref={frameRef}
        style={reduced ? undefined : { scale, opacity }}
        className="relative mx-auto h-[680px] w-full max-w-[1280px] origin-top overflow-hidden rounded-[3rem] border border-outline-variant/30 shadow-[0_8px_32px_rgba(0,0,0,0.3),0_16px_64px_rgba(0,0,0,0.2)]"
      >
        <ImageCarousel images={carouselImages} />

        <div className="absolute inset-0 z-10 flex flex-col justify-between p-8 lg:p-12">
          <div className="flex w-full items-start justify-between">
            <motion.div
              animate={reduced ? undefined : floatAnimation}
              className="inline-flex items-center gap-2 rounded-full border border-outline-variant/30 bg-surface-container-lowest/80 px-4 py-2 font-[family-name:var(--font-dm-sans)] shadow-sm backdrop-blur-md"
            >
              <div className="flex h-5 w-5 items-center justify-center rounded-full" style={{ borderColor: 'var(--color-accent)', borderWidth: '1px' }}>
                <span className="text-sm" style={{ color: 'var(--color-accent)' }}>✓</span>
              </div>
              <span className="text-sm font-medium" style={{ color: 'var(--color-paper)' }}>True Growth</span>
            </motion.div>

            <motion.div animate={reduced ? undefined : floatReverseAnimation} className="flex flex-col items-end font-[family-name:var(--font-dm-sans)]">
              <span className="text-sm" style={{ color: 'var(--color-mist)' }}>We're available</span>
              <div className="flex items-center gap-2">
                <div className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
                </div>
                <span className="text-sm font-bold" style={{ color: 'var(--color-paper)' }}>for you</span>
              </div>
            </motion.div>
          </div>

          <div className="relative mt-12 mb-12 flex w-full flex-grow items-center justify-end">
            <div className="ml-auto flex flex-col items-end overflow-hidden text-right lg:absolute lg:top-1/2 lg:right-0 lg:-translate-y-1/2">
              <h1
                className="flex -skew-x-12 flex-col items-end font-[family-name:var(--font-syne)] uppercase drop-shadow-sm"
                style={{ fontSize: 'clamp(48px, 7vw, 80px)', lineHeight: '0.9', fontWeight: 800, letterSpacing: '-0.04em', color: 'var(--color-paper)' }}
              >
                <motion.span
                  className="flex items-start"
                  initial={{ y: 48, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.9, delay: 0.15, ease: [0.4, 0, 0.2, 1] }}
                >
                  PURE
                  <sup className="mt-2 ml-2 text-xl font-bold" style={{ color: 'var(--color-accent)' }}>(25)</sup>
                </motion.span>
                <motion.span
                  className="mr-[2.1em]"
                  initial={{ y: 48, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.9, delay: 0.35, ease: [0.4, 0, 0.2, 1] }}
                >
                  DESIGN
                </motion.span>
              </h1>
            </div>
          </div>

          <div className="flex w-full flex-col items-end justify-between gap-8 lg:flex-row">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              whileHover={{ scale: 1.02 }}
              className="w-full max-w-[320px] rounded-3xl border border-white/20 bg-white/92 p-4 shadow-[0_8px_32px_rgba(0,0,0,0.35)] backdrop-blur-xl transition-transform duration-300"
            >
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="font-[family-name:var(--font-jetbrains)] text-[10px] font-medium tracking-widest uppercase text-on-surface-variant">
                    Out Now
                  </p>
                  <p className="font-[family-name:var(--font-syne)] text-xl font-bold text-on-surface">
                    Q Industrial
                  </p>
                </div>
                <span className="rounded-full bg-surface-bright px-3 py-1 font-[family-name:var(--font-jetbrains)] text-xs font-medium text-on-surface shadow-sm">
                  2026
                </span>
              </div>
              <div className="relative h-32 w-full overflow-hidden rounded-2xl bg-surface-container shadow-inner">
                <motion.div
                  className="relative h-full w-full"
                  animate={{ scale: [1, 1.06, 1] }}
                  transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <Image
                    src="/images/hero-image.jpg"
                    alt="Project Preview"
                    fill
                    className="object-cover"
                  />
                </motion.div>
                <div className="absolute inset-x-4 bottom-3 h-1 overflow-hidden rounded-full bg-black/25 backdrop-blur-sm">
                  <motion.div
                    className="h-full w-1/3 origin-left rounded-full"
                    style={{ backgroundColor: 'var(--color-accent)' }}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.9, delay: 0.8, ease: [0.4, 0, 0.2, 1] }}
                  />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.75 }}
              className="flex max-w-sm flex-col items-end gap-6 text-right"
            >
              <div className="flex flex-col items-end gap-2">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full" style={{ backgroundColor: 'var(--color-accent)' }}></div>
                  <span className="font-[family-name:var(--font-jetbrains)] text-xs font-bold tracking-widest uppercase" style={{ color: 'var(--color-paper)' }}>
                    (ABOUT)
                  </span>
                </div>
                <p className="max-w-[280px] font-[family-name:var(--font-dm-sans)] text-sm" style={{ color: 'var(--color-paper)' }}>
                  Building stunning websites that every shot drives income forwards.
                </p>
              </div>
              <Button3D href="#contact">Book a Call</Button3D>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
