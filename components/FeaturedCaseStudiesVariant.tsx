'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useReducedMotion, useScroll, useTransform, type MotionValue } from 'framer-motion';

const BLACK   = 'var(--color-on-surface)';
const ACCENT  = 'var(--color-accent)';
const MIST    = '#9a9fa5';
const MAIN_GAP = 12; // px gap between main cards
const SUB_GAP  = 10; // px gap between sub cards

// ── Helper to construct YouTube project objects ──────────────────────────────
function yt(id: string, title: string, category: string) {
  return {
    id,
    title,
    category,
    thumbnail: `https://img.youtube.com/vi/${id}/maxresdefault.jpg`,
    embedUrl: `https://www.youtube.com/embed/${id}?autoplay=1&rel=0`,
    isVideo: true,
  };
}

// ── 1. Separate Arrays for Main and Sub Sliders using YouTube Videos ─────────
export const MAIN_PROJECTS = [
  yt('7JT-j8gz5uU', 'HyperHex Showcase', 'Animation / 3D'),
  yt('7wRGPltVun4', 'Volvo Experience',  'Automotive / 3D'),
  yt('YvvRPa5zVAM', 'Interactive Web',   'Interactive Web'),
  yt('NJgPMovdV2Y', 'Exterior House',    'Product Render'),
  yt('a0ESDiUHZFI', 'Governor House',    'Spatial Design'),
];

export const SUB_PROJECTS = [
  yt('QhWmY9lXlZY', 'IVF Academy',       'UI/UX System'),
  yt('oQnWA-22Bf4', 'NS Arcade',         'ArchViz Render'),
  yt('9JFPZnPXQ1Y', 'Naran Club',         'Animation'),
  yt('WKOskq3aIQQ', 'Modern Apartment',   'Architecture'),
  yt('m2FYElEVclc', 'Call Center Design', 'Interior Design'),
];

const MAIN_N = MAIN_PROJECTS.length;
const SUB_N = SUB_PROJECTS.length;

const MAIN_TRIPLE = [...MAIN_PROJECTS, ...MAIN_PROJECTS, ...MAIN_PROJECTS];
const SUB_TRIPLE = [...SUB_PROJECTS, ...SUB_PROJECTS, ...SUB_PROJECTS];

// ── Viewport width hook ───────────────────────────────────────────────────────
function useVW() {
  const [vw, setVw] = useState(0);
  useEffect(() => {
    const u = () => setVw(window.innerWidth);
    u(); window.addEventListener('resize', u);
    return () => window.removeEventListener('resize', u);
  }, []);
  return vw;
}

// ── Measure element width on mount + resize ───────────────────────────────────
function useElWidth(ref: React.RefObject<HTMLElement | null>) {
  const [w, setW] = useState(0);
  useEffect(() => {
    const m = () => { if (ref.current) setW(ref.current.offsetWidth); };
    m(); window.addEventListener('resize', m);
    return () => window.removeEventListener('resize', m);
  }, [ref]);
  return w;
}

// ── 2. Refactored Hook to accept array length (N) ─────────────────────────────
function useInfiniteSlider(autoMs: number, N: number) {
  const [idx, setIdx]   = useState(N);
  const [anim, setAnim] = useState(true);

  const goNext = useCallback(() => { setAnim(true); setIdx(p => p + 1); }, []);
  const goPrev = useCallback(() => { setAnim(true); setIdx(p => p - 1); }, []);

  const goTo = useCallback((abs: number, currentIdx: number) => {
    const rel = ((abs % N) + N) % N;
    const opts = [rel, N + rel, 2 * N + rel];
    const best = opts.reduce((a, b) => Math.abs(a - currentIdx) <= Math.abs(b - currentIdx) ? a : b);
    setAnim(true); setIdx(best);
  }, [N]);

  const onTransitionEnd = useCallback(() => {
    setIdx(prev => {
      if (prev >= N * 2) { setAnim(false); return prev - N; }
      if (prev <  N)     { setAnim(false); return prev + N; }
      return prev;
    });
  }, [N]);

  useEffect(() => {
    if (!anim) { const id = requestAnimationFrame(() => setAnim(true)); return () => cancelAnimationFrame(id); }
  }, [anim]);

  useEffect(() => { const t = setInterval(goNext, autoMs); return () => clearInterval(t); }, [goNext, autoMs]);

  const activeBullet = ((idx % N) + N) % N;
  return { idx, goNext, goPrev, goTo, anim, onTransitionEnd, activeBullet };
}

