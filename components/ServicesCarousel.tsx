'use client';

import { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { motion } from 'framer-motion';
import { services } from '@/lib/services-data';
import ServiceCard from './ServiceCard';

// Decreased autoplay interval for faster sliding
const AUTOPLAY_INTERVAL = 5000; 
const SLIDE_SIZE = '68%';
const SLIDE_GAP = '0.75rem';

const SLIDE_SPRING = { type: 'spring' as const, stiffness: 100, damping: 15, mass: 0.8 };

type SlideVisualState = { scale: number; opacity: number; y: number };

function getSlideVisualState(
  index: number,
  selectedIndex: number,
  total: number,
  reducedMotion: boolean
): SlideVisualState {
  if (reducedMotion) return { scale: 1, opacity: 1, y: 0 };
  if (index === selectedIndex) return { scale: 1, opacity: 1, y: 0 };
  const prevIndex = (selectedIndex - 1 + total) % total;
  const nextIndex = (selectedIndex + 1) % total;
  if (index === prevIndex || index === nextIndex) return { scale: 0.88, opacity: 0.78, y: 10 };
  return { scale: 0.85, opacity: 0.5, y: 12 };
}

// Page 1: First 6 services 
const DESKTOP_PAGE_1 = services.slice(0, 6);
// Page 2: Remaining 4 services
const DESKTOP_PAGE_2 = services.slice(6, 10);

export default function ServicesCarousel({ reducedMotion }: { reducedMotion: boolean }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [desktopPageIndex, setDesktopPageIndex] = useState(0);

  const mobileServices = services;

  // Mobile Carousel Hook
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: 'center', containScroll: false, skipSnaps: false },
    reducedMotion
      ? []
      : [Autoplay({ delay: AUTOPLAY_INTERVAL, stopOnInteraction: false, stopOnMouseEnter: true })]
  );

  // Desktop Page Carousel Hook
  const [desktopEmblaRef, desktopEmblaApi] = useEmblaCarousel(
    { loop: true, align: 'start', containScroll: false },
    reducedMotion
      ? []
      : [Autoplay({ delay: AUTOPLAY_INTERVAL, stopOnInteraction: false, stopOnMouseEnter: true })]
  );

  const onMobileSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  const onDesktopSelect = useCallback(() => {
    if (!desktopEmblaApi) return;
    setDesktopPageIndex(desktopEmblaApi.selectedScrollSnap());
  }, [desktopEmblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onMobileSelect();
    emblaApi.on('select', onMobileSelect);
    emblaApi.on('reInit', onMobileSelect);
    return () => {
      emblaApi.off('select', onMobileSelect);
      emblaApi.off('reInit', onMobileSelect);
    };
  }, [emblaApi, onMobileSelect]);

  useEffect(() => {
    if (!desktopEmblaApi) return;
    onDesktopSelect();
    desktopEmblaApi.on('select', onDesktopSelect);
    desktopEmblaApi.on('reInit', onDesktopSelect);
    return () => {
      desktopEmblaApi.off('select', onDesktopSelect);
      desktopEmblaApi.off('reInit', onDesktopSelect);
    };
  }, [desktopEmblaApi, onDesktopSelect]);

  const scrollTo = useCallback((index: number) => { emblaApi?.scrollTo(index); }, [emblaApi]);
  const desktopScrollTo = useCallback((index: number) => { desktopEmblaApi?.scrollTo(index); }, [desktopEmblaApi]);

  const scrollPrev = useCallback(() => { desktopEmblaApi?.scrollPrev(); }, [desktopEmblaApi]);
  const scrollNext = useCallback(() => { desktopEmblaApi?.scrollNext(); }, [desktopEmblaApi]);

  return (
    <div className="w-full">
      {/* ─── MOBILE / TABLET: Horizontal Carousel ─── */}
      <div className="block lg:hidden">
        <div className="-mx-5 overflow-hidden px-5 pt-2" ref={emblaRef}>
          <div className="flex touch-pan-y" style={{ marginLeft: `calc(${SLIDE_GAP} * -1)` }}>
            {mobileServices.map((service, index) => {
              const visual = getSlideVisualState(index, selectedIndex, mobileServices.length, reducedMotion);
              return (
                <div
                  key={service.title}
                  className="min-w-0 shrink-0"
                  style={{ flex: `0 0 ${SLIDE_SIZE}`, paddingLeft: SLIDE_GAP }}
                >
                  <motion.div animate={visual} transition={reducedMotion ? { duration: 0 } : SLIDE_SPRING} className="h-full">
                    <ServiceCard
                      title={service.title}
                      description={service.description}
                      href={service.href}
                      panel={service.panel}
                      icon={service.icon}
                      className="h-full"
                    />
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile Pagination Bullets */}
        <div className="mt-6 flex items-center justify-center gap-2">
          {mobileServices.map((service, index) => (
            <button
              key={service.title}
              type="button"
              onClick={() => scrollTo(index)}
              aria-label={`Go to service ${index + 1}`}
              aria-current={index === selectedIndex ? 'true' : undefined}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === selectedIndex
                  ? 'w-6 bg-accent shadow-[0_0_10px_rgba(21,182,232,0.5)]'
                  : 'w-2 bg-outline-variant'
              }`}
            />
          ))}
        </div>
      </div>

      {/* ─── DESKTOP / LAPTOP: Full-Grid Page Carousel ─── */}
      <div className="hidden lg:flex flex-col gap-4 w-full pt-2">
        
        {/* Top Controls: 3D Arrows + Pagination Dots aligned to the right */}
        <div className="flex items-center justify-end gap-6 mb-2 pr-2">
          
          {/* Pagination Dots */}
          <div className="flex items-center gap-2 mr-2">
            {[0, 1].map((pageIndex) => (
              <button
                key={pageIndex}
                type="button"
                onClick={() => desktopScrollTo(pageIndex)}
                aria-label={`Go to page ${pageIndex + 1}`}
                aria-current={pageIndex === desktopPageIndex ? 'true' : undefined}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  pageIndex === desktopPageIndex
                    ? 'w-8 bg-accent shadow-[0_0_10px_rgba(21,182,232,0.5)]'
                    : 'w-2.5 bg-outline-variant hover:bg-accent/50'
                }`}
              />
            ))}
          </div>

          {/* 3D Previous Arrow Button */}
          <button
            type="button"
            onClick={scrollPrev}
            aria-label="Previous Page"
            className="flex items-center justify-center w-12 h-12 bg-white rounded-xl border-2 border-outline-variant/30 text-black 
                       shadow-[0_4px_0_0_rgba(220,220,220,1)] hover:border-accent hover:text-accent hover:shadow-[0_4px_0_0_rgba(21,182,232,1)] 
                       hover:-translate-y-0.5 active:shadow-[0_0px_0_0_rgba(21,182,232,1)] active:translate-y-1 transition-all duration-150"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* 3D Next Arrow Button */}
          <button
            type="button"
            onClick={scrollNext}
            aria-label="Next Page"
            className="flex items-center justify-center w-12 h-12 bg-white rounded-xl border-2 border-outline-variant/30 text-black 
                       shadow-[0_4px_0_0_rgba(220,220,220,1)] hover:border-accent hover:text-accent hover:shadow-[0_4px_0_0_rgba(21,182,232,1)] 
                       hover:-translate-y-0.5 active:shadow-[0_0px_0_0_rgba(21,182,232,1)] active:translate-y-1 transition-all duration-150"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Embla Track */}
<div className="overflow-hidden w-full p-2 -m-2" ref={desktopEmblaRef}>
  <div className="flex w-full touch-pan-y gap-6 xl:gap-8"> {/* <--- Added gap */}
            
            {/* PAGE 1: 6 Cards in a 3x2 Grid */}
            <div className="min-w-full shrink-0 grid grid-cols-3 grid-rows-2 gap-6 xl:gap-8">
              {DESKTOP_PAGE_1.map((service) => (
                <ServiceCard
                  key={service.title}
                  title={service.title}
                  description={service.description}
                  href={service.href}
                  panel={service.panel}
                  icon={service.icon}
                  className="w-full h-full"
                />
              ))}
            </div>

            {/* PAGE 2: 4 Cards in a 2x2 Grid (Takes up full width, meaning larger cards) */}
            <div className="min-w-full shrink-0 grid grid-cols-2 grid-rows-2 gap-6 xl:gap-8">
              {DESKTOP_PAGE_2.map((service) => (
                <ServiceCard
                  key={service.title}
                  title={service.title}
                  description={service.description}
                  href={service.href}
                  panel={service.panel}
                  icon={service.icon}
                  className="w-full h-full"
                />
              ))}
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}