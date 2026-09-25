'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SectionPill from '@/components/ui/SectionPill';

export interface ToolItem {
  name: string;
  category: string;
  icon?: React.ReactNode;
}

export const TOOLS_DATA: ToolItem[] = [
  { name: 'Unreal Engine', category: 'REAL-TIME 3D' },
  { name: 'PlayCanvas', category: 'WEBGL CONFIGURATORS' },
  { name: 'Three.js / WebGL', category: 'INTERACTIVE 3D' },
  { name: 'Maya 3D', category: '3D MODELING' },
  { name: '3ds Max', category: 'ARCHVIZ' },
  { name: 'Blender', category: '3D MODELING' },
  { name: 'Lumion', category: 'VISUALIZATION' },
  { name: 'Redshift', category: 'RENDERING' },
  { name: 'V-Ray', category: 'RENDERING' },
  { name: 'After Effects', category: 'MOTION DESIGN' },
  { name: 'Nuke', category: 'VFX & COMPOSITING' },
  { name: 'DaVinci Resolve', category: 'POST-PRODUCTION' },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  },
};

export interface ToolsAndTechSectionProps {
  tools?: ToolItem[];
  title?: string;
  subtitle?: string;
  badgeLabel?: string;
  className?: string;
}

export default function ToolsAndTechSection({
  tools = TOOLS_DATA,
  title = 'Tools & Technologies',
  subtitle = 'Industry-leading software and frameworks powering every project we deliver.',
  badgeLabel = 'TECHNOLOGY',
  className = '',
}: ToolsAndTechSectionProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section
      aria-label="Tools and Technologies"
      className={`w-full mt-20 md:mt-32 pt-8 md:pt-12 pb-16 md:pb-24 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto select-none ${className}`}
    >
      {/* Centered Header Section */}
      <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-12 md:mb-16">
        <SectionPill label={badgeLabel} className="mb-4" />

        <h2
          className="text-3xl sm:text-5xl lg:text-6xl font-black text-foreground tracking-tight leading-tight"
          style={{ fontFamily: 'var(--font-zalando-expanded, sans-serif)' }}
        >
          {title.includes('&') ? (
            <>
              {title.split('&')[0]} <span className="text-[#15b6e8]">&amp;</span> {title.split('&')[1]}
            </>
          ) : (
            title
          )}
        </h2>

        <p className="mt-3 text-muted-foreground text-sm sm:text-base md:text-lg leading-relaxed font-medium">
          {subtitle}
        </p>
      </div>

      {/* 6 Columns Desktop Grid (2 cols mobile, 3 cols tablet, 6 cols desktop) */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-5 md:gap-6"
      >
        {tools.map((tool, index) => {
          const isHovered = hoveredIndex === index;

          return (
            <motion.div
              key={`${tool.name}-${index}`}
              variants={itemVariants}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              whileHover={{ y: -6 }}
              className="group relative flex flex-col justify-between p-5 sm:p-6 transition-all duration-300 ease-out cursor-pointer overflow-hidden text-[#161d1e] text-center"
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
              {/* Category Subtext Pill */}
              <div className="flex justify-center mb-3">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#15b6e8] bg-[#15b6e8]/10 px-2.5 py-1 rounded-full border border-[#15b6e8]/20">
                  {tool.category}
                </span>
              </div>

              {/* Tool Name */}
              <h3
                className="text-base sm:text-lg font-bold text-[#161d1e] group-hover:text-[#15b6e8] transition-colors leading-snug my-2"
                style={{ fontFamily: 'var(--font-zalando-expanded, sans-serif)' }}
              >
                {tool.name}
              </h3>

              {/* Cyan Accent Dot */}
              <div className="mt-3 flex justify-center">
                <span className="w-2 h-2 rounded-full bg-[#15b6e8] shadow-[0_0_8px_#15b6e8]" />
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