// ── Heading ───────────────────────────────────────────────────────────────────
function RevealLine({ children, progress, range, className, style }: {
  children: React.ReactNode; progress: MotionValue<number>; range: [number, number]; className?: string; style?: React.CSSProperties;
}) {
  const r = useReducedMotion();
  const y = useTransform(progress, range, [28, 0]);
  const o = useTransform(progress, range, [0.4, 1]);
  if (r) return <span className={className} style={style}>{children}</span>;
  return <motion.span className={`block will-change-transform ${className ?? ''}`} style={{ y, opacity: o, ...style }}>{children}</motion.span>;
}
function RevealWord({ children, progress, range, className, targetColor }: {
  children: string; progress: MotionValue<number>; range: [number, number]; className?: string; targetColor: string;
}) {
  const r = useReducedMotion();
  const color = useTransform(progress, range, [MIST, targetColor]);
  const y = useTransform(progress, range, [24, 0]);
  const o = useTransform(progress, range, [0.45, 1]);
  if (r) return <span className={`block ${className ?? ''}`} style={{ color: targetColor }}>{children}</span>;
  return <motion.span className={`block will-change-transform ${className ?? ''}`} style={{ color, y, opacity: o }}>{children}</motion.span>;
}
function FeaturedHeading() {
  const ref = useRef<HTMLHeadingElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'start 0.4'] });
  const hb = 'font-[family-name:var(--font-zalando-expanded)] font-black uppercase tracking-[-0.04em]';
  return (
    <h2 ref={ref} className={`${hb} w-full mb-12 md:mb-16 overflow-hidden`}>
      <span className="flex flex-col text-left md:hidden">
        <RevealLine progress={scrollYProgress} range={[0, 0.55]} className="text-[clamp(36px,11vw,52px)] leading-[0.92] tracking-[-0.03em]" style={{ color: BLACK }}>Featured</RevealLine>
        <RevealWord progress={scrollYProgress} range={[0.35, 1]} targetColor={ACCENT} className="mt-1 text-[clamp(24px,7vw,34px)] leading-tight tracking-[0.02em]">Case Studies</RevealWord>
      </span>
      <span className="hidden flex-col md:flex">
        <RevealLine progress={scrollYProgress} range={[0, 0.55]} className="text-[clamp(72px,6vw,120px)] leading-[0.95]" style={{ color: BLACK }}>Featured</RevealLine>
        <RevealLine progress={scrollYProgress} range={[0.35, 1]} className="text-[clamp(46px,3.5vw,74px)] leading-[0.95]" style={{ color: ACCENT }}>Case Studies</RevealLine>
      </span>
    </h2>
  );
}

