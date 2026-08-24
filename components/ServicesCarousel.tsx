'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { motion, AnimatePresence } from 'framer-motion';
import { services } from '@/lib/services-data';
import ServiceCard from './ServiceCard';

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

// Restored: Fills out the last page perfectly by looping back to the start of the array
function getInfiniteGridPages<T>(array: T[], pageSize: number = 6): T[][] {
  if (!array.length) return [];
  
  const totalPages = Math.ceil(array.length / pageSize);
  const totalItemsNeeded = totalPages * pageSize;
  
  const repeatedArray: T[] = [];
  for (let i = 0; i < totalItemsNeeded; i++) {
    repeatedArray.push(array[i % array.length]);
  }

  const pages: T[][] = [];
  for (let i = 0; i < repeatedArray.length; i += pageSize) {
    pages.push(repeatedArray.slice(i, i + pageSize));
  }
  return pages;
}

const pageVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? '100%' : '-100%',
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? '100%' : '-100%',
    opacity: 0,
  }),
};

export default function ServicesCarousel({ reducedMotion }: { reducedMotion: boolean }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [desktopPageIndex, setDesktopPageIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isHovered, setIsHovered] = useState(false);

  const mobileServices = services;
  // Use the padding function to ensure exactly 6 cards per page
  const desktopPages = useMemo(() => getInfiniteGridPages(services, 6), []);
  const totalPages = desktopPages.length;

  // Mobile Embla setup
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: 'center', containScroll: false, skipSnaps: false },
    reducedMotion
      ? []
      : [Autoplay({ delay: AUTOPLAY_INTERVAL, stopOnInteraction: false, stopOnMouseEnter: true })]
  );

  const onMobileSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

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

  const scrollTo = useCallback((index: number) => { emblaApi?.scrollTo(index); }, [emblaApi]);

  // Desktop Page Controls
  const handlePageChange = useCallback(
    (newIndex: number, newDirection: number) => {
      setDirection(newDirection);
      setDesktopPageIndex(newIndex);
    },
    []
  );

  const scrollNext = useCallback(() => {
    if (totalPages <= 1) return;
    const nextIdx = (desktopPageIndex + 1) % totalPages;
    handlePageChange(nextIdx, 1);
  }, [desktopPageIndex, totalPages, handlePageChange]);

  const scrollPrev = useCallback(() => {
    if (totalPages <= 1) return;
    const prevIdx = (desktopPageIndex - 1 + totalPages) % totalPages;
    handlePageChange(prevIdx, -1);
  }, [desktopPageIndex, totalPages, handlePageChange]);

  // Desktop Autoplay Timer
  useEffect(() => {
    if (reducedMotion || isHovered || totalPages <= 1) return;
    const timer = setInterval(() => {
      scrollNext();
    }, AUTOPLAY_INTERVAL);
    return () => clearInterval(timer);
  }, [reducedMotion, isHovered, totalPages, scrollNext]);

  return (
    <div className="w-full">
      {/* MOBILE / TABLET (Embla Carousel) */}
      <div className="block lg:hidden">
        <div className="-mx-5 overflow-hidden px-5 pt-2" ref={emblaRef}>
          <div className="flex touch-pan-y" style={{ marginLeft: `calc(${SLIDE_GAP} * -1)` }}>
            {mobileServices.map((service, index) => {
              const visual = getSlideVisualState(index, selectedIndex, mobileServices.length, reducedMotion);
              return (
                <div
                  key={`${service.title}-${index}`}
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

        <div className="mt-6 flex items-center justify-center gap-2">
          {mobileServices.map((service, index) => (
            <button
              key={`${service.title}-${index}`}
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

      {/* DESKTOP: INDEPENDENT ANIMATED PAGES */}
      <div 
        className="hidden lg:flex flex-col gap-4 w-full pt-2"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Header Controls */}
        <div className="flex items-center justify-end gap-6 mb-2 pr-2">
          <div className="flex items-center gap-2 mr-2">
            {desktopPages.map((_, pageIndex) => (
              <button
                key={pageIndex}
                type="button"
                onClick={() => {
                  const dir = pageIndex > desktopPageIndex ? 1 : -1;
                  handlePageChange(pageIndex, dir);
                }}
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

        {/* Animated Page Container */}
        <div className="relative overflow-hidden w-full p-2 -m-2 min-h-[600px]">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={desktopPageIndex}
              custom={direction}
              variants={reducedMotion ? undefined : pageVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
              className="grid grid-cols-3 grid-rows-2 gap-4 xl:gap-6 w-full"
            >
              {desktopPages[desktopPageIndex]?.map((service, cardIdx) => (
                <div key={`${service.title}-${desktopPageIndex}-${cardIdx}`} className="min-w-0 w-full h-full">
                  <ServiceCard
                    title={service.title}
                    description={service.description}
                    href={service.href}
                    panel={service.panel}
                    icon={service.icon}
                    className="w-full h-full"
                  />
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}