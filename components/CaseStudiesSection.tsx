'use client';

import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { MAIN_CASE_STUDIES, SUB_CASE_STUDIES, type CaseStudy } from '@/lib/case-studies-data';
import StaggeredHeading from '@/components/ui/StaggeredHeading';

// Dynamically import the Video Modal with SSR disabled
const CaseStudyModal = dynamic(() => import('./CaseStudyModal'), {
  ssr: false,
});

const BLACK = '#161d1e';
const ACCENT = '#15b6e8';
const MAIN_GAP = 16; // px gap between main cards
const SUB_GAP = 12;  // px gap between sub cards

// ── Measure viewport width safely ────────────────────────────────────────────
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

// ── Measure element width on mount and resize ────────────────────────────────
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

// ── Enhanced Infinite Slider Hook with Drag & Timer Reset Support ───────────
function useInfiniteSlider(autoMs: number, n: number) {
  const [idx, setIdx] = useState(n);
  const [anim, setAnim] = useState(true);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const resetTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setAnim(true);
      setIdx((p) => p + 1);
    }, autoMs);
  }, [autoMs]);

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
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [resetTimer]);

  const activeBullet = ((idx % n) + n) % n;
  return { idx, setIdx, goNext, goPrev, goTo, anim, onTransitionEnd, activeBullet, resetTimer };
}

