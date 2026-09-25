import React from 'react';
import Image from 'next/image';

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[99999] flex flex-col justify-between overflow-hidden bg-[#0a0a0a] text-white select-none pointer-events-auto shadow-[0_25px_60px_rgba(0,0,0,0.8)]">
      {/* Subtle background gradient glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(21,182,232,0.14)_0%,transparent_70%)]" />

      {/* 1. Centered Branding: Logo + High-Impact Typography */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none p-6 text-center">
        <div className="relative mb-6 flex h-24 w-24 sm:h-28 sm:w-28 items-center justify-center overflow-hidden rounded-full border border-white/20 bg-[#0d0f12] p-2.5 shadow-[0_0_40px_rgba(21,182,232,0.4)]">
          <Image
            src="/logo/hyperhex-logo-H.avif"
            alt="HyperHex Logo"
            width={96}
            height={96}
            priority
            className="object-cover rounded-full"
          />
        </div>

        <h1 className="text-4xl sm:text-6xl 2xl:text-7xl font-black uppercase tracking-tight text-white font-[family-name:var(--font-dm-sans)] drop-shadow-md">
          Hyper<span className="text-[#15b6e8]">Hex</span>
        </h1>
        <p className="mt-2 text-xs sm:text-sm font-bold uppercase tracking-[0.3em] text-[#15b6e8]/80">
          Studio
        </p>
      </div>

      {/* 2. Bottom-Right Progress Widget */}
      <div className="absolute bottom-8 right-8 sm:bottom-12 sm:right-12 z-20 flex flex-col items-end gap-3 pointer-events-none">
        <div className="flex items-baseline font-black font-[family-name:var(--font-dm-sans)] text-5xl sm:text-7xl text-white tracking-tighter drop-shadow-lg">
          <span>99</span>
          <span className="text-2xl sm:text-4xl text-[#15b6e8] ml-1">%</span>
        </div>

        <div className="h-2 w-48 sm:w-64 rounded-full bg-white/10 overflow-hidden border border-white/20 p-[1px] shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)]">
          <div className="h-full w-[99%] rounded-full bg-gradient-to-r from-[#15b6e8] via-[#00daf3] to-[#0c86ac] shadow-[0_0_12px_#15b6e8] animate-pulse" />
        </div>
      </div>
    </div>
  );
}
