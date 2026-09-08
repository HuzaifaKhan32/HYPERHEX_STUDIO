'use client';

// Auto-scrolling testimonials carousel with drag support
import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { PiQuotes } from 'react-icons/pi';

interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  avatar: string;
}

interface TestimonialsCarouselProps {
  testimonials: Testimonial[];
}

function TestimonialCard({ item }: { item: Testimonial }) {
  return (
    <div
      className="flex-shrink-0 w-[300px] md:w-[320px] h-[220px] p-5 flex flex-col justify-between transition-transform duration-200 hover:-translate-y-1"
      style={{
        backgroundColor: 'rgb(244, 244, 245)',
        borderRadius: '24px',
        boxShadow:
          'rgba(255, 255, 255, 0.6) 0px 4px 0px 0px inset, rgba(0, 0, 0, 0.05) 0px -8px 0px 0px inset, rgba(0, 0, 0, 0.1) 0px 3px 3px 0px, rgba(0, 0, 0, 0.06) 0px 7.77px 16px 0px',
      }}
    >
      <div className="relative">
        <PiQuotes className="w-6 h-6 mb-2 text-[#71717a]" />
        <p className="text-sm text-[#161d1e] font-medium leading-relaxed line-clamp-3">
          {item.quote}
        </p>
      </div>

      <div className="flex items-center gap-3 pt-3 border-t border-[#3b494c]/10">
        <Image
          src={item.avatar}
          alt={item.author}
          width={36}
          height={36}
          className="w-9 h-9 rounded-full object-cover border border-[#15b6e8]"
        />
        <div className="flex flex-col min-w-0">
          <span className="text-xs font-bold text-[#161d1e] truncate">{item.author}</span>
          <span className="text-[11px] font-semibold text-[#15b6e8] truncate">{item.role}</span>
        </div>
      </div>
    </div>
  );
}

export default function TestimonialsCarousel({ testimonials }: TestimonialsCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Drag state
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftState, setScrollLeftState] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-scroll logic (60 FPS)
  useEffect(() => {
    let animationFrameId: number;

    const autoScroll = () => {
      if (scrollRef.current && !isPaused && !isMouseDown) {
        scrollRef.current.scrollLeft += 0.8;

        if (
          scrollRef.current.scrollLeft >=
          scrollRef.current.scrollWidth - scrollRef.current.clientWidth - 5
        ) {
          scrollRef.current.scrollLeft = 0;
        }
      }
      animationFrameId = requestAnimationFrame(autoScroll);
    };

    animationFrameId = requestAnimationFrame(autoScroll);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isPaused, isMouseDown]);

  // Dragging handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    setIsMouseDown(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeftState(scrollRef.current.scrollLeft);
  };

  const handleMouseLeaveOrUp = () => {
    setIsMouseDown(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isMouseDown || !scrollRef.current) return;
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    scrollRef.current.scrollLeft = scrollLeftState - walk;
  };

  return (
    <div
      className="relative w-full"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => {
        setIsPaused(false);
        handleMouseLeaveOrUp();
      }}
    >
      {/* Side fade masks */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-8 md:w-20 z-10 bg-gradient-to-r from-[#FFFFFF] to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-8 md:w-20 z-10 bg-gradient-to-l from-[#FFFFFF] to-transparent" />

      {/* Scroll track */}
      <div
        ref={scrollRef}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseLeaveOrUp}
        onMouseMove={handleMouseMove}
        style={{ touchAction: 'pan-y' }}
        className={`flex gap-5 overflow-x-auto py-4 px-2 scrollbar-none cursor-grab ${
          isMouseDown ? 'cursor-grabbing' : ''
        }`}
      >
        {testimonials.map((item) => (
          <TestimonialCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
