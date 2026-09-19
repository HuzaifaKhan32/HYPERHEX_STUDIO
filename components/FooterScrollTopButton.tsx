'use client';

// Client wrapper for scroll-to-top button
import { motion, Variants } from 'framer-motion';
import Button3D from './Button3D';

const buttonPopVariants: Variants = {
  hidden: { opacity: 0, scale: 0, y: 15 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 150,
      damping: 14,
      mass: 1,
    },
  },
};

export default function FooterScrollTopButton() {
  return (
    <motion.div
      variants={buttonPopVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
      style={{ transformOrigin: 'center center' }}
    >
      <Button3D
        arrowDirection="up"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        Back to Top
      </Button3D>
    </motion.div>
  );
}
