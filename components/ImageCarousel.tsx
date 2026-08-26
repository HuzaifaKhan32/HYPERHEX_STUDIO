'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface CarouselImage {
  src: string;
  alt: string;
  type?: 'image' | 'video';
}

interface ImageCarouselProps {
  images: CarouselImage[];
}

const PILL_COUNT = 3;

export default function ImageCarousel({ images }: ImageCarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  const goToSlide = (index: number) => setCurrentSlide(index);

  // Which of the 3 pills is "active" (0, 1, or 2)
  const activePill = currentSlide % PILL_COUNT;

  // Each pill navigates to the nearest slide that maps to that pill slot
  const getSlideForPill = (pillIndex: number) => {
    const base = Math.floor(currentSlide / PILL_COUNT) * PILL_COUNT;
    const target = base + pillIndex;
    return target < images.length ? target : pillIndex; // fallback to start
  };

  return (
    <>
      <div className="absolute inset-0 h-full w-full" style={{ backgroundColor: 'var(--color-ink)' }} />

      <div className="absolute inset-0 h-full w-full overflow-hidden">
        <AnimatePresence mode="sync">
          {images.map((image, index) =>
            index === currentSlide ? (
              <motion.div
                key={`${image.src}-${index}`}
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                transition={{ duration: 1.1, ease: [0.4, 0, 0.2, 1] }}
                className="absolute inset-0 h-full w-full"
              >
                {image.type === 'video' ? (
                  <video
                    src={image.src}
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="auto"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                ) : (
                  <>
                    <Image
                      src={image.src}
                      alt=""
                      fill
                      sizes="100vw"
                      quality={70}
                      className="object-cover scale-110 opacity-40 blur-2xl"
                      priority={index === 0}
                      aria-hidden={true}
                    />
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1400px) 100vw, 1400px"
                      quality={95}
                      className="object-contain"
                      priority={index === 0}
                    />
                  </>
                )}
              </motion.div>
            ) : null
          )}
        </AnimatePresence>
      </div>

      {/* Fixed 3-pill indicator — always exactly 3 pills, lower on the screen */}
      <div className="absolute left-1/2 z-20 hidden -translate-x-1/2 items-center gap-3 rounded-full border border-white/15 bg-black/45 px-4 py-2.5 shadow-[0_4px_24px_rgba(0,0,0,0.4)] backdrop-blur-md md:bottom-6 md:flex">
        {Array.from({ length: PILL_COUNT }).map((_, pillIndex) => (
          <motion.button
            key={pillIndex}
            onClick={() => goToSlide(getSlideForPill(pillIndex))}
            aria-label={`Go to slide group ${pillIndex + 1}`}
            aria-current={pillIndex === activePill ? 'true' : undefined}
            className={`h-2 rounded-full transition-colors duration-300 ${
              pillIndex !== activePill ? 'bg-white/40 hover:bg-white/65' : ''
            }`}
            style={{
              backgroundColor: pillIndex === activePill ? 'var(--color-accent)' : undefined,
              boxShadow: pillIndex === activePill ? '0 0 10px rgba(21,182,232,0.6)' : undefined,
            }}
            animate={{ width: pillIndex === activePill ? 48 : 32 }}
            transition={{ duration: 0.3 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          />
        ))}
      </div>
    </>
  );
}