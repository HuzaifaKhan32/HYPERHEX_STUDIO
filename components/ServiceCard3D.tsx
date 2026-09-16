'use client';

import React from 'react';
import Image from 'next/image';
import type { ServiceData } from '@/lib/services-carousel-data';

interface ServiceCard3DProps {
  service: ServiceData;
  isActive: boolean;
  isHovering: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onClick: () => void;
  style?: React.CSSProperties;
}

export default function ServiceCard3D({
  service,
  isActive,
  isHovering,
  onMouseEnter,
  onMouseLeave,
  onClick,
  style,
}: ServiceCard3DProps) {
  return (
    <div
      className="service-card-3d cursor-pointer"
      style={{
        ...style,
        transition: 'all 600ms cubic-bezier(0.34, 1.56, 0.64, 1)',
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
    >
      {/* Outer Card Container - Portrait/Square */}
      <div
        className="relative w-full aspect-[9/11] rounded-[2.5rem] bg-white overflow-hidden"
        style={{
          border: '1px solid rgba(186, 201, 204, 0.2)',
          boxShadow: isActive && isHovering
            ? '0 24px 64px rgba(22, 29, 30, 0.1), 0 8px 24px rgba(22, 29, 30, 0.05)'
            : isActive
            ? '0 20px 56px rgba(22, 29, 30, 0.09), 0 6px 20px rgba(22, 29, 30, 0.045)'
            : '0 16px 48px rgba(22, 29, 30, 0.08), 0 4px 16px rgba(22, 29, 30, 0.04)',
          transition: 'box-shadow 500ms ease-out',
        }}
      >
        {/* Service Number - Top Left */}
        <div className="absolute top-6 left-6 z-30">
          <span
            className="text-[9px] font-bold tracking-[0.2em] uppercase"
            style={{ color: '#9a9fa5' }}
          >
            {service.number}
          </span>
        </div>

        {/* Inner Layered Surface - Subtle Cyan */}
        <div
          className="absolute inset-4 rounded-[2rem] overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, rgba(244, 250, 253, 0.6) 0%, rgba(232, 239, 241, 0.4) 100%)',
            border: '1px solid rgba(21, 182, 232, 0.08)',
            transition: 'all 700ms ease-out',
          }}
        >
          {/* Layered 3D Radial System - Top Right Origin */}
          <div
            className="absolute -top-32 -right-32 w-[600px] h-[600px] pointer-events-none"
            style={{
              perspective: '1200px',
              transformStyle: 'preserve-3d',
            }}
          >
            {/* Radial Depth Layers - Actual 3D Surfaces */}
            {[
              { size: 520, depth: -40, opacity: 0.15, color: 'rgba(244, 250, 253, 0.4)', shadow: '0 8px 32px rgba(21, 182, 232, 0.05)' },
              { size: 420, depth: -32, opacity: 0.2, color: 'rgba(232, 239, 241, 0.5)', shadow: '0 6px 24px rgba(21, 182, 232, 0.06)' },
              { size: 320, depth: -24, opacity: 0.25, color: 'rgba(21, 182, 232, 0.08)', shadow: '0 5px 20px rgba(21, 182, 232, 0.08)' },
              { size: 230, depth: -16, opacity: 0.3, color: 'rgba(21, 182, 232, 0.12)', shadow: '0 4px 16px rgba(21, 182, 232, 0.1)' },
              { size: 150, depth: -8, opacity: 0.35, color: 'rgba(21, 182, 232, 0.15)', shadow: '0 3px 12px rgba(21, 182, 232, 0.12)' },
              { size: 80, depth: 0, opacity: 0.4, color: 'rgba(21, 182, 232, 0.2)', shadow: '0 2px 8px rgba(21, 182, 232, 0.15)' },
            ].map((layer, idx) => (
              <div
                key={idx}
                className="absolute top-1/2 left-1/2 rounded-full"
                style={{
                  width: `${layer.size}px`,
                  height: `${layer.size}px`,
                  marginLeft: `-${layer.size / 2}px`,
                  marginTop: `-${layer.size / 2}px`,
                  backgroundColor: layer.color,
                  border: '1px solid rgba(21, 182, 232, 0.15)',
                  backdropFilter: 'blur(1px)',
                  boxShadow: layer.shadow,
                  transform: isActive && isHovering
                    ? `translate3d(0, 0, ${layer.depth - 4}px) scale(${1 + idx * 0.02})`
                    : `translate3d(0, 0, ${layer.depth}px)`,
                  transformStyle: 'preserve-3d',
                  opacity: isActive ? layer.opacity : layer.opacity * 0.7,
                  transition: 'all 1000ms cubic-bezier(0.34, 1.56, 0.64, 1)',
                }}
              />
            ))}

            {/* Focal Center Indicator - Smallest Layer */}
            <div
              className="absolute top-1/2 left-1/2 w-11 h-11 rounded-full flex items-center justify-center z-30"
              style={{
                marginLeft: '-22px',
                marginTop: '-22px',
                background: 'radial-gradient(circle at 30% 30%, rgba(21, 182, 232, 0.35), rgba(21, 182, 232, 0.15))',
                border: '1px solid rgba(21, 182, 232, 0.4)',
                backdropFilter: 'blur(4px)',
                boxShadow: '0 4px 16px rgba(21, 182, 232, 0.2), inset 0 1px 2px rgba(255, 255, 255, 0.5)',
                transform: isActive && isHovering ? 'translate3d(0, 0, 8px) scale(1.1)' : 'translate3d(0, 0, 4px)',
                transformStyle: 'preserve-3d',
                transition: 'all 500ms ease-out',
              }}
            >
              <div
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: '#15b6e8', boxShadow: '0 0 8px rgba(21, 182, 232, 0.6)' }}
              />
            </div>
          </div>

          {/* Ambient Cyan Atmosphere */}
          <div
            className="absolute inset-0 rounded-[2rem] pointer-events-none"
            style={{
              background: 'radial-gradient(circle at 50% 60%, rgba(21, 182, 232, 0.12) 0%, transparent 65%)',
              opacity: isActive ? 0.3 : 0.15,
              transition: 'opacity 700ms ease-out',
            }}
          />

          {/* Content Layer */}
          <div className="relative w-full h-full flex flex-col justify-between p-6 z-20">
            {/* Typography Section - Compact */}
            <div className="flex flex-col pt-4">
              <h2
                className="text-2xl font-black leading-[1.1] tracking-tight"
                style={{
                  fontFamily: 'var(--font-zalando-expanded, sans-serif)',
                  color: '#0a0a0a',
                }}
              >
                {service.title}
              </h2>
              <h3
                className="text-lg font-bold tracking-wide mt-0.5"
                style={{ color: '#15b6e8' }}
              >
                {service.subtitle}
              </h3>

              {/* Short Description */}
              <p
                className="text-[11px] leading-relaxed mt-3 max-w-[75%]"
                style={{ color: 'rgba(59, 73, 76, 0.7)' }}
              >
                {service.description}
              </p>
            </div>

            {/* Hero 3D Artwork - Center/Lower */}
            <div className="absolute inset-0 flex items-center justify-center pt-16">
              <div
                className="relative w-72 h-72"
                style={{
                  filter: 'drop-shadow(0 20px 40px rgba(21, 182, 232, 0.12)) drop-shadow(0 8px 20px rgba(22, 29, 30, 0.1))',
                  transform: isActive && isHovering ? 'scale(1.08) translateY(-8px)' : 'scale(1)',
                  transition: 'all 700ms cubic-bezier(0.34, 1.56, 0.64, 1)',
                }}
              >
                <Image
                  src={service.imagePath}
                  alt={service.imageAlt}
                  fill
                  className="object-contain"
                  priority
                />
              </div>

              {/* Contact Shadow */}
              <div
                className="absolute bottom-20 w-48 h-10 rounded-full"
                style={{
                  background: 'radial-gradient(ellipse at center, rgba(21, 182, 232, 0.15) 0%, transparent 70%)',
                  filter: isActive && isHovering ? 'blur(20px)' : 'blur(14px)',
                  transition: 'filter 700ms ease-out',
                }}
              />
            </div>

            {/* Bottom Controls - Interface Elements */}
            <div className="flex items-center justify-between z-30">
              {/* Learn More + Social */}
              <div className="flex items-center gap-3">
                <span
                  className="text-[10px] font-bold tracking-[0.18em] uppercase transition-colors duration-300"
                  style={{ color: isHovering ? '#15b6e8' : '#0a0a0a' }}
                >
                  Learn More
                </span>

                {/* Social Icons - Compact Circular */}
                <div className="flex items-center gap-1.5">
                  {[
                    <svg key="ig" viewBox="0 0 30 30" className="w-2.5 h-2.5" fill="#9a9fa5">
                      <path d="M 9.9980469 3 C 6.1390469 3 3 6.1419531 3 10.001953 L 3 20.001953 C 3 23.860953 6.1419531 27 10.001953 27 L 20.001953 27 C 23.860953 27 27 23.858047 27 19.998047 L 27 9.9980469 C 27 6.1390469 23.858047 3 19.998047 3 L 9.9980469 3 z M 22 7 C 22.552 7 23 7.448 23 8 C 23 8.552 22.552 9 22 9 C 21.448 9 21 8.552 21 8 C 21 7.448 21.448 7 22 7 z M 15 9 C 18.309 9 21 11.691 21 15 C 21 18.309 18.309 21 15 21 C 11.691 21 9 18.309 9 15 C 9 11.691 11.691 9 15 9 z M 15 11 A 4 4 0 0 0 11 15 A 4 4 0 0 0 15 19 A 4 4 0 0 0 19 15 A 4 4 0 0 0 15 11 z" />
                    </svg>,
                    <svg key="tw" viewBox="0 0 512 512" className="w-2.5 h-2.5" fill="#9a9fa5">
                      <path d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z" />
                    </svg>,
                    <svg key="ln" viewBox="0 0 24 24" className="w-2.5 h-2.5" fill="#9a9fa5">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>,
                  ].map((icon, idx) => (
                    <div
                      key={idx}
                      className="w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                      style={{
                        backgroundColor: 'rgba(255, 255, 255, 0.6)',
                        border: '1px solid rgba(186, 201, 204, 0.3)',
                      }}
                    >
                      {icon}
                    </div>
                  ))}
                </div>
              </div>

              {/* Arrow Button - Right Side */}
              <button
                className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 group"
                style={{
                  backgroundColor: '#ffffff',
                  border: '1px solid rgba(186, 201, 204, 0.3)',
                  boxShadow: '0 2px 8px rgba(22, 29, 30, 0.06)',
                }}
              >
                <svg
                  className="w-3.5 h-3.5 transition-all"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#0a0a0a"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m7 7 10 10M7 17l10-10" className="group-hover:stroke-[#15b6e8]" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
