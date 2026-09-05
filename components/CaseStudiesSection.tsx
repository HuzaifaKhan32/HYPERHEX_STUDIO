'use client';

import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { MAIN_CASE_STUDIES, SUB_CASE_STUDIES, type CaseStudy } from '@/lib/case-studies-data';
import StaggeredHeading from '@/components/ui/StaggeredHeading';
import InfiniteMarquee from '@/components/ui/InfiniteMarquee';

const CaseStudyModal = dynamic(() => import('./CaseStudyModal'), { ssr: false });

const BLACK = '#161d1e';
const ACCENT = '#15b6e8';
const SUB_GAP = 12;

// Throttle ResizeObserver updates with requestAnimationFrame to prevent layout thrashing
function useContainerWidth(ref: React.RefObject<HTMLElement | null>) {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let rafId: number | null = null;
    const observer = new ResizeObserver((entries) => {
      if (!entries[0]) return;
      const w = entries[0].contentRect.width;
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        setWidth(w);
      });
    });

    observer.observe(el);
    return () => {
      observer.disconnect();
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [ref]);

  return width;
}

// Continuous infinite slider hook driven by a virtual index (no array tripling or DOM mounting bloat)
function useInfiniteSlider(autoMs: number, n: number) {
  const [idx, setIdx] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const pauseTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const resetTimer = useCallback(() => {
    pauseTimer();
    if (autoMs > 0 && n > 0) {
      timerRef.current = setInterval(() => {
        setIdx((prev) => prev + 1);
      }, autoMs);
    }
  }, [autoMs, n, pauseTimer]);

  const goNext = useCallback(() => {
    setIdx((prev) => prev + 1);
    resetTimer();
  }, [resetTimer]);

  const goPrev = useCallback(() => {
    setIdx((prev) => prev - 1);
    resetTimer();
  }, [resetTimer]);

  const goTo = useCallback(
    (bulletIdx: number) => {
      setIdx((currentIdx) => {
        const currentMod = ((currentIdx % n) + n) % n;
        let diff = bulletIdx - currentMod;
        if (diff > n / 2) diff -= n;
        if (diff < -n / 2) diff += n;
        return currentIdx + diff;
      });
      resetTimer();
    },
    [n, resetTimer]
  );

  useEffect(() => {
    resetTimer();
    return () => pauseTimer();
  }, [resetTimer, pauseTimer]);

  const activeBullet = ((idx % n) + n) % n;

  return {
    idx,
    goNext,
    goPrev,
    goTo,
    activeBullet,
    resetTimer,
    pauseTimer,
  };
}

function FeaturedHeading() {
  return (
    <div className="flex flex-col gap-3 mb-6 md:mb-8 select-none">
      <div className="inline-flex w-fit items-center gap-2 rounded-full border border-[#bac9cc] bg-white px-4 py-2 shadow-sm transition-transform hover:-translate-y-0.5">
        <span className="h-2 w-2 animate-pulse rounded-full bg-[#15b6e8]" />
        <span className="text-xs font-semibold tracking-wide text-[#3b494c]">
          Case Studies
        </span>
      </div>

      <h2 className="flex flex-col text-4xl font-extrabold tracking-tight md:text-6xl lg:text-7xl 2xl:text-8xl">
        <span className="text-[#161d1e]">Featured</span>
        <span className="bg-gradient-to-b from-[#15b6e8] to-transparent bg-clip-text text-transparent">Case Studies</span>
      </h2>
    </div>
  );
}

