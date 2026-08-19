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
    transition: { duration: 0.7, delay, ease: EASE },
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
        className="inline-block font-bold drop-shadow-[0_1px_3px_rgba(10,10,10,0.08)] text-[clamp(20px,2vw,32px)]"
        style={{ color: 'var(--color-ink)' }}
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
      className="relative isolate flex w-full flex-col overflow-hidden rounded-t-[3rem] px-5 py-20 lg:px-16 lg:py-32 2xl:px-24 2xl:py-40"
      style={{ color: 'var(--color-ink)' }}
    >
      <div className="relative z-10 mx-auto flex w-full max-w-[1280px] xl:max-w-[1400px] 2xl:max-w-none flex-col justify-between gap-16 lg:flex-row lg:gap-24 2xl:gap-32">
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
            className="aspect-[1.79] w-full max-w-[320px] overflow-hidden rounded-[24px] border border-outline-variant/40 bg-surface-container shadow-[0_4px_16px_rgba(10,10,10,0.06)] backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 1.15 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
              className="relative h-full w-full"
            >
              <Image
                src="/images/image-3.jpg"
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
              <div
                className="h-2 w-2 rounded-full shadow-[0_0_12px_rgba(21,182,232,0.6)]"
                style={{ backgroundColor: 'var(--color-accent)' }}
              />
              <span className="text-sm font-medium tracking-wide" style={{ color: 'var(--color-mist)' }}>
                Stay connected
              </span>
            </div>
            <motion.a
              href="mailto:info@hyperhex.studio"
              className="font-bold drop-shadow-[0_1px_3px_rgba(10,10,10,0.08)] text-[clamp(20px,2vw,32px)]"
              style={{ color: 'var(--color-ink)' }}
              whileHover={{ x: 8, color: 'var(--color-accent)' }}
              transition={{ duration: 0.45 }}
            >
              info@hyperhex.studio
            </motion.a>
          </motion.div>
        </motion.div>

        <div className="flex flex-wrap gap-10 pb-8 sm:gap-16 lg:gap-32 lg:pb-0">
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
        transition={{ duration: 0.7, delay: 0.35, ease: [0.4, 0, 0.2, 1] }}
        className="relative z-10 mx-auto mt-20 mb-8 flex w-full max-w-[1280px] xl:max-w-[1400px] 2xl:max-w-none flex-col items-center justify-between gap-6 pt-8 font-[family-name:var(--font-dm-sans)] before:absolute before:top-0 before:left-0 before:h-px before:w-full before:bg-outline-variant/50 sm:mb-24 md:mb-32 md:flex-row"
      >
        <p className="text-sm font-medium" style={{ color: 'var(--color-mist)' }}>
          © 2025 HyperHex Studio. All Rights Reserved
        </p>
        <div className="flex gap-8 text-sm font-medium">
          {['Terms of Use', 'Privacy Policy'].map((label) => (
            <motion.a
              key={label}
              href="#"
              className="text-sm font-medium"
              style={{ color: 'var(--color-mist)' }}
              whileHover={{ y: -3, color: 'var(--color-ink)' }}
              transition={{ duration: 0.35 }}
            >
              {label}
            </motion.a>
          ))}
        </div>
      </motion.div>

      <div className="relative z-[5] mt-16 flex w-full items-end justify-center overflow-hidden px-2 select-none sm:absolute sm:right-0 sm:bottom-8 sm:left-0 sm:mt-0">
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-20px' }}
          transition={{ duration: 0.9, ease: [0.4, 0, 0.2, 1] }}
          className="pointer-events-auto relative flex w-full max-w-full cursor-pointer flex-col items-center"
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
                  'radial-gradient(circle, rgba(21, 182, 232, 0.18) 0%, rgba(21, 182, 232, 0.1) 30%, rgba(21, 182, 232, 0.05) 50%, transparent 70%)',
                filter: 'blur(20px)',
                zIndex: 0,
              }}
              transition={{ left: { duration: 0.35 }, top: { duration: 0.35 } }}
            />
          ) : null}

          <div className="relative z-10 flex w-full max-w-full flex-col items-center px-2">
            <h1
              className="w-full text-center font-[family-name:var(--font-syne)] text-[clamp(28px,11vw,120px)] leading-[0.85] font-black tracking-[-0.04em] uppercase drop-shadow-[0_2px_8px_rgba(10,10,10,0.06)]"
              style={{ color: 'var(--color-ink)' }}
            >
              HYPERHEX
            </h1>
            <div className="flex w-full justify-end pr-[5%] sm:pr-[8%]">
              <h2
                className="font-[family-name:var(--font-syne)] text-[clamp(14px,5.5vw,60px)] leading-[0.85] font-bold tracking-[-0.02em] uppercase drop-shadow-[0_2px_8px_rgba(10,10,10,0.06)]"
                style={{ color: 'var(--color-ink)' }}
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
                className="w-full text-center font-[family-name:var(--font-syne)] text-[clamp(28px,11vw,120px)] leading-[0.85] font-black tracking-[-0.04em] uppercase"
                style={{ color: 'var(--color-accent)' }}
              >
                HYPERHEX
              </h1>
              <div className="flex w-full justify-end pr-[5%] sm:pr-[8%]">
                <h2
                  className="font-[family-name:var(--font-syne)] text-[clamp(14px,5.5vw,60px)] leading-[0.85] font-bold tracking-[-0.02em] uppercase"
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
