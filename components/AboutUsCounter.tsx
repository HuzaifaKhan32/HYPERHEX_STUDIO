'use client';

// Animated counter that counts from -> to when in view
import { useEffect, useRef } from 'react';
import { useInView, animate } from 'framer-motion';

export default function AboutUsCounter({ from = 19, to = 120 }: { from?: number; to?: number }) {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(nodeRef, { once: true, margin: '-50px' });

  useEffect(() => {
    if (!isInView) return;

    const node = nodeRef.current;
    if (!node) return;

    const controls = animate(from, to, {
      duration: 1.8,
      ease: [0.16, 1, 0.3, 1],
      onUpdate(value) {
        node.textContent = Math.round(value).toString();
      },
    });

    return () => controls.stop();
  }, [isInView, from, to]);

  return <span ref={nodeRef}>{from}</span>;
}
