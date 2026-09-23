'use client';

import { useState, useEffect, useCallback, useRef, type PointerEvent as ReactPointerEvent } from 'react';
import { motion, useMotionValue, useTransform, animate, MotionValue } from 'framer-motion';
import ServiceCard, { type ServiceCardData } from './NewServiceCard';

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

  // Immediate Left Card (-1) - Closer spacing & higher opacity for mobile
  if (offset === -1) {
    return {
      scale: isMobile ? 0.68 : 0.82 * baseScale,
      translateX: isMobile ? -110 : -255 * multiplier * (cardScale > 1 ? Math.sqrt(cardScale) : 1),
      translateY: (isMobile ? 14 : 12) * baseScale,
      translateZ: isMobile ? -120 : 60,
      rotateY: isMobile ? 28 : 57,
      rotateZ: 0,
      opacity: isMobile ? 0.82 : 1,
      blur: 0,
      zIndex: 20,
      pointerEvents: 'auto',
    };
  }

  // Immediate Right Card (+1) - Balanced symmetrically with -1
  if (offset === 1) {
    return {
      scale: isMobile ? 0.68 : 0.82 * baseScale,
      translateX: isMobile ? 110 : 255 * multiplier * (cardScale > 1 ? Math.sqrt(cardScale) : 1),
      translateY: (isMobile ? 14 : 12) * baseScale,
      translateZ: isMobile ? -120 : 60,
      rotateY: isMobile ? -28 : -57,
      rotateZ: 0,
      opacity: isMobile ? 0.82 : 1,
      blur: 0,
      zIndex: 20,
      pointerEvents: 'auto',
    };
  }

  // Outer Left Card (-2)
  if (offset === -2) {
    return {
      scale: isMobile ? 0.52 : 0.68 * baseScale,
      translateX: isMobile ? -180 : -500 * multiplier * (cardScale > 1 ? Math.sqrt(cardScale) : 1),
      translateY: (isMobile ? 28 : 30) * baseScale,
      translateZ: isMobile ? -220 : -30,
      rotateY: isMobile ? 42 : 82,
      rotateZ: 0,
      opacity: isMobile ? 0.55 : 0.85,
      blur: 0,
      zIndex: 10,
      pointerEvents: 'auto',
    };
  }

  // Outer Right Card (+2)
  if (offset === 2) {
    return {
      scale: isMobile ? 0.52 : 0.68 * baseScale,
      translateX: isMobile ? 180 : 500 * multiplier * (cardScale > 1 ? Math.sqrt(cardScale) : 1),
      translateY: (isMobile ? 28 : 30) * baseScale,
      translateZ: isMobile ? -220 : -30,
      rotateY: isMobile ? -42 : -82,
      rotateZ: 0,
      opacity: isMobile ? 0.55 : 1,
      blur: 0,
      zIndex: 10,
      pointerEvents: 'auto',
    };
  }

  // Cards beyond offset ±2 (Out of Window)
  const isLeft = offset < 0;
  return {
    scale: (isMobile ? 0.35 : 0.55) * baseScale,
    translateX: (isLeft ? -780 : 780) * multiplier * (cardScale > 1 ? Math.sqrt(cardScale) : 1),
    translateY: 55 * baseScale,
    translateZ: -400,
    rotateY: isLeft ? 60 : -60,
    rotateZ: isLeft ? -10 : 10,
    opacity: 0,
    blur: 0,
    zIndex: 0,
    pointerEvents: 'none',
  };
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

/**
 * Interpolate continuous 3D spatial properties for fractional offsets (e.g. -0.4, 0.75, +1.2).
 */
function getInterpolatedSpatialState(offset: number, multiplier: number = 1, cardScale: number = 1): SpatialState {
  const floorOffset = Math.floor(offset);
  const ceilOffset = Math.ceil(offset);
  const t = offset - floorOffset;

  if (floorOffset === ceilOffset) {
    return getSpatialState(floorOffset, multiplier, cardScale);
  }

  const lower = getSpatialState(floorOffset, multiplier, cardScale);
  const upper = getSpatialState(ceilOffset, multiplier, cardScale);
  const nearest = getSpatialState(Math.round(offset), multiplier, cardScale);

  return {
    scale: lerp(lower.scale, upper.scale, t),
    translateX: lerp(lower.translateX, upper.translateX, t),
    translateY: lerp(lower.translateY, upper.translateY, t),
    translateZ: lerp(lower.translateZ, upper.translateZ, t),
    rotateY: lerp(lower.rotateY, upper.rotateY, t),
    rotateZ: lerp(lower.rotateZ, upper.rotateZ, t),
    opacity: lerp(lower.opacity, upper.opacity, t),
    blur: lerp(lower.blur, upper.blur, t),
    zIndex: nearest.zIndex,
    pointerEvents: Math.abs(offset) <= 2.2 ? 'auto' : 'none',
  };
}

