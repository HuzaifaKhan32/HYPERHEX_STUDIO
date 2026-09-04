'use client';

import React from 'react';
import StaggeredHeading from '@/components/ui/StaggeredHeading';

const BLACK = '#161d1e';
const ACCENT = '#15b6e8';

export default function ServicesHeading() {
  return (
    <div className="flex flex-col gap-3 select-none">
      <div className="inline-flex w-fit items-center gap-2 rounded-full border border-[#bac9cc] bg-white px-4 py-2 shadow-sm transition-transform hover:-translate-y-0.5">
        <span className="h-2 w-2 animate-pulse rounded-full bg-[#15b6e8]" />
        <span className="text-xs font-semibold tracking-wide text-[#3b494c]">
          Our Services
        </span>
      </div>
      
      <h2 className="flex flex-col text-4xl font-extrabold tracking-tight md:text-6xl lg:text-7xl 2xl:text-8xl">
        <span className="text-[#161d1e]">Pushing the</span>
        <span className="bg-gradient-to-b from-[#15b6e8] to-transparent bg-clip-text text-transparent">Boundaries</span>
      </h2>
    </div>
  );
}