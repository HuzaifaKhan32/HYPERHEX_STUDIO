'use client';

import React, { useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import type { CaseStudy } from '@/lib/case-studies-data';

interface CaseStudyModalProps {
  caseStudy: CaseStudy | null;
  onClose: () => void;
}

export default function CaseStudyModal({ caseStudy, onClose }: CaseStudyModalProps) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (caseStudy) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [caseStudy, handleKeyDown]);

  return (
    <AnimatePresence>
      {caseStudy && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={caseStudy.title}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10"
        >
          {/* Backdrop overlay (GPU-accelerated opacity transition) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="absolute inset-0 bg-black/85 cursor-pointer"
            onClick={onClose}
          />

          {/* Modal Content Dialog (transform and opacity only - no heavy blur filter animations) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 10 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full max-w-4xl max-h-[85vh] flex flex-col"
          >
            <div className="bg-[#111617] rounded-2xl overflow-hidden shadow-2xl relative w-full flex flex-col border border-white/10">
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-50 text-white/80 hover:text-white bg-black/70 rounded-full p-2.5 border border-white/15 shadow-lg transition-transform hover:scale-110 active:scale-95 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                aria-label="Close modal"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              </button>

              {/* Media Player: Mounts YouTube iframe only when modal is open */}
              {caseStudy.isVideo ? (
                <div className="relative w-full aspect-video bg-black">
                  <iframe
                    src={caseStudy.embedUrl}
                    title={caseStudy.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    loading="lazy"
                    className="absolute inset-0 w-full h-full"
                    style={{ border: 'none' }}
                  />
                </div>
              ) : (
                <div className="relative w-full aspect-video overflow-hidden bg-black flex items-center justify-center">
                  <Image
                    src={caseStudy.thumbnail}
                    alt={caseStudy.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 896px"
                    className="object-contain"
                    priority
                  />
                </div>
              )}

              {/* Modal Details Footer */}
              <div className="p-5 md:p-6 bg-[#0e1314] border-t border-white/10 flex flex-col gap-1">
                <p className="text-xs uppercase tracking-[0.3em] font-bold text-[var(--color-accent)]">
                  {caseStudy.category}
                </p>
                <h2 className="text-xl md:text-2xl font-bold uppercase tracking-wide text-white">
                  {caseStudy.title}
                </h2>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
