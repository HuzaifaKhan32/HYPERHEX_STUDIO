'use client';

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

const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: '1',
    quote: 'Working with HyperHex transformed our interactive 3D pipeline completely. Conversions shot up 300%.',
    author: 'Alex Turner',
    role: 'Founder, Voxel Labs',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
  },
  {
    id: '2',
    quote: 'The procedural shaders and real-time canvas integration exceeded our client’s highest expectations.',
    author: 'James Mitchell',
    role: 'CEO, Novara Studio',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
  },
  {
    id: '3',
    quote: 'They captured our brand identity instantly and engineered a web experience that feels alive.',
    author: 'Sofia Rahman',
    role: 'Design Director, Luma',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200',
  },
  {
    id: '4',
    quote: 'Unmatched speed and technical precision. The WebGL performance across mobile is rock solid.',
    author: 'David Chen',
    role: 'VP Engineering, Apex',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
  },
  {
    id: '5',
    quote: 'HyperHex delivered complex 3D assets seamlessly integrated into Next.js within record timelines.',
    author: 'Elena Rostova',
    role: 'Product Lead, Kinetic',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200',
  },
  {
    id: '6',
    quote: 'The tactile UI polish and custom shaders gave our launch campaign the edge it needed.',
    author: 'Marcus Vance',
    role: 'Creative Director, Synth',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200',
  },
];

export default function HyperHexTestimonials() {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Drag State
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftState, setScrollLeftState] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-scroll logic powered by RequestAnimationFrame (60 FPS)
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

  // Navigation handlers
  const handleScroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const cardWidth = 340;
    const targetScroll =
      direction === 'left'
        ? scrollRef.current.scrollLeft - cardWidth
        : scrollRef.current.scrollLeft + cardWidth;

    scrollRef.current.scrollTo({
      left: targetScroll,
      behavior: 'smooth',
    });
  };

  // Dragging event handlers
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
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    scrollRef.current.scrollLeft = scrollLeftState - walk;
  };

  return (
    <section
      className="w-full py-16 bg-[#FFFFFF] text-[#161d1e] overflow-hidden select-none"
      style={{ fontFamily: 'var(--font-zalando-expanded, sans-serif)' }}
    >
      <div className="max-w-[1280px] mx-auto px-5 lg:px-16 flex flex-col">

        {/* Header & Control Buttons */}
        <div className="flex items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 bg-[#f4fafd] px-3.5 py-1 rounded-full border border-[#bac9cc] mb-3">
              <span className="w-2 h-2 rounded-full bg-[#15b6e8]" />
              <span className="text-xs font-semibold tracking-wider uppercase text-[#006875]">
                Testimonials
              </span>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[#161d1e] uppercase">
              Don't just <span className="text-[#15b6e8]">take</span> our word
            </h2>
          </div>

          {/* Previous & Next Control Buttons */}
          {/* <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => handleScroll('left')}
              aria-label="Previous Testimonial"
              className="flex items-center justify-center w-12 h-12 rounded-xl border-2 border-outline-variant/30 text-on-surface shadow-[0_4px_0_0_var(--color-outline-variant)] hover:border-accent hover:text-accent hover:shadow-[0_4px_0_0_rgba(21,182,232,1)] hover:-translate-y-0.5 active:shadow-[0_0px_0_0_rgba(21,182,232,1)] active:translate-y-1 transition-all duration-150"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              type="button"
              onClick={() => handleScroll('right')}
              aria-label="Next Testimonial"
              className="flex items-center justify-center w-12 h-12 rounded-xl border-2 border-outline-variant/30 text-on-surface shadow-[0_4px_0_0_var(--color-outline-variant)] hover:border-accent hover:text-accent hover:shadow-[0_4px_0_0_rgba(21,182,232,1)] hover:-translate-y-0.5 active:shadow-[0_0px_0_0_rgba(21,182,232,1)] active:translate-y-1 transition-all duration-150"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div> */}
        </div>

        {/* Carousel Container */}
        <div
          className="relative w-full"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => {
            setIsPaused(false);
            handleMouseLeaveOrUp();
          }}
        >
          {/* Side Fade Masks */}
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-8 md:w-20 z-10 bg-gradient-to-r from-[#FFFFFF] to-transparent" />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-8 md:w-20 z-10 bg-gradient-to-l from-[#FFFFFF] to-transparent" />

          {/* Scroll Track */}
          <div
            ref={scrollRef}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseLeaveOrUp}
            onMouseMove={handleMouseMove}
            className={`flex gap-5 overflow-x-auto py-4 px-2 scrollbar-none cursor-grab ${
              isMouseDown ? 'cursor-grabbing' : ''
            }`}
          >
            {TESTIMONIALS_DATA.map((item) => (
              <TestimonialCard key={item.id} item={item} />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

// Compact Card Component
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

      {/* Author Details */}
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