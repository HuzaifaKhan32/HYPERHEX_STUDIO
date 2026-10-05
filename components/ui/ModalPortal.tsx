'use client';

import React, { useEffect, useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';

interface ModalPortalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  ariaLabel?: string;
}

export default function ModalPortal({
  isOpen,
  onClose,
  children,
  ariaLabel,
}: ModalPortalProps) {
  const [mounted, setMounted] = useState(false);
  const triggerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Track active trigger element and manage focus return
  useEffect(() => {
    if (isOpen) {
      triggerRef.current = document.activeElement as HTMLElement | null;
    } else if (triggerRef.current) {
      triggerRef.current.focus();
      triggerRef.current = null;
    }
  }, [isOpen]);

  // Lock body scroll and pause/resume Lenis
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const lenis = (window as { lenis?: { stop: () => void; start: () => void } }).lenis;
    if (lenis && typeof lenis.stop === 'function') {
      lenis.stop();
    }

    return () => {
      document.body.style.overflow = originalOverflow;
      if (lenis && typeof lenis.start === 'function') {
        lenis.start();
      }
    };
  }, [isOpen]);

  // Handle Escape key to close modal
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="modal-portal-wrapper"
          role="dialog"
          aria-modal="true"
          aria-label={ariaLabel}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10"
          data-lenis-prevent
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
