'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import ServiceCard from './NewServiceCard';
import { newServicesData } from '@/lib/new-services-data';

interface SpatialState {
  scale: number;
  translateX: number;
  translateY: number;
  translateZ: number;
  rotateY: number;
  rotateZ: number;
  opacity: number;
  blur: number;
  zIndex: number;
  pointerEvents: 'auto' | 'none';
}

/**
 * Compact 3D Coverflow Stage with Outside Dark Side Card Shadows:
 * - Center Active Card (offset 0): rotateY(0deg), translateZ(0px), scale(1.0), opacity(1.0), zIndex(30), cyan highlight untouched.
 * - Side Cards (offset ±1, ±2): Outside dark slate/gray drop shadows (0 24px 48px rgba(15,23,42,0.38)), dark ground contact shadow.
 */
function getSpatialState(offset: number, multiplier: number = 1, cardScale: number = 1): SpatialState {
  const isMobile = multiplier < 0.6;
  const baseScale = isMobile ? 0.92 : cardScale;

  // Center Active Card (offset 0)
  if (offset === 0) {
    return {
      scale: baseScale,
      translateX: 0,
      translateY: 0,
      translateZ: 0,
      rotateY: 0,
      rotateZ: 0,
      opacity: 1.0,
      blur: 0,
      zIndex: 30,
      pointerEvents: 'auto',
    };
  }

  // Immediate Left Card (-1)
  if (offset === -1) {
    return {
      scale: isMobile ? 0.58 : 0.84 * baseScale,
      translateX: isMobile ? -150 : -310 * multiplier * (cardScale > 1 ? Math.sqrt(cardScale) : 1),
      translateY: (isMobile ? 18 : 14) * baseScale,
      translateZ: isMobile ? -180 : -140,
      rotateY: isMobile ? 38 : 32,
      rotateZ: -5,
      opacity: isMobile ? 0.40 : 0.85,
      blur: 0,
      zIndex: 20,
      pointerEvents: 'auto',
    };
  }

  // Immediate Right Card (+1)
  if (offset === 1) {
    return {
      scale: isMobile ? 0.58 : 0.84 * baseScale,
      translateX: isMobile ? 150 : 310 * multiplier * (cardScale > 1 ? Math.sqrt(cardScale) : 1),
      translateY: (isMobile ? 18 : 14) * baseScale,
      translateZ: isMobile ? -180 : -140,
      rotateY: isMobile ? -38 : -32,
      rotateZ: 5,
      opacity: isMobile ? 0.40 : 0.85,
      blur: 0,
      zIndex: 20,
      pointerEvents: 'auto',
    };
  }

  // Outer Left Card (-2)
  if (offset === -2) {
    return {
      scale: isMobile ? 0.42 : 0.68 * baseScale,
      translateX: isMobile ? -230 : -580 * multiplier * (cardScale > 1 ? Math.sqrt(cardScale) : 1),
      translateY: (isMobile ? 38 : 34) * baseScale,
      translateZ: isMobile ? -300 : -280,
      rotateY: isMobile ? 54 : 50,
      rotateZ: -10,
      opacity: isMobile ? 0.15 : 0.55,
      blur: 0,
      zIndex: 10,
      pointerEvents: 'auto',
    };
  }

  // Outer Right Card (+2)
  if (offset === 2) {
    return {
      scale: isMobile ? 0.42 : 0.68 * baseScale,
      translateX: isMobile ? 230 : 580 * multiplier * (cardScale > 1 ? Math.sqrt(cardScale) : 1),
      translateY: (isMobile ? 38 : 34) * baseScale,
      translateZ: isMobile ? -300 : -280,
      rotateY: isMobile ? -54 : -50,
      rotateZ: 10,
      opacity: isMobile ? 0.15 : 0.55,
      blur: 0,
      zIndex: 10,
      pointerEvents: 'auto',
    };
  }

  // Cards beyond offset ±2 (Out of Window)
  const isLeft = offset < 0;
  return {
    scale: (isMobile ? 0.35 : 0.55) * baseScale,
    translateX: (isLeft ? -760 : 760) * multiplier * (cardScale > 1 ? Math.sqrt(cardScale) : 1),
    translateY: 55 * baseScale,
    translateZ: -400,
    rotateY: isLeft ? 60 : -60,
    rotateZ: isLeft ? -14 : 14,
    opacity: 0,
    blur: 2,
    zIndex: 0,
    pointerEvents: 'none',
  };
}