interface CarouselCardItemProps {
  service: ServiceCardData;
  index: number;
  virtualIndex: number;
  total: number;
  dragOffset: MotionValue<number>;
  responsiveMultiplier: number;
  desktopScale: number;
  onCardClick: (offset: number) => void;
}

function CarouselCardItem({
  service,
  index,
  virtualIndex,
  total,
  dragOffset,
  responsiveMultiplier,
  desktopScale,
  onCardClick,
}: CarouselCardItemProps) {
  let baseOffset = index - (virtualIndex % total);
  if (baseOffset > total / 2) baseOffset -= total;
  if (baseOffset < -total / 2) baseOffset += total;

  const stepPx = Math.max(200, 350 * responsiveMultiplier);

  const effectiveOffset = useTransform(dragOffset, (latestPx) => {
    return baseOffset + latestPx / stepPx;
  });

  const x = useTransform(effectiveOffset, (off) =>
    getInterpolatedSpatialState(off, responsiveMultiplier, desktopScale).translateX
  );
  const y = useTransform(effectiveOffset, (off) =>
    getInterpolatedSpatialState(off, responsiveMultiplier, desktopScale).translateY
  );
  const z = useTransform(effectiveOffset, (off) =>
    getInterpolatedSpatialState(off, responsiveMultiplier, desktopScale).translateZ
  );
  const rotateY = useTransform(effectiveOffset, (off) =>
    getInterpolatedSpatialState(off, responsiveMultiplier, desktopScale).rotateY
  );
  const rotateZ = useTransform(effectiveOffset, (off) =>
    getInterpolatedSpatialState(off, responsiveMultiplier, desktopScale).rotateZ
  );
  const scale = useTransform(effectiveOffset, (off) =>
    getInterpolatedSpatialState(off, responsiveMultiplier, desktopScale).scale
  );
  const opacity = useTransform(effectiveOffset, (off) =>
    getInterpolatedSpatialState(off, responsiveMultiplier, desktopScale).opacity
  );
  const zIndex = useTransform(effectiveOffset, (off) =>
    getInterpolatedSpatialState(off, responsiveMultiplier, desktopScale).zIndex
  );
  const pointerEvents = useTransform(effectiveOffset, (off) =>
    getInterpolatedSpatialState(off, responsiveMultiplier, desktopScale).pointerEvents
  );

  const isFocusedState = useTransform(effectiveOffset, (off) => Math.abs(off) < 0.15);
  const [isFocused, setIsFocused] = useState(baseOffset === 0);

  useEffect(() => {
    const unsubscribe = isFocusedState.on('change', (v) => setIsFocused(v));
    return () => unsubscribe();
  }, [isFocusedState]);

  const shadowScale = useTransform(effectiveOffset, (off) =>
    Math.abs(off) < 0.15 ? 1 : 0.7
  );
  const shadowOpacity = useTransform(effectiveOffset, (off) =>
    Math.abs(off) < 0.15 ? 1 : 0.45
  );

  return (
    <motion.div
      className="absolute cursor-pointer rounded-3xl select-none outline-none focus:outline-none [WebkitTapHighlightColor:transparent]"
      onClick={(e) => {
        e.stopPropagation();
        onCardClick(baseOffset);
      }}
      style={{
        x,
        y,
        z,
        rotateY,
        rotateZ,
        scale,
        opacity,
        zIndex,
        pointerEvents,
        transformStyle: 'preserve-3d',
        WebkitBackfaceVisibility: 'hidden',
        backfaceVisibility: 'hidden',
        WebkitFontSmoothing: 'antialiased',
        willChange: 'transform, opacity',
      }}
    >
      {/* Base Ground Contact Shadow (Dark Slate Gray for Side Cards) */}
      <motion.div
        className="pointer-events-none absolute left-1/2 -translate-x-1/2"
        style={{
          bottom: -30,
          width: '70%',
          height: 14,
          borderRadius: '50%',
          background: 'radial-gradient(ellipse at center, rgba(15, 23, 42, 0.45) 0%, rgba(0, 0, 0, 0.3) 50%, transparent 75%)',
          filter: 'blur(10px)',
          scale: shadowScale,
          opacity: shadowOpacity,
        }}
      />

      {/* Cyan Ground Contact Shadow for Active Center Card (Smooth GPU Opacity Fade) */}
      <motion.div
        className="pointer-events-none absolute left-1/2 -translate-x-1/2"
        initial={false}
        animate={{ opacity: isFocused ? 1 : 0 }}
        transition={{ duration: 0.25, ease: 'easeInOut' }}
        style={{
          bottom: -30,
          width: '70%',
          height: 14,
          borderRadius: '50%',
          background: 'radial-gradient(ellipse at center, rgba(0, 240, 255, 0.35) 0%, rgba(0, 0, 0, 0.2) 40%, transparent 70%)',
          filter: 'blur(10px)',
          scale: shadowScale,
        }}
      />

      {/* Card Container */}
      <div className="relative rounded-3xl transition-all duration-500 ease-out outline-none focus:outline-none [WebkitTapHighlightColor:transparent]">
        <ServiceCard data={service} isFocused={isFocused} />
      </div>
    </motion.div>
  );
}

