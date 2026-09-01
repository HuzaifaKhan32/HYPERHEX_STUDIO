'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useReducedMotion, AnimatePresence } from 'framer-motion';

type CursorType = 'default' | 'text' | 'button' | 'project' | 'drag' | 'hidden';

const POSITION_SPRING = {
  stiffness: 500,
  damping: 38,
  mass: 0.2,
};

const MORPH_SPRING = {
  type: 'spring' as const,
  stiffness: 280,
  damping: 24,
  mass: 0.6,
};

export default function CustomCursor() {
  const reducedMotion = useReducedMotion();
  const [cursorType, setCursorType] = useState<CursorType>('default');
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Refs to track current values without triggering re-renders in hot paths
  const isVisibleRef = useRef(false);
  const cursorTypeRef = useRef<CursorType>('default');

  const rawX = useMotionValue(-100);
  const rawY = useMotionValue(-100);

  const springX = useSpring(rawX, POSITION_SPRING);
  const springY = useSpring(rawY, POSITION_SPRING);

  useEffect(() => {
    if (reducedMotion) return;

    const isCoarse = window.matchMedia('(pointer: coarse)').matches;
    if (isCoarse) {
      setIsTouchDevice(true);
      return;
    }

    // Enable custom cursor styles across the page
    document.documentElement.classList.add('custom-cursor-active');

    const handlePointerMove = (e: PointerEvent) => {
      if (e.pointerType === 'touch') {
        setIsTouchDevice(true);
        return;
      }

      rawX.set(e.clientX);
      rawY.set(e.clientY);

      // Only trigger re-render when transitioning from hidden to visible
      if (!isVisibleRef.current) {
        isVisibleRef.current = true;
        setIsVisible(true);
      }
    };

    const handlePointerOver = (e: PointerEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      let nextType: CursorType = 'default';

      // 1. Form inputs & editable fields keep native cursor
      if (target.closest('input, textarea, select, [contenteditable="true"]')) {
        nextType = 'hidden';
      } else {
        // 2. Explicit data-cursor attributes
        const taggedEl = target.closest<HTMLElement>('[data-cursor]');
        if (taggedEl) {
          const type = taggedEl.getAttribute('data-cursor') as CursorType;
          if (type === 'text' || type === 'project' || type === 'drag' || type === 'button') {
            nextType = type;
          }
        } else if (target.closest('.service-card, [data-project]')) {
          nextType = 'project';
        } else if (target.closest('[aria-label="Our clients"], .cursor-grab')) {
          nextType = 'drag';
        } else if (target.closest('h1, h2, h3')) {
          nextType = 'text';
        } else if (target.closest('button, a, [role="button"], .cursor-pointer')) {
          nextType = 'button';
        }
      }

      // Only re-render when cursor type actually changes
      if (cursorTypeRef.current !== nextType) {
        cursorTypeRef.current = nextType;
        setCursorType(nextType);
      }
    };

    const handlePointerLeave = () => {
      isVisibleRef.current = false;
      setIsVisible(false);
    };

    const handlePointerEnter = () => {
      isVisibleRef.current = true;
      setIsVisible(true);
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    document.addEventListener('pointerover', handlePointerOver, { passive: true });
    document.addEventListener('mouseleave', handlePointerLeave);
    document.addEventListener('mouseenter', handlePointerEnter);

    return () => {
      document.documentElement.classList.remove('custom-cursor-active');
      window.removeEventListener('pointermove', handlePointerMove);
      document.removeEventListener('pointerover', handlePointerOver);
      document.removeEventListener('mouseleave', handlePointerLeave);
      document.removeEventListener('mouseenter', handlePointerEnter);
    };
  }, [rawX, rawY, reducedMotion]);

  if (reducedMotion || isTouchDevice) {
    return null;
  }

  const isText = cursorType === 'text';
  const isButton = cursorType === 'button';
  const isProject = cursorType === 'project';
  const isDrag = cursorType === 'drag';
  const isHidden = cursorType === 'hidden' || !isVisible;

  // Determine geometry & appearance based on state
  let width = 14;
  let height = 14;
  let borderRadius = 9999;
  let backgroundColor = '#ffffff';

  if (isText) {
    width = 110;
    height = 110;
    backgroundColor = '#ffffff';
  } else if (isButton) {
    width = 48;
    height = 48;
    backgroundColor = '#ffffff';
  } else if (isProject) {
    width = 126;
    height = 42;
    backgroundColor = '#15b6e8';
  } else if (isDrag) {
    width = 92;
    height = 36;
    backgroundColor = '#15b6e8';
  }

  const isPill = isProject || isDrag;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-[9999] flex items-center justify-center -translate-x-1/2 -translate-y-1/2"
      style={{
        x: springX,
        y: springY,
        mixBlendMode: isPill ? 'normal' : 'difference',
      }}
    >
      <motion.div
        animate={{
          width,
          height,
          borderRadius,
          backgroundColor,
          opacity: isHidden ? 0 : 1,
          scale: isHidden ? 0.4 : 1,
        }}
        transition={MORPH_SPRING}
        className="relative flex items-center justify-center"
      >
        {/* Morphing Project / Drag Labels */}
        <AnimatePresence mode="wait">
          {isProject && (
            <motion.span
              key="project-label"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.18 }}
              className="select-none font-[family-name:var(--font-jetbrains)] text-[11px] font-bold tracking-wider text-[#0a0a0a] uppercase whitespace-nowrap"
            >
              View Project
            </motion.span>
          )}
          {isDrag && (
            <motion.span
              key="drag-label"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.18 }}
              className="select-none font-[family-name:var(--font-jetbrains)] text-[11px] font-bold tracking-widest text-[#0a0a0a] uppercase whitespace-nowrap"
            >
              Drag
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}

