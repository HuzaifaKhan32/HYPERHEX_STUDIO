'use client';

import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import { useState, useRef } from 'react';
import Button3D from './Button3D';
import DotGridBackground from './DotGridBackground';

function ContactTitleWord({
  children,
  progress,
  range,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const reduced = useReducedMotion();
  const color = useTransform(progress, range, ['#9a9fa5', '#ffffff']);
  const y = useTransform(progress, range, [24, 0]);

  if (reduced) {
    return <span className="inline-block" style={{ color: 'var(--color-paper)' }}>{children}</span>;
  }

  return (
    <motion.span className="inline-block" style={{ color, y }}>
      {children}
    </motion.span>
  );
}

function ContactTitle() {
  const ref = useRef<HTMLHeadingElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.9', 'start 0.35'],
  });

  return (
    <h2
      ref={ref}
      className="mb-10 font-[family-name:var(--font-syne)] font-black text-[clamp(36px,5vw,96px)] md:mb-16"
      style={{ lineHeight: '0.95' }}
    >
      <span className="flex flex-wrap gap-x-[0.22em]">
        <ContactTitleWord progress={scrollYProgress} range={[0, 0.42]}>
          Fill
        </ContactTitleWord>
        <ContactTitleWord progress={scrollYProgress} range={[0.28, 0.68]}>
          the
        </ContactTitleWord>
      </span>
      <span className="block">
        <ContactTitleWord progress={scrollYProgress} range={[0.55, 1]}>
          form
        </ContactTitleWord>
      </span>
    </h2>
  );
}

