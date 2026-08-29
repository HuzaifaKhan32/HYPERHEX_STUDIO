'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

export interface CarouselMedia {
  src: string;
  alt: string;
  poster?: string;
  type?: 'image' | 'video';
}

interface ImageCarouselProps {
  images: CarouselMedia[];
}

export default function ImageCarousel({ images }: ImageCarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const currentMedia = images[currentSlide];
  const isVideo = currentMedia?.type === 'video';

  useEffect(() => {
    if (isVideo) {
      // For video slides, carousel stays on the slide until video end (onEnded)
      return;
    }

    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [currentSlide, isVideo, nextSlide]);

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
                    ref={(el) => {
                      videoRef.current = el;
                      if (el) {
                        el.play().catch(() => {});
                      }
                    }}
                    src={image.src}
                    poster={image.poster}
                    autoPlay
                    muted
                    playsInline
                    preload="auto"
                    onEnded={nextSlide}
                    onError={() => {
                      // Fallback: if video fails to play/load, advance after 5s
                      setTimeout(nextSlide, 5000);
                    }}
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

      {/* Dynamic pill indicators matching total media items */}
      <div className="absolute left-1/2 z-20 hidden -translate-x-1/2 items-center gap-3 rounded-full border border-white/15 bg-black/45 px-4 py-2.5 shadow-[0_4px_24px_rgba(0,0,0,0.4)] backdrop-blur-md md:bottom-6 md:flex">
        {images.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
            aria-current={index === currentSlide ? 'true' : undefined}
            className={`h-2 rounded-full transition-colors duration-300 ${
              index !== currentSlide ? 'bg-white/40 hover:bg-white/65' : ''
            }`}
            style={{
              backgroundColor: index === currentSlide ? 'var(--color-accent)' : undefined,
              boxShadow: index === currentSlide ? '0 0 10px rgba(21,182,232,0.6)' : undefined,
            }}
            animate={{ width: index === currentSlide ? 48 : 32 }}
            transition={{ duration: 0.3 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          />
        ))}
      </div>
    </>
  );
}