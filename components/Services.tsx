'use client';

import ServicesCarousel from './ServicesCarousel';
import ServicesHeading from './ServicesHeading';

export default function Services() {
  return (
    <section
      id="services"
      className="relative w-full overflow-hidden bg-surface py-10 md:py-16 px-5 lg:px-16 2xl:px-24"
    >
      <div className="relative z-10 mx-auto flex w-full max-w-[1280px] xl:max-w-[1400px] 2xl:max-w-none flex-col">
        <div className="relative z-20 w-full flex flex-col lg:flex-row items-start lg:items-end justify-between gap-8 lg:gap-4 mb-12 md:mb-16 lg:mb-20">
          <div className="flex-1 flex flex-col items-start gap-3 text-left">
            <ServicesHeading />
          </div>
        </div>

        <div className="relative z-0">
          <ServicesCarousel />
        </div>
      </div>
    </section>
  );
}