export default function ContactForm() {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const panelRef = useRef<HTMLDivElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ email, phone, message });
  };

  return (
    <section id="contact" className="w-full bg-white pt-8 md:pt-16 2xl:pt-20 pb-12 md:pb-24 px-5 lg:px-16 2xl:px-24 2xl:pb-32">
      <motion.div
        ref={panelRef}
        initial={{ opacity: 0, y: 64 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
        className="relative mx-auto w-full max-w-[1280px] xl:max-w-[1400px] 2xl:max-w-none overflow-hidden rounded-[2.5rem] shadow-2xl"
        style={{ backgroundColor: 'var(--color-ink)' }}
      >
        {/* Subtle cyan glow at bottom left */}
        <div className="absolute bottom-0 left-0 z-0 w-[500px] h-[500px] blur-[100px] rounded-full -translate-x-1/2 translate-y-1/2 pointer-events-none" style={{ backgroundColor: 'rgba(21, 182, 232, 0.15)' }}></div>

        {/* Large cyan gradient at bottom right */}
        <div className="absolute bottom-0 right-0 z-0 w-[700px] h-[700px] blur-[120px] rounded-full translate-x-1/3 translate-y-1/3 pointer-events-none" style={{ backgroundColor: 'rgba(21, 182, 232, 0.25)' }}></div>

        {/* Textured Dot Grid Background */}
        <DotGridBackground containerRef={panelRef} />

        <div className="relative z-10 flex flex-col gap-8 p-6 md:flex-row md:gap-16 md:p-16 2xl:gap-32 2xl:p-24 2xl:py-40">
          {/* Form Card — below content on mobile, left on desktop */}
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ y: -6 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            className="relative order-2 w-full md:order-1 md:w-[45%]"
          >
            {/* White Card with Faceted Corner */}
            <div
              className="relative rounded-3xl bg-white p-8 shadow-2xl transition-transform duration-300 md:p-12 2xl:p-16"
              style={{ clipPath: 'polygon(40px 0, 100% 0, 100% 100%, 0 100%, 0 40px)' }}
            >
              {/* Inner Notch Detail */}
              <div className="absolute top-0 left-0 w-16 h-16 pointer-events-none">
                <svg fill="none" height="64" viewBox="0 0 64 64" width="64" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0 40L40 0" stroke="#f0f0f0" strokeWidth="2"></path>
                </svg>
              </div>

              <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
                {/* Email Field */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.9, delay: 0.2 }}
                  className="flex flex-col gap-2"
                >
                  <label
                    className="font-[family-name:var(--font-dm-sans)] text-sm 2xl:text-base uppercase tracking-widest text-gray-600 flex items-center gap-2 font-semibold"
                    htmlFor="email"
                  >
                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: 'var(--color-accent)' }}></span>
                    Your Email
                  </label>
                  <input
                    className="w-full rounded-xl bg-[#f0f0f0] px-5 py-4 2xl:px-8 2xl:py-6 2xl:text-lg font-[family-name:var(--font-dm-sans)] text-gray-900 transition-all placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[rgba(21,182,232,0.5)]"
                    id="email"
                    placeholder="john@example.com"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </motion.div>

                {/* Phone Field */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.9, delay: 0.35 }}
                  className="flex flex-col gap-2"
                >
                  <label
                    className="font-[family-name:var(--font-dm-sans)] text-sm 2xl:text-base uppercase tracking-widest text-gray-600 flex items-center gap-2 font-semibold"
                    htmlFor="phone"
                  >
                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: 'var(--color-accent)' }}></span>
                    Your Phone
                  </label>
                  <input
                    className="w-full bg-[#f0f0f0] rounded-xl px-5 py-4 2xl:px-8 2xl:py-6 2xl:text-lg font-[family-name:var(--font-dm-sans)] text-gray-900 focus:outline-none focus:ring-2 transition-all placeholder:text-gray-400"
                    id="phone"
                    placeholder="+1 (555) 000-0000"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </motion.div>

                {/* Message Field */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.9, delay: 0.5 }}
                  className="flex flex-col gap-2"
                >
                  <label
                    className="font-[family-name:var(--font-dm-sans)] text-sm 2xl:text-base uppercase tracking-widest text-gray-600 flex items-center gap-2 font-semibold"
                    htmlFor="message"
                  >
                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: 'var(--color-accent)' }}></span>
                    Message
                  </label>
                  <textarea
                    className="w-full bg-[#f0f0f0] rounded-xl px-5 py-4 2xl:px-8 2xl:py-6 2xl:text-lg font-[family-name:var(--font-dm-sans)] text-gray-900 focus:outline-none focus:ring-2 transition-all resize-none placeholder:text-gray-400"
                    id="message"
                    placeholder="Tell us about your project..."
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                  />
                </motion.div>

                {/* Submit Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.9, delay: 0.65 }}
                  className="mt-4"
                >
                  <Button3D type="submit" className="justify-between">
                    Send Request
                  </Button3D>
                </motion.div>
              </form>
            </div>
          </motion.div>

          {/* Content — first on mobile, right on desktop */}
          <motion.div
            initial={{ opacity: 0, y: 120 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="relative z-10 order-1 flex w-full flex-col justify-center md:order-2 md:w-[55%] md:pl-8"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.25 }}
              className="mb-12 inline-flex w-max items-center gap-2 rounded-full py-2 pr-4 pl-2"
              style={{ backgroundColor: 'rgba(0, 0, 0, 0.4)' }}
            >
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shrink-0">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--color-accent)' }}>
                  <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
                </svg>
              </div>
              <span className="font-[family-name:var(--font-dm-sans)] text-sm font-semibold" style={{ color: 'var(--color-paper)' }}>
                Contact Form
              </span>
            </motion.div>

            {/* Heading */}
            <ContactTitle />

            {/* Contact Info Rows */}
            <div className="flex flex-col gap-10">
              {/* Email Row */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: 0.45 }}
                className="flex items-center gap-4"
              >
                <div className="w-14 h-14 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="4" width="20" height="16" rx="2"></rect>
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                  </svg>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="font-[family-name:var(--font-dm-sans)] text-sm 2xl:text-base font-medium" style={{ color: 'var(--color-mist)' }}>
                    E-mail Address
                  </span>
                  <a
                    className="font-[family-name:var(--font-dm-sans)] text-base 2xl:text-2xl font-bold transition-colors"
                    style={{ color: 'var(--color-paper)' }}
                    onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-accent)'}
                    onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-paper)'}
                    href="mailto:info@hyperhex.studio"
                  >
                    info@hyperhex.studio
                  </a>
                </div>
              </motion.div>

              {/* Office Row */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: 0.6 }}
                className="flex items-center gap-4"
              >
                <div className="w-14 h-14 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="font-[family-name:var(--font-dm-sans)] text-sm 2xl:text-base font-medium" style={{ color: 'var(--color-mist)' }}>
                    Office Address
                  </span>
                  <span className="font-[family-name:var(--font-dm-sans)] text-base 2xl:text-xl font-bold" style={{ color: 'var(--color-paper)' }}>
                    404 Hexagon Ave, Neo-Tokyo, NT 100-0001
                  </span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
