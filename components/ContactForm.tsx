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
  const y = useTransform(progress, range, [32, 0]);

  if (reduced) {
    return <span className="inline-block" style={{ color: 'var(--color-paper)' }}>{children}</span>;
  }

  return (
    <motion.span className="inline-block will-change-transform" style={{ color, y }}>
      {children}
    </motion.span>
  );
}

function ContactTitle() {
  const ref = useRef<HTMLHeadingElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.95', 'start 0.1'],
  });

  return (
    <h2
      ref={ref}
      className="mb-16 font-[family-name:var(--font-syne)] text-6xl font-black md:text-7xl"
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
  const [gridMouse, setGridMouse] = useState({ x: -1000, y: -1000 });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ email, phone, message });
  };

  const handleGridMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setGridMouse({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleGridMouseLeave = () => {
    setGridMouse({ x: -1000, y: -1000 });
  };

  return (
    <section id="contact" className="w-full bg-surface py-12 md:py-24 px-5 lg:px-16">
      <motion.div
        initial={{ opacity: 0, y: 64 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
        onMouseMove={handleGridMouseMove}
        onMouseLeave={handleGridMouseLeave}
        className="relative mx-auto w-full max-w-[1280px] overflow-hidden rounded-[2.5rem] shadow-2xl"
        style={{ backgroundColor: 'var(--color-ink)' }}
      >
        {/* Subtle cyan glow at bottom left */}
        <div className="absolute bottom-0 left-0 z-0 w-[500px] h-[500px] blur-[100px] rounded-full -translate-x-1/2 translate-y-1/2 pointer-events-none" style={{ backgroundColor: 'rgba(21, 182, 232, 0.15)' }}></div>

        {/* Large cyan gradient at bottom right */}
        <div className="absolute bottom-0 right-0 z-0 w-[700px] h-[700px] blur-[120px] rounded-full translate-x-1/3 translate-y-1/3 pointer-events-none" style={{ backgroundColor: 'rgba(21, 182, 232, 0.25)' }}></div>

        {/* Textured Dot Grid Background */}
        <DotGridBackground mouseX={gridMouse.x} mouseY={gridMouse.y} />

        <div className="relative z-10 flex flex-col md:flex-row gap-8 md:gap-16 p-6 md:p-16">
          {/* Left Column: Form Card */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            whileHover={{ y: -6 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.15 }}
            className="relative w-full md:w-[45%]"
          >
            {/* White Card with Faceted Corner */}
            <div
              className="relative rounded-3xl bg-white p-8 shadow-2xl transition-transform duration-300 md:p-12"
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
                    className="font-[family-name:var(--font-dm-sans)] text-sm uppercase tracking-widest text-gray-600 flex items-center gap-2 font-semibold"
                    htmlFor="email"
                  >
                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: 'var(--color-accent)' }}></span>
                    Your Email
                  </label>
                  <input
                    className="w-full rounded-xl bg-[#f0f0f0] px-5 py-4 font-[family-name:var(--font-dm-sans)] text-gray-900 transition-all placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[rgba(21,182,232,0.5)]"
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
                    className="font-[family-name:var(--font-dm-sans)] text-sm uppercase tracking-widest text-gray-600 flex items-center gap-2 font-semibold"
                    htmlFor="phone"
                  >
                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: 'var(--color-accent)' }}></span>
                    Your Phone
                  </label>
                  <input
                    className="w-full bg-[#f0f0f0] rounded-xl px-5 py-4 font-[family-name:var(--font-dm-sans)] text-gray-900 focus:outline-none focus:ring-2 transition-all placeholder:text-gray-400"
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
                    className="font-[family-name:var(--font-dm-sans)] text-sm uppercase tracking-widest text-gray-600 flex items-center gap-2 font-semibold"
                    htmlFor="message"
                  >
                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: 'var(--color-accent)' }}></span>
                    Message
                  </label>
                  <textarea
                    className="w-full bg-[#f0f0f0] rounded-xl px-5 py-4 font-[family-name:var(--font-dm-sans)] text-gray-900 focus:outline-none focus:ring-2 transition-all resize-none placeholder:text-gray-400"
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

          {/* Right Column: Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.15 }}
            className="relative z-10 w-full md:w-[55%] flex flex-col justify-center md:pl-8"
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
                  <span className="font-[family-name:var(--font-dm-sans)] text-sm font-medium" style={{ color: 'var(--color-mist)' }}>
                    E-mail Address
                  </span>
                  <a
                    className="font-[family-name:var(--font-dm-sans)] text-base font-bold transition-colors"
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
                  <span className="font-[family-name:var(--font-dm-sans)] text-sm font-medium" style={{ color: 'var(--color-mist)' }}>
                    Office Address
                  </span>
                  <span className="font-[family-name:var(--font-dm-sans)] text-base font-bold" style={{ color: 'var(--color-paper)' }}>
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
