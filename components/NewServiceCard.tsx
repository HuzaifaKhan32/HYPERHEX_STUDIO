"use client";

import React from "react";
import Image from "next/image";
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

const RenderCardArtwork = ({ id, imageSrc }: { id: string; imageSrc?: string }) => {
  return (
    <div className="relative h-[108px] w-[176px] [transform-style:preserve-3d] [transform:translate3d(0,0,45px)_rotateX(4deg)_rotateZ(3deg)] transition-all duration-700 ease-out group-hover:[transform:translate3d(-6px,-6px,75px)_rotateX(5deg)_rotateZ(3deg)]">
      {/* Back glass sheet shadow layer */}
      <div className="absolute left-[10px] top-[6px] h-[88px] w-[150px] rounded-[13px] border border-white/80 bg-[#e0f7fc]/60 backdrop-blur-md shadow-[0_10px_20px_rgba(21,182,232,0.18)] [transform:translate3d(0,0,-20px)_rotate(-2deg)]" />
      
      {/* Main Glass Frame with Service Image */}
      <div className="absolute left-0 top-0 h-[98px] w-[164px] overflow-hidden rounded-[13px] border border-white/90 bg-white/95 shadow-[0_14px_28px_rgba(21,182,232,0.22),_0_2px_8px_rgba(10,15,20,0.08)] [transform:translateZ(10px)] flex items-center justify-center p-0.5">
        {imageSrc ? (
          <div className="relative w-full h-full rounded-[10px] overflow-hidden flex items-center justify-center bg-gradient-to-br from-white to-[#f0fafd]">
            <Image
              src={imageSrc}
              alt={id}
              width={200}
              height={120}
              className="object-contain w-full h-full max-h-[94px] max-w-[160px] scale-105 transition-transform duration-500 group-hover:scale-110 filter drop-shadow-[0_6px_14px_rgba(21,182,232,0.25)]"
            />
          </div>
        ) : (
          <div className="w-full h-full rounded-[10px] bg-gradient-to-br from-white to-[#e0f7fc] flex items-center justify-center">
            <span className="text-xs font-bold text-[#15b6e8]">HyperHex 3D</span>
          </div>
        )}
      </div>
    </div>
  );
};

