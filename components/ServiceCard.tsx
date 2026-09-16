'use client';

import { useRef, useState, type ReactNode } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import type { ImageConfig } from '@/lib/services-data';

const TRANSLATE_VARIANTS = {
  0: { x: 0, y: '-101%' },
  1: { x: '101%', y: 0 },
  2: { x: 0, y: '101%' },
  3: { x: '-101%', y: 0 },
} as const;

const INITIAL_VARIANTS = {
  0: { x: 0, y: 0 },
  1: { x: 0, y: 0 },
  2: { x: 0, y: 0 },
  3: { x: 0, y: 0 },
} as const;

export type ServiceCardProps = {
  title: string;
  description: string;
  href: string;
  panel: 'cyan' | 'ink';
  icon: ReactNode;
  imagePath: string;
  imageConfig: ImageConfig;
  category: string;
  index: string;
  className?: string;
};

function getDirection(ev: React.MouseEvent, el: HTMLElement): 0 | 1 | 2 | 3 {
  const rect = el.getBoundingClientRect();
  const w = rect.width;
  const h = rect.height;
  const x = (ev.clientX - rect.left - w / 2) * (w > h ? h / w : 1);
  const y = (ev.clientY - rect.top - h / 2) * (h > w ? w / h : 1);
  return Math.round((((Math.atan2(y, x) * (180 / Math.PI)) + 180) / 90) + 3) % 4 as 0 | 1 | 2 | 3;
}

export default function ServiceCard({
  title,
  description,
  href,
  panel,
  icon,
  imagePath,
  imageConfig,
  category,
  index,
  className = '',
}: ServiceCardProps) {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const [direction, setDirection] = useState<0 | 1 | 2 | 3 | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const isCyanPanel = panel === 'cyan';

  const handleEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!cardRef.current) return;
    const dir = getDirection(e, cardRef.current);
    setDirection(dir);
    setIsHovered(true);
  };

  const handleLeave = () => {
    setDirection(null);
    setIsHovered(false);
  };

  return (
    <a
      ref={cardRef}
      href={href}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      data-cursor="project"
      className={`service-card group relative block h-full min-h-[380px] rounded-none bg-black p-[2px]
        [clip-path:polygon(0_0,100%_0,100%_calc(100%-24px),calc(100%-24px)_100%,0_100%)]
        focus-visible:outline-none
        transition-all duration-[350ms] ease-out
        hover:-translate-y-[5px]
        ${isHovered ? 'shadow-[0_20px_40px_rgba(0,0,0,0.10)]' : 'shadow-[0_4px_12px_rgba(0,0,0,0.06)]'}
        ${className}`}
    >
      {/* Inner Card Body */}
      <div className="relative h-full w-full min-h-[376px] overflow-hidden rounded-none bg-[#F1F7F9] text-black [clip-path:polygon(0_0,100%_0,100%_calc(100%-23px),calc(100%-23px)_100%,0_100%)]
        transition-colors duration-300 ease-out
        group-hover:bg-[#EAF5F8]"
      >
        {/* Editorial Index - Top Right */}
        <div className="absolute top-4 right-4 text-[11px] font-bold tracking-wider text-[#64747A] z-20">
          {index}
        </div>

        {/* IMAGE STAGE - Upper 70% */}
        <div className="relative h-[70%] w-full overflow-hidden">
          {/* Subtle studio lighting behind image */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(circle at center, rgba(255,255,255,0.5), rgba(241,247,249,0) 70%)',
            }}
          />

          {/* Hero Image with scale on hover */}
          <div
            className="absolute inset-0 flex items-center justify-center pointer-events-none
              transition-transform duration-[450ms] cubic-bezier(0.22, 1, 0.36, 1)
              group-hover:scale-[1.07]"
            style={{
              transform: `translate(${imageConfig.x}px, ${imageConfig.y}px) scale(${imageConfig.scale})`,
              transformOrigin: 'center center',
            }}
          >
            <div className="relative w-full h-full">
              <Image
                src={imagePath}
                alt={title}
                fill
                priority
                quality={100}
                sizes="(max-width: 768px) 60vw, 40vw"
                style={{
                  objectFit: imageConfig.fit,
                  objectPosition: imageConfig.position,
                  filter: imageConfig.fit === 'contain'
                    ? 'drop-shadow(0 15px 25px rgba(0,0,0,0.06))'
                    : 'drop-shadow(0 8px 16px rgba(0,0,0,0.04))',
                }}
              />
            </div>
          </div>
        </div>

        {/* CONTENT AREA - Lower 30% */}
        <div className="relative h-[30%] w-full flex flex-col justify-between p-6 lg:px-7 lg:pb-7">
          <div className="flex flex-col gap-2">
            {/* Category Label */}
            <div className="text-[10px] lg:text-[11px] font-bold tracking-[0.12em] uppercase text-[#64747A]">
              {category}
            </div>

            {/* Main Title - Stable, no scale */}
            <h3 className="font-[family-name:var(--font-dm-sans)] text-xl lg:text-2xl leading-tight font-black text-[#080B0D] uppercase tracking-tight max-w-[90%]">
              {title}
            </h3>

            {/* Description */}
            <p className="text-[11px] lg:text-xs leading-relaxed text-[#64747A] max-w-[92%] line-clamp-2">
              {description}
            </p>
          </div>

          {/* CTA */}
          <div className="flex items-center gap-2 text-[10px] lg:text-xs font-bold tracking-widest uppercase self-end">
            <span className="text-[#64747A] group-hover:text-[#18B8E6] transition-colors duration-300">
              {isHovered ? 'Explore' : 'Hover Me'}
            </span>
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
              className="text-[#64747A] group-hover:text-[#18B8E6] transition-all duration-300
                group-hover:translate-x-1"
            >
              <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>

        {/* Hovered State Overlay Panel - Preserved */}
        <motion.div
          initial={direction !== null ? TRANSLATE_VARIANTS[direction] : INITIAL_VARIANTS[0]}
          animate={direction !== null ? INITIAL_VARIANTS[0] : { x: 0, y: '-101%' }}
          transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
          className={`absolute inset-0 z-30 flex flex-col justify-between p-6 lg:p-8 text-left ${isCyanPanel ? 'bg-primary-container text-ink' : 'bg-ink text-white'
            }`}
        >
          {/* Background Image in Hover Panel */}
          <div className="absolute left-1/2 top-[35%] -translate-x-1/2 -translate-y-1/2 w-[70%] h-[55%] pointer-events-none opacity-15">
            <Image
              src={imagePath}
              alt={title}
              fill
              priority
              quality={90}
              sizes="(max-width: 768px) 50vw, 35vw"
              style={{
                objectFit: imageConfig.fit,
                objectPosition: imageConfig.position,
                filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.2))',
              }}
            />
          </div>

          <div
            className={`relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full ${isCyanPanel ? 'bg-ink/10 text-ink' : 'bg-white/10 text-white'
              } [&_svg]:h-7 [&_svg]:w-7 [&_svg]:shrink-0`}
          >
            {icon}
          </div>

          <div className="relative z-10 flex min-h-0 flex-col gap-3">
            <h4 className="font-[family-name:var(--font-dm-sans)] text-2xl font-extrabold tracking-tight uppercase">
              {title}
            </h4>
            <p
              className={`font-[family-name:var(--font-dm-sans)] text-sm leading-6 ${isCyanPanel ? 'text-ink/80' : 'text-white/80'
                }`}
            >
              {description}
            </p>
          </div>
        </motion.div>

      </div>
    </a>
  );
}
