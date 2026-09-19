'use client';

import { motion, Variants } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';
import Button3D from './Button3D';
import DotGridBackground from './DotGridBackground';
import StaggeredHeading from '@/components/ui/StaggeredHeading';
import SectionPill from '@/components/ui/SectionPill';

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

const containerVariants: Variants = {
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

const leftColVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1] as const,
      staggerChildren: 0.18,
      delayChildren: 0.15,
    },
  },
};

const rightColVariants: Variants = {
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

const childVariants: Variants = {
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

const fieldPopVariants: Variants = {
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

interface ToastState {
  type: 'success' | 'error';
  message: string;
}

export default function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [website, setWebsite] = useState(''); // Anti-spam honeypot field
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState<ToastState | null>(null);

  const panelRef = useRef<HTMLDivElement>(null);

  // Auto-dismiss toast after ~4 seconds
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => {
      setToast(null);
    }, 4000);
    return () => clearTimeout(timer);
  }, [toast]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !message.trim()) {
      setToast({
        type: 'error',
        message: 'Please fill out all required fields.',
      });
      return;
    }

    setIsSubmitting(true);
    setToast(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
          message: message.trim(),
          website, // Honeypot field passed to API
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong. Please try again.');
      }

      setToast({
        type: 'success',
        message: "Thank you for contacting us! We'll get back to you soon.",
      });

      // Reset form fields
      setName('');
      setEmail('');
      setPhone('');
      setMessage('');
      setWebsite('');
    } catch (err: any) {
      setToast({
        type: 'error',
        message: err.message || 'Something went wrong. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
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
                {/* Honeypot field (hidden from real users, bots fill this in) */}
                <input
                  type="text"
                  name="website"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                  className="hidden absolute opacity-0 pointer-events-none h-0 w-0 -z-50"
                  aria-hidden="true"
                />

                {/* Name Field */}
                <motion.div
                  variants={fieldPopVariants}
                  className="flex flex-col gap-2"
                  style={{ transformOrigin: 'center center' }}
                >
                  <label
                    className="font-[family-name:var(--font-dm-sans)] text-xs 2xl:text-sm uppercase tracking-widest text-[#3b494c] flex items-center gap-2 font-bold"
                    htmlFor="name"
                  >
                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: 'var(--color-accent)' }}></span>
                    Your Name
                  </label>
                  <input
                    className="w-full px-5 py-4 2xl:px-8 2xl:py-6 2xl:text-lg font-[family-name:var(--font-dm-sans)] text-[#161d1e] transition-all placeholder:text-[#71717a] focus:outline-none focus:ring-2 focus:ring-[#15b6e8]"
                    style={{
                      backgroundColor: 'rgb(244, 244, 245)',
                      borderRadius: '16px',
                      boxShadow:
                        'rgba(255, 255, 255, 0.6) 0px 4px 0px 0px inset, rgba(0, 0, 0, 0.05) 0px -8px 0px 0px inset, rgba(0, 0, 0, 0.1) 0px 3px 3px 0px, rgba(0, 0, 0, 0.06) 0px 7.77px 16px 0px',
                    }}
                    id="name"
                    placeholder="John Doe"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </motion.div>

                {/* Email Field */}
                <motion.div
                  variants={fieldPopVariants}
                  className="flex flex-col gap-2"
                  style={{ transformOrigin: 'center center' }}
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
                  variants={fieldPopVariants}
                  className="flex flex-col gap-2"
                  style={{ transformOrigin: 'center center' }}
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
                  variants={fieldPopVariants}
                  className="flex flex-col gap-2"
                  style={{ transformOrigin: 'center center' }}
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

                {/* Submit Button — tooltip anchor */}
                <motion.div
                  variants={fieldPopVariants}
                  className="mt-4"
                  style={{ transformOrigin: 'center center' }}
                >
                  <div id="submit-btn-anchor" className="inline-block">
                    <Button3D type="submit" loading={isSubmitting} className="justify-between">
                      {isSubmitting ? 'Sending...' : 'Send Request'}
                    </Button3D>
                  </div>

                  {/* react-tooltip anchored above the submit button */}
                  <Tooltip
                    anchorSelect="#submit-btn-anchor"
                    place="top"
                    isOpen={!!toast}
                    clickable
                    opacity={1}
                    style={{
                      padding: 0,
                      background: 'transparent',
                      border: 'none',
                      boxShadow: 'none',
                      zIndex: 9999,
                    }}
                  >
                    {toast && (
                      <div
                        role="alert"
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px',
                          padding: '12px 14px',
                          borderRadius: '16px',
                          border: `1.5px solid ${toast.type === 'success' ? '#15b6e8' : '#ef4444'}`,
                          backgroundColor: toast.type === 'success' ? '#ffffff' : '#fef2f2',
                          color: toast.type === 'success' ? '#161d1e' : '#991b1b',
                          boxShadow:
                            toast.type === 'success'
                              ? '0 12px 32px -4px rgba(21,182,232,0.28), 0 2px 8px rgba(0,0,0,0.08)'
                              : '0 12px 32px -4px rgba(239,68,68,0.22), 0 2px 8px rgba(0,0,0,0.08)',
                          maxWidth: '320px',
                          minWidth: '240px',
                          fontFamily: 'var(--font-dm-sans, sans-serif)',
                          fontSize: '13px',
                          fontWeight: 500,
                          lineHeight: 1.45,
                        }}
                      >
                        {/* Icon */}
                        <div
                          style={{
                            flexShrink: 0,
                            width: 28,
                            height: 28,
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor:
                              toast.type === 'success'
                                ? 'rgba(21,182,232,0.12)'
                                : 'rgba(239,68,68,0.12)',
                            color: toast.type === 'success' ? '#15b6e8' : '#ef4444',
                          }}
                        >
                          {toast.type === 'success' ? (
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                          ) : (
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                              <circle cx="12" cy="12" r="10" />
                              <line x1="12" y1="8" x2="12" y2="12" />
                              <line x1="12" y1="16" x2="12.01" y2="16" />
                            </svg>
                          )}
                        </div>

                        {/* Message */}
                        <span style={{ flex: 1 }}>{toast.message}</span>

                        {/* Close */}
                        <button
                          type="button"
                          onClick={() => setToast(null)}
                          aria-label="Close notification"
                          style={{
                            flexShrink: 0,
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            padding: '2px',
                            color: '#9a9fa5',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: '50%',
                            transition: 'color 0.15s',
                          }}
                          onMouseEnter={(e) => (e.currentTarget.style.color = '#161d1e')}
                          onMouseLeave={(e) => (e.currentTarget.style.color = '#9a9fa5')}
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                          </svg>
                        </button>
                      </div>
                    )}
                  </Tooltip>
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
            <SectionPill label="Contact Form" className="mb-12 font-[family-name:var(--font-dm-sans)]" />

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