export default function Services3DCarousel() {
  const [virtualIndex, setVirtualIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [responsiveMultiplier, setResponsiveMultiplier] = useState(1);
  const [desktopScale, setDesktopScale] = useState(1);
  const total = newServicesData.length;

  // Active index mapped to data array length
  const activeIndex = ((virtualIndex % total) + total) % total;
  // Map services to 4 pills
  const activePillIndex = Math.min(3, Math.floor((activeIndex / total) * 4));

  // Responsive spatial multiplier for small & large viewports
  useEffect(() => {
    const updateScale = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setResponsiveMultiplier(0.48);
        setDesktopScale(0.85);
      } else if (width < 1024) {
        setResponsiveMultiplier(0.72);
        setDesktopScale(0.92);
      } else if (width < 1440) {
        setResponsiveMultiplier(1.0);
        setDesktopScale(1.0);
      } else if (width < 1790) {
        setResponsiveMultiplier(1.14);
        setDesktopScale(1.18);
      } else {
        setResponsiveMultiplier(1.28);
        setDesktopScale(1.32);
      }
    };

    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, []);

  const handleNext = useCallback(() => {
    setVirtualIndex((prev) => prev + 1);
  }, []);

  const handlePrev = useCallback(() => {
    setVirtualIndex((prev) => prev - 1);
  }, []);

  const handleJumpToPill = useCallback(
    (pillIdx: number) => {
      const targetCardIndex = Math.floor((pillIdx / 4) * total);
      setVirtualIndex((current) => {
        const currentActive = ((current % total) + total) % total;
        let diff = targetCardIndex - currentActive;
        if (diff > total / 2) diff -= total;
        if (diff < -total / 2) diff += total;
        return current + diff;
      });
    },
    [total]
  );

  // Auto-rotate every 5 seconds (5000ms), pauses when hovered
  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      handleNext();
    }, 5000);
    return () => clearInterval(interval);
  }, [handleNext, isHovered]);

  // Support left/right arrow key navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev]);

  return (
    <section className="relative w-full bg-[#f4fafd] py-10 md:py-16 overflow-hidden select-none">
      {/* SECTION HEADER */}
      <div className="mx-auto max-w-[1400px] px-6 md:px-12 mb-4 md:mb-6 text-center">
        <div className="flex flex-col items-center gap-2 select-none">
          {/* Subtitle Badge */}
          <div className="flex items-center justify-center gap-2.5 text-[#15b6e8] text-xs font-bold tracking-[0.25em] uppercase">
            <span className="w-6 h-[1.5px] bg-[#15b6e8]" />
            <span>SERVICES</span>
            <span className="w-6 h-[1.5px] bg-[#15b6e8]" />
          </div>

          {/* Title */}
          <h2
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-bold tracking-tight text-[#161d1e] my-0.5"
            style={{ fontFamily: 'var(--font-zalando-expanded, sans-serif)' }}
          >
            Design. Build. Grow.
          </h2>

          {/* Sub-description */}
          <p className="text-[#3b494c] font-medium text-center max-w-lg xl:max-w-xl text-xs md:text-sm xl:text-base leading-relaxed">
            We craft digital experiences and products that look great, perform better, and grow your brand.
          </p>
        </div>
      </div>

      {/* 3D PRESENTATION STAGE ENVIRONMENT */}
      <div
        className="relative w-full h-[470px] sm:h-[490px] md:h-[510px] xl:h-[570px] 2xl:h-[640px] flex items-center justify-center"
        style={{
          perspective: '1000px',
          transformStyle: 'preserve-3d',
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Dim Top Anchor Pin Indicator pointing directly at top-center edge of active card */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 flex flex-col items-center z-40 pointer-events-none">
          <div className="w-2.5 h-2.5 bg-[#15b6e8] rounded-full border border-white shadow-[0_0_8px_rgba(21,182,232,0.6)]" />
          <div className="w-[1.5px] h-[41px] bg-gradient-to-b from-[#15b6e8] via-[#15b6e8]/60 to-transparent" />
        </div>

        {/* Ambient Radial Gradient Glow */}
        <div
          className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[420px] w-[800px] max-w-full rounded-full blur-[60px]"
          style={{
            background:
              'radial-gradient(circle at 50% 45%, rgba(21, 182, 232, 0.08) 0%, transparent 65%)',
          }}
        />

        {/* Deeply Curved Solid SVG Arc String Line (#15b6e8) with Center Gap for Pills */}
        <div className="pointer-events-none absolute bottom-1 left-1/2 -translate-x-1/2 w-[1150px] max-w-[95vw] h-[60px] z-20 flex items-center justify-center">
          <svg viewBox="0 0 1150 60" className="w-full h-full overflow-visible">
            <defs>
              <linearGradient id="arcStringGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#15b6e8" stopOpacity="0.08" />
                <stop offset="22%" stopColor="#15b6e8" stopOpacity="0.75" />
                <stop offset="42%" stopColor="#15b6e8" stopOpacity="0.95" />
                <stop offset="44%" stopColor="#15b6e8" stopOpacity="0" />
                <stop offset="56%" stopColor="#15b6e8" stopOpacity="0" />
                <stop offset="58%" stopColor="#15b6e8" stopOpacity="0.95" />
                <stop offset="78%" stopColor="#15b6e8" stopOpacity="0.75" />
                <stop offset="100%" stopColor="#15b6e8" stopOpacity="0.08" />
              </linearGradient>
            </defs>
            {/* Deeply curved cyan arc string line */}
            <path
              d="M 5 6 Q 575 38 1145 6"
              fill="none"
              stroke="url(#arcStringGrad)"
              strokeWidth="1.8"
            />
          </svg>

          {/* Exactly 4 String Pills Positioned Absolutely Directly Inside the Line Vacant Space */}
          <div className="pointer-events-auto absolute left-1/2 -translate-x-1/2 top-[22px] -translate-y-1/2 z-30 flex items-center justify-center gap-2.5">
            {[0, 1, 2, 3].map((pillIdx) => {
              const isCurrent = activePillIndex === pillIdx;
              return (
                <button
                  key={pillIdx}
                  onClick={() => handleJumpToPill(pillIdx)}
                  aria-label={`Go to slide group ${pillIdx + 1}`}
                  className="relative py-1 focus:outline-none cursor-pointer flex items-center justify-center"
                >
                  {isCurrent ? (
                    <motion.div
                      layoutId="activeStringPill"
                      transition={{ type: 'spring', stiffness: 380, damping: 28 }}
                      className="w-7 h-[5px] rounded-full bg-[#15b6e8] shadow-[0_0_12px_rgba(21,182,232,0.85)]"
                    />
                  ) : (
                    <div className="w-4 h-[5px] rounded-full bg-[#bac9cc]/60 transition-colors hover:bg-[#15b6e8]" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* 3D Stage Container */}
        <div
          className="relative w-full h-full flex items-center justify-center -translate-y-4"
          style={{
            transformStyle: 'preserve-3d',
          }}
        >
          {newServicesData.map((service, index) => {
            // Calculate circular offset relative to virtualIndex
            let offset = index - (virtualIndex % total);
            if (offset > total / 2) offset -= total;
            if (offset < -total / 2) offset += total;

            const state = getSpatialState(offset, responsiveMultiplier, desktopScale);

            return (
              <motion.div
                key={service.id}
                className="absolute cursor-pointer rounded-3xl"
                onClick={() => {
                  if (offset < 0) handlePrev();
                  if (offset > 0) handleNext();
                }}
                initial={false}
                animate={{
                  x: state.translateX,
                  y: state.translateY,
                  z: state.translateZ,
                  rotateY: state.rotateY,
                  rotateZ: state.rotateZ,
                  scale: state.scale,
                  opacity: state.opacity,
                  filter: state.blur > 0 ? `blur(${state.blur}px)` : 'none',
                }}
                transition={{
                  type: 'spring',
                  stiffness: 260,
                  damping: 28,
                  mass: 0.8,
                }}
                style={{
                  transformStyle: 'preserve-3d',
                  WebkitBackfaceVisibility: 'hidden',
                  backfaceVisibility: 'hidden',
                  willChange: 'transform, opacity',
                  zIndex: state.zIndex,
                  pointerEvents: state.pointerEvents,
                }}
              >
                {/* Ground Contact Shadows (Dark Slate Gray for Side Cards, Cyan for Active Center Card) */}
                <motion.div
                  className="pointer-events-none absolute left-1/2 -translate-x-1/2"
                  style={{
                    bottom: -30,
                    width: '70%',
                    height: 14,
                    borderRadius: '50%',
                    background:
                      offset === 0
                        ? 'radial-gradient(ellipse at center, rgba(0, 240, 255, 0.35) 0%, rgba(0, 0, 0, 0.2) 40%, transparent 70%)'
                        : 'radial-gradient(ellipse at center, rgba(15, 23, 42, 0.45) 0%, rgba(0, 0, 0, 0.3) 50%, transparent 75%)',
                    filter: 'blur(10px)',
                  }}
                  animate={{
                    scale: offset === 0 ? 1 : 0.7,
                    opacity: offset === 0 ? 1 : 0.45,
                  }}
                  transition={{
                    type: 'spring',
                    stiffness: 260,
                    damping: 28,
                    mass: 0.8,
                  }}
                />

                {/* Card Container with OUTSIDE Dark Slate Drop Shadow for Side Cards */}
                <div
                  className="relative rounded-3xl transition-all duration-500 overflow-hidden"
                  style={{
                    border:
                      offset === 0
                        ? '1.5px solid rgba(21, 182, 232, 0.85)'
                        : '1px solid rgba(15, 23, 42, 0.08)',
                    boxShadow:
                      offset === 0
                        ? '0 10px 30px rgba(21, 182, 232, 0.25)'
                        : '0 24px 48px -10px rgba(15, 23, 42, 0.38), 0 12px 24px -6px rgba(0, 0, 0, 0.22)',
                  }}
                >
                  <ServiceCard data={service} isFocused={offset === 0} />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* FOOTER CONTROLS & SUB-LABEL */}
      <div className="mx-auto max-w-[1400px] px-6 mt-2 flex flex-col items-center gap-2.5 z-40 relative">
        {/* Explore Sub-label */}
        <div className="flex flex-col items-center gap-1 text-[10px] font-bold tracking-[0.3em] uppercase text-[#15b6e8]">
          <span>EXPLORE OUR SERVICES</span>
        </div>

        {/* Outer Prev/Next Arrow Buttons & Counter */}
        <div className="flex items-center justify-center gap-5">
          <button
            onClick={handlePrev}
            aria-label="Previous service"
            className="
              group
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-full
              border
              border-[#bac9cc]
              bg-white
              text-[#161d1e]
              shadow-sm
              transition-all
              duration-300
              hover:border-[#15b6e8]
              hover:bg-[#15b6e8]
              hover:text-white
              hover:shadow-[0_0_14px_rgba(21,182,232,0.35)]
              active:scale-95
            "
          >
            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4 fill-none stroke-current stroke-[2] transition-transform duration-300 group-hover:-translate-x-0.5"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
          </button>

          {/* Counter */}
          <div className="flex items-center gap-1.5 font-mono text-xs tracking-wider">
            <span className="font-bold text-[#15b6e8]">
              {String(activeIndex + 1).padStart(2, '0')}
            </span>
            <span className="text-[#bac9cc]">/</span>
            <span className="text-[#3b494c]">{String(total).padStart(2, '0')}</span>
          </div>

          <button
            onClick={handleNext}
            aria-label="Next service"
            className="
              group
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-full
              border
              border-[#bac9cc]
              bg-white
              text-[#161d1e]
              shadow-sm
              transition-all
              duration-300
              hover:border-[#15b6e8]
              hover:bg-[#15b6e8]
              hover:text-white
              hover:shadow-[0_0_14px_rgba(21,182,232,0.35)]
              active:scale-95
            "
          >
            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4 fill-none stroke-current stroke-[2] transition-transform duration-300 group-hover:translate-x-0.5"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
