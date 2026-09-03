'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

const BLACK = '#161d1e';
const ACCENT = '#15b6e8';
const MIST = '#9a9fa5';

const CASE_STUDIES = [
  {
    id: 1,
    title: 'Volvo Experience',
    category: 'Automotive / 3D',
    image: '/portfolio/car-configurator.jpg',
    type: 'image' as const,
  },
  {
    id: 2,
    title: 'Interactive Web',
    category: 'Interactive Web',
    image: '/portfolio/commtel.jpg',
    type: 'image' as const,
  },
  {
    id: 3,
    title: 'Exterior House',
    category: 'Product Render',
    image: '/portfolio/exterior-house.jpg',
    type: 'image' as const,
  },
  {
    id: 4,
    title: 'Governor House',
    category: 'Spatial Design',
    image: '/portfolio/governor-house.jpg',
    type: 'image' as const,
  },
  {
    id: 5,
    title: 'IVF Academy',
    category: 'UI/UX System',
    image: '/portfolio/IVF.png',
    type: 'image' as const,
  },
  {
    id: 6,
    title: 'NS Arcade',
    category: 'ArchViz Render',
    image: '/portfolio/ns-arcade.jpg',
    type: 'image' as const,
  },
  {
    id: 7,
    title: 'HyperHex 3D Showcase',
    category: 'Animation / 3D',
    image: 'https://img.youtube.com/vi/7JT-j8gz5uU/maxresdefault.jpg',
    videoId: '7JT-j8gz5uU',
    link: 'https://youtu.be/7JT-j8gz5uU',
    type: 'video' as const,
  },
];

// Duplicate items twice for smooth infinite loop
const DISPLAY_ITEMS = [...CASE_STUDIES, ...CASE_STUDIES, ...CASE_STUDIES];

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

const headingBase = 'font-[family-name:var(--font-zalando-expanded)] font-black uppercase tracking-[-0.04em]';

function FeaturedHeading() {
  const ref = useRef<HTMLHeadingElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.85', 'start 0.4'],
  });

  return (
    <h2 ref={ref} className={`${headingBase} w-full mb-12 md:mb-16 overflow-hidden`}>
      {/* Mobile — aligned scaled sizing */}
      <span className="flex flex-col text-left md:hidden">
        <RevealLine
          progress={scrollYProgress}
          range={[0, 0.55]}
          className="text-[clamp(36px,11vw,52px)] leading-[0.92] tracking-[-0.03em]"
          style={{ color: BLACK }}
        >
          Featured
        </RevealLine>
        <RevealWord
          progress={scrollYProgress}
          range={[0.35, 1]}
          targetColor={ACCENT}
          className="mt-1 text-[clamp(24px,7vw,34px)] leading-tight tracking-[0.02em]"
        >
          Case Studies
        </RevealWord>
      </span>

      {/* Desktop — unmodified */}
      <span className="hidden flex-col md:flex">
        <RevealLine
          progress={scrollYProgress}
          range={[0, 0.55]}
          className="text-[clamp(72px,6vw,120px)] leading-[0.95]"
          style={{ color: BLACK }}
        >
          Featured
        </RevealLine>
        <RevealLine
          progress={scrollYProgress}
          range={[0.35, 1]}
          className="text-[clamp(46px,3.5vw,74px)] leading-[0.95]"
          style={{ color: ACCENT }}
        >
          Case Studies
        </RevealLine>
      </span>
    </h2>
  );
}

