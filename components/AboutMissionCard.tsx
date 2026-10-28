'use client';

import { useRef } from 'react';
import SectionPill from '@/components/ui/SectionPill';
import DotGridBackground from '@/components/DotGridBackground';

export default function AboutMissionCard() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden rounded-[2.5rem] p-10 md:p-16 text-white shadow-2xl"
      style={{
        backgroundColor: 'var(--color-ink)',
        boxShadow: '0 0 80px rgba(21, 182, 232, 0.14), inset 0 1px 0 rgba(255,255,255,0.08)',
      }}
    >
      {/* Subtle cyan glow at bottom left (Same as Contact background) */}
      <div
        className="absolute bottom-0 left-0 z-0 w-[450px] h-[450px] blur-[100px] rounded-full -translate-x-1/2 translate-y-1/2 pointer-events-none"
        style={{ backgroundColor: 'rgba(21, 182, 232, 0.16)' }}
      />

      {/* Large cyan gradient at top/bottom right (Same as Contact background) */}
      <div
        className="absolute top-0 right-0 z-0 w-[550px] h-[550px] blur-[120px] rounded-full translate-x-1/4 -translate-y-1/4 pointer-events-none"
        style={{ backgroundColor: 'rgba(21, 182, 232, 0.22)' }}
      />

      {/* Textured Dot Grid Background with interactive cursor glow */}
      <DotGridBackground containerRef={containerRef} />

      {/* Foreground Content */}
      <div className="relative z-10 max-w-3xl">
        <SectionPill label="Our Mission" className="mb-6" />
        <blockquote
          className="text-2xl md:text-4xl font-black leading-tight tracking-tight"
          style={{ fontFamily: 'var(--font-zalando-expanded, sans-serif)' }}
        >
          &ldquo;To make the invisible{' '}
          <span className="text-[#15b6e8]">viscerally real</span> — one pixel, one polygon, one experience at a time.&rdquo;
        </blockquote>
        <p className="mt-6 text-base md:text-lg text-white/70 leading-relaxed">
          We exist to bridge the gap between imagination and perception — giving architects, brands, and innovators the power to show the world exactly what they see in their minds.
        </p>
      </div>
    </div>
  );
}
