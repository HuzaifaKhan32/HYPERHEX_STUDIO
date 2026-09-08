'use client';

// Animated footer link with hover effects
import { motion } from 'framer-motion';

const reveal = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] },
  },
};

export default function FooterLink({ href, children }: { href: string; children: string }) {
  return (
    <motion.li variants={reveal}>
      <motion.a
        href={href}
        onClick={(e) => {
          if (href.startsWith('#')) {
            e.preventDefault();
            const targetId = href === '#' ? 'home' : href.substring(1);
            if (targetId === 'home') {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
              const elem = document.getElementById(targetId);
              if (elem) {
                elem.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }
            }
          }
        }}
        className="inline-block font-semibold drop-shadow-[0_1px_3px_rgba(10,10,10,0.4)] text-[clamp(14px,1.1vw,17px)] whitespace-nowrap"
        style={{ color: '#F4F4F5' }}
        whileHover={{ x: 6, color: '#15b6e8' }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      >
        {children}
      </motion.a>
    </motion.li>
  );
}
