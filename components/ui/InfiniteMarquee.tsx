'use client';

import React, { useRef, useEffect, useState, useCallback } from 'react';
import {
  motion,
  useMotionValue,
  useTransform,
  useAnimationFrame,
  useInView,
} from 'framer-motion';

export interface InfiniteMarqueeProps {
  items: React.ReactNode[];
  speed?: number; // pixels per frame (default: 1.5)
  gap?: number; // spacing between items in px (default: 20)
  pauseOnHover?: boolean; // default: false
  direction?: 'left' | 'right'; // default: 'left'
  className?: string;
  itemClassName?: string;
}

/**
 * Pure wrap function using modulo arithmetic.
 * Maps value `v` continuously into range [min, max).
 */
function wrap(min: number, max: number, v: number): number {
  const rangeSize = max - min;
  if (rangeSize <= 0) return 0;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
}

interface ItemMeasurement {
  width: number;
  offset: number;
}

export function InfiniteMarquee({
  items,
  speed = 1.5,
  gap = 20,
  pauseOnHover = false,
  direction = 'left',
  className = '',
  itemClassName = '',
}: InfiniteMarqueeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef);

  // Motion value representing the continuous global track displacement
  const x = useMotionValue(0);

  // Layout measurement state
  const [measurements, setMeasurements] = useState<ItemMeasurement[]>([]);
  const [totalWidth, setTotalWidth] = useState<number>(0);

  // Interactive & physics state refs (avoid re-renders during 60/120fps frames)
  const isDragging = useRef(false);
  const isHovered = useRef(false);
  const lastPointerX = useRef(0);
  const lastPointerTime = useRef(0);
  const velocity = useRef(0);

  // Measure item dimensions using ResizeObserver
  const measureLayout = useCallback(() => {
    if (!containerRef.current) return;
    const children = Array.from(
      containerRef.current.querySelectorAll<HTMLElement>('[data-marquee-item]')
    );

    if (children.length === 0) return;

    let currentOffset = 0;
    const newMeasurements: ItemMeasurement[] = children.map((child) => {
      const width = child.offsetWidth;
      const offset = currentOffset;
      currentOffset += width + gap;
      return { width, offset };
    });

    setMeasurements(newMeasurements);
    setTotalWidth(currentOffset);
  }, [gap]);

  useEffect(() => {
    measureLayout();

    if (!containerRef.current) return;
    const resizeObserver = new ResizeObserver(() => {
      measureLayout();
    });

    resizeObserver.observe(containerRef.current);
    const children = containerRef.current.querySelectorAll('[data-marquee-item]');
    children.forEach((child) => resizeObserver.observe(child));

    return () => {
      resizeObserver.disconnect();
    };
  }, [measureLayout, items]);

  // Target speed signed by direction (- for left scroll, + for right scroll)
  const dirMultiplier = direction === 'left' ? -1 : 1;
  const targetSpeed = speed * dirMultiplier;

  // Animation frame loop for continuous scrolling and inertia decay
  useAnimationFrame((_, delta) => {
    // Skip updates if off-screen or hovered (if pauseOnHover enabled)
    if (!isInView || (pauseOnHover && isHovered.current)) return;
    if (isDragging.current) return;
    if (totalWidth <= 0) return;

    // Standardize delta to ~60fps frame time (16.67ms)
    const frameFactor = Math.min(delta / 16.67, 2);

    // Smoothly decay velocity back to base auto-scroll speed on drag release
    if (Math.abs(velocity.current - targetSpeed) > 0.01) {
      velocity.current = velocity.current * 0.92 + targetSpeed * 0.08;
    } else {
      velocity.current = targetSpeed;
    }

    const currentX = x.get();
    x.set(currentX + velocity.current * frameFactor);
  });

  // Pointer event handlers for drag interaction with momentum decay
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    isDragging.current = true;
    lastPointerX.current = e.clientX;
    lastPointerTime.current = performance.now();
    velocity.current = 0;
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging.current) return;

    const currentX = e.clientX;
    const currentTime = performance.now();
    const deltaX = currentX - lastPointerX.current;
    const deltaTime = currentTime - lastPointerTime.current;

    if (deltaTime > 0) {
      // Calculate instantaneous velocity in px per frame (~16.67ms)
      velocity.current = (deltaX / deltaTime) * 16.67;
    }

    x.set(x.get() + deltaX);
    lastPointerX.current = currentX;
    lastPointerTime.current = currentTime;
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging.current) return;
    isDragging.current = false;
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
  };

  return (
    <div
      ref={containerRef}
      className={`relative w-full overflow-hidden select-none touch-pan-y ${
        isDragging.current ? 'cursor-grabbing' : 'cursor-grab'
      } ${className}`}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onMouseEnter={() => {
        isHovered.current = true;
      }}
      onMouseLeave={() => {
        isHovered.current = false;
      }}
      style={{ touchAction: 'pan-y' }}
    >
      <div
        className="flex items-center"
        style={{ gap: `${gap}px`, visibility: totalWidth > 0 ? 'visible' : 'hidden' }}
      >
        {items.map((item, index) => (
          <MarqueeItemWrapper
            key={index}
            index={index}
            globalX={x}
            measurement={measurements[index]}
            totalWidth={totalWidth}
            className={itemClassName}
          >
            {item}
          </MarqueeItemWrapper>
        ))}
      </div>
    </div>
  );
}

/**
 * Individual item wrapper that calculates its own wrapped transform
 * using Framer Motion `useTransform` strictly on the GPU thread.
 */
function MarqueeItemWrapper({
  index,
  globalX,
  measurement,
  totalWidth,
  className,
  children,
}: {
  index: number;
  globalX: ReturnType<typeof useMotionValue<number>>;
  measurement?: ItemMeasurement;
  totalWidth: number;
  className?: string;
  children: React.ReactNode;
}) {
  const itemX = useTransform(globalX, (latestX) => {
    if (!measurement || totalWidth <= 0) return 0;
    const { width, offset } = measurement;
    const rawX = offset + latestX;
    const wrappedX = wrap(-width, totalWidth - width, rawX);
    return wrappedX - offset;
  });

  return (
    <motion.div
      data-marquee-item
      data-index={index}
      className={`shrink-0 will-change-transform ${className}`}
      style={{ x: itemX }}
    >
      {children}
    </motion.div>
  );
}

export default InfiniteMarquee;
