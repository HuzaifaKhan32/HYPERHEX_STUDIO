'use client';

import { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { motion } from 'framer-motion';
import { services } from '@/lib/services-data';
import ServiceCard from './ServiceCard';

const AUTOPLAY_INTERVAL = 5000;
const SLIDE_SIZE = '68%';
const SLIDE_GAP = '0.75rem';

const SLIDE_SPRING = { type: 'spring' as const, stiffness: 100, damping: 15, mass: 0.8 };

type SlideVisualState = {
  scale: number;
  opacity: number;
  y: number;
  filter: string;
};

function getSlideVisualState(
  index: number,
  selectedIndex: number,
  total: number,
  reducedMotion: boolean
): SlideVisualState {
  if (reducedMotion) {
    return { scale: 1, opacity: 1, y: 0, filter: 'blur(0px)' };
  }

  if (index === selectedIndex) {
    return { scale: 1, opacity: 1, y: 0, filter: 'blur(0px)' };
  }

  const prevIndex = (selectedIndex - 1 + total) % total;
  const nextIndex = (selectedIndex + 1) % total;
  if (index === prevIndex || index === nextIndex) {
    return { scale: 0.88, opacity: 0.78, y: 10, filter: 'blur(2.5px)' };
  }

  return { scale: 0.85, opacity: 0.5, y: 12, filter: 'blur(4px)' };
}

export default function ServicesCarousel({ reducedMotion }: { reducedMotion: boolean }) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: 'center',
      containScroll: false,
      skipSnaps: false,
    },
    reducedMotion
      ? []
      : [
          Autoplay({
            delay: AUTOPLAY_INTERVAL,
            stopOnInteraction: false,
            stopOnMouseEnter: true,
          }),
        ]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onSelect);
    };
  }, [emblaApi, onSelect]);

  const scrollTo = useCallback(
    (index: number) => {
      emblaApi?.scrollTo(index);
    },
    [emblaApi]
  );

  return (
    <div>
      <div className="-mx-5 overflow-hidden px-5 pt-2" ref={emblaRef}>
        <div
          className="flex touch-pan-y"
          style={{ marginLeft: `calc(${SLIDE_GAP} * -1)` }}
        >
          {services.map((service, index) => {
            const visual = getSlideVisualState(
              index,
              selectedIndex,
              services.length,
              reducedMotion
            );

            return (
              <div
                key={service.title}
                className="min-w-0 shrink-0"
                style={{
                  flex: `0 0 ${SLIDE_SIZE}`,
                  paddingLeft: SLIDE_GAP,
                }}
              >
                <motion.div
                  animate={visual}
                  transition={reducedMotion ? { duration: 0 } : SLIDE_SPRING}
                  className="h-full"
                >
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

      <div className="mt-6 flex items-center justify-center gap-2 md:hidden">
        {services.map((service, index) => (
          <button
            key={service.title}
            type="button"
            onClick={() => scrollTo(index)}
            aria-label={`Go to service ${index + 1}: ${service.title}`}
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
  );
}