export default function FeaturedCaseStudies() {
  const [activeIndex, setActiveIndex] = useState(CASE_STUDIES.length);
  const [isPaused, setIsPaused] = useState(false);
  const [enableTransition, setEnableTransition] = useState(true);
  const [visibleCount, setVisibleCount] = useState(3);

  const GAP = 20;

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) setVisibleCount(1);
      else if (window.innerWidth < 1024) setVisibleCount(2);
      else setVisibleCount(3);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setEnableTransition(true);
      setActiveIndex((prev) => prev + 1);
    }, 3500);

    return () => clearInterval(interval);
  }, [isPaused]);

  const handleTransitionEnd = () => {
    if (activeIndex >= CASE_STUDIES.length * 2) {
      setEnableTransition(false);
      setActiveIndex(activeIndex - CASE_STUDIES.length);
    } else if (activeIndex < CASE_STUDIES.length) {
      setEnableTransition(false);
      setActiveIndex(activeIndex + CASE_STUDIES.length);
    }
  };

  const handlePrev = () => {
    setEnableTransition(true);
    setActiveIndex((prev) => prev - 1);
  };

  const handleNext = () => {
    setEnableTransition(true);
    setActiveIndex((prev) => prev + 1);
  };

  return (
    <section
      className="relative w-full bg-surface py-16 md:py-24 overflow-hidden font-[family-name:var(--font-dm-sans)] text-on-surface"
      id="case-studies"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-[1280px] xl:max-w-[1400px] 2xl:max-w-none mx-auto px-5 lg:px-16 2xl:px-24">
        <FeaturedHeading />

        <div className="relative">
          {/* Main Viewport Container with Glass Effect and Edge Fade Mask */}
          <div
            className="w-full overflow-hidden rounded-3xl p-4 -m-4 bg-white/10 dark:bg-black/10 backdrop-blur-xl border border-white/20 dark:border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.12)]"
            style={{
              WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)',
              maskImage: 'linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)',
            }}
          >
            <div
              className="flex"
              style={{
                gap: `${GAP}px`,
                transform: `translateX(calc(-${activeIndex} * (100% + ${GAP}px) / ${visibleCount}))`,
                transition: enableTransition ? 'transform 700ms cubic-bezier(0.25, 1, 0.5, 1)' : 'none',
              }}
              onTransitionEnd={handleTransitionEnd}
            >
              {DISPLAY_ITEMS.map((project, idx) => (
                <div
                  key={`${project.id}-${idx}`}
                  style={{
                    width: `calc((100% - ${(visibleCount - 1) * GAP}px) / ${visibleCount})`,
                  }}
                  className="shrink-0 group"
                >
                  {/* Glassmorphic Card Outer */}
                  <div className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-white/20 dark:bg-black/20 backdrop-blur-md cursor-pointer border border-white/30 dark:border-white/10 shadow-lg transition-all duration-300 transform hover:-translate-y-1 hover:border-white/50 dark:hover:border-white/30">
                    <div className="p-3 h-full flex flex-col">
                      <div className="relative flex-1 overflow-hidden rounded-2xl">
                        <div className="absolute inset-0 overflow-hidden rounded-2xl group-hover:scale-105 transition-transform duration-700">
                          <Image
                            src={project.image}
                            alt={project.title}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            quality={85}
                            className="object-cover"
                          />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
                          <span className="text-xs font-bold uppercase tracking-widest text-[var(--color-accent)] mb-1">
                            {project.category}
                          </span>
                          <h4 className="font-[family-name:var(--font-syne)] font-bold text-2xl text-white translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                            {project.title}
                          </h4>
                        </div>
                      </div>
                      
                      {/* Glass Content Footer */}
                      <div className="pt-3 px-1 flex justify-between items-center">
                        <div>
                          <h3 className="text-base font-bold text-on-surface">{project.title}</h3>
                          <p className="text-xs text-on-surface-variant font-medium">{project.category}</p>
                        </div>
                        <span className="flex items-center gap-1 text-xs font-bold" style={{ color: 'var(--color-accent)' }}>
                          <Link href={`#`}>View</Link>
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons with Frosted Glass Styling */}
          <button
            onClick={handlePrev}
            aria-label="Previous Slide"
            className="absolute left-2 top-1/2 -translate-y-1/2 w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/30 dark:bg-black/30 backdrop-blur-xl border border-white/40 dark:border-white/20 shadow-xl flex items-center justify-center text-on-surface hover:bg-[var(--color-accent)] hover:text-white hover:border-[var(--color-accent)] transition-all z-20 cursor-pointer"
          >
            <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={handleNext}
            aria-label="Next Slide"
            className="absolute right-2 top-1/2 -translate-y-1/2 w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/30 dark:bg-black/30 backdrop-blur-xl border border-white/40 dark:border-white/20 shadow-xl flex items-center justify-center text-on-surface hover:bg-[var(--color-accent)] hover:text-white hover:border-[var(--color-accent)] transition-all z-20 cursor-pointer"
          >
            <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}