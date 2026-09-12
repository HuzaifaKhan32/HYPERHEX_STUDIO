'use client';

// Interactive title with mouse-tracking glow effect
import { useState, useRef, useCallback } from 'react';

export default function FooterInteractiveTitle() {
  const [isHoveringText, setIsHoveringText] = useState(false);
  const glowRef = useRef<HTMLDivElement>(null);

  const handleTextMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (glowRef.current) {
      glowRef.current.style.left = `${x - 175}px`;
      glowRef.current.style.top = `${y - 175}px`;
    }
  }, []);

  return (
    <div className="relative z-10 mx-auto flex w-full max-w-[1400px] flex-col items-center justify-center select-none overflow-visible">
      <div
        className="pointer-events-auto relative flex w-full flex-col items-center cursor-pointer overflow-hidden sm:overflow-visible"
        onMouseEnter={() => setIsHoveringText(true)}
        onMouseLeave={() => setIsHoveringText(false)}
        onMouseMove={handleTextMouseMove}
      >
        {/* Glow - hidden on mobile screens */}
        <div
          ref={glowRef}
          aria-hidden="true"
          className="pointer-events-none absolute hidden md:block"
          style={{
            width: '350px',
            height: '350px',
            left: '-175px',
            top: '-175px',
            background:
              'radial-gradient(circle, rgba(21, 182, 232, 0.35) 0%, rgba(21, 182, 232, 0.15) 30%, transparent 70%)',
            filter: 'blur(20px)',
            zIndex: 0,
            opacity: isHoveringText ? 1 : 0,
            transition: 'opacity 0.3s ease',
          }}
        />

        <div className="relative z-10 flex w-full flex-col items-center px-4">
          <h1
            className="w-full text-center font-black uppercase tracking-[0.01em] whitespace-nowrap font-extrabold"
            style={{
              fontFamily: 'sans-serif',
              fontSize: 'clamp(28px, 11.5vw, 175px)',
              lineHeight: 0.85,
              color: '#F4F4F5',
            }}
          >
            HYPERHEX
          </h1>
          <div className="flex w-full justify-center">
            <h2
              className="font-bold uppercase tracking-[-0.01em] whitespace-nowrap mt-2 sm:mt-3"
              style={{
                fontFamily: 'sans-serif',
                fontSize: 'clamp(16px, 6vw, 90px)',
                lineHeight: 0.85,
                color: '#F4F4F5',
              }}
            >
              STUDIOS
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}
