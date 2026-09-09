'use client';

// Globe with scroll parallax and interactive city markers
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import Image from 'next/image';

const PAKISTAN_CITIES = [
  { name: 'Pakistan', top: '25%', left: '47.5%' },
  { name: 'UAE', top: '20%', left: '40%' },
  { name: 'USA', top: '14%', left: '38%' },
  { name: 'UK', top: '15%', left: '44%' },
  { name: 'Bangladesh', top: '30%', left: '47.5%' },
];

export default function AboutUsGlobeParallax() {
  const cardRef = useRef<HTMLDivElement>(null);
  const [activeCity, setActiveCity] = useState<string | null>(null);

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'end start'],
  });

  const globeY = useTransform(scrollYProgress, [0, 0.5], ['88%', '65%']);

  return (
    <div ref={cardRef} className="contents">
      <motion.div
        style={{
          y: globeY,
          display: 'flex',
          placeItems: 'center',
          placeContent: 'center',
          overflow: 'visible',
          background: 'rgba(0, 0, 0, 0)'
        }}
        className="absolute bottom-0 left-1/2 z-0 w-[135%] max-w-[950px] 2xl:max-w-[1200px] -translate-x-1/2 pointer-events-auto"
      >
        <div
          className="relative w-full aspect-square max-w-[950px] 2xl:max-w-[1200px]"
          style={{
            WebkitMaskImage:
              'radial-gradient(circle at 50% 50%, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 70%)',
            maskImage:
              'radial-gradient(circle at 50% 50%, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 70%)',
          }}
        >
          <Image
            src="/logo/globe.webp"
            alt="Global dot-matrix network map"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, (max-width: 1920px) 950px, 1200px"
            style={{
              width: '100%',
              height: '100%',
              contain: 'layout paint size',
              cursor: 'auto',
              userSelect: 'none'
            }}
            className="object-contain"
          />

          {/* City markers */}
          {PAKISTAN_CITIES.map((city) => (
            <div
              key={city.name}
              className="absolute z-20 -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
              style={{ top: city.top, left: city.left }}
              onMouseEnter={() => setActiveCity(city.name)}
              onMouseLeave={() => setActiveCity(null)}
            >
              {/* Ping beacon */}
              <div className="relative flex items-center justify-center">
                <span className="absolute inline-flex h-4 w-4 animate-ping rounded-full bg-[#15b6e8] opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#15b6e8] shadow-[0_0_8px_#15b6e8]" />
              </div>

              {/* Tooltip */}
              <div
                className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-2 whitespace-nowrap rounded-lg border border-white/20 bg-[#0d0f12]/90 px-3 py-1 text-xs font-semibold text-white shadow-lg backdrop-blur-md transition-all duration-200 pointer-events-none ${
                  activeCity === city.name
                    ? 'opacity-100 translate-y-0 scale-100'
                    : 'opacity-0 translate-y-1 scale-95'
                }`}
              >
                {city.name}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
