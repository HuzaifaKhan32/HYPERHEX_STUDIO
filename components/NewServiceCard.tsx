"use client";

import { type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export interface ServiceCardData {
  id: string;
  counter: string;
  title: string;
  description: string;
  imageSrc?: string;
}

interface ServiceCardProps {
  data: ServiceCardData;
  style?: React.CSSProperties;
  className?: string;
  isFocused?: boolean;
}

const SERVICE_ICONS: Record<string, ReactNode> = {
  "architectural-visualization": (
    <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-white stroke-[2]">
      <path d="M21.5 12a9.5 9.5 0 1 1-19 0 9.5 9.5 0 0 1 19 0Z" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1 4-10Z" />
    </svg>
  ),
  "architecture-visualization": (
    <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-white stroke-[2]">
      <path d="M21.5 12a9.5 9.5 0 1 1-19 0 9.5 9.5 0 0 1 19 0Z" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1 4-10Z" />
    </svg>
  ),
  "3d-product-visualization": (
    <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-white stroke-[2]">
      <path d="m12 3 8 4.5v9L12 21l-8-4.5v-9L12 3z" />
      <path d="M12 12l8-4.5M12 12v9M12 12 4 7.5" />
    </svg>
  ),
  "3d-product-configurators": (
    <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-white stroke-[2]">
      <path d="M4 8h9M17 8h3M4 16h3M11 16h9" />
      <circle cx="15" cy="8" r="2" />
      <circle cx="9" cy="16" r="2" />
    </svg>
  ),
  "interactive-web-experiences": (
    <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-white stroke-[2.2]">
      <path d="m16 18 6-6-6-6M8 6l-6 6 6 6" />
    </svg>
  ),
  "vr-development": (
    <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-white stroke-[2]">
      <rect x="2" y="7.5" width="20" height="9" rx="3" />
      <path d="M9 16.5c0-1.6.9-2.5 1.5-2.5s1.5.9 1.5 2.5M13.5 16.5c0-1.6.9-2.5 1.5-2.5s1.5.9 1.5 2.5" />
    </svg>
  ),
  "3d-animation": (
    <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-white stroke-[2]">
      <circle cx="12" cy="12" r="2.5" />
      <path d="M12 9.5V5M12 14.5V19M9.5 12H5M14.5 12H19" />
      <circle cx="5" cy="5" r="2.5" />
      <circle cx="19" cy="5" r="2.5" />
      <circle cx="5" cy="19" r="2.5" />
      <circle cx="19" cy="19" r="2.5" />
    </svg>
  ),
  "web-development": (
    <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-white stroke-[2.2]">
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M3 9h18" />
      <path d="m9 13.5 2 2 4-4" />
    </svg>
  ),
  "interactive-real-time": (
    <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-white stroke-[2]">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  ),
  "marketing-sales": (
    <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-white stroke-[2.2]">
      <path d="M4 17l5-5 3 3 6-7 4 4" />
      <path d="M18 8h4v4" />
    </svg>
  ),
};

const DEFAULT_ICON = (
  <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-white stroke-[2]">
    <path d="m12 3 8 4.5v9L12 21l-8-4.5v-9L12 3z" />
    <path d="M12 12l8-4.5M12 12v9M12 12 4 7.5" />
  </svg>
);

export default function ServiceCard({
  data,
  style,
  className = "",
  isFocused = true,
}: ServiceCardProps) {
  return (
    <div className="relative group/card-wrapper select-none">
      {/* SOFT GROUND CONTACT GLOW FOR SIDE CARDS */}
      {!isFocused && (
        <div
          className="pointer-events-none absolute -bottom-2 left-1/2 -translate-x-1/2 h-4 w-[80%] rounded-[100%] bg-[#030712]/20 blur-md z-0 transition-opacity duration-300 select-none"
        />
      )}

      {/* MAIN CARD */}
      <div
        className={`group relative flex w-[300px] md:w-[320px] h-[360px] p-6 flex-col justify-between overflow-hidden transition-all duration-500 ease-out z-10 select-none outline-none focus:outline-none [WebkitTapHighlightColor:transparent] ${className}`}
        style={{
          boxSizing: 'border-box',
          backgroundColor: '#f4f4f5',
          borderRadius: '24px',
          border: isFocused ? '1.5px solid rgba(21, 182, 232, 0.85)' : 'none',

          boxShadow: isFocused
            ? '0 12px 30px rgba(21, 182, 232, 0.3), 0 20px 40px -10px rgba(6, 182, 212, 0.25)'
            : '0px 8px 24px rgba(15, 23, 42, 0.06), 0px 2px 6px rgba(15, 23, 42, 0.04)',
          ...style,
        }}
      >
        {/* Top Section: Counter + Icon with Perfectly Centered Concentric Circles */}
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold tracking-[0.08em] text-[#15b6e8]">
              {data.counter}
            </span>

            {/* Icon Wrapper & Centered Concentric Circles */}
            <div className="relative flex items-center justify-center">
              {/* CONCENTRIC ANIMATED CIRCLES */}
              <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[150px] w-[150px] flex items-center justify-center z-0">
                <AnimatePresence>
                  {isFocused && (
                    <motion.div
                      key="sub-circles-group"
                      initial={{ opacity: 0, scale: 0.35 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.35 }}
                      transition={{
                        type: "spring",
                        stiffness: 280,
                        damping: 24,
                        mass: 0.8,
                      }}
                      className="relative flex items-center justify-center h-full w-full"
                    >
                      {/* DECORATIVE CIRCLE 1 (Outer) */}
                      <motion.div
                        initial={{ opacity: 0, scale: 0.2 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.2 }}
                        transition={{ duration: 0.3, delay: 0.04 }}
                        className="absolute h-[135px] w-[135px] rounded-full bg-[#15b6e8]/[0.06] border border-white/60 shadow-[0_8px_20px_rgba(15,23,42,0.08),_inset_0_2px_6px_rgba(255,255,255,0.9)] transition-transform duration-500 ease-out group-hover:scale-105"
                      />

                      {/* DECORATIVE CIRCLE 2 (Middle) */}
                      <motion.div
                        initial={{ opacity: 0, scale: 0.2 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.2 }}
                        transition={{ duration: 0.3, delay: 0.08 }}
                        className="absolute h-[98px] w-[98px] rounded-full bg-[#15b6e8]/[0.11] border border-white/70 shadow-[0_10px_24px_rgba(15,23,42,0.11),_inset_0_2px_8px_rgba(255,255,255,0.95)] transition-transform duration-500 ease-out group-hover:scale-105"
                      />

                      {/* DECORATIVE CIRCLE 3 (Inner) */}
                      <motion.div
                        initial={{ opacity: 0, scale: 0.2 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.2 }}
                        transition={{ duration: 0.3, delay: 0.12 }}
                        className="absolute h-[68px] w-[68px] rounded-full bg-[#15b6e8]/[0.20] border border-white/80 shadow-[0_12px_28px_rgba(15,23,42,0.14),_inset_0_2px_10px_rgba(255,255,255,1)] transition-transform duration-500 ease-out group-hover:scale-110"
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Hero Icon Button */}
              <div className="relative z-10 flex h-11 w-11 items-center justify-center rounded-full bg-[#15b6e8] shadow-[0_10px_24px_-6px_rgba(21,182,232,0.6)] transition-transform duration-300 group-hover:scale-105">
                {SERVICE_ICONS[data.id] ?? DEFAULT_ICON}
              </div>
            </div>
          </div>

          <h3 className="text-xl md:text-2xl font-bold leading-tight tracking-[-0.02em] text-[#161d1e] mb-2 pr-10">
            {data.title}
          </h3>
          <p className="text-[11px] md:text-xs font-medium leading-relaxed text-[#3b494c] line-clamp-3">
            {data.description}
          </p>
        </div>

        {/* Middle Image Frame */}
        {data.imageSrc && (
          <div className="relative z-10 h-[130px] w-full flex items-center justify-center overflow-hidden select-none pointer-events-none">
            <Image
              src={data.imageSrc}
              alt={data.title}
              width={280}
              height={160}
              draggable={false}
              className="object-contain h-full w-full max-h-[125px] transition-transform duration-300 group-hover:scale-105 select-none pointer-events-none"
            />
          </div>
        )}

        {/* Bottom Action Link */}
        <div className="relative z-10 pt-2">
          <Link
            href={`/services/${data.id}`}
            tabIndex={isFocused ? 0 : -1}
            className={`inline-flex items-center gap-1.5 text-xs font-bold text-[#161d1e] transition-colors duration-200 hover:text-[#15b6e8] ${isFocused ? "pointer-events-auto" : "pointer-events-none"
              }`}
          >
            View more
            <svg
              viewBox="0 0 24 24"
              className="h-3.5 w-3.5 fill-none stroke-current stroke-[2.4] transition-transform duration-200 group-hover:translate-x-0.5"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}