export interface Services3DCarouselClientProps {
  services: ServiceCardData[];
}

export default function Services3DCarouselClient({ services }: Services3DCarouselClientProps) {
  const [virtualIndex, setVirtualIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [responsiveMultiplier, setResponsiveMultiplier] = useState(1);
  const [desktopScale, setDesktopScale] = useState(1);
  const total = services.length;

  const dragOffset = useMotionValue(0);
  const pointerStartRef = useRef<{ x: number; y: number; time: number } | null>(null);
  const isPointerDownRef = useRef(false);
  const isDraggingRef = useRef(false);
  const hasMovedRef = useRef(false);

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
        setDesktopScale(1.0); // Capped at 1.0 to prevent JS upscaling raster blur on 4K
      } else {
        setResponsiveMultiplier(1.28);
        setDesktopScale(1.0); // Capped at 1.0 to prevent JS upscaling raster blur on 4K
      }
    };

    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, []);

  const isTransitioningRef = useRef(false);
  const autoRotateTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const scheduleAutoRotateRef = useRef<() => void>(() => { });

  const clearAutoRotateTimer = useCallback(() => {
    if (autoRotateTimerRef.current !== null) {
      clearTimeout(autoRotateTimerRef.current);
      autoRotateTimerRef.current = null;
    }
  }, []);

  const runRollerTransition = useCallback(
    (direction: 1 | -1, afterComplete?: () => void) => {
      if (isTransitioningRef.current) return;

      isTransitioningRef.current = true;
      dragOffset.stop();

      const stepPx = Math.max(200, 350 * responsiveMultiplier);
      const targetPx = direction === 1 ? -stepPx : stepPx;

      animate(dragOffset, targetPx, {
        type: 'spring',
        stiffness: 230,
        damping: 30,
        mass: 0.85,
        onComplete: () => {
          setVirtualIndex((prev) => prev + direction);
          dragOffset.set(0);
          isTransitioningRef.current = false;
          afterComplete?.();
        },
      });
    },
    [dragOffset, responsiveMultiplier]
  );

  const scheduleAutoRotate = useCallback(() => {
    clearAutoRotateTimer();

    if (isDraggingRef.current || isTransitioningRef.current) return;

    autoRotateTimerRef.current = setTimeout(() => {
      if (isDraggingRef.current || isTransitioningRef.current) {
        scheduleAutoRotateRef.current();
        return;
      }

      runRollerTransition(1, () => {
        scheduleAutoRotateRef.current();
      });
    }, 5000);
  }, [clearAutoRotateTimer, runRollerTransition]);

  scheduleAutoRotateRef.current = scheduleAutoRotate;

  const handleNext = useCallback(() => {
    clearAutoRotateTimer();
    runRollerTransition(1, () => scheduleAutoRotateRef.current());
  }, [clearAutoRotateTimer, runRollerTransition]);

  const handlePrev = useCallback(() => {
    clearAutoRotateTimer();
    runRollerTransition(-1, () => scheduleAutoRotateRef.current());
  }, [clearAutoRotateTimer, runRollerTransition]);

  const handleJumpToPill = useCallback(
    (pillIdx: number) => {
      clearAutoRotateTimer();
      dragOffset.stop();
      const targetCardIndex = Math.floor((pillIdx / 4) * total);
      setVirtualIndex((current) => {
        const currentActive = ((current % total) + total) % total;
        let diff = targetCardIndex - currentActive;
        if (diff > total / 2) diff -= total;
        if (diff < -total / 2) diff += total;
        return current + diff;
      });
      dragOffset.set(0);
      scheduleAutoRotateRef.current();
    },
    [total, clearAutoRotateTimer, dragOffset]
  );

  // Pointer drag gesture handlers
  const handlePointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (e.button !== 0) return;

    clearAutoRotateTimer();
    dragOffset.stop();
    pointerStartRef.current = { x: e.clientX, y: e.clientY, time: Date.now() };
    isPointerDownRef.current = true;
    isDraggingRef.current = false;
    hasMovedRef.current = false;
  };

  const handlePointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!isPointerDownRef.current || !pointerStartRef.current) return;

    const deltaX = e.clientX - pointerStartRef.current.x;
    const deltaY = e.clientY - pointerStartRef.current.y;

    if (!hasMovedRef.current) {
      const absX = Math.abs(deltaX);
      const absY = Math.abs(deltaY);

      if (absX > 8 && absX > absY) {
        hasMovedRef.current = true;
        isDraggingRef.current = true;
        clearAutoRotateTimer();
        setIsDragging(true);

        try {
          (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
        } catch {
          // Ignore if pointer capture fails
        }
      }
    }

    if (isDraggingRef.current) {
      // Drag resistance of 0.75
      const effectiveDelta = deltaX * 0.75;
      dragOffset.set(effectiveDelta);
    }
  };

  const handlePointerUp = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!isPointerDownRef.current || !pointerStartRef.current) return;

    isPointerDownRef.current = false;

    try {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      // Ignore if pointer capture already released
    }

    const currentPx = dragOffset.get();
    const dt = (Date.now() - pointerStartRef.current.time) / 1000;
    const deltaX = e.clientX - pointerStartRef.current.x;
    const velocityX = deltaX / Math.max(dt, 0.001);

    pointerStartRef.current = null;

    if (isDraggingRef.current) {
      const stepPx = Math.max(200, 350 * responsiveMultiplier);
      const threshold = responsiveMultiplier < 0.6 ? 50 : 80;

      let targetPx = 0;
      let navDirection = 0;

      if (currentPx < -threshold || (velocityX < -400 && deltaX < -20)) {
        targetPx = -stepPx;
        navDirection = 1;
      } else if (currentPx > threshold || (velocityX > 400 && deltaX > 20)) {
        targetPx = stepPx;
        navDirection = -1;
      }

      if (navDirection !== 0) {
        clearAutoRotateTimer();
        isTransitioningRef.current = true;
        animate(dragOffset, targetPx, {
          type: 'spring',
          stiffness: 230,
          damping: 30,
          mass: 0.85,
          onComplete: () => {
            setVirtualIndex((prev) => prev + navDirection);
            dragOffset.set(0);
            isTransitioningRef.current = false;
            setIsDragging(false);
            isDraggingRef.current = false;
            scheduleAutoRotate();
          },
        });
      } else {
        animate(dragOffset, 0, {
          type: 'spring',
          stiffness: 350,
          damping: 28,
          onComplete: () => {
            setIsDragging(false);
            isDraggingRef.current = false;
            scheduleAutoRotate();
          },
        });
      }
    } else {
      // A simple click / vertical gesture should not leave autoplay disabled.
      scheduleAutoRotate();
    }
  };

  const handleCardClick = useCallback(
    (baseOffset: number) => {
      if (isDraggingRef.current || isTransitioningRef.current || baseOffset === 0) return;

      clearAutoRotateTimer();
      isTransitioningRef.current = true;
      dragOffset.stop();

      const stepPx = Math.max(200, 350 * responsiveMultiplier);
      const targetPx = baseOffset < 0 ? stepPx * Math.abs(baseOffset) : -stepPx * baseOffset;

      animate(dragOffset, targetPx, {
        type: 'spring',
        stiffness: 230,
        damping: 30,
        mass: 0.85,
        onComplete: () => {
          setVirtualIndex((prev) => prev + baseOffset);
          dragOffset.set(0);
          isTransitioningRef.current = false;
          scheduleAutoRotateRef.current();
        },
      });
    },
    [clearAutoRotateTimer, dragOffset, responsiveMultiplier]
  );

  // Auto-rotation is scheduled by the same roller transition used by drag/manual navigation.
  useEffect(() => {
    scheduleAutoRotate();
    return () => clearAutoRotateTimer();
  }, [scheduleAutoRotate, clearAutoRotateTimer]);

  // Support left/right arrow key navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (target?.matches('input, textarea, select, [contenteditable="true"]')) return;
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        handleNext();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev]);

  return (
    <>
      {/* 3D PRESENTATION STAGE ENVIRONMENT WITH PHYSICAL DRAG */}
      <div
        data-cursor="drag"
        className="relative w-full h-[440px] sm:h-[460px] md:h-[480px] xl:h-[530px] 2xl:h-[580px] flex items-center justify-center touch-pan-y cursor-grab active:cursor-grabbing"
        style={{
          perspective: '1000px',
          transformStyle: 'preserve-3d',
          touchAction: 'pan-y',
        }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        {/* Ambient Radial Gradient Glow */}
        <div
          className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[420px] w-[800px] max-w-full rounded-full blur-[60px]"
          style={{
            background:
              'radial-gradient(circle at 50% 45%, rgba(21, 182, 232, 0.08) 0%, transparent 65%)',
          }}
        />

        {/* Deeply Curved Solid SVG Arc String Line (#15b6e8) with Center Gap for Pills */}
        <div className="pointer-events-none absolute -bottom-1 left-1/2 -translate-x-1/2 w-[1150px] max-w-[95vw] h-[60px] z-20 flex items-center justify-center">
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
          className="relative w-full h-full flex items-center justify-center -translate-y-5"
          style={{
            transformStyle: 'preserve-3d',
          }}
        >
          {services.map((service, index) => (
            <CarouselCardItem
              key={service.id}
              service={service}
              index={index}
              virtualIndex={virtualIndex}
              total={total}
              dragOffset={dragOffset}
              responsiveMultiplier={responsiveMultiplier}
              desktopScale={desktopScale}
              onCardClick={handleCardClick}
            />
          ))}
        </div>
      </div>

      {/* FOOTER CONTROLS & SUB-LABEL */}
      <div className="mx-auto max-w-[1400px] px-6 mt-4 md:mt-5 flex flex-col items-center gap-2.5 z-40 relative">
        {/* Explore Sub-label */}
        <div className="flex flex-col items-center gap-1 text-[10px] font-bold tracking-[0.3em] uppercase text-[#161d1e]">
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
              h-11
              w-11
              items-center
              justify-center
              rounded-full
              text-[#161d1e]
              transition-all
              duration-300
              hover:scale-105
              hover:text-[#15b6e8]
              active:scale-95
            "
            style={{
              backgroundColor: 'rgb(244, 244, 245)',
              border: 'none',
              boxShadow:
                'rgba(255, 255, 255, 0.6) 0px 4px 0px 0px inset, rgba(0, 0, 0, 0.05) 0px -8px 0px 0px inset, rgba(0, 0, 0, 0.1) 0px 3px 3px 0px, rgba(0, 0, 0, 0.06) 0px 7.77px 16px 0px',
            }}
          >
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5 fill-none stroke-current stroke-[2.5] transition-transform duration-300 group-hover:-translate-x-0.5"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
          </button>

          <button
            onClick={handleNext}
            aria-label="Next service"
            className="
              group
              flex
              h-11
              w-11
              items-center
              justify-center
              rounded-full
              text-[#161d1e]
              transition-all
              duration-300
              hover:scale-105
              hover:text-[#15b6e8]
              active:scale-95
            "
            style={{
              backgroundColor: 'rgb(244, 244, 245)',
              border: 'none',
              boxShadow:
                'rgba(255, 255, 255, 0.6) 0px 4px 0px 0px inset, rgba(0, 0, 0, 0.05) 0px -8px 0px 0px inset, rgba(0, 0, 0, 0.1) 0px 3px 3px 0px, rgba(0, 0, 0, 0.06) 0px 7.77px 16px 0px',
            }}
          >
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5 fill-none stroke-current stroke-[2.5] transition-transform duration-300 group-hover:translate-x-0.5"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
}