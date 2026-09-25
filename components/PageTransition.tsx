'use client';

import React, { createContext, useContext, useEffect, useState, useRef } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

export type TransitionDirection = 'forward' | 'backward';

interface PageTransitionContextType {
  triggerTransition: (url?: string) => void;
  isLoading: boolean;
  progress: number;
  direction: TransitionDirection;
}

const PageTransitionContext = createContext<PageTransitionContextType>({
  triggerTransition: () => {},
  isLoading: false,
  progress: 0,
  direction: 'forward',
});

export const usePageTransition = () => useContext(PageTransitionContext);

// Navigation Order Index map (Home -> Services -> Works -> Featured Projects)
const NAV_ORDER: Record<string, number> = {
  '/': 0,
  '/services': 1,
  '/projects': 2,
  '/featured-projects': 3,
  '/contact': 4,
};

function getRouteIndex(pathname: string): number {
  if (NAV_ORDER[pathname] !== undefined) {
    return NAV_ORDER[pathname];
  }
  if (pathname.startsWith('/services/')) return 1.5;
  if (pathname.startsWith('/projects/')) return 2.5;
  return 1;
}

export default function PageTransitionProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [direction, setDirection] = useState<TransitionDirection>('forward');

  const prevPathRef = useRef<string>(pathname);
  const isNavigatingRef = useRef<boolean>(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Start real loading progress
  const startLoading = (targetUrl?: string) => {
    if (isNavigatingRef.current) return;
    isNavigatingRef.current = true;

    const currentPath = prevPathRef.current;
    const nextPath = targetUrl || pathname;
    const prevIdx = getRouteIndex(currentPath);
    const nextIdx = getRouteIndex(nextPath);

    const dir: TransitionDirection = nextIdx >= prevIdx ? 'forward' : 'backward';
    setDirection(dir);

    setIsLoading(true);
    setProgress(8);

    if (timerRef.current) clearInterval(timerRef.current);

    // Smoothly increment progress while page loads
    let currentVal = 8;
    timerRef.current = setInterval(() => {
      currentVal += Math.floor(Math.random() * 12) + 5;
      if (currentVal >= 88) {
        currentVal = 88;
        if (timerRef.current) clearInterval(timerRef.current);
      }
      setProgress(currentVal);
    }, 45);
  };

  // Complete loading when Next.js route change completes
  const finishLoading = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setProgress(100);

    setTimeout(() => {
      setIsLoading(false);
      isNavigatingRef.current = false;
    }, 180);
  };

  // Listen once for internal link clicks to initialize loading before route change
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('a');
      if (!target) return;

      const href = target.getAttribute('href');
      if (
        !href ||
        href.startsWith('#') ||
        href.startsWith('mailto:') ||
        href.startsWith('tel:') ||
        target.target === '_blank'
      ) {
        return;
      }

      const currentPath = window.location.pathname;
      if (href !== currentPath) {
        startLoading(href);
      }
    };

    document.addEventListener('click', handleAnchorClick, { capture: true });
    return () => {
      document.removeEventListener('click', handleAnchorClick, { capture: true });
    };
  }, []);

  // When pathname changes (Next.js finished route navigation), finalize progress and direction
  useEffect(() => {
    if (prevPathRef.current !== pathname) {
      const prevIdx = getRouteIndex(prevPathRef.current);
      const nextIdx = getRouteIndex(pathname);
      setDirection(nextIdx >= prevIdx ? 'forward' : 'backward');

      prevPathRef.current = pathname;
      finishLoading();
    }
  }, [pathname, searchParams]);

  const triggerTransition = (url?: string) => {
    startLoading(url);
  };

  return (
    <PageTransitionContext.Provider value={{ triggerTransition, isLoading, progress, direction }}>
      {/* FULL-VIEWPORT TOP-DOWN LOADER OVERLAY */}
      <AnimatePresence mode="wait">
        {isLoading && (
          <motion.div
            key="viewport-loader-overlay"
            initial={{ y: '-100%' }}
            animate={{ y: '0%' }}
            exit={{
              y: '100%',
              transition: { duration: 0.45, ease: [0.76, 0, 0.24, 1] },
            }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[99999] flex flex-col justify-between overflow-hidden bg-[#0a0a0a] text-white select-none pointer-events-auto"
            style={{
              boxShadow: '0 25px 60px rgba(0,0,0,0.8)',
            }}
          >
            {/* Radial background cyan glow */}
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(21,182,232,0.14)_0%,transparent_70%)]" />

            {/* 1. Centered Branding: Logo + Typography */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none p-6 text-center">
              <motion.div
                initial={{ scale: 0.85, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="relative mb-6 flex h-24 w-24 sm:h-28 sm:w-28 items-center justify-center overflow-hidden rounded-full border border-white/20 bg-[#0d0f12] p-2.5 shadow-[0_0_40px_rgba(21,182,232,0.4)]"
              >
                <Image
                  src="/logo/hyperhex-logo-H.avif"
                  alt="HyperHex Logo"
                  width={96}
                  height={96}
                  priority
                  className="object-cover rounded-full"
                />
              </motion.div>

              <motion.h1
                initial={{ y: 15, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.35, delay: 0.05 }}
                className="text-4xl sm:text-6xl 2xl:text-7xl font-black uppercase tracking-tight text-white font-[family-name:var(--font-dm-sans)] drop-shadow-md"
              >
                Hyper<span className="text-[#15b6e8]">Hex</span>
              </motion.h1>
              <p className="mt-2 text-xs sm:text-sm font-bold uppercase tracking-[0.3em] text-[#15b6e8]/80">
                Studio
              </p>
            </div>

            {/* 2. Bottom-Right Real Loading Percentage Counter */}
            <div className="absolute bottom-8 right-8 sm:bottom-12 sm:right-12 z-20 flex flex-col items-end gap-3 pointer-events-none">
              <div className="flex items-baseline font-black font-[family-name:var(--font-dm-sans)] text-5xl sm:text-7xl text-white tracking-tighter drop-shadow-lg">
                <span>{progress}</span>
                <span className="text-2xl sm:text-4xl text-[#15b6e8] ml-1">%</span>
              </div>

              {/* Real Loading progress bar */}
              <div className="h-2 w-48 sm:w-64 rounded-full bg-white/10 overflow-hidden border border-white/20 p-[1px] shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)]">
                <motion.div
                  style={{ width: `${progress}%` }}
                  transition={{ ease: 'linear', duration: 0.05 }}
                  className="h-full rounded-full bg-gradient-to-r from-[#15b6e8] via-[#00daf3] to-[#0c86ac] shadow-[0_0_12px_#15b6e8]"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {children}
    </PageTransitionContext.Provider>
  );
}
