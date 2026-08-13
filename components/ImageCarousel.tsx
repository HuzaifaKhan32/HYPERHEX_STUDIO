'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface CarouselImage {
  src: string;
  alt: string;
}

interface ImageCarouselProps {
  images: CarouselImage[];
}

export default function ImageCarousel({ images }: ImageCarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
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
                initial={{ opacity: 0, scale: 1.08 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                transition={{ duration: 1.4, ease: [0.4, 0, 0.2, 1] }}
                className="absolute inset-0 h-full w-full"
              >
                <motion.div
                  className="relative h-full w-full"
                  initial={{ scale: 1 }}
                  animate={{ scale: 1.06 }}
                  transition={{ duration: 5, ease: 'linear' }}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover"
                    priority={index === 0}
                  />
                </motion.div>
              </motion.div>
            ) : null
          )}
        </AnimatePresence>
      </div>

      <div className="absolute bottom-12 left-1/2 z-20 flex -translate-x-1/2 items-center gap-3 rounded-full border border-white/15 bg-black/45 px-4 py-2.5 shadow-[0_4px_24px_rgba(0,0,0,0.4)] backdrop-blur-md">
        {images.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
            aria-current={index === currentSlide ? 'true' : undefined}
            className={`h-2 rounded-full transition-colors duration-300 ${
              index === currentSlide
                ? 'shadow-[0_0_10px_rgba(21,182,232,0.6)]'
                : 'bg-white/40 hover:bg-white/65'
            }`}
            style={{
              backgroundColor: index === currentSlide ? 'var(--color-accent)' : undefined,
            }}
            animate={{
              width: index === currentSlide ? 48 : 32,
            }}
            transition={{ duration: 0.3 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          />
        ))}
      </div>
    </>
  );
}
