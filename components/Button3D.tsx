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
  const buttonClasses = `inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-[family-name:var(--font-dm-sans)] text-xs font-bold uppercase tracking-wide transition-all shadow-[inset_0_2px_4px_rgba(0,0,0,0.2),0_1px_0_rgba(255,255,255,0.1),0_4px_12px_rgba(21,182,232,0.4)] border-b-2 border-r-2 border-[#0c86ac] border border-white/10 ${className}`;

  const buttonStyle = {
    backgroundColor: 'var(--color-accent)',
    color: 'var(--color-paper)',
  };

  const buttonContent = (
    <>
      {showDot && <span className="w-1.5 h-1.5 rounded-full bg-white"></span>}
      {children}
      <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center shadow-[inset_0_2px_4px_rgba(0,0,0,0.2),0_2px_4px_rgba(0,0,0,0.3)]">
        <span className="text-black text-xs font-bold transform -rotate-45">→</span>
      </div>
    </>
  );

  if (href) {
    return (
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
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