const ServiceCard = ({ data, style, className = "", isFocused = true }: ServiceCardProps) => {
  return (
    <div className={`group relative h-[360px] w-[300px] [perspective:1400px] ${className}`} style={style}>
      <div className="group relative h-[360px] w-[300px] [perspective:1400px]">
        {/* ULTRA-GLASSMORPHISM CARD SURFACE */}
        <div
          className="
            relative
            flex
            h-full
            w-full
            flex-col
            justify-between
            overflow-hidden
            rounded-3xl
            p-[24px]
            antialiased
            [backface-visibility:hidden]
            [WebkitBackfaceVisibility:hidden]
            [transform-style:preserve-3d]
            transition-all
            duration-700
            ease-out
          "
          style={{
            background: "linear-gradient(135deg, rgba(255, 255, 255, 0.94) 0%, rgba(240, 252, 255, 0.82) 100%)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(255, 255, 255, 0.9)",
            boxShadow:
              "inset 0 1px 2px rgba(255, 255, 255, 1), 0 20px 40px -12px rgba(21, 182, 232, 0.16), 0 2px 6px rgba(10, 15, 20, 0.04)",
          }}
        >
          {/* BACKGROUND ATMOSPHERE */}
          <div
            className="
              pointer-events-none
              absolute
              inset-0
              bg-[
                radial-gradient(
                  circle_at_72%_16%,
                  rgba(21,182,232,0.10),
                  rgba(21,182,232,0.01)_35%,
                  transparent_60%
                )
              ]
            "
          />

          {/* 3D RADIAL CIRCLE SYSTEM */}
          <div
            className="
              pointer-events-none
              absolute
              right-[-10px]
              top-[-10px]
              h-[150px]
              w-[150px]
              [perspective:1000px]
              [transform-style:preserve-3d]
            "
          >
            {/* DECORATIVE SUB-CIRCLES (ONLY MOUNT ON MAIN FOCUS) */}
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
                  className="absolute inset-0 [transform-style:preserve-3d]"
                >
                  {/* DECORATIVE CIRCLE 1 */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.2 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.2 }}
                    transition={{ duration: 0.3, delay: 0.04 }}
                    className="
                      absolute
                      right-0
                      top-0
                      h-[140px]
                      w-[140px]
                      rounded-full
                      bg-[#15b6e8]/[0.05]
                      border
                      border-white/60
                      shadow-[0_8px_20px_rgba(15,23,42,0.08),_inset_0_2px_6px_rgba(255,255,255,0.9)]
                      [transform:translate3d(0,0,-40px)]
                      [transform-style:preserve-3d]
                      transition-all
                      duration-700
                      ease-out
                      group-hover:[transform:translate3d(0,0,-20px)]
                    "
                  />

                  {/* DECORATIVE CIRCLE 2 */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.2 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.2 }}
                    transition={{ duration: 0.3, delay: 0.08 }}
                    className="
                      absolute
                      right-[15px]
                      top-[15px]
                      h-[105px]
                      w-[105px]
                      rounded-full
                      bg-[#15b6e8]/[0.10]
                      border
                      border-white/70
                      shadow-[0_10px_24px_rgba(15,23,42,0.11),_inset_0_2px_8px_rgba(255,255,255,0.95)]
                      [transform:translate3d(0,0,0px)]
                      [transform-style:preserve-3d]
                      transition-all
                      duration-700
                      ease-out
                      group-hover:[transform:translate3d(0,0,25px)]
                    "
                  />

                  {/* DECORATIVE CIRCLE 3 */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.2 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.2 }}
                    transition={{ duration: 0.3, delay: 0.12 }}
                    className="
                      absolute
                      right-[32px]
                      top-[32px]
                      h-[72px]
                      w-[72px]
                      rounded-full
                      bg-[#15b6e8]/[0.18]
                      border
                      border-white/80
                      shadow-[0_12px_28px_rgba(15,23,42,0.14),_inset_0_2px_10px_rgba(255,255,255,1)]
                      [transform:translate3d(0,0,35px)]
                      [transform-style:preserve-3d]
                      transition-all
                      duration-700
                      ease-out
                      group-hover:[transform:translate3d(0,0,65px)]
                    "
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* MAIN HERO CIRCLE WITH DYNAMIC ICON (ALWAYS VISIBLE ON ALL CARDS) */}
            <div
              className="
                absolute
                right-[44px]
                top-[44px]
                flex
                h-[46px]
                w-[46px]
                items-center
                justify-center
                rounded-full
                bg-[#15b6e8]
                shadow-[0_10px_28px_rgba(21,182,232,0.4)]
                [transform:translate3d(0,0,70px)]
                [transform-style:preserve-3d]
                transition-all
                duration-700
                ease-out
                group-hover:[transform:translate3d(0,0,105px)]
                group-hover:scale-105
              "
            >
              {data.id === 'architecture-visualization' ? (
                <svg viewBox="0 0 24 24" className="h-[20px] w-[20px] fill-none stroke-white stroke-[2]">
                  <path d="M21.5 12a9.5 9.5 0 1 1-19 0 9.5 9.5 0 0 1 19 0Z" />
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1 4-10Z" />
                </svg>
              ) : data.id === 'interactive-web-experiences' || data.id === 'web-development' ? (
                <svg viewBox="0 0 24 24" className="h-[20px] w-[20px] fill-none stroke-white stroke-[2.2]">
                  <path d="m16 18 6-6-6-6M8 6l-6 6 6 6" />
                </svg>
              ) : data.id === 'marketing-sales' ? (
                <svg viewBox="0 0 24 24" className="h-[20px] w-[20px] fill-none stroke-white stroke-[2.2]">
                  <path d="M4 17l5-5 3 3 6-7 4 4" />
                  <path d="M18 8h4v4" />
                </svg>
              ) : data.id === '3d-animation' ? (
                <svg viewBox="0 0 24 24" className="h-[20px] w-[20px] fill-white stroke-none">
                  <polygon points="6 3 20 12 6 21 6 3" />
                </svg>
              ) : data.id === 'interactive-real-time' ? (
                <svg viewBox="0 0 24 24" className="h-[20px] w-[20px] fill-none stroke-white stroke-[2]">
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" className="h-[20px] w-[20px] fill-none stroke-white stroke-[2]">
                  <path d="m12 3 8 4.5v9L12 21l-8-4.5v-9L12 3z" />
                  <path d="m12 12 8-4.5M12 12v9M12 12 4 7.5" />
                </svg>
              )}
            </div>
          </div>

          {/* HEADER SECTION */}
          <div className="z-20 [transform:translateZ(35px)]">
            <div className="mb-[8px] text-[12px] font-bold tracking-[0.08em] text-[#15b6e8]">
              {data.counter}
            </div>

            <h2 className="max-w-[190px] text-[24px] font-bold leading-[1.12] tracking-[-0.03em] text-[#161d1e]">
              {data.title}
            </h2>

            <p className="mt-[8px] max-w-[190px] text-[13px] font-normal leading-[1.4] text-[#3b494c]">
              {data.description}
            </p>
          </div>

          {/* CENTER SECTION (3D REAL IMAGE FRAME) */}
          <div className="z-20 flex justify-end [transform-style:preserve-3d]">
            <RenderCardArtwork id={data.id} imageSrc={data.imageSrc} />
          </div>

          {/* FOOTER SECTION */}
          <div
            className="
              z-30
              flex
              items-center
              justify-between
              [transform:translateZ(45px)]
            "
          >
            {/* Social icons */}
            <div className="flex items-center gap-[10px]">
              <button
                aria-label="Instagram"
                className="
                  group/btn
                  flex
                  h-[28px]
                  w-[28px]
                  items-center
                  justify-center
                  rounded-full
                  bg-white
                  shadow-[rgba(5,71,17,0.12)_0px_3px_8px]
                  transition-all
                  duration-300
                  hover:-translate-y-0.5
                  hover:bg-[#161d1e]
                "
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-[13px] w-[13px] fill-[#161d1e] transition-colors duration-300 group-hover/btn:fill-white"
                >
                  <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7Zm5 3.5A4.5 4.5 0 1 1 7.5 12 4.5 4.5 0 0 1 12 7.5Zm0 2A2.5 2.5 0 1 0 14.5 12 2.5 2.5 0 0 0 12 9.5ZM17.5 6a1.25 1.25 0 1 1-1.25 1.25A1.25 1.25 0 0 1 17.5 6Z" />
                </svg>
              </button>

              <button
                aria-label="Twitter"
                className="
                  group/btn
                  flex
                  h-[28px]
                  w-[28px]
                  items-center
                  justify-center
                  rounded-full
                  bg-white
                  shadow-[rgba(5,71,17,0.12)_0px_3px_8px]
                  transition-all
                  duration-300
                  hover:-translate-y-0.5
                  hover:bg-[#161d1e]
                "
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-[12px] w-[12px] fill-[#161d1e] transition-colors duration-300 group-hover/btn:fill-white"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26L22.827 21.75h-6.72l-5.26-6.876-6.018 6.876H1.52l7.73-8.835L1.172 2.25H8.06l4.753 6.287L18.244 2.25Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z" />
                </svg>
              </button>

              <button
                aria-label="Discord"
                className="
                  group/btn
                  flex
                  h-[28px]
                  w-[28px]
                  items-center
                  justify-center
                  rounded-full
                  bg-white
                  shadow-[rgba(5,71,17,0.12)_0px_3px_8px]
                  transition-all
                  duration-300
                  hover:-translate-y-0.5
                  hover:bg-[#161d1e]
                "
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-[14px] w-[14px] fill-[#161d1e] transition-colors duration-300 group-hover/btn:fill-white"
                >
                  <path d="M19.54 5.25A16.5 16.5 0 0 0 15.6 4l-.48.97a14.2 14.2 0 0 0-6.24 0L8.4 4a16.5 16.5 0 0 0-3.94 1.25C2 8.7 1.3 12.06 1.65 15.37a16.6 16.6 0 0 0 5.05 2.55l1.23-1.69c-.68-.25-1.32-.56-1.92-.91l.47-.36c3.7 1.74 7.7 1.74 11.36 0l.48.36c-.6.35-1.25.66-1.93.91l1.23 1.69a16.6 16.6 0 0 0 5.05-2.55c.41-3.84-.69-7.17-3.13-10.12ZM8.48 14.04c-1.1 0-2-.99-2-2.21s.88-2.21 2-2.21c1.13 0 2.02.99 2 2.21 0 1.22-.88 2.21-2 2.21Zm7.04 0c-1.1 0-2-.99-2-2.21s.88-2.21 2-2.21c1.13 0 2.02.99 2 2.21s-.88 2.21-2 2.21Z" />
                </svg>
              </button>
            </div>

            {/* View more */}
            <button
              className="
                flex
                items-center
                gap-[8px]
                text-[12px]
                font-semibold
                text-[#161d1e]
                transition-all
                duration-300
                hover:translate-x-1
                hover:text-[#15b6e8]
              "
            >
              View more
              <svg
                viewBox="0 0 24 24"
                className="h-[14px] w-[14px] fill-none stroke-current stroke-[2.5]"
              >
                <path d="m7 10 5 5 5-5" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