export default function CaseStudiesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerWidth = useContainerWidth(sectionRef);

  const mainItems = MAIN_CASE_STUDIES;
  const subItems = SUB_CASE_STUDIES;
  const mainN = mainItems.length;

  const mainSlider = useInfiniteSlider(5000, mainN);

  const [selected, setSelected] = useState<CaseStudy | null>(null);

  const handleCloseModal = useCallback(() => {
    setSelected(null);
  }, []);

  // Compute responsive card widths and track offsets cleanly based on measured container dimensions
  const vw = containerWidth || 1200;

  // Main Card Dimensions
  const mainCardW = useMemo(() => {
    if (vw < 640) return vw * 0.80;
    if (vw < 768) return vw * 0.60;
    if (vw < 1280) return vw * 0.65;
    if (vw < 1536) return vw * 0.48;
    return vw * 0.40;
  }, [vw]);

  const mainCardH = useMemo(() => {
    return vw < 768 ? mainCardW / (16 / 9) : mainCardW / (16 / 8.5);
  }, [vw, mainCardW]);

  const mainStep = mainCardW;
  const mainTx = vw / 2 - mainCardW / 2 - mainSlider.idx * mainStep;

  // Sliding Window: Render ONLY 5 virtual slides around current active index (2 on left, active, 2 on right)
  const mainVirtualIndices = useMemo(() => {
    return [mainSlider.idx - 2, mainSlider.idx - 1, mainSlider.idx, mainSlider.idx + 1, mainSlider.idx + 2];
  }, [mainSlider.idx]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-surface py-10 md:py-16 overflow-hidden font-[family-name:var(--font-dm-sans)] text-on-surface select-none"
      id="case-studies"
      onContextMenu={(e) => e.preventDefault()}
    >
      <div className="max-w-[1280px] xl:max-w-[1400px] 2xl:max-w-none mx-auto px-5 lg:px-16 2xl:px-24 mb-10">
        <FeaturedHeading />
      </div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        variants={{
          hidden: { opacity: 0, y: 28 },
          visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
          },
        }}
      >
        {/* MAIN SLIDER */}
        <div
          className="relative w-full overflow-hidden select-none py-4"
          style={{ height: mainCardH + 32 }}
          onMouseEnter={() => mainSlider.pauseTimer()}
          onMouseLeave={() => mainSlider.resetTimer()}
        >
          <motion.div
            className="absolute top-4 left-0 h-full will-change-transform"
            animate={{ x: mainTx }}
            transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
          >
            {mainVirtualIndices.map((vIndex) => {
              const itemIdx = ((vIndex % mainN) + mainN) % mainN;
              const study = mainItems[itemIdx];
              const isCenter = vIndex === mainSlider.idx;
              const distanceFromCenter = Math.abs(vIndex - mainSlider.idx);
              const isFar = distanceFromCenter >= 2;
              const isSide = !isCenter && !isFar;

              return (
                <div
                  key={`main-v-${vIndex}`}
                  style={{
                    position: 'absolute',
                    left: `${vIndex * mainStep}px`,
                    width: `${mainCardW}px`,
                    height: `${mainCardH}px`,
                    contentVisibility: isFar ? 'auto' : undefined,
                    contain: isFar ? 'layout paint style' : undefined,
                  }}
                  className="shrink-0 group select-none"
                  onContextMenu={(e) => e.preventDefault()}
                >
                  <motion.div
                    animate={{
                      scale: isCenter ? 1 : 0.88,
                      opacity: isCenter ? 1 : Math.max(0.4, 1 - distanceFromCenter * 0.3),
                    }}
                    transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
                    style={isSide ? { willChange: 'transform, opacity' } : undefined}
                    data-cursor="project"
                    className="relative w-full h-full rounded-2xl overflow-hidden cursor-pointer bg-surface-bright shadow-2xl origin-center select-none"
                    onClick={() => setSelected(study)}
                  >
                    <Image
                      src={study.thumbnail}
                      alt={study.title}
                      fill
                      sizes="(max-width: 640px) 80vw, (max-width: 768px) 60vw, (max-width: 1280px) 65vw, 48vw"
                      quality={80}
                      loading={isCenter ? 'eager' : 'lazy'}
                      priority={isCenter}
                      draggable={false}
                      onDragStart={(e) => e.preventDefault()}
                      style={{ userSelect: 'none', WebkitUserDrag: 'none' } as React.CSSProperties}
                      className={`object-cover transition-all duration-500 ease-out group-hover:scale-105 pointer-events-none select-none ${
                        isSide ? 'filter blur-[2px] brightness-75' : ''
                      }`}
                    />

                    {isSide && (
                      <div className="absolute inset-0 bg-black/30 pointer-events-none" />
                    )}

                    {!isCenter && isFar && (
                      <div className="absolute inset-0 bg-black/40 pointer-events-none" />
                    )}

                    {study.isVideo && (
                      <div className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/50 border border-white/20 flex items-center justify-center pointer-events-none group-hover:opacity-0 transition-opacity duration-300">
                        <svg className="w-4 h-4 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6 md:p-8 pointer-events-none transition-opacity duration-300 group-hover:opacity-0">
                      <span className="text-xs font-bold uppercase tracking-widest text-[var(--color-accent)] mb-1.5">
                        {study.category}
                      </span>
                      <h3 className="font-[family-name:var(--font-syne)] font-bold text-xl md:text-3xl text-white uppercase tracking-tight leading-tight">
                        {study.title}
                      </h3>
                    </div>

                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center pointer-events-none z-20">
                      <span className="text-xs uppercase tracking-[0.3em] mb-3 text-white/70">
                        {study.category}
                      </span>
                      <h3 className="text-xl md:text-3xl font-bold uppercase tracking-wider px-6 text-center text-white">
                        {study.title}
                      </h3>
                      {study.isVideo && (
                        <div className="mt-4 px-6 py-2.5 rounded-full bg-white text-black font-semibold text-xs md:text-sm uppercase tracking-wider flex items-center gap-2 shadow-lg">
                          <svg className="w-3.5 h-3.5 fill-black" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                          Watch Video
                        </div>
                      )}
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </motion.div>

          {/* Nav Controls */}
          <button
            onClick={mainSlider.goPrev}
            aria-label="Previous main slide"
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-surface/90 shadow-lg border border-outline-variant/40 flex items-center justify-center text-on-surface hover:bg-[var(--color-accent)] hover:text-white transition-all z-20 cursor-pointer backdrop-blur-md"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={mainSlider.goNext}
            aria-label="Next main slide"
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-surface/90 shadow-lg border border-outline-variant/40 flex items-center justify-center text-on-surface hover:bg-[var(--color-accent)] hover:text-white transition-all z-20 cursor-pointer backdrop-blur-md"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* SUB SLIDER */}
        <div className="relative w-full my-6 select-none overflow-hidden">
          {/* Side Fade Masks */}
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-8 md:w-20 z-20 bg-gradient-to-r from-surface via-surface/80 to-transparent" />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-8 md:w-20 z-20 bg-gradient-to-l from-surface via-surface/80 to-transparent" />

          <InfiniteMarquee
            speed={1.5}
            gap={SUB_GAP}
            pauseOnHover={true}
            items={[...subItems, ...subItems].map((study, idx) => (
              <div
                key={`sub-${idx}`}
                onClick={() => setSelected(study)}
                className="w-[70vw] sm:w-[48vw] md:w-[42vw] lg:w-[32vw] xl:w-[24vw] 2xl:w-[20vw] aspect-[16/9] shrink-0 group cursor-pointer overflow-hidden rounded-xl border bg-surface-bright shadow-lg transition-all duration-500 hover:border-[var(--color-accent)]/80 border-white/10"
                data-cursor="project"
              >
                <div className="relative w-full h-full overflow-hidden select-none">
                  <Image
                    src={study.thumbnail}
                    alt={study.title}
                    fill
                    sizes="(max-width: 640px) 70vw, (max-width: 768px) 48vw, (max-width: 1024px) 42vw, 32vw"
                    quality={80}
                    loading="lazy"
                    draggable={false}
                    onDragStart={(e) => e.preventDefault()}
                    style={{ userSelect: 'none', WebkitUserDrag: 'none' } as React.CSSProperties}
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-105 pointer-events-none select-none"
                  />

                  {study.isVideo && (
                    <div className="absolute top-3 right-3 z-10 w-7 h-7 rounded-full bg-black/50 border border-white/20 flex items-center justify-center pointer-events-none group-hover:opacity-0 transition-opacity duration-300">
                      <svg className="w-3 h-3 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  )}

                  <div className="absolute inset-0 bg-black/35 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-4 z-20 pointer-events-none">
                    <span className="text-[9px] md:text-[10px] uppercase tracking-[0.2em] mb-1 text-white/70">
                      {study.category}
                    </span>
                    <p className="text-xs md:text-sm font-bold uppercase tracking-wide text-center text-white leading-tight">
                      {study.title}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          />
        </div>
      </motion.div>

      <CaseStudyModal caseStudy={selected} onClose={handleCloseModal} />
    </section>
  );
}