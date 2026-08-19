'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

interface Button3DProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  type?: 'button' | 'submit';
  className?: string;
  showDot?: boolean;
  arrowDirection?: 'up-right' | 'down';
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
  const buttonClasses = `inline-flex items-center gap-2 2xl:gap-3 py-1.5 pr-2 pl-4 2xl:py-2.5 2xl:pr-3 2xl:pl-6 rounded-full font-[family-name:var(--font-dm-sans)] text-xs 2xl:text-sm font-bold uppercase tracking-wide transition-all shadow-[inset_0_2px_4px_rgba(0,0,0,0.15),0_1px_0_rgba(255,255,255,0.15),0_4px_10px_rgba(0,0,0,0.25)] border-b-2 border-r-[1px] border-black/10 border border-white/10 ${className}`;

  const buttonStyle = {
    backgroundColor: 'var(--color-accent)',
    color: 'var(--color-paper)',
  };

  const buttonContent = (
    <>
      {showDot && <span className="w-1.5 h-1.5 2xl:w-2 2xl:h-2 rounded-full bg-white"></span>}
      {children}
      <div className="h-7 w-7 2xl:h-9 2xl:w-9 shadow-xs shadow-white/10 rounded-full bg-white flex items-center justify-center shadow-[inset_0_1px_2px_rgba(0,0,0,0.15),0_1px_2px_rgba(0,0,0,0.15)]">
        <span className="text-black text-sm font-bold leading-none">
        <svg className="w-3 h-3 2xl:w-4 2xl:h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
          <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
          <g id="SVGRepo_iconCarrier">
            {arrowDirection === 'up-right' ? (
              <path d="M7 17L17 7M17 7H8M17 7V16" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
            ) : (
              <path d="M12 5V19M12 19L5 12M12 19L19 12" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
            )}
          </g>
        </svg>
        </span>
      </div>
    </>
  );

  if (href) {
    return (
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="inline-block">
        <Link href={href} className={buttonClasses} style={buttonStyle}>
          {buttonContent}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={buttonClasses}
      style={buttonStyle}
      onClick={onClick}
      type={type}
    >
      {buttonContent}
    </motion.button>
  );
}