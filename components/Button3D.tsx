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
}

export default function Button3D({
  children,
  href,
  onClick,
  type = 'button',
  className = '',
  showDot = true,
}: Button3DProps) {
  const buttonClasses = `inline-flex items-center gap-2 py-1.5 pr-2 pl-4 rounded-full font-[family-name:var(--font-dm-sans)] text-xs font-bold uppercase tracking-wide transition-all shadow-[inset_0_2px_4px_rgba(0,0,0,0.15),0_1px_0_rgba(255,255,255,0.15),0_4px_10px_rgba(0,0,0,0.25)] border-b-2 border-r-[1px] border-black/10 border border-white/10 ${className}`;

  const buttonStyle = {
    backgroundColor: 'var(--color-accent)',
    color: 'var(--color-paper)',
  };

  const buttonContent = (
    <>
      {showDot && <span className="w-1.5 h-1.5 rounded-full bg-white"></span>}
      {children}
      <div className="h-7 w-7 shadow-xs shadow-white/10 rounded-full bg-white flex items-center justify-center shadow-[inset_0_1px_2px_rgba(0,0,0,0.15),0_1px_2px_rgba(0,0,0,0.15)]">
        <span className="text-black text-sm font-bold leading-none">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M7 17L17 7M17 7H8M17 7V16" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
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