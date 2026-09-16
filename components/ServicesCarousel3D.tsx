'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import ServiceCard3D from './ServiceCard3D';
import { servicesData } from '@/lib/services-carousel-data';

export default function ServicesCarousel3D() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  const totalServices = servicesData.length;

  // Calculate position and style for each card based on its distance from active
  const getCardStyle = (index: number) => {
    const distanceFromActive = index - activeIndex;
    const absDistance = Math.abs(distanceFromActive);

    // Carousel arc positioning
    const angle = distanceFromActive * 20; // degrees between cards
    const xOffset = distanceFromActive * 280; // horizontal spacing
    const zOffset = absDistance * -120; // depth into space
    const yOffset = absDistance * 20; // slight vertical arc

    // Scale based on distance
    let scale = 1.0;
    if (absDistance === 0) {
      scale = 1.0; // active card
    } else if (absDistance === 1) {
      scale = 0.82; // adjacent cards
    } else {
      scale = 0.65; // far cards
    }

    // Opacity
    let opacity = 1.0;
    if (absDistance === 0) {
      opacity = 1.0;
    } else if (absDistance === 1) {
      opacity = 0.85;
    } else if (absDistance === 2) {
      opacity = 0.6;
    } else {
      opacity = 0.3;
    }

    // Rotation for arc effect
    const rotateY = -angle * 0.5;

    // Z-index for proper overlapping
    const zIndex = 50 - absDistance * 10;

    // Blur for far cards
    const blur = absDistance > 1 ? (absDistance - 1) * 1 : 0;

    return {
      transform: `
        translate3d(${xOffset}px, ${yOffset}px, ${zOffset}px)
        rotateY(${rotateY}deg)
        scale(${scale})
      `,
      opacity,
      zIndex,
      filter: blur > 0 ? `blur(${blur}px)` : 'none',
      pointerEvents: absDistance <= 1 ? ('auto' as const) : ('none' as const),
    };
  };

  // Navigation functions
  const goToNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % totalServices);
  }, [totalServices]);

  const goToPrevious = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + totalServices) % totalServices);
  }, [totalServices]);

  const goToIndex = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        goToPrevious();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        goToNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToNext, goToPrevious]);

  // Drag handlers
  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true);
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    setDragStart(clientX);
    setDragOffset(0);
  };

  const handleDragMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return;

    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const offset = clientX - dragStart;
    setDragOffset(offset);
  };

  const handleDragEnd = () => {
    if (!isDragging) return;

    setIsDragging(false);

    // Threshold for switching cards
    const threshold = 80;

    if (dragOffset < -threshold) {
      goToNext();
    } else if (dragOffset > threshold) {
      goToPrevious();
    }

    setDragOffset(0);
  };

  // Click on adjacent card to make it active
  const handleCardClick = (index: number) => {
    if (index !== activeIndex) {
      goToIndex(index);
    }
  };

  return (
    <section className="relative w-full bg-[#f4fafd] py-16 md:py-24 lg:py-32 overflow-hidden">
      <div className="mx-auto max-w-[1600px] px-5 lg:px-16">
        {/* Section Header */}
        <div className="mb-16 md:mb-20 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#bac9cc] bg-white px-4 py-2 mb-6 shadow-sm">
            <span className="h-2 w-2 rounded-full bg-[#15b6e8] animate-pulse" />
            <span className="text-xs font-semibold tracking-wide text-[#6b7a7d] uppercase">
              Our Services
            </span>
          </div>

          <h2
            className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[0.95] uppercase"
            style={{ fontFamily: 'var(--font-zalando-expanded)' }}
          >
            <span className="text-[#161d1e]">What We </span>
            <span className="text-[#15b6e8]">Create</span>
          </h2>
        </div>

        {/* 3D Carousel Container */}
        <div
          ref={carouselRef}
          className="relative w-full h-[600px] md:h-[700px] lg:h-[800px]"
          style={{
            perspective: '2000px',
            perspectiveOrigin: '50% 50%',
          }}
          onMouseDown={handleDragStart}
          onMouseMove={handleDragMove}
          onMouseUp={handleDragEnd}
          onMouseLeave={handleDragEnd}
          onTouchStart={handleDragStart}
          onTouchMove={handleDragMove}
          onTouchEnd={handleDragEnd}
        >
          {/* Cards positioned in 3D space */}
          <div
            className="absolute top-1/2 left-1/2 w-full max-w-[420px] h-full"
            style={{
              transformStyle: 'preserve-3d',
              transform: `translate(-50%, -50%) translateX(${dragOffset}px)`,
              transition: isDragging ? 'none' : 'transform 600ms cubic-bezier(0.34, 1.56, 0.64, 1)',
            }}
          >
            {servicesData.map((service, index) => {
              const cardStyle = getCardStyle(index);

              return (
                <div
                  key={service.id}
                  className="absolute top-1/2 left-1/2 w-full"
                  style={{
                    transformStyle: 'preserve-3d',
                    transform: `translate(-50%, -50%) ${cardStyle.transform}`,
                    opacity: cardStyle.opacity,
                    zIndex: cardStyle.zIndex,
                    filter: cardStyle.filter,
                    pointerEvents: cardStyle.pointerEvents,
                    transition: isDragging
                      ? 'none'
                      : 'transform 600ms cubic-bezier(0.34, 1.56, 0.64, 1), opacity 600ms ease-out, filter 600ms ease-out',
                  }}
                >
                  <ServiceCard3D
                    service={service}
                    isActive={index === activeIndex}
                    isHovering={index === hoveredIndex}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    onClick={() => handleCardClick(index)}
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* Navigation Controls */}
        <div className="flex items-center justify-center gap-6 mt-12">
          {/* Previous Button */}
          <button
            onClick={goToPrevious}
            className="w-12 h-12 rounded-full bg-white border border-[#bac9cc] flex items-center justify-center
              transition-all duration-300 hover:scale-110 hover:bg-[#15b6e8] hover:border-[#15b6e8] group
              shadow-sm hover:shadow-md"
            aria-label="Previous service"
          >
            <svg
              className="w-5 h-5 text-[#161d1e] group-hover:text-white transition-colors"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Pagination Dots */}
          <div className="flex items-center gap-2">
            {servicesData.map((_, index) => (
              <button
                key={index}
                onClick={() => goToIndex(index)}
                className="relative group"
                aria-label={`Go to service ${index + 1}`}
              >
                <div
                  className={`
                    transition-all duration-300
                    ${index === activeIndex
                      ? 'w-8 h-2 bg-[#15b6e8] rounded-full'
                      : 'w-2 h-2 bg-[#bac9cc] rounded-full group-hover:bg-[#15b6e8]'
                    }
                  `}
                />
              </button>
            ))}
          </div>

          {/* Next Button */}
          <button
            onClick={goToNext}
            className="w-12 h-12 rounded-full bg-white border border-[#bac9cc] flex items-center justify-center
              transition-all duration-300 hover:scale-110 hover:bg-[#15b6e8] hover:border-[#15b6e8] group
              shadow-sm hover:shadow-md"
            aria-label="Next service"
          >
            <svg
              className="w-5 h-5 text-[#161d1e] group-hover:text-white transition-colors"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Drag Hint - Mobile */}
        <div className="mt-8 text-center lg:hidden">
          <p className="text-xs text-[#6b7a7d] uppercase tracking-wider">
            Swipe to explore services
          </p>
        </div>

        {/* Keyboard Hint - Desktop */}
        <div className="mt-8 text-center hidden lg:block">
          <p className="text-xs text-[#6b7a7d] uppercase tracking-wider">
            Use arrow keys or drag to navigate
          </p>
        </div>
      </div>
    </section>
  );
}
