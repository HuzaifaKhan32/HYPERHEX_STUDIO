'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';

const EASE = [0.4, 0, 0.2, 1] as const;

const reveal = {
  hidden: { opacity: 0, y: 48 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 1.1, delay, ease: EASE },
  }),
};

const navLinks = [
  { label: 'Home', href: '#' },
  { label: 'Studio', href: '#services' },
  { label: 'Works', href: '#works' },
  { label: 'Blog', href: '#blog' },
];

const socialLinks = [
  { label: 'Instagram', href: '#' },
  { label: 'LinkedIn', href: '#' },
  { label: 'Behance', href: '#' },
];

function FooterLink({ href, children, index }: { href: string; children: string; index: number }) {
  return (
    <motion.li
      custom={0.2 + index * 0.12}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
      variants={reveal}
    >
      <motion.a
        href={href}
        className="inline-block text-xl font-bold drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] lg:text-2xl"
        style={{ color: 'var(--color-paper)' }}
        whileHover={{ x: 12, color: 'var(--color-accent)' }}
        transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
      >
        {children}
      </motion.a>
    </motion.li>
  );
}

export default function Footer() {
  const [isHoveringText, setIsHoveringText] = useState(false);
  const [localMousePosition, setLocalMousePosition] = useState({ x: 0, y: 0 });

  const handleTextMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setLocalMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <footer
      className="relative isolate flex w-full flex-col overflow-hidden rounded-t-[3rem] px-5 py-20 text-[var(--color-paper)] lg:px-16 lg:py-32"
      style={{ backgroundColor: 'var(--color-ink)' }}
    >
      <div className="absolute inset-0 z-0">
        <motion.div
          initial={{ scale: 1.08, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease: [0.4, 0, 0.2, 1] }}
          className="absolute inset-0"
        >
          <Image
            src="/logo/hyperhex-wordmark.jpg"
            alt="HyperHex Background"
            fill
            className="scale-x-[-1] object-cover opacity-70 brightness-110 contrast-110"
            priority
          />
        </motion.div>
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to bottom, rgba(10,10,10,0.15), rgba(10,10,10,0.2), rgba(10,10,10,0.25))' }}
        />
      </div>

      <div className="pointer-events-none absolute inset-0 z-[1] overflow-hidden">
        <motion.div
          animate={{ opacity: [0.2, 0.35, 0.2], scale: [1, 1.05, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-0 left-1/2 h-[700px] w-[900px] -translate-x-1/2"
          style={{
            background: 'radial-gradient(ellipse, #3712B0 0%, transparent 60%)',
            filter: 'blur(140px)',
            mixBlendMode: 'screen',
          }}
        />
        <motion.div
          animate={{ opacity: [0.25, 0.4, 0.25], x: [0, 24, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-[10%] left-[35%] h-[500px] w-[700px]"
          style={{
            background: 'radial-gradient(ellipse, #9651E7 0%, transparent 65%)',
            filter: 'blur(120px)',
            mixBlendMode: 'screen',
          }}
        />
        <motion.div
          animate={{ opacity: [0.2, 0.35, 0.2], x: [0, -20, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="absolute bottom-[5%] left-[60%] h-[450px] w-[600px]"
          style={{
            background: 'radial-gradient(ellipse, #ECC3FB 0%, transparent 70%)',
            filter: 'blur(110px)',
            mixBlendMode: 'screen',
          }}
        />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-[1280px] flex-col justify-between gap-16 lg:flex-row lg:gap-24">
        <motion.div
          custom={0}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={reveal}
          className="flex max-w-md flex-col gap-8"
        >
          <motion.div
            whileHover={{ scale: 1.03, rotate: -1 }}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            className="aspect-[1.79] w-full max-w-[320px] overflow-hidden rounded-[24px] border border-white/10 bg-gray-900/80 shadow-md backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 1.15 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.4, ease: [0.4, 0, 0.2, 1] }}
              className="relative h-full w-full"
            >
              <Image
                src="/images/hero-image.jpg"
                alt="HyperHex Studio Visual"
                width={320}
                height={179}
                className="h-full w-full object-cover"
              />
            </motion.div>
          </motion.div>
          <motion.div
            custom={0.15}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={reveal}
            className="flex flex-col gap-2"
          >
            <div className="flex items-center gap-3">
              <motion.div
                animate={{ scale: [1, 1.25, 1], opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                className="h-2 w-2 rounded-full shadow-[0_0_12px_rgba(21,182,232,0.6)]"
                style={{ backgroundColor: 'var(--color-accent)' }}
              />
              <span className="text-sm font-medium tracking-wide" style={{ color: 'var(--color-mist)' }}>
                Stay connected
              </span>
            </div>
            <motion.a
              href="mailto:info@hyperhex.studio"
              className="text-xl font-bold drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] lg:text-2xl"
              style={{ color: 'var(--color-paper)' }}
              whileHover={{ x: 8, color: 'var(--color-accent)' }}
              transition={{ duration: 0.45 }}
            >
              info@hyperhex.studio
            </motion.a>
          </motion.div>
        </motion.div>

        <div className="flex gap-16 pb-8 lg:gap-32 lg:pb-0">
          <motion.div
            custom={0.1}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
            variants={reveal}
            className="flex flex-col gap-6"
          >
            <span className="font-[family-name:var(--font-jetbrains)] text-xs font-bold tracking-[0.2em] uppercase" style={{ color: 'var(--color-mist)' }}>
              Navigation
            </span>
            <ul className="flex flex-col gap-4 font-[family-name:var(--font-dm-sans)]">
              {navLinks.map((link, index) => (
                <FooterLink key={link.label} href={link.href} index={index}>
                  {link.label}
                </FooterLink>
              ))}
            </ul>
          </motion.div>

          <motion.div
            custom={0.2}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
            variants={reveal}
            className="flex flex-col gap-6"
          >
            <span className="font-[family-name:var(--font-jetbrains)] text-xs font-bold tracking-[0.2em] uppercase" style={{ color: 'var(--color-mist)' }}>
              Social Media
            </span>
            <ul className="flex flex-col gap-4 font-[family-name:var(--font-dm-sans)]">
              {socialLinks.map((link, index) => (
                <FooterLink key={link.label} href={link.href} index={index}>
                  {link.label}
                </FooterLink>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.1, delay: 0.35, ease: [0.4, 0, 0.2, 1] }}
        className="relative z-10 mx-auto mt-20 mb-32 flex w-full max-w-[1280px] flex-col items-center justify-between gap-6 pt-8 font-[family-name:var(--font-dm-sans)] before:absolute before:top-0 before:left-0 before:h-px before:w-full before:bg-white/10 md:flex-row"
      >
        <p className="text-sm font-medium drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]" style={{ color: 'var(--color-mist)' }}>
          © 2025 HyperHex Studio. All Rights Reserved
        </p>
        <div className="flex gap-8 text-sm font-medium">
          {['Terms of Use', 'Privacy Policy'].map((label) => (
            <motion.a
              key={label}
              href="#"
              className="drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
              style={{ color: 'var(--color-mist)' }}
              whileHover={{ y: -3, color: 'var(--color-paper)' }}
              transition={{ duration: 0.35 }}
            >
              {label}
            </motion.a>
          ))}
        </div>
      </motion.div>

      <div className="absolute right-0 bottom-8 left-0 z-[5] flex w-full items-end justify-center overflow-hidden select-none">
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-20px' }}
          transition={{ duration: 1.3, ease: [0.4, 0, 0.2, 1] }}
          className="pointer-events-auto relative flex cursor-pointer flex-col items-center"
          onMouseEnter={() => setIsHoveringText(true)}
          onMouseLeave={() => setIsHoveringText(false)}
          onMouseMove={handleTextMouseMove}
        >
          {isHoveringText ? (
            <motion.div
              className="pointer-events-none absolute"
              style={{
                width: '350px',
                height: '350px',
                left: `${localMousePosition.x - 175}px`,
                top: `${localMousePosition.y - 175}px`,
                background:
                  'radial-gradient(circle, rgba(255, 255, 255, 0.35) 0%, rgba(255, 255, 255, 0.25) 30%, rgba(255, 255, 255, 0.15) 50%, transparent 70%)',
                filter: 'blur(20px)',
                zIndex: 0,
              }}
              transition={{ left: { duration: 0.35 }, top: { duration: 0.35 } }}
            />
          ) : null}

          <div className="relative z-10 flex flex-col items-center">
            <h1
              className="font-[family-name:var(--font-syne)] text-[12vw] leading-[0.8] font-black tracking-[-0.04em] uppercase drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)] lg:text-[10vw]"
              style={{ color: 'var(--color-paper)' }}
            >
              HYPERHEX
            </h1>
            <div className="flex w-full justify-end">
              <h2
                className="font-[family-name:var(--font-syne)] text-[6vw] leading-[0.8] font-bold tracking-[-0.02em] uppercase drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)] lg:text-[5vw]"
                style={{ color: 'var(--color-paper)' }}
              >
                STUDIOS
              </h2>
            </div>
          </div>

          {isHoveringText ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="pointer-events-none absolute inset-0 z-20 flex flex-col items-center overflow-visible"
              style={{
                clipPath: `circle(175px at ${localMousePosition.x}px ${localMousePosition.y}px)`,
              }}
            >
              <h1
                className="font-[family-name:var(--font-syne)] text-[12vw] leading-[0.8] font-black tracking-[-0.04em] uppercase lg:text-[10vw]"
                style={{ color: 'var(--color-accent)' }}
              >
                HYPERHEX
              </h1>
              <div className="flex w-full justify-end">
                <h2
                  className="font-[family-name:var(--font-syne)] text-[6vw] leading-[0.8] font-bold tracking-[-0.02em] uppercase lg:text-[5vw]"
                  style={{ color: 'var(--color-accent)' }}
                >
                  STUDIOS
                </h2>
              </div>
            </motion.div>
          ) : null}
        </motion.div>
      </div>
    </footer>
  );
}
