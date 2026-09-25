'use client';

import React, { useState, useCallback } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { MAIN_CASE_STUDIES, SUB_CASE_STUDIES, type CaseStudy } from '@/lib/case-studies-data';
import InfiniteMarquee from '@/components/ui/InfiniteMarquee';

const CaseStudyModal = dynamic(() => import('./CaseStudyModal'), { ssr: false });

const SUB_GAP = 16;

export default function FeaturedProjectsSubSlider() {
  const [selected, setSelected] = useState<CaseStudy | null>(null);

  const handleCloseModal = useCallback(() => {
    setSelected(null);
  }, []);

  const allFeatured = [...MAIN_CASE_STUDIES, ...SUB_CASE_STUDIES];

  return (
    <div className="relative w-full my-8 select-none overflow-hidden">
      {/* Side Fade Masks */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-8 md:w-24 z-20 bg-gradient-to-r from-background via-background/80 to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-8 md:w-24 z-20 bg-gradient-to-l from-background via-background/80 to-transparent" />

      <InfiniteMarquee
        speed={1.4}
        gap={SUB_GAP}
        pauseOnHover={true}
        items={[...allFeatured, ...allFeatured].map((study, idx) => (
          <div
            key={`feat-sub-${study.id}-${idx}`}
            onClick={() => setSelected(study)}
            className="w-[75vw] sm:w-[50vw] md:w-[40vw] lg:w-[28vw] xl:w-[24vw] 2xl:w-[22vw] aspect-[16/9] shrink-0 group cursor-pointer overflow-hidden rounded-2xl border bg-surface-bright shadow-lg transition-all duration-500 hover:border-[#15b6e8]/80 border-white/10"
            data-cursor="project"
          >
            <div className="relative w-full h-full overflow-hidden select-none">
              <Image
                src={study.thumbnail}
                alt={study.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 70vw, (max-width: 1024px) 50vw, 30vw"
                quality={95}
                loading="lazy"
                draggable={false}
                onDragStart={(e) => e.preventDefault()}
                style={{ userSelect: 'none', WebkitUserDrag: 'none' } as React.CSSProperties}
                className="object-cover w-full h-full transition-transform duration-500 ease-out group-hover:scale-105 pointer-events-none select-none"
              />

              {study.isVideo && (
                <div className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-black/60 border border-white/20 flex items-center justify-center pointer-events-none group-hover:opacity-0 transition-opacity duration-300 backdrop-blur-sm">
                  <svg className="w-3.5 h-3.5 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              )}

              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-4 z-20 pointer-events-none backdrop-blur-[2px]">
                <span className="text-[10px] uppercase tracking-[0.25em] mb-1.5 text-[#15b6e8] font-bold">
                  {study.category}
                </span>
                <p className="text-xs md:text-sm font-black uppercase tracking-wide text-center text-white leading-tight">
                  {study.title}
                </p>
                {study.isVideo && (
                  <span className="mt-3 px-3 py-1 rounded-full bg-white/90 text-black text-[10px] font-bold uppercase tracking-wider">
                    Watch Video
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      />

      <CaseStudyModal caseStudy={selected} onClose={handleCloseModal} />
    </div>
  );
}
