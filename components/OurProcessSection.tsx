'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SectionPill from '@/components/ui/SectionPill';
import Button3D from '@/components/Button3D';

export interface ProcessStep {
  step?: string;
  title: string;
  description: string;
}

export const PROCESS_DATA: ProcessStep[] = [
  {
    step: '01',
    title: 'Discovery & Strategy',
    description:
      'We dive deep into your brand, audience, and goals. Through research and collaborative workshops, we define the scope, timeline, and technical roadmap for your project.',
  },
  {
    step: '02',
    title: 'Design & Prototyping',
    description:
      'Our creative team crafts concepts, wireframes, and interactive prototypes. We iterate rapidly, presenting visual directions and gathering feedback to refine every detail.',
  },
  {
    step: '03',
    title: 'Development & Production',
    description:
      'Using cutting-edge tools — Unreal Engine, PlayCanvas, Maya, React — we build, animate, and render your project with technical precision and artistic excellence.',
  },
  {
    step: '04',
    title: 'Delivery & Optimization',
    description:
      'We deploy, test, and optimize across all target platforms. Post-launch support ensures your experience remains smooth, fast, and future-proof.',
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  },
};

export interface OurProcessSectionProps {
  steps?: ProcessStep[];
  title?: string;
  subtitle?: string;
  badgeLabel?: string;
  className?: string;
}

export default function OurProcessSection({
  steps = PROCESS_DATA,
  title = 'Our Process',
  subtitle = 'A proven methodology that ensures every project is delivered on time, on budget, and beyond expectations.',
  badgeLabel = 'HOW WE WORK',
  className = '',
}: OurProcessSectionProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section
      aria-label="Our Process"
      className={`w-full mt-20 md:mt-32 pt-8 md:pt-12 pb-16 md:pb-24 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto select-none ${className}`}
    >
      {/* Centered Header Section */}
      <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-12 md:mb-16">
        <SectionPill label={badgeLabel} className="mb-4" />

        <h2
          className="text-3xl sm:text-5xl lg:text-6xl font-black text-foreground tracking-tight leading-tight"
          style={{ fontFamily: 'var(--font-zalando-expanded, sans-serif)' }}
        >
          Our <span className="text-[#15b6e8]">Process</span>
        </h2>

        <p className="mt-3 text-muted-foreground text-sm sm:text-base md:text-lg leading-relaxed font-medium">
          {subtitle}
        </p>
      </div>

      {/* 4 Columns Process Grid (1 col mobile, 2 cols tablet, 4 cols desktop) */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative"
      >
        {steps.map((item, index) => {
          const stepNumber = item.step || `0${index + 1}`;
          const isLast = index === steps.length - 1;
          const isHovered = hoveredIndex === index;

          return (
            <motion.div
              key={`${item.title}-${index}`}
              variants={cardVariants}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              whileHover={{ y: -6 }}
              className="group relative flex flex-col justify-between p-6 sm:p-7 transition-all duration-300 ease-out text-[#161d1e] text-left overflow-hidden cursor-pointer"
              style={{
                boxSizing: 'border-box',
                backgroundColor: '#f4f4f5',
                borderRadius: '24px',
                border: isHovered ? '2px solid #15b6e8' : '2px solid transparent',
                boxShadow: isHovered
                  ? '0px 4px 0px 0px rgba(21, 182, 232, 1), rgba(255, 255, 255, 0.6) 0px 4px 0px 0px inset, rgba(0, 0, 0, 0.05) 0px -8px 0px 0px inset'
                  : 'rgba(255, 255, 255, 0.6) 0px 4px 0px 0px inset, rgba(0, 0, 0, 0.05) 0px -8px 0px 0px inset, rgba(0, 0, 0, 0.1) 0px 3px 3px 0px, rgba(0, 0, 0, 0.06) 0px 7.77px 16px 0px',
              }}
            >
              <div>
                {/* Step Pill & Desktop Connector Arrow */}
                <div className="flex items-center justify-between mb-5">
                  <SectionPill label={`STEP ${stepNumber}`} />

                  {/* Desktop Connecting Arrow */}
                  {!isLast && (
                    <div className="hidden lg:flex items-center text-[#3b494c]/40 group-hover:text-[#15b6e8] transition-colors">
                      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                        <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
                      </svg>
                    </div>
                  )}
                </div>

                {/* Step Title */}
                <h3
                  className="text-xl font-bold text-[#161d1e] group-hover:text-[#15b6e8] transition-colors mb-3 leading-snug"
                  style={{ fontFamily: 'var(--font-zalando-expanded, sans-serif)' }}
                >
                  {item.title}
                </h3>

                {/* Step Description */}
                <p className="text-xs text-[#3b494c] leading-relaxed font-medium mb-6">
                  {item.description}
                </p>
              </div>

              {/* Bottom 3D Button Action */}
              <div className="pt-2">
                <Button3D href="/contact" className="w-full justify-center">
                  Phase {stepNumber} Brief
                </Button3D>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
