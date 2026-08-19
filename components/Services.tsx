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
      className="relative w-full overflow-hidden bg-white py-16 md:py-32 px-5 lg:px-16 2xl:px-24 2xl:py-40"
    >
      <div className="relative z-10 mx-auto flex w-full max-w-[1280px] xl:max-w-[1400px] 2xl:max-w-none flex-col">
        <div className="relative z-20 shrink-0 flex flex-col items-center gap-10 text-center md:items-start md:gap-12 md:text-left">
          <p className="flex items-center gap-3 font-[family-name:var(--font-dm-sans)] text-xs 2xl:text-base font-bold tracking-[0.2em] text-mist uppercase">
            <span aria-hidden="true">//</span> Our Services
          </p>

          <ServicesHeading />
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
