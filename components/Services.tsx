'use client';

import { useReducedMotion } from 'framer-motion';
import { DESKTOP_GRID_MQ, useMediaQuery } from '@/lib/useMediaQuery';
import ServicesCarousel from './ServicesCarousel';
import ServicesGrid from './ServicesGrid';
import ServicesHeading from './ServicesHeading';

export default function Services() {
  const isDesktopGrid = useMediaQuery(DESKTOP_GRID_MQ);
  const reducedMotion = useReducedMotion() ?? false;

  return (
    <section
      id="services"
      className="relative w-full overflow-hidden bg-white py-16 md:py-32 px-5 lg:px-16"
    >
      <div className="relative z-10 mx-auto flex w-full max-w-[1280px] flex-col">
        <div className="relative z-20 shrink-0 flex flex-col gap-10 md:gap-12">
          <p className="flex items-center gap-3 font-[family-name:var(--font-dm-sans)] text-xs font-bold tracking-[0.2em] text-mist uppercase">
            <span aria-hidden="true">//</span> Our Service
          </p>

          <ServicesHeading compact={!isDesktopGrid} />
        </div>

        <div className="relative z-0 mt-12 md:mt-16 lg:mt-20">
          {isDesktopGrid ? (
            <ServicesGrid reducedMotion={reducedMotion} />
          ) : (
            <ServicesCarousel reducedMotion={reducedMotion} />
          )}
        </div>
      </div>
    </section>
  );
}
