'use client';

// Handles header-level animations: slide-in, scroll-based background,
// and smart hide-on-scroll-down / reveal-on-scroll-up behaviour.
import { motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { useRef, useState, type ReactNode } from 'react';

// Minimum scroll delta (px) before toggling visibility — prevents
// flicker on mobile rubber-band bounce or tiny involuntary scrolls.
const SCROLL_TOLERANCE = 10;
// Distance from top (px) at which the header is always shown.
const TOP_THRESHOLD = 10;

export default function NavbarAnimatedWrapper({ children }: { children: ReactNode }) {
  /** Whether the page has scrolled past the "scrolled" style threshold */
  const [scrolled, setScrolled] = useState(false);
  /** Whether the header is hidden (scrolling down) or revealed (scrolling up / at top) */
  const [hidden, setHidden] = useState(false);

  const prevScrollY = useRef(0);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const previous = prevScrollY.current;
    const delta = latest - previous;

    // ── Scrolled-style hysteresis (existing logic, unchanged) ──────────
    setScrolled((prev) => (prev ? latest > 24 : latest > 48));

    // ── Hide / reveal logic ────────────────────────────────────────────
    if (latest <= TOP_THRESHOLD) {
      // Always show at the very top of the page
      setHidden(false);
    } else if (delta > SCROLL_TOLERANCE) {
      // Scrolling DOWN by more than tolerance → hide
      setHidden(true);
    } else if (delta < -SCROLL_TOLERANCE) {
      // Scrolling UP by more than tolerance → reveal
      setHidden(false);
    }
    // deltas within ±SCROLL_TOLERANCE are ignored to prevent jitter

    prevScrollY.current = latest;
  });

  return (
    <motion.header
      // ── Entry animation (unchanged) ──────────────────────────────────
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: hidden ? 'calc(-100% - 2.5rem)' : 0, opacity: 1 }}
      transition={
        hidden
          ? { duration: 0.35, ease: [0.4, 0, 1, 1] }      // ease-in for hide
          : { duration: 0.45, ease: [0, 0, 0.2, 1] }       // ease-out for reveal
      }
      style={{ willChange: 'transform', filter: hidden ? 'drop-shadow(0 0 0 transparent)' : undefined }}
      className={`fixed left-0 right-0 z-50 flex w-full justify-center transition-[top,padding] duration-350 ${
        scrolled
          ? 'top-4 md:top-5 px-4 sm:px-8 md:px-12 2xl:px-16'
          : 'top-4 md:top-6 px-5 sm:px-8 md:px-12 2xl:px-16'
      }`}
    >
      <motion.div
        transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
        className={`flex w-full max-w-[1280px] xl:max-w-[1400px] 2xl:max-w-none items-center justify-between px-2 py-2 md:py-3 rounded-xl transition-[background-color,border-color] duration-350 ease-out ${
          scrolled
            ? 'bg-surface border-2 border-accent shadow-[0_6px_0_0_rgba(21,182,232,1)] backdrop-blur-md'
            : 'bg-transparent border-2 border-transparent'
        }`}
      >
        {children}
      </motion.div>
    </motion.header>
  );
}
