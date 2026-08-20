'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'framer-motion';

const BLACK = '#000000';
const ACCENT = 'var(--color-accent)';
const MIST = '#9a9fa5';

const CASE_STUDIES = [
  {
    id: 1,
    title: 'Volvo Experience',
    category: 'Automotive / 3D',
    image: 'https://images.unsplash.com/photo-1614200179396-2bdb77ebf81b?q=80&w=1932&auto=format&fit=crop',
  },
  {
    id: 2,
    title: 'Inverex Configurator',
    category: 'Interactive Web',
    image: 'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?q=80&w=2000&auto=format&fit=crop',
  },
  {
    id: 3,
    title: 'Ahmed Foods',
    category: 'Product Render',
    image: 'https://images.unsplash.com/photo-1617469767053-d3b523a0b982?q=80&w=2000&auto=format&fit=crop',
  },
  {
    id: 4,
    title: 'Lumina Gallery',
    category: 'Spatial Design',
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=2000&auto=format&fit=crop',
  },
  {
    id: 5,
    title: 'Future UI Kit',
    category: 'UI/UX System',
    image: 'https://images.unsplash.com/photo-1581091012184-7a9b3d73c386?q=80&w=2000&auto=format&fit=crop',
  },
  {
    id: 6,
    title: 'Urban Spaces',
    category: 'ArchViz Render',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2000&auto=format&fit=crop',
  },
  {
    id: 7,
    title: 'Apex Vanguard V8',
    category: 'CGI Animation',
    image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=2000&auto=format&fit=crop',
  },
  {
    id: 8,
    title: 'Oculus Pavilion',
    category: 'Virtual Reality',
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=2000&auto=format&fit=crop',
  }
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
    <h2 ref={ref} className={`${headingBase} w-full mb-12 md:mb-16`}>
      {/* Mobile */}
      <span className="flex flex-col text-left md:hidden">
        <RevealLine
          progress={scrollYProgress}
          range={[0, 0.55]}
          className="text-[clamp(56px,18vw,84px)] leading-[0.92] tracking-[-0.05em]"
          style={{ color: BLACK }}
        >
          Featured
        </RevealLine>
        <RevealWord
          progress={scrollYProgress}
          range={[0.35, 1]}
          targetColor={ACCENT}
          className="mt-2 text-[clamp(48px,10vw,72px)] leading-none tracking-[0.06em]"
        >
          Case Studies
        </RevealWord>
      </span>

      {/* Desktop */}
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
          className="text-[clamp(56px,4.5vw,84px)] leading-[0.95]"
          style={{ color: ACCENT }}
        >
          Case Studies
        </RevealLine>
      </span>
    </h2>
  );
}

export default function FeaturedCaseStudies() {
  // Start at index equal to array length so user can slide backwards immediately if desired
  const [activeIndex, setActiveIndex] = useState(CASE_STUDIES.length);
  const [isPaused, setIsPaused] = useState(false);
  const [enableTransition, setEnableTransition] = useState(true);
  const [visibleCount, setVisibleCount] = useState(3);

  const GAP = 20; // 20px gap

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

  // Auto slide interval
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setEnableTransition(true);
      setActiveIndex((prev) => prev + 1);
    }, 3500);

    return () => clearInterval(interval);
  }, [isPaused]);

  // Handle seamless loop when transition completes
  const handleTransitionEnd = () => {
    // If we passed the middle set of items, reset back to equivalent index in first set
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
      className="relative w-full bg-white py-16 md:py-24 overflow-hidden font-[family-name:var(--font-dm-sans)] text-ink" 
      id="featured-slider"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-[1280px] xl:max-w-[1400px] 2xl:max-w-none mx-auto px-5 lg:px-16 2xl:px-24">
        
        <FeaturedHeading />
        
        <div className="relative">
          {/* Main viewport with strict overflow hidden */}
          <div className="w-full overflow-hidden rounded-3xl p-1 -m-1">
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
                  <div className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-white cursor-pointer border border-black/[0.06] transition-all duration-300 transform hover:-translate-y-1">
                    <div className="p-3 h-full flex flex-col">
                      <div className="relative flex-1 overflow-hidden rounded-2xl">
                        <div 
                          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                          style={{ backgroundImage: `url('${project.image}')` }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
                          <span className="text-xs font-bold uppercase tracking-widest text-[var(--color-accent)] mb-1">
                            {project.category}
                          </span>
                          <h4 className="font-[family-name:var(--font-syne)] font-bold text-2xl text-white translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                            {project.title}
                          </h4>
                        </div>
                      </div>
                      <div className="pt-3 px-1 flex justify-between items-center">
                        <div>
                          <h3 className="text-base font-bold text-black">{project.title}</h3>
                          <p className="text-xs text-black/50 font-medium">{project.category}</p>
                        </div>
                        <span className="flex items-center gap-1 text-xs font-bold" style={{ color: 'var(--color-accent)' }}>
                          View
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

          {/* Navigation Buttons */}
          <button 
            onClick={handlePrev}
            aria-label="Previous Slide"
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-12 h-12 md:w-14 md:h-14 rounded-full bg-white shadow-xl border border-black/10 flex items-center justify-center text-black hover:bg-[var(--color-accent)] hover:text-white transition-all z-20 cursor-pointer"
          >
            <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button 
            onClick={handleNext}
            aria-label="Next Slide"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-12 h-12 md:w-14 md:h-14 rounded-full bg-white shadow-xl border border-black/10 flex items-center justify-center text-black hover:bg-[var(--color-accent)] hover:text-white transition-all z-20 cursor-pointer"
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
