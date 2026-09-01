'use client';

import ImageCarousel from './ImageCarousel';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import Button3D from './Button3D';
import { useRef, useState, useEffect } from 'react';

const carouselImages = [
  {
    src: '/media/hero-loop-4.mp4',
    poster: '/media/hero-loop-4-thumbnail.png',
    alt: 'Hero 3D Showcase Video',
    type: 'video' as const,
  },
  {
    src: '/media/hero-loop-5.mp4',
    poster: '/media/hero-loop-5-thumbnail.png',
    alt: 'Hero 3D Showcase Video',
    type: 'video' as const,
  },
  {
    src: '/media/hero-loop-6.mp4',
    poster: '/media/hero-loop-6-thumbnail.png',
    alt: 'Hero 3D Showcase Video',
    type: 'video' as const,
  },
  {
    src: '/media/hero-loop-7.mp4',
    poster: '/media/hero-loop-7-thumbnail.png',
    alt: 'Hero 3D Showcase Video',
    type: 'video' as const,
  },
];

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
  const [isReady, setIsReady] = useState(false);

  const { scrollYProgress } = useScroll({
    target: frameRef,
    offset: ['start start', 'end start'],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.94]);
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.55]);

  useEffect(() => {
    // 2-second maximum fallback safety timer
    const timer = setTimeout(() => {
      setIsReady(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleFirstReady = () => {
    setIsReady(true);
  };

  return (
    <div className="relative w-full bg-background px-5 pb-4 sm:px-8 lg:px-12 2xl:px-16">
      <motion.div
        ref={frameRef}
        style={reduced ? undefined : { scale, opacity }}
        className="relative mx-auto w-full max-w-[1280px] xl:max-w-[1400px] 2xl:max-w-none origin-top overflow-hidden rounded-[2rem] border border-outline-variant/30 aspect-[1312/568] min-h-[280px]"
      >
        <ImageCarousel images={carouselImages} onFirstReady={handleFirstReady} />

        <div className="absolute inset-0 z-10 w-full p-5 sm:p-8 lg:p-10 2xl:p-14 pointer-events-none">

          {/* TOP-RIGHT: Availability Badge */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: -20 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { type: 'spring', stiffness: 100, damping: 15, mass: 0.8 },
              },
            }}
            initial={reduced ? 'visible' : 'hidden'}
            animate={isReady ? 'visible' : 'hidden'}
            className="absolute top-5 right-5 sm:top-8 sm:right-8 lg:top-10 lg:right-10 2xl:top-14 2xl:right-14 z-20 flex flex-col items-end pointer-events-auto"
          >
            <motion.div
              animate={reduced ? undefined : floatReverseAnimation}
              className="flex flex-col items-end font-[family-name:var(--font-dm-sans)]"
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
          </motion.div>

          {/* BOTTOM-RIGHT: About + CTA */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 1, ease: [0.16, 1, 0.3, 1], staggerChildren: 0.15, delayChildren: 0.2 },
              },
            }}
            initial={reduced ? 'visible' : 'hidden'}
            animate={isReady ? 'visible' : 'hidden'}
            className="absolute bottom-5 right-5 sm:bottom-8 sm:right-8 lg:bottom-10 lg:right-10 2xl:bottom-14 2xl:right-14 z-20 flex flex-col items-end gap-4 text-right sm:gap-5 pointer-events-auto"
          >
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 15 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
              }}
              data-cursor="text"
              className="flex flex-col items-end gap-2"
            >
              <div className="flex items-center gap-2">
                <div
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: 'var(--color-accent)' }}
                />
                <span
                  className="font-[family-name:var(--font-jetbrains)] text-[clamp(10px,1.2vw,14px)] font-bold tracking-widest uppercase"
                  style={{ color: 'var(--color-paper)' }}
                >
                  (ABOUT)
                </span>
              </div>
              <p
                className="max-w-[220px] sm:max-w-[260px] 2xl:max-w-[320px] font-[family-name:var(--font-dm-sans)] text-[clamp(12px,1.2vw,16px)]"
                style={{ color: 'var(--color-paper)' }}
              >
                Building stunning websites that every shot drives income forwards.
              </p>
            </motion.div>
            
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 15 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
              }}
            >
              <Button3D href="#contact">Book a Call</Button3D>
            </motion.div>
          </motion.div>

        </div>
      </motion.div>
    </div>
  );
}
