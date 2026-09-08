'use client';

// Animated brand card reveal
import { motion } from 'framer-motion';
import Image from 'next/image';

const reveal = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] },
  },
};

export default function FooterBrandCard() {
  return (
    <motion.div
      variants={reveal}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      className="flex max-w-xs flex-col gap-6"
    >
      <motion.div
        whileHover={{ scale: 1.03, rotate: -1 }}
        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        className="aspect-[1.79] w-full max-w-[280px] overflow-hidden rounded-[24px] border border-white/10 bg-zinc-900/50 shadow-lg backdrop-blur-sm"
      >
        <div className="relative h-full w-full">
          <Image
            src="/images/image-3.jpg"
            alt="HyperHex Studio Visual"
            fill
            sizes="(max-width: 768px) 280px, 280px"
            quality={90}
            className="object-cover"
          />
        </div>
      </motion.div>

      <div className="flex flex-col items-center gap-2">
        <div className="flex items-center gap-3">
          <div
            className="h-2 w-2 rounded-full shadow-[0_0_12px_rgba(21,182,232,0.6)]"
            style={{ backgroundColor: '#15b6e8' }}
          />
          <span className="text-sm font-medium tracking-wide text-zinc-400">
            Stay connected
          </span>
        </div>
        <motion.a
          href="mailto:info@hyperhex.studio"
          className="font-bold text-[clamp(18px,1.5vw,24px)]"
          style={{ color: '#F4F4F5' }}
          whileHover={{ y: -2, color: '#15b6e8' }}
          transition={{ duration: 0.3 }}
        >
          info@hyperhex.studio
        </motion.a>
      </div>
    </motion.div>
  );
}
