'use client';

import ImageCarousel from './ImageCarousel';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import Button3D from './Button3D';
import { useRef } from 'react';

const carouselImages = [
  {
    src: '/images/image-1.jpg',
    alt: 'Hero image 1',
  },
  {
    src: '/images/image-2.jpg',
    alt: 'Hero image 2',
  },
  {
    src: '/images/image-3.jpg',
    alt: 'Hero image 3',
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
    <div className="relative w-full bg-background px-5 pb-4 sm:px-8 lg:px-12">
      <motion.div
        ref={frameRef}
        style={reduced ? undefined : { scale, opacity }}
        className="relative mx-auto min-h-[680px] w-full max-w-[1280px] origin-top overflow-hidden rounded-[2rem] border border-outline-variant/30 sm:min-h-[620px] md:h-[570px] md:min-h-0"
      >
        <ImageCarousel images={carouselImages} />

        <div className="absolute inset-0 z-10 flex flex-col justify-between p-5 sm:p-8 lg:p-12">
          <div className="flex w-full flex-wrap items-start justify-between gap-3">
            <motion.div
              animate={reduced ? undefined : floatAnimation}
              className="inline-flex items-center gap-2 rounded-full border border-outline-variant/30 bg-surface-container-lowest/80 px-3 py-1.5 font-[family-name:var(--font-dm-sans)] shadow-sm backdrop-blur-md sm:px-4 sm:py-2"
            >
              <div
                className="flex h-5 w-5 items-center justify-center rounded-full"
                style={{ borderColor: 'var(--color-accent)', borderWidth: '1px' }}
              >
                <span className="text-sm" style={{ color: 'var(--color-accent)' }}>
                  ✓
                </span>
              </div>
              <span className="text-xs font-medium sm:text-sm" style={{ color: 'var(--color-paper)' }}>
                True Growth
              </span>
            </motion.div>

            <motion.div
              animate={reduced ? undefined : floatReverseAnimation}
              className="flex flex-col items-start font-[family-name:var(--font-dm-sans)] sm:items-end"
            >
              <span className="text-xs sm:text-sm" style={{ color: 'var(--color-mist)' }}>
                We&apos;re available
              </span>
              <div className="flex items-center gap-2">
                <div className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
                </div>
                <span className="text-xs font-bold sm:text-sm" style={{ color: 'var(--color-paper)' }}>
                  for you
                </span>
              </div>
            </motion.div>
          </div>

          <div className="relative my-8 flex w-full flex-grow items-center justify-start py-4 md:my-0 md:py-0 lg:justify-end">
            <div className="flex flex-col items-start overflow-hidden text-left lg:ml-auto lg:items-end lg:text-right lg:absolute lg:top-1/2 lg:right-0 lg:-translate-y-1/2">
              <h1
                className="flex flex-col items-start gap-0 font-[family-name:var(--font-dm-sans)] text-[clamp(36px,9vw,70px)] font-black uppercase leading-[0.92] tracking-[-0.05em] drop-shadow-[0_2px_24px_rgba(0,0,0,0.35)] lg:items-end lg:font-[family-name:var(--font-syne)] lg:text-[clamp(48px,7vw,60px)] lg:leading-[0.9] lg:font-extrabold lg:tracking-[-0.04em] lg:drop-shadow-sm "
                style={{ color: 'var(--color-paper)' }}
              >
                <motion.span
                  className="inline-flex items-start leading-none lg:mr-[2.1em] ml-[2em] sm:ml-[2.75em]  lg:ml-0"
                  initial={{ y: 48, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.9, delay: 0.15, ease: [0.4, 0, 0.2, 1] }}
                >
                  PURE
                  <sup className="ml-[0.12em] translate-y-[-0.4em] font-medium not-italic leading-none tracking-normal text-[0.22em] text-[var(--color-mist)] lg:mt-2 lg:ml-2 lg:translate-y-0 lg:text-xl lg:font-bold lg:text-[var(--color-accent)]">
                    <span className="lg:hidden">(&apos;26)</span>
                    <span className="hidden lg:inline">(26)</span>
                  </sup>
                </motion.span>
                <motion.span
                  className=" leading-none "
                  initial={{ y: 48, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.9, delay: 0.35, ease: [0.4, 0, 0.2, 1] }}
                >
                  DESIGN
                </motion.span>
              </h1>
            </div>
          </div>

          <div className="flex w-full flex-col items-start justify-between gap-5 sm:gap-6 lg:flex-row lg:items-end">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              whileHover={{ scale: 1.02 }}
              className="w-full max-w-[200px] rounded-2xl border border-white/20 bg-white/92 p-3 shadow-[0_8px_32px_rgba(0,0,0,0.35)] backdrop-blur-xl transition-transform duration-300 sm:max-w-[240px] sm:rounded-3xl sm:p-4 lg:max-w-[280px]"
            >
              <div className="mb-3 flex items-center justify-between sm:mb-4">
                <div>
                  <p className="font-[family-name:var(--font-jetbrains)] text-[9px] font-medium tracking-widest uppercase text-on-surface-variant sm:text-[10px]">
                    Out Now
                  </p>
                  <p className="font-[family-name:var(--font-syne)] text-base font-bold text-on-surface sm:text-lg">
                    Q Industrial
                  </p>
                </div>
                <span className="rounded-full bg-surface-bright px-2 py-0.5 font-[family-name:var(--font-jetbrains)] text-[10px] font-medium text-on-surface shadow-sm sm:px-3 sm:py-1 sm:text-xs">
                  2026
                </span>
              </div>
              <div className="relative h-20 w-full overflow-hidden rounded-xl bg-surface-container shadow-inner sm:h-24 sm:rounded-2xl">
                <Image
                  src="/images/image-1.jpg"
                  alt="Project Preview"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-x-3 bottom-2 h-1 overflow-hidden rounded-full bg-black/25 backdrop-blur-sm sm:inset-x-4 sm:bottom-3">
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
              className="flex w-full max-w-sm flex-col items-start gap-4 text-left sm:gap-6 lg:items-end lg:text-right"
            >
              <div className="flex flex-col items-start gap-2 lg:items-end">
                <div className="flex items-center gap-2">
                  <div
                    className="h-2 w-2 rounded-full"
                    style={{ backgroundColor: 'var(--color-accent)' }}
                  ></div>
                  <span
                    className="font-[family-name:var(--font-jetbrains)] text-xs font-bold tracking-widest uppercase"
                    style={{ color: 'var(--color-paper)' }}
                  >
                    (ABOUT)
                  </span>
                </div>
                <p
                  className="max-w-[280px] font-[family-name:var(--font-dm-sans)] text-sm"
                  style={{ color: 'var(--color-paper)' }}
                >
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
