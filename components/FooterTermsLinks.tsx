'use client';

// Animated terms links
import { motion } from 'framer-motion';

export default function FooterTermsLinks() {
  return (
    <div className="flex gap-8 text-sm font-medium">
      {['Terms of Use', 'Privacy Policy'].map((label) => (
        <motion.a
          key={label}
          href="#"
          className="text-sm font-medium text-zinc-400"
          whileHover={{ y: -2, color: '#15b6e8' }}
          transition={{ duration: 0.25 }}
        >
          {label}
        </motion.a>
      ))}
    </div>
  );
}
