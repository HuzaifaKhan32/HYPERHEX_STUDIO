'use client';

// Logo with hover-triggered label expansion
import { motion } from 'framer-motion';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function NavbarLogoHover() {
  const [isLogoHovered, setIsLogoHovered] = useState(false);

  return (
    <motion.div
      className="group flex cursor-pointer items-center gap-5"
      onHoverStart={() => setIsLogoHovered(true)}
      onHoverEnd={() => setIsLogoHovered(false)}
    >
      <Link
        href="#"
        onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
        aria-label="HyperHex Studio — back to top"
        className="relative z-10 flex h-11 w-11 2xl:h-14 2xl:w-14 shrink-0 items-center justify-center overflow-hidden rounded-full border border-white/20 bg-black/10 hover:scale-105 transition-transform duration-200"
      >
        <Image
          src="/logo/hyperhex-logo-H.avif"
          alt="HyperHex Logo"
          fill
          sizes="56px"
          quality={90}
          priority
          className="object-cover rounded-full"
        />
      </Link>

      {/* Slide-out label — desktop only */}
      <motion.div
        initial={{ width: 0, opacity: 0 }}
        animate={{
          width: isLogoHovered ? 'auto' : 0,
          opacity: isLogoHovered ? 1 : 0,
        }}
        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        className="hidden overflow-hidden sm:inline-flex shrink-0"
      >
        {/* Button3D-styled label badge */}
        <div className="relative inline-flex items-center gap-3 rounded-[100px] py-1.5 pl-4 pr-1.5 pointer-events-none select-none shrink-0 whitespace-nowrap">
          {/* Base Ring — 3D bottom edge */}
          <div
            className="absolute inset-0 z-0 rounded-[100px]"
            style={{ background: 'linear-gradient(180deg, #6cdcfb 0%, #0d8ec4 100%)' }}
          />

          {/* Main cyan body with inner highlight */}
          <div
            className="absolute inset-[1px] z-0 rounded-[100px]"
            style={{
              backgroundColor: '#15b6e8',
              boxShadow: 'rgba(255, 255, 255, 0.4) 0px 4px 6px 0px inset',
            }}
          />

          {/* Content */}
          <div className="relative z-10 flex items-center justify-between gap-3">
            {/* Rolling text */}
            <div className="relative overflow-hidden py-0.5">
              <div className="flex items-center transition-transform duration-500 ease-in-out group-hover:-translate-y-full">
                <span className="flex items-center gap-2 font-[family-name:var(--font-dm-sans)] text-xs font-bold uppercase tracking-wide text-white">
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-white" />
                  HYPERHex Studio
                </span>
              </div>
              <div className="absolute left-0 top-full flex h-full w-full items-center transition-transform duration-500 ease-in-out group-hover:-translate-y-full">
                <span className="flex items-center gap-2 font-[family-name:var(--font-dm-sans)] text-xs font-bold uppercase tracking-wide text-white">
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-white" />
                  HYPERHex Studio
                </span>
              </div>
            </div>

            {/* Icon puck */}
            <div
              className="relative flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full"
              style={{
                backgroundColor: 'rgb(255, 255, 255)',
                boxShadow: 'rgba(255, 255, 255, 0.3) 0px 4px 6px 0px',
              }}
            >
              <div className="flex h-full w-full items-center justify-center transition-transform duration-500 ease-in-out group-hover:-translate-x-full">
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none">
                  <path d="M7 17L17 7M17 7H8M17 7V16" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div className="absolute left-full top-0 flex h-full w-full items-center justify-center transition-transform duration-500 ease-in-out group-hover:-translate-x-full">
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none">
                  <path d="M7 17L17 7M17 7H8M17 7V16" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
