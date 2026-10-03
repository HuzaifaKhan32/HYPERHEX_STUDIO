'use client';

/**
 * SmoothScroll — thin wrapper around Lenis ReactLenis in root (global) mode.
 *
 * Design constraints:
 *  - `root` prop makes Lenis listen to the window, not a wrapper div,
 *    so it works correctly with the existing Framer Motion useScroll() /
 *    useMotionValueEvent(scrollY) hooks in NavbarAnimatedWrapper and
 *    NavbarMobileMenu — those hooks read window.scrollY, which Lenis
 *    updates on every frame via its own RAF loop.
 *  - `smoothWheel: true`  → inertial mouse-wheel & trackpad scrolling.
 *  - `syncTouch: false`   → touch devices keep native scroll (no smoothing).
 *  - `lerp: 0.1`          → subtle, barely perceptible easing.
 *  - `wheelMultiplier: 1` → default, unchanged scroll speed.
 *  - `autoRaf: true`      → Lenis runs its own requestAnimationFrame loop,
 *    independent of Framer Motion's frame loop (no interference).
 *  - `respectReducedMotion: true` → built-in; when prefers-reduced-motion
 *    is set, lerp is forced to 1 (instant tracking), disabling smoothing
 *    while keeping Lenis alive for programmatic scrollTo calls.
 *  - `anchors: true`      → Lenis intercepts <a href="#..."> clicks and uses
 *    its own scrollTo, so hash links are smooth and offset-aware.
 *  - `stopInertiaOnNavigate: true` → stops in-flight inertia on route change
 *    so new pages always start rendering at the top.
 */

import { ReactLenis } from 'lenis/react';
import type { ReactNode } from 'react';

const LENIS_OPTIONS = {
  lerp: 0.1,
  smoothWheel: true,
  syncTouch: false,
  wheelMultiplier: 1,
  autoRaf: true,
  anchors: true,
  respectReducedMotion: true,
  stopInertiaOnNavigate: true,
} as const;

export default function SmoothScroll({ children }: { children: ReactNode }) {
  return (
    <ReactLenis root options={LENIS_OPTIONS}>
      {children}
    </ReactLenis>
  );
}
