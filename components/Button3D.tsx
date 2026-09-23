'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState, type ReactNode } from 'react';

const ARROW_PATHS = {
  'up-right': 'M7 17L17 7M17 7H8M17 7V16',
  down: 'M12 5V19M12 19L5 12M12 19L19 12',
  up: 'M12 19V5M12 5L5 12M12 5L19 12',
} as const;

interface Button3DProps {
  children: ReactNode;
  href?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  type?: 'button' | 'submit';
  className?: string;
  showDot?: boolean;
  arrowDirection?: keyof typeof ARROW_PATHS;
  disabled?: boolean;
  loading?: boolean;
  variant?: 'primary' | 'secondary' | 'gray';
}

export default function Button3D({
  children,
  href,
  onClick,
  type = 'button',
  className = '',
  showDot = true,
  arrowDirection = 'up-right',
  disabled = false,
  loading = false,
  variant = 'primary',
}: Button3DProps) {
  const [isHovered, setIsHovered] = useState(false);

  const isDisabled = disabled || loading;
  const isGray = variant === 'secondary' || variant === 'gray';

  const buttonClasses = `group relative inline-flex items-center gap-3 rounded-[100px] py-1.5 pl-4 pr-1.5 2xl:py-2.5 2xl:pl-6 2xl:pr-2.5 outline-none transition-opacity ${
    loading
      ? 'cursor-wait opacity-80 pointer-events-none'
      : isDisabled
      ? 'cursor-not-allowed opacity-60 pointer-events-none'
      : 'cursor-pointer'
  } ${className}`;

  const arrowIcon = (
    <svg
      className="w-3 h-3 2xl:w-4 2xl:h-4"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d={ARROW_PATHS[arrowDirection]}
        stroke={isGray ? '#15b6e8' : 'black'}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  const spinnerIcon = (
    <svg
      className="w-3.5 h-3.5 2xl:w-4 2xl:h-4 animate-spin text-[#15b6e8]"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="3"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );

  const labelContent = (
    <span
      className={`flex items-center gap-2 2xl:gap-3 font-[family-name:var(--font-dm-sans)] text-xs 2xl:text-sm font-bold uppercase tracking-wide ${
        isGray ? 'text-[#161d1e]' : 'text-white'
      }`}
    >
      {showDot && !loading && (
        <span
          className="h-1.5 w-1.5 shrink-0 rounded-[100px] 2xl:h-2 2xl:w-2 shadow-[0_0_6px_#15b6e8]"
          style={{ backgroundColor: isGray ? '#15b6e8' : 'rgb(255, 255, 255)' }}
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
          background: isGray
            ? 'linear-gradient(180deg, #ffffff 0%, #cbd5e1 100%)'
            : 'linear-gradient(180deg, #6cdcfb 0%, #0d8ec4 100%)',
          opacity: 1,
        }}
      />

      {/* 2. Main BG (Pillowy top inner-shadow) */}
      <div
        className="absolute inset-[1px] z-0 rounded-[100px]"
        style={{
          backgroundColor: isGray ? 'rgb(244, 244, 245)' : '#15b6e8',
          boxShadow: isGray
            ? 'rgba(255, 255, 255, 0.9) 0px 4px 6px 0px inset, rgba(0, 0, 0, 0.06) 0px -2px 0px 0px inset'
            : 'rgba(255, 255, 255, 0.4) 0px 4px 6px 0px inset',
          opacity: 1,
        }}
      />

      {/* --- CONTENT LAYERS --- */}
      <div className="relative z-10 flex w-full items-center justify-between gap-3 2xl:gap-4">
        <motion.div className="relative overflow-hidden py-0.5" style={{ willChange: 'transform' }}>
          <motion.div
            animate={{ y: isHovered && !isDisabled ? '-100%' : 0 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="flex items-center"
          >
            {labelContent}
          </motion.div>
          <motion.div
            animate={{ y: isHovered && !isDisabled ? '-100%' : 0 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="absolute left-0 top-full flex h-full w-full items-center"
          >
            {labelContent}
          </motion.div>
        </motion.div>

        {/* Icon Puck */}
        <div
          className="relative flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-[100px] text-[#15b6e8] 2xl:h-10 2xl:w-10"
          style={{
            backgroundColor: 'rgb(255, 255, 255)',
            boxShadow: 'rgba(0, 0, 0, 0.1) 0px 3px 6px 0px',
            opacity: 1,
            willChange: 'transform',
          }}
        >
          {loading ? (
            spinnerIcon
          ) : (
            <>
              <motion.div
                animate={{ x: isHovered && !isDisabled ? '-100%' : 0 }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
                className="flex h-full w-full items-center justify-center"
              >
                {arrowIcon}
              </motion.div>
              <motion.div
                animate={{ x: isHovered && !isDisabled ? '-100%' : 0 }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
                className="absolute left-full top-0 flex h-full w-full items-center justify-center"
              >
                {arrowIcon}
              </motion.div>
            </>
          )}
        </div>
      </div>
    </>
  );

  if (href && !isDisabled) {
    return (
      <motion.div
        whileTap={{ scale: 0.95 }}
        className="inline-block"
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        <Link href={href} className={buttonClasses}>
          {buttonContent}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.button
      whileTap={isDisabled ? undefined : { scale: 0.95 }}
      className={buttonClasses}
      onClick={isDisabled ? undefined : onClick}
      type={type}
      disabled={isDisabled}
      onHoverStart={() => !isDisabled && setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {buttonContent}
    </motion.button>
  );
}