function FeaturedHeading() {
  return (
    <div className="w-full mb-12 md:mb-16">
      {/* Mobile Heading */}
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

      {/* Desktop Heading */}
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

// ── CaseStudiesSection Component ─────────────────────────────────────────────
export default function CaseStudiesSection() {
  const vw = useVW();
  const reduced = useReducedMotion();

  // Deduplicated base items
  const mainItems = MAIN_CASE_STUDIES;
  const subItems = SUB_CASE_STUDIES;

  const mainN = mainItems.length;
  const subN = subItems.length;

  // Tripled sets for seamless infinite wrapping
  const mainTriple = useMemo(() => [...mainItems, ...mainItems, ...mainItems], [mainItems]);
  const subTriple = useMemo(() => [...subItems, ...subItems, ...subItems], [subItems]);

  // Sliders state
  const mainSlider = useInfiniteSlider(5000, mainN);
  const subSlider = useInfiniteSlider(5000, subN);

  // Main slider dimensions
  const mainCardRef = useRef<HTMLDivElement>(null);
  const mainCardW = useElWidth(mainCardRef);
  const mainStep = mainCardW + MAIN_GAP;
  const mainTx = mainCardW > 0 ? vw / 2 - mainCardW / 2 - mainSlider.idx * mainStep : 0;

  // Sub slider dimensions
  const subCardRef = useRef<HTMLDivElement>(null);
  const subCardW = useElWidth(subCardRef);
  const subStep = subCardW + SUB_GAP;
  const subTx = subCardW > 0 ? vw / 2 - subCardW / 2 - subSlider.idx * subStep : 0;

  // Modal State: selected item
  const [selected, setSelected] = useState<CaseStudy | null>(null);

  const handleCloseModal = useCallback(() => {
    setSelected(null);
  }, []);

  // Handle Drag Ending logic for Infinite Dragging
  const handleDragEndMain = (_: unknown, info: { offset: { x: number } }) => {
    const threshold = 50;
    if (info.offset.x < -threshold) {
      mainSlider.goNext();
    } else if (info.offset.x > threshold) {
      mainSlider.goPrev();
    } else {
      mainSlider.resetTimer();
    }
  };

  const handleDragEndSub = (_: unknown, info: { offset: { x: number } }) => {
    const threshold = 40;
    if (info.offset.x < -threshold) {
      subSlider.goNext();
    } else if (info.offset.x > threshold) {
      subSlider.goPrev();
    } else {
      subSlider.resetTimer();
    }
  };

  return (
    <section
      className="relative w-full bg-surface py-16 md:py-24 overflow-hidden font-[family-name:var(--font-dm-sans)] text-on-surface"
      id="case-studies"
    >
      {/* Header Container */}
      <div className="max-w-[1280px] xl:max-w-[1400px] 2xl:max-w-none mx-auto px-5 lg:px-16 2xl:px-24 mb-10">
        <FeaturedHeading />
      </div>

      {/* ──────────────── SLIDERS WRAPPER ──────────────── */}
      <motion.div
        initial={reduced ? 'visible' : 'hidden'}
        whileInView="visible"
        viewport={{ once: true, margin: '-40px' }}
        variants={{
          hidden: { opacity: 0, y: 28 },
          visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
          },
        }}
      >
        {/* ──────────────── MAIN SLIDER ──────────────────────────────────────── */}
        <div className="relative w-full overflow-hidden select-none py-4">
          <motion.div
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.15}
            onDragEnd={handleDragEndMain}
            className="flex cursor-grab active:cursor-grabbing"
            style={{
              gap: `${MAIN_GAP}px`,
              transform: `translate3d(${mainTx}px, 0, 0)`,
              transition: mainSlider.anim
                ? 'transform 1500ms cubic-bezier(0.25, 1, 0.5, 1)'
                : 'none',
            }}
            onTransitionEnd={mainSlider.onTransitionEnd}
          >
            {mainTriple.map((study, idx) => {
              const isCenter = idx === mainSlider.idx;
              const distanceFromCenter = Math.abs(idx - mainSlider.idx);

              return (
                <div
                  key={`main-${study.id}-${idx}`}
                  ref={idx === 0 ? mainCardRef : undefined}
                  className="w-[70vw] sm:w-[55vw] md:w-[45vw] xl:w-[38vw] 2xl:w-[32vw] shrink-0 group transition-all duration-700 ease-out"
                  style={{
                    transform: isCenter ? 'scale(1)' : 'scale(0.92)',
                    opacity: isCenter ? 1 : Math.max(0.4, 1 - distanceFromCenter * 0.25),
                  }}
                >
                  <div
                    data-cursor="project"
                    className="relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer bg-surface-bright shadow-xl"
                    onClick={() => setSelected(study)}
                  >
                    {/* Optimized Next.js Image with WebP support */}
                    <Image
                      src={study.thumbnail}
                      alt={study.title}
                      fill
                      sizes="(max-width: 768px) 70vw, (max-width: 1200px) 45vw, 650px"
                      quality={85}
                      className={`object-cover transition-all duration-700 ease-out group-hover:scale-105 ${
                        !isCenter ? 'filter blur-[3px] brightness-90' : 'filter-none'
                      }`}
                    />

                    {/* Camera Focus Backdrop Blur Overlay for side peeking cards */}
                    {!isCenter && (
                      <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px] transition-all duration-500 pointer-events-none" />
                    )}

                    {/* Small play badge indicator */}
                    {study.isVideo && (
                      <div className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-black/50 border border-white/20 flex items-center justify-center pointer-events-none group-hover:opacity-0 transition-opacity duration-300">
                        <svg className="w-3.5 h-3.5 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    )}

                    {/* Default Card Bottom Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-5 md:p-7 pointer-events-none transition-opacity duration-300 group-hover:opacity-0">
                      <span className="text-xs font-bold uppercase tracking-widest text-[var(--color-accent)] mb-1">
                        {study.category}
                      </span>
                      <h3 className="font-[family-name:var(--font-syne)] font-bold text-lg md:text-2xl text-white uppercase tracking-tight leading-tight">
                        {study.title}
                      </h3>
                    </div>

                    {/* Hover Reveal Card Overlay */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center pointer-events-none z-20">
                      <span className="text-xs uppercase tracking-[0.3em] mb-3 text-white/70">
                        {study.category}
                      </span>
                      <h3 className="text-lg md:text-2xl font-bold uppercase tracking-wider px-6 text-center text-white">
                        {study.title}
                      </h3>
                      {study.isVideo && (
                        <div className="mt-4 px-5 py-2 rounded-full bg-white text-black font-semibold text-xs md:text-sm uppercase tracking-wider flex items-center gap-2 shadow-lg">
                          <svg className="w-3.5 h-3.5 fill-black" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                          Watch Video
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </motion.div>

          {/* Prev Arrow (Main Slider) */}
          <button
            onClick={mainSlider.goPrev}
            aria-label="Previous main slide"
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-surface/90 shadow-lg border border-outline-variant/40 flex items-center justify-center text-on-surface hover:bg-[var(--color-accent)] hover:text-white transition-all z-20 cursor-pointer backdrop-blur-md"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Next Arrow (Main Slider) */}
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

        {/* ──────────────── SUB SLIDER ───────────────────────────────────────── */}
        <div className="relative w-full my-8 select-none overflow-hidden py-2">
          <motion.div
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.15}
            onDragEnd={handleDragEndSub}
            className="flex items-center cursor-grab active:cursor-grabbing"
            style={{
              gap: `${SUB_GAP}px`,
              transform: `translate3d(${subTx}px, 0, 0)`,
              transition: subSlider.anim
                ? 'transform 500ms cubic-bezier(0.25, 1, 0.5, 1)'
                : 'none',
            }}
            onTransitionEnd={subSlider.onTransitionEnd}
          >
            {subTriple.map((study, idx) => {
              const isActive = idx === subSlider.idx;
              return (
                <div
                  key={`sub-${study.id}-${idx}`}
                  ref={idx === 0 ? subCardRef : undefined}
                  onClick={() => {
                    if (isActive) {
                      setSelected(study);
                    } else {
                      subSlider.goTo(idx, subSlider.idx);
                    }
                  }}
                  className={`w-[45vw] sm:w-[32vw] md:w-[22vw] lg:w-[18vw] xl:w-[15vw] 2xl:w-[13vw] shrink-0 group cursor-pointer overflow-hidden rounded-xl transition-all duration-300 border-2 ${
                    isActive
                      ? 'border-[var(--color-accent)] shadow-[0_0_20px_rgba(21,182,232,0.45)] scale-[1.05] z-10'
                      : 'border-transparent scale-95 opacity-75 hover:opacity-100 hover:border-outline-variant/50'
                  }`}
                  data-cursor="project"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-surface-bright">
                    <Image
                      src={study.thumbnail}
                      alt={study.title}
                      fill
                      sizes="(max-width: 768px) 45vw, (max-width: 1200px) 22vw, 280px"
                      quality={80}
                      className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    />

                    {/* Play badge */}
                    {study.isVideo && (
                      <div className="absolute top-2.5 right-2.5 z-10 w-7 h-7 rounded-full bg-black/50 border border-white/20 flex items-center justify-center pointer-events-none group-hover:opacity-0 transition-opacity duration-300">
                        <svg className="w-3 h-3 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    )}

                    {/* Sub Card Hover Reveal */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center z-20">
                      <span className="text-[9px] md:text-[10px] uppercase tracking-[0.2em] mb-1 text-white/70 pointer-events-none">
                        {study.category}
                      </span>
                      <p className="text-xs md:text-sm font-bold uppercase tracking-wide px-2 text-center text-white leading-tight pointer-events-none">
                        {study.title}
                      </p>
                      {study.isVideo && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelected(study);
                          }}
                          className="mt-2 px-3.5 py-1.5 rounded-full bg-white text-black font-semibold text-[10px] md:text-xs uppercase tracking-wider flex items-center gap-1 shadow-lg pointer-events-auto cursor-pointer hover:scale-105 active:scale-95 transition-transform"
                        >
                          <svg className="w-2.5 h-2.5 fill-black" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                          Watch Video
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>

        {/* ── Bullet Navigation (Sub Slider) ── */}
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

      {/* ── Lazy Loaded Video Lightbox Modal ── */}
      <CaseStudyModal caseStudy={selected} onClose={handleCloseModal} />
    </section>
  );
}