'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { type ReactNode } from 'react';

const ARROW_PATHS = {
  'up-right': 'M7 17L17 7M17 7H8M17 7V16',
  down: 'M12 5V19M12 19L5 12M12 19L19 12',
  up: 'M12 19V5M12 5L5 12M12 5L19 12',
} as const;

interface Button3DProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  type?: 'button' | 'submit';
  className?: string;
  showDot?: boolean;
  arrowDirection?: keyof typeof ARROW_PATHS;
}

export default function Button3D({
  children,
  href,
  onClick,
  type = 'button',
  className = '',
  showDot = true,
  arrowDirection = 'up-right',
}: Button3DProps) {
  
  const buttonClasses = `group relative inline-flex items-center gap-3 rounded-[100px] py-1.5 pl-4 pr-1.5 2xl:py-2.5 2xl:pl-6 2xl:pr-2.5 cursor-pointer outline-none ${className}`;

  const arrowIcon = (
    <svg
      className="w-3 h-3 2xl:w-4 2xl:h-4"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d={ARROW_PATHS[arrowDirection]}
        stroke="black"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  const labelContent = (
    <span className="flex items-center gap-2 2xl:gap-3 font-[family-name:var(--font-dm-sans)] text-xs 2xl:text-sm font-bold uppercase tracking-wide text-white">
      {showDot && (
        <span
          className="h-1.5 w-1.5 shrink-0 rounded-[100px] 2xl:h-2 2xl:w-2"
          style={{ backgroundColor: 'rgb(255, 255, 255)' }}
        />
      )}
      {children}
    </span>
  );

  const buttonContent = (
    <>
      {/* --- BACKGROUND LAYERS --- */}
      
      {/* 1. Base Ring (Creates the 3D edge: lighter top, darker bottom) */}
      <div
        className="absolute inset-0 z-0 rounded-[100px]"
        style={{
          background: 'linear-gradient(180deg, #6cdcfb 0%, #0d8ec4 100%)',
          opacity: 1,
        }}
      />

      {/* 2. Main BG (The Cyan body with a pillowy top inner-shadow) */}
      <div
        className="absolute inset-[1px] z-0 rounded-[100px]"
        style={{
          backgroundColor: '#15b6e8',
          boxShadow: 'rgba(255, 255, 255, 0.4) 0px 4px 6px 0px inset',
          opacity: 1,
        }}
      />

      {/* --- CONTENT LAYERS --- */}
      <div className="relative z-10 flex w-full items-center justify-between gap-3 2xl:gap-4">
        
        {/* Rolling Text Mask */}
        <div className="relative overflow-hidden py-0.5">
          <div className="flex items-center transition-transform duration-500 ease-in-out group-hover:-translate-y-full">
            {labelContent}
          </div>
          <div className="absolute left-0 top-full flex h-full w-full items-center transition-transform duration-500 ease-in-out group-hover:-translate-y-full">
            {labelContent}
          </div>
        </div>

        {/* Icon Puck */}
        <div
          className="relative flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-[100px] text-[#15b6e8] 2xl:h-10 2xl:w-10"
          style={{
            backgroundColor: 'rgb(255, 255, 255)',
            boxShadow: 'rgba(255, 255, 255, 0.3) 0px 4px 6px 0px',
            opacity: 1,
          }}
        >
          <div className="flex h-full w-full items-center justify-center transition-transform duration-500 ease-in-out group-hover:-translate-x-full">
            {arrowIcon}
          </div>
          <div className="absolute left-full top-0 flex h-full w-full items-center justify-center transition-transform duration-500 ease-in-out group-hover:-translate-x-full">
            {arrowIcon}
          </div>
        </div>
        
      </div>
    </>
  );

  if (href) {
    return (
      <motion.div whileTap={{ scale: 0.95 }} className="inline-block">
        <Link href={href} className={buttonClasses}>
          {buttonContent}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      className={buttonClasses}
      onClick={onClick}
      type={type}
    >
      {buttonContent}
    </motion.button>
  );
}