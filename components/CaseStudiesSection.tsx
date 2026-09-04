'use client';

import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { MAIN_CASE_STUDIES, SUB_CASE_STUDIES, type CaseStudy } from '@/lib/case-studies-data';
import StaggeredHeading from '@/components/ui/StaggeredHeading';

const CaseStudyModal = dynamic(() => import('./CaseStudyModal'), { ssr: false });

const BLACK = '#161d1e';
const ACCENT = '#15b6e8';
const SUB_GAP = 12;

function useVW() {
  const [vw, setVw] = useState(0);
  useEffect(() => {
    const update = () => setVw(window.innerWidth);
    update();
    window.addEventListener('resize', update, { passive: true });
    return () => window.removeEventListener('resize', update);
  }, []);
  return vw;
}

function useElWidth(ref: React.RefObject<HTMLElement | null>) {
  const [w, setW] = useState(0);
  useEffect(() => {
    const measure = () => {
      if (ref.current) setW(ref.current.offsetWidth);
    };
    measure();
    window.addEventListener('resize', measure, { passive: true });
    return () => window.removeEventListener('resize', measure);
  }, [ref]);
  return w;
}

function useInfiniteSlider(autoMs: number, n: number) {
  const [idx, setIdx] = useState(n);
  const [anim, setAnim] = useState(true);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const pauseTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const resetTimer = useCallback(() => {
    pauseTimer();
    timerRef.current = setInterval(() => {
      setAnim(true);
      setIdx((p) => p + 1);
    }, autoMs);
  }, [autoMs, pauseTimer]);

  const goNext = useCallback(() => {
    setAnim(true);
    setIdx((p) => p + 1);
    resetTimer();
  }, [resetTimer]);

  const goPrev = useCallback(() => {
    setAnim(true);
    setIdx((p) => p - 1);
    resetTimer();
  }, [resetTimer]);

  const goTo = useCallback(
    (abs: number, currentIdx: number) => {
      const rel = ((abs % n) + n) % n;
      const opts = [rel, n + rel, 2 * n + rel];
      const best = opts.reduce((a, b) =>
        Math.abs(a - currentIdx) <= Math.abs(b - currentIdx) ? a : b
      );
      setAnim(true);
      setIdx(best);
      resetTimer();
    },
    [n, resetTimer]
  );

  const onTransitionEnd = useCallback(() => {
    setIdx((prev) => {
      if (prev >= n * 2) {
        setAnim(false);
        return prev - n;
      }
      if (prev < n) {
        setAnim(false);
        return prev + n;
      }
      return prev;
    });
  }, [n]);

  useEffect(() => {
    if (!anim) {
      const id = requestAnimationFrame(() => setAnim(true));
      return () => cancelAnimationFrame(id);
    }
  }, [anim]);

  useEffect(() => {
    resetTimer();
    return () => {
      pauseTimer();
    };
  }, [resetTimer, pauseTimer]);

  const activeBullet = ((idx % n) + n) % n;

  return {
    idx,
    goNext,
    goPrev,
    goTo,
    anim,
    onTransitionEnd,
    activeBullet,
    resetTimer,
    pauseTimer,
  };
}

function FeaturedHeading() {
  return (
    <div className="w-full mb-6 md:mb-8 select-none">
      <div className="md:hidden">
        <StaggeredHeading
          staggerDelay={0.07}
          lines={[
            {
              words: [{ text: 'Featured', color: BLACK }],
              className: 'text-[clamp(36px,11vw,52px)] leading-[0.92] tracking-[-0.03em]',
            },
            {
              words: [
                { text: 'Case', color: ACCENT },
                { text: 'Studies', color: ACCENT },
              ],
              className: 'mt-1 text-[clamp(24px,7vw,34px)] leading-tight tracking-[0.02em]',
            },
          ]}
        />
      </div>

      <div className="hidden md:block">
        <StaggeredHeading
          staggerDelay={0.07}
          lines={[
            {
              words: [{ text: 'Featured', color: BLACK }],
              className: 'text-[clamp(72px,6vw,120px)] leading-[0.95]',
            },
            {
              words: [
                { text: 'Case', color: ACCENT },
                { text: 'Studies', color: ACCENT },
              ],
              className: 'text-[clamp(46px,3.5vw,74px)] leading-[0.95]',
            },
          ]}
        />
      </div>
    </div>
  );
}

export default function CaseStudiesSection() {
  const vw = useVW();
  const reduced = useReducedMotion();

  const mainItems = MAIN_CASE_STUDIES;
  const subItems = SUB_CASE_STUDIES;

  const mainN = mainItems.length;
  const subN = subItems.length;

  const mainTriple = useMemo(() => [...mainItems, ...mainItems, ...mainItems], [mainItems]);
  const subTriple = useMemo(() => [...subItems, ...subItems, ...subItems], [subItems]);

  const mainSlider = useInfiniteSlider(5000, mainN);
  const subSlider = useInfiniteSlider(5000, subN);

  const mainCardRef = useRef<HTMLDivElement>(null);
  const mainCardW = useElWidth(mainCardRef);

  const gapPx = 0;
  const mainStep = mainCardW + gapPx;
  const mainTx = mainCardW > 0 ? vw / 2 - mainCardW / 2 - mainSlider.idx * mainStep : 0;

  const subCardRef = useRef<HTMLDivElement>(null);
  const subCardW = useElWidth(subCardRef);
  const subStep = subCardW + SUB_GAP;
  const subTx = subCardW > 0 ? vw / 2 - subCardW / 2 - subSlider.idx * subStep : 0;

  const [selected, setSelected] = useState<CaseStudy | null>(null);

  const handleCloseModal = useCallback(() => {
    setSelected(null);
  }, []);

  return (
    <section
      className="relative w-full bg-surface py-16 md:py-24 overflow-hidden font-[family-name:var(--font-dm-sans)] text-on-surface select-none"
      id="case-studies"
      onContextMenu={(e) => e.preventDefault()}
    >
      <div className="max-w-[1280px] xl:max-w-[1400px] 2xl:max-w-none mx-auto px-5 lg:px-16 2xl:px-24 mb-10">
        <FeaturedHeading />
      </div>

      <motion.div
        initial={reduced ? 'visible' : 'hidden'}
        whileInView="visible"
        viewport={{ once: true, margin: '-20px' }}
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
          onMouseEnter={() => mainSlider.pauseTimer()}
          onMouseLeave={() => mainSlider.resetTimer()}
        >
          <motion.div
            className="flex items-center"
            animate={{ x: mainTx }}
            transition={{
              duration: mainSlider.anim ? 0.7 : 0,
              ease: [0.25, 1, 0.5, 1],
            }}
            onAnimationComplete={mainSlider.onTransitionEnd}
          >
            {mainTriple.map((study, idx) => {
              const isCenter = idx === mainSlider.idx;
              const distanceFromCenter = Math.abs(idx - mainSlider.idx);

              return (
                <div
                  key={`main-${study.id}-${idx}`}
                  ref={idx === 0 ? mainCardRef : undefined}
                  className="w-[80vw] sm:w-[60vw] md:w-[65vw] xl:w-[48vw] 2xl:w-[40vw] shrink-0 group select-none"
                  onContextMenu={(e) => e.preventDefault()}
                >
                  <motion.div
                    animate={{
                      scale: isCenter ? 1 : 0.88,
                      opacity: isCenter ? 1 : Math.max(0.4, 1 - distanceFromCenter * 0.3),
                    }}
                    transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
                    data-cursor="project"
                    className="relative aspect-[16/9] md:aspect-[16/8.5] rounded-2xl overflow-hidden cursor-pointer bg-surface-bright shadow-2xl origin-center select-none"
                    onClick={() => setSelected(study)}
                  >
                    <Image
                      src={study.thumbnail}
                      alt={study.title}
                      fill
                      sizes="(max-width: 768px) 85vw, (max-width: 1200px) 60vw, 850px"
                      quality={85}
                      draggable={false}
                      onDragStart={(e) => e.preventDefault()}
                      style={{ userSelect: 'none', WebkitUserDrag: 'none' } as React.CSSProperties}
                      className={`object-cover transition-all duration-500 ease-out group-hover:scale-105 pointer-events-none select-none ${
                        !isCenter ? 'filter blur-[2px] brightness-75' : 'filter-none'
                      }`}
                    />

                    {!isCenter && (
                      <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px] transition-all duration-500 pointer-events-none" />
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

        {/* SUB SLIDER (Landscape sizes, uniform focus) */}
        <div
          className="relative w-full my-1 select-none overflow-hidden py-2"
          onMouseEnter={() => subSlider.pauseTimer()}
          onMouseLeave={() => subSlider.resetTimer()}
        >
          <motion.div
            className="flex items-center"
            style={{ gap: `${SUB_GAP}px` }}
            animate={{ x: subTx }}
            transition={{
              duration: subSlider.anim ? 0.5 : 0,
              ease: [0.25, 1, 0.5, 1],
            }}
            onAnimationComplete={subSlider.onTransitionEnd}
          >
            {subTriple.map((study, idx) => {
              const isCenter = idx === subSlider.idx;

              return (
                <div
                  key={`sub-${study.id}-${idx}`}
                  ref={idx === 0 ? subCardRef : undefined}
                  onClick={() => setSelected(study)}
                  onContextMenu={(e) => e.preventDefault()}
                  className={`w-[70vw] sm:w-[48vw] md:w-[42vw] lg:w-[32vw] xl:w-[24vw] 2xl:w-[20vw] shrink-0 group cursor-pointer overflow-hidden rounded-xl border bg-surface-bright shadow-lg transition-all duration-500 select-none ${
                    isCenter
                      ? 'border-[var(--color-accent)]/80 opacity-100'
                      : 'border-white/10 opacity-75'
                  }`}
                  data-cursor="project"
                >
                  <div className="relative aspect-[16/9] overflow-hidden select-none">
                    <Image
                      src={study.thumbnail}
                      alt={study.title}
                      fill
                      sizes="(max-width: 768px) 70vw, (max-width: 1200px) 35vw, 400px"
                      quality={85}
                      draggable={false}
                      onDragStart={(e) => e.preventDefault()}
                      style={{ userSelect: 'none', WebkitUserDrag: 'none' } as React.CSSProperties}
                      className={`object-cover transition-all duration-500 ease-out group-hover:scale-105 pointer-events-none select-none ${
                        !isCenter ? 'filter blur-[1.5px] brightness-75' : 'filter-none'
                      }`}
                    />

                    {!isCenter && (
                      <div className="absolute inset-0 bg-black/30 backdrop-blur-[1px] transition-all duration-300 pointer-events-none" />
                    )}

                    {study.isVideo && (
                      <div className="absolute top-3 right-3 z-10 w-7 h-7 rounded-full bg-black/50 border border-white/20 flex items-center justify-center pointer-events-none group-hover:opacity-0 transition-opacity duration-300">
                        <svg className="w-3 h-3 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-4 transition-opacity duration-300 group-hover:opacity-0 pointer-events-none">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-accent)] mb-0.5">
                        {study.category}
                      </span>
                      <h4 className="font-bold text-sm md:text-base text-white uppercase tracking-wide leading-tight line-clamp-1">
                        {study.title}
                      </h4>
                    </div>

                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-4 z-20 pointer-events-none">
                      <span className="text-[9px] md:text-[10px] uppercase tracking-[0.2em] mb-1 text-white/70">
                        {study.category}
                      </span>
                      <p className="text-xs md:text-sm font-bold uppercase tracking-wide text-center text-white leading-tight">
                        {study.title}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>

        {/* Indicator Bullets */}
        <div className="flex justify-center gap-3 mt-2">
          {subItems.map((_, idx) => (
            <button
              key={`dot-${idx}`}
              onClick={() => subSlider.goTo(subN + idx, subSlider.idx)}
              className={`transition-all duration-500 rounded-full h-2 ${
                subSlider.activeBullet === idx
                  ? 'w-8 bg-[var(--color-accent)]'
                  : 'w-2 bg-on-surface/20 hover:bg-on-surface/50'
              }`}
              aria-label={`Slide ${idx + 1}`}
            />
          ))}
        </div>
      </motion.div>

      <CaseStudyModal caseStudy={selected} onClose={handleCloseModal} />
    </section>
  );
}