// ── Component ─────────────────────────────────────────────────────────────────
export default function FeaturedCaseStudiesVariant() {
  const vw = useVW();

  // ── 3. Independent Slider States ─────────────────────────────────────────────
  const mainSlider = useInfiniteSlider(5000, MAIN_N);
  const subSlider  = useInfiniteSlider(5000, SUB_N);

  // ── Main slider layout ──────────────────────────────────────────────────────
  const mainCardRef = useRef<HTMLDivElement>(null);
  const mainCardW   = useElWidth(mainCardRef);
  const mainStep    = mainCardW + MAIN_GAP;
  const mainTx      = mainCardW > 0 ? (vw / 2 - mainCardW / 2) - mainSlider.idx * mainStep : 0;

  // ── Sub slider layout ───────────────────────────────────────────────────────
  const subCardRef = useRef<HTMLDivElement>(null);
  const subCardW   = useElWidth(subCardRef);
  const subStep    = subCardW + SUB_GAP;
  const subTx      = subCardW > 0 ? (vw / 2 - subCardW / 2) - subSlider.idx * subStep : 0;

  // ── Lightbox ────────────────────────────────────────────────────────────────
  const [selected, setSelected] = useState<{
    id: string;
    title: string;
    category: string;
    thumbnail: string;
    embedUrl: string;
    isVideo: boolean;
  } | null>(null);
  useEffect(() => {
    document.body.style.overflow = selected ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [selected]);

  return (
    <section
      className="relative w-full bg-surface py-16 md:py-24 overflow-hidden font-[family-name:var(--font-dm-sans)] text-on-surface"
      id="case-studies-variant"
    >
      {/* Header */}
      <div className="max-w-[1280px] xl:max-w-[1400px] 2xl:max-w-none mx-auto px-5 lg:px-16 2xl:px-24 mb-10">
        <FeaturedHeading />
      </div>

      {/* ──────────────── MAIN SLIDER ──────────────────────────────────────── */}
      <div className="relative w-full overflow-hidden select-none">
        <div
          className="flex"
          style={{
            gap: `${MAIN_GAP}px`,
            transform: `translateX(${mainTx}px)`,
            transition: mainSlider.anim ? 'transform 1500ms cubic-bezier(0.25, 1, 0.5, 1)' : 'none',
            willChange: 'transform',
          }}
          onTransitionEnd={mainSlider.onTransitionEnd}
        >
          {MAIN_TRIPLE.map((study, idx) => (
            <div
              key={`main-${idx}`}
              ref={idx === 0 ? mainCardRef : undefined}
              className="w-[55vw] md:w-[45vw] shrink-0 group"
            >
              <div
                className="relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer"
                onClick={() => setSelected(study)}
              >
                <img
                  src={study.thumbnail}
                  alt={study.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                
                {/* Small play badge (always visible on video cards when not hovered) */}
                {study.isVideo && (
                  <div className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-black/50 border border-white/20 backdrop-blur-sm flex items-center justify-center pointer-events-none group-hover:opacity-0 transition-opacity duration-300">
                    <svg className="w-3.5 h-3.5 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                  </div>
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent flex flex-col justify-end p-5 md:p-7 pointer-events-none transition-opacity duration-300 group-hover:opacity-0">
                  <span className="text-xs font-bold uppercase tracking-widest text-[var(--color-accent)] mb-1">{study.category}</span>
                  <h3 className="font-[family-name:var(--font-syne)] font-bold text-lg md:text-2xl text-white uppercase tracking-tight leading-tight">{study.title}</h3>
                </div>
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center pointer-events-none z-20">
                  <span className="text-xs uppercase tracking-[0.3em] mb-3 text-white/60">{study.category}</span>
                  <h3 className="text-lg md:text-2xl font-bold uppercase tracking-wider px-6 text-center text-white">{study.title}</h3>
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
          ))}
        </div>

        {/* Prev (Controls Main Slider) */}
        <button
          onClick={mainSlider.goPrev}
          aria-label="Previous"
          className="absolute left-2 top-1/2 -translate-y-1/2 w-9 h-9 md:w-11 md:h-11 rounded-full bg-surface/90 shadow-md border border-outline-variant/40 flex items-center justify-center text-on-surface hover:bg-[var(--color-accent)] hover:text-white transition-all z-20"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
        </button>
        {/* Next (Controls Main Slider) */}
        <button
          onClick={mainSlider.goNext}
          aria-label="Next"
          className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 md:w-11 md:h-11 rounded-full bg-surface/90 shadow-md border border-outline-variant/40 flex items-center justify-center text-on-surface hover:bg-[var(--color-accent)] hover:text-white transition-all z-20"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
        </button>
      </div>

      {/* ──────────────── SUB SLIDER ───────────────────────────────────────── */}
      <div className="relative w-full my-6 select-none">
        <div
          className="flex items-center"
          style={{
            gap: `${SUB_GAP}px`,
            transform: `translateX(${subTx}px)`,
            transition: subSlider.anim ? 'transform 500ms cubic-bezier(0.25, 1, 0.5, 1)' : 'none',
            willChange: 'transform',
          }}
          onTransitionEnd={subSlider.onTransitionEnd}
        >
          {SUB_TRIPLE.map((study, idx) => {
            const isActive = idx === subSlider.idx;
            return (
              <div
                key={`sub-${idx}`}
                ref={idx === 0 ? subCardRef : undefined}
                onClick={() => {
                  if (isActive) {
                    setSelected(study);
                  } else {
                    subSlider.goTo(idx, subSlider.idx);
                  }
                }}
                className={`w-[40vw] md:w-[25vw] shrink-0 group cursor-pointer overflow-hidden rounded-xl transition-all duration-400 border-2 ${
                  isActive
                    ? 'border-[var(--color-accent)] shadow-[0_0_16px_rgba(21,182,232,0.45)] scale-[1.05]'
                    : 'border-transparent scale-100 hover:border-outline-variant/50'
                }`}
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={study.thumbnail}
                    alt={study.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  
                  {/* Small play badge (always visible on video cards when not hovered) */}
                  {study.isVideo && (
                    <div className="absolute top-2.5 right-2.5 z-10 w-7 h-7 rounded-full bg-black/50 border border-white/20 backdrop-blur-sm flex items-center justify-center pointer-events-none group-hover:opacity-0 transition-opacity duration-300">
                      <svg className="w-3 h-3 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                    </div>
                  )}

                  <div className="absolute inset-0 bg-black/55 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center z-20">
                    <span className="text-[9px] md:text-[10px] uppercase tracking-[0.2em] mb-1 text-white/60 pointer-events-none">{study.category}</span>
                    <p className="text-xs md:text-sm font-bold uppercase tracking-wide px-2 text-center text-white leading-tight pointer-events-none">{study.title}</p>
                    {study.isVideo && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelected(study);
                        }}
                        className="mt-2 px-3.5 py-1.5 rounded-full bg-white text-black font-semibold text-[10px] md:text-xs uppercase tracking-wider flex items-center gap-1 shadow-lg pointer-events-auto cursor-pointer hover:scale-105 transition-transform"
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
        </div>
      </div>

      {/* ── Bullet dots (Controls Sub Slider) ── */}
      <div className="flex justify-center gap-3 mt-2">
        {SUB_PROJECTS.map((_, idx) => (
          <button
            key={`dot-${idx}`}
            onClick={() => subSlider.goTo(SUB_N + idx, subSlider.idx)}
            className={`transition-all duration-500 rounded-full h-2 ${
              subSlider.activeBullet === idx ? 'w-8 bg-[var(--color-accent)]' : 'w-2 bg-on-surface/20 hover:bg-on-surface/50'
            }`}
            aria-label={`Slide ${idx + 1}`}
          />
        ))}
      </div>

      {/* ── Lightbox ── */}
      <AnimatePresence>
        {selected && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12">
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 bg-black/80 backdrop-blur-xl cursor-zoom-out"
              onClick={() => setSelected(null)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, filter: 'blur(20px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10 w-full max-w-4xl max-h-[85vh] flex flex-col"
            >
              <div className="bg-[#111] rounded-2xl overflow-hidden shadow-2xl relative w-full flex flex-col border border-white/10">
                {/* Responsive Close Button inside wrapper */}
                <button
                  onClick={() => setSelected(null)}
                  className="absolute top-4 right-4 z-50 text-white/80 hover:text-white bg-black/60 backdrop-blur-md rounded-full p-2 border border-white/15 shadow-lg transition-all hover:scale-105 cursor-pointer"
                  aria-label="Close"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 6 6 18" /><path d="m6 6 12 12" />
                  </svg>
                </button>

                {selected.isVideo ? (
                  <div className="relative w-full aspect-video">
                    <iframe
                      src={selected.embedUrl}
                      title={selected.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="absolute inset-0 w-full h-full"
                      style={{ border: 'none' }}
                    />
                  </div>
                ) : (
                  <div className="relative w-full overflow-y-auto max-h-[60vh] flex items-center justify-center bg-black">
                    <img src={selected.thumbnail} alt={selected.title} className="w-full h-auto max-h-[60vh] object-contain mx-auto" />
                  </div>
                )}
                <div className="p-5 md:p-6 bg-[#0c0c0c] border-t border-white/10 backdrop-blur-md">
                  <p className="text-xs uppercase tracking-[0.4em] text-[var(--color-accent)] mb-1">{selected.category}</p>
                  <h2 className="text-xl md:text-2xl font-bold uppercase tracking-wide text-white">{selected.title}</h2>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}