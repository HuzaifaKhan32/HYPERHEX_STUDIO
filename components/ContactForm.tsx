'use client';

import { motion } from 'framer-motion';
import { useState, useRef } from 'react';
import Button3D from './Button3D';
import DotGridBackground from './DotGridBackground';
import StaggeredHeading from '@/components/ui/StaggeredHeading';

function ContactTitle() {
  return (
    <StaggeredHeading
      staggerDelay={0.07}
      wordDuration={0.55}
      className="mb-10 font-[family-name:var(--font-syne)] font-black text-[clamp(36px,5vw,96px)] md:mb-16 !tracking-normal"
      lines={[
        {
          words: [
            { text: 'Fill', color: 'var(--color-paper)' },
            { text: 'the', color: 'var(--color-paper)' },
          ],
        },
        {
          words: [
            { text: 'form', color: 'var(--color-paper)' },
          ],
        },
      ]}
    />
  );
}

const containerVariants = {
  hidden: { opacity: 0, y: 64 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.4, 0, 0.2, 1] as const,
      staggerChildren: 0.1,
      delayChildren: 0.15,
    },
  },
};

const leftColVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1] as const,
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const rightColVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1] as const,
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const childVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

const badgeVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

export default function ContactForm() {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const panelRef = useRef<HTMLDivElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <section id="contact" className="w-full pt-8 md:pt-16 pb-12 md:pb-24 px-5 lg:px-16 2xl:px-24">
      <motion.div
        ref={panelRef}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
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
            variants={leftColVariants}
            whileHover={{ y: -6 }}
            className="relative order-2 w-full md:order-1 md:w-[45%]"
          >
            {/* Contact Form Card — Testimonials Card Design */}
            <div
              className="relative p-8 md:p-12 2xl:p-16 transition-transform duration-300"
              style={{
                backgroundColor: 'rgb(244, 244, 245)',
                borderRadius: '24px',
                boxShadow:
                  'rgba(255, 255, 255, 0.6) 0px 4px 0px 0px inset, rgba(0, 0, 0, 0.05) 0px -8px 0px 0px inset, rgba(0, 0, 0, 0.1) 0px 3px 3px 0px, rgba(0, 0, 0, 0.06) 0px 7.77px 16px 0px',
              }}
            >
              <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
                {/* Email Field */}
                <motion.div
                  variants={childVariants}
                  className="flex flex-col gap-2"
                >
                  <label
                    className="font-[family-name:var(--font-dm-sans)] text-xs 2xl:text-sm uppercase tracking-widest text-[#3b494c] flex items-center gap-2 font-bold"
                    htmlFor="email"
                  >
                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: 'var(--color-accent)' }}></span>
                    Your Email
                  </label>
                  <input
                    className="w-full px-5 py-4 2xl:px-8 2xl:py-6 2xl:text-lg font-[family-name:var(--font-dm-sans)] text-[#161d1e] transition-all placeholder:text-[#71717a] focus:outline-none focus:ring-2 focus:ring-[#15b6e8]"
                    style={{
                      backgroundColor: 'rgb(244, 244, 245)',
                      borderRadius: '16px',
                      boxShadow:
                        'rgba(255, 255, 255, 0.6) 0px 4px 0px 0px inset, rgba(0, 0, 0, 0.05) 0px -8px 0px 0px inset, rgba(0, 0, 0, 0.1) 0px 3px 3px 0px, rgba(0, 0, 0, 0.06) 0px 7.77px 16px 0px',
                    }}
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
                  variants={childVariants}
                  className="flex flex-col gap-2"
                >
                  <label
                    className="font-[family-name:var(--font-dm-sans)] text-xs 2xl:text-sm uppercase tracking-widest text-[#3b494c] flex items-center gap-2 font-bold"
                    htmlFor="phone"
                  >
                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: 'var(--color-accent)' }}></span>
                    Your Phone
                  </label>
                  <input
                    className="w-full px-5 py-4 2xl:px-8 2xl:py-6 2xl:text-lg font-[family-name:var(--font-dm-sans)] text-[#161d1e] transition-all placeholder:text-[#71717a] focus:outline-none focus:ring-2 focus:ring-[#15b6e8]"
                    style={{
                      backgroundColor: 'rgb(244, 244, 245)',
                      borderRadius: '16px',
                      boxShadow:
                        'rgba(255, 255, 255, 0.6) 0px 4px 0px 0px inset, rgba(0, 0, 0, 0.05) 0px -8px 0px 0px inset, rgba(0, 0, 0, 0.1) 0px 3px 3px 0px, rgba(0, 0, 0, 0.06) 0px 7.77px 16px 0px',
                    }}
                    id="phone"
                    placeholder="+1 (555) 000-0000"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </motion.div>

                {/* Message Field */}
                <motion.div
                  variants={childVariants}
                  className="flex flex-col gap-2"
                >
                  <label
                    className="font-[family-name:var(--font-dm-sans)] text-xs 2xl:text-sm uppercase tracking-widest text-[#3b494c] flex items-center gap-2 font-bold"
                    htmlFor="message"
                  >
                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: 'var(--color-accent)' }}></span>
                    Message
                  </label>
                  <textarea
                    className="w-full px-5 py-4 2xl:px-8 2xl:py-6 2xl:text-lg font-[family-name:var(--font-dm-sans)] text-[#161d1e] transition-all resize-none placeholder:text-[#71717a] focus:outline-none focus:ring-2 focus:ring-[#15b6e8]"
                    style={{
                      backgroundColor: 'rgb(244, 244, 245)',
                      borderRadius: '16px',
                      boxShadow:
                        'rgba(255, 255, 255, 0.6) 0px 4px 0px 0px inset, rgba(0, 0, 0, 0.05) 0px -8px 0px 0px inset, rgba(0, 0, 0, 0.1) 0px 3px 3px 0px, rgba(0, 0, 0, 0.06) 0px 7.77px 16px 0px',
                    }}
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
                  variants={childVariants}
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
            variants={rightColVariants}
            className="relative z-10 order-1 flex w-full flex-col justify-center md:order-2 md:w-[55%] md:pl-8"
          >
            {/* Badge */}
            <motion.div
              variants={badgeVariants}
              className="mb-12 inline-flex w-max items-center gap-2 px-4 py-2 pointer-events-auto"
              style={{
                backgroundColor: 'var(--token-5c4bbf1d-7534-4d20-87a6-b0deb15d1586, rgb(245, 245, 245))',
                borderRadius: '8px',
                boxShadow: 'rgba(0, 0, 0, 0.14) 0px 3px 3px 0px, rgba(0, 0, 0, 0.12) 0px 2.77px 2.21px 0px, rgb(233, 233, 233) 0px -3px 0px 0px inset',
                opacity: 1,
              }}
            >
              <span className="h-2 w-2 animate-pulse rounded-full bg-[#15b6e8]" />
              <span className="font-[family-name:var(--font-dm-sans)] text-xs font-semibold tracking-wide text-[#3b494c]">
                Contact Form
              </span>
            </motion.div>

            {/* Heading */}
            <ContactTitle />

            {/* Contact Info Rows */}
            <div className="flex flex-col gap-10">
              {/* Email Row */}
              <motion.div
                variants={childVariants}
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
                    href="mailto:hyperhexstudios@gmail.com"
                  >
                    hyperhexstudios@gmail.com
                  </a>
                </div>
              </motion.div>

              {/* Office Row */}
              <motion.div
                variants={childVariants}
                className="flex items-center gap-4"
              >
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Office+No.C-02+Mezzanine+Floor+Momin+Square+Gulshan+E+Iqbal+Block+6%2C+Karachi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-14 h-14 rounded-full flex items-center justify-center shrink-0 transition-transform hover:scale-105"
                  style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
                  aria-label="Open office address in Google Maps"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                </a>
                <div className="flex flex-col gap-1">
                  <span className="font-[family-name:var(--font-dm-sans)] text-sm 2xl:text-base font-medium" style={{ color: 'var(--color-mist)' }}>
                    Office Address
                  </span>
                  <a
                    className="font-[family-name:var(--font-dm-sans)] text-base 2xl:text-xl font-bold transition-colors"
                    style={{ color: 'var(--color-paper)' }}
                    onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-accent)'}
                    onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-paper)'}
                    href="https://www.google.com/maps/search/?api=1&query=Office+No.C-02+Mezzanine+Floor+Momin+Square+Gulshan+E+Iqbal+Block+6%2C+Karachi"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Office No.C-02 Mezzanine Floor Momin Square Gulshan E Iqbal Block 6, Karachi.
                  </a>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
