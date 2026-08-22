'use client';

import React, { useRef, useState } from 'react';
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import Button3D from './Button3D';

const BLACK = '#000000';
const ACCENT = 'var(--color-accent)';
const MIST = '#9a9fa5';

function RevealLine({
  children,
  progress,
  range,
  className,
  style,
}: {
  children: React.ReactNode;
  progress: MotionValue<number>;
  range: [number, number];
  className?: string;
  style?: React.CSSProperties;
}) {
  const reduced = useReducedMotion();
  const y = useTransform(progress, range, [28, 0]);
  const opacity = useTransform(progress, range, [0.4, 1]);

  if (reduced) {
    return (
      <span className={className} style={style}>
        {children}
      </span>
    );
  }

  return (
    <motion.span className={`block will-change-transform ${className ?? ''}`} style={{ y, opacity, ...style }}>
      {children}
    </motion.span>
  );
}

function RevealWord({
  children,
  progress,
  range,
  className,
  targetColor,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
  className?: string;
  targetColor: string;
}) {
  const reduced = useReducedMotion();
  const color = useTransform(progress, range, [MIST, targetColor]);
  const y = useTransform(progress, range, [24, 0]);
  const opacity = useTransform(progress, range, [0.45, 1]);

  if (reduced) {
    return (
      <span className={`block ${className ?? ''}`} style={{ color: targetColor }}>
        {children}
      </span>
    );
  }

  return (
    <motion.span className={`block will-change-transform ${className ?? ''}`} style={{ color, y, opacity }}>
      {children}
    </motion.span>
  );
}

const headingBase = 'font-[family-name:var(--font-zalando-expanded)] font-black uppercase tracking-[-0.04em]';

function LatestWorkHeading() {
  const ref = useRef<HTMLHeadingElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.85', 'start 0.4'],
  });

  return (
    <h2 ref={ref} className={`${headingBase} w-full`}>
      {/* Mobile */}
      <span className="flex flex-col text-left md:hidden">
        <RevealLine
          progress={scrollYProgress}
          range={[0, 0.55]}
          className="text-[clamp(56px,18vw,84px)] leading-[0.92] tracking-[-0.05em]"
          style={{ color: BLACK }}
        >
          Latest
        </RevealLine>
        <RevealWord
          progress={scrollYProgress}
          range={[0.35, 1]}
          targetColor={ACCENT}
          className="mt-2 text-[clamp(48px,10vw,72px)] leading-none tracking-[0.06em]"
        >
          Work
        </RevealWord>
      </span>

      {/* Desktop */}
      <span className="hidden flex-col md:flex">
        <RevealLine
          progress={scrollYProgress}
          range={[0, 0.55]}
          className="text-[clamp(72px,6vw,120px)] leading-[0.95]"
          style={{ color: BLACK }}
        >
          Latest
        </RevealLine>
        <RevealLine
          progress={scrollYProgress}
          range={[0.35, 1]}
          className="text-[clamp(56px,4.5vw,84px)] leading-[0.95]"
          style={{ color: ACCENT }}
        >
          Work
        </RevealLine>
      </span>
    </h2>
  );
}

const ALL_PROJECTS = [
  {
    id: 1,
    title: 'Apex Vanguard V8',
    tags: ['Automotive', 'Render'],
    category: 'Animation',
    image: 'https://images.unsplash.com/photo-1614200179396-2bdb77ebf81b?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 2,
    title: 'Hexa Core Identity',
    tags: ['Abstract'],
    category: 'Web',
    image: 'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?q=80&w=2000&auto=format&fit=crop',
  },
  {
    id: 3,
    title: 'Oculus Pavilion',
    tags: ['Arch Viz'],
    category: 'Architecture',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBram133FDBUkeTUJanmE-UwThl0XbgL8yz-yeSb8dbG1b68V7mDE7TKizyLPdvHQ8CLWIp5TIXM2SbgqZ1W1rE0IRGZd21yyZOG7DIYFIwE8GpQcS64Yf1uH5g6oKj4WXFeiTDEbZCqiH4G404qH0OWkrQHKBbUw_FAb6MloqEpkz9j-8JcIjbvRVnNEkWpdKz4JCbYJpIHCJe6hmrNBawvlhWRTZQk972ZyN0Z-Ac2UqKVNS_LbO4PA',
  },
  {
    id: 4,
    title: 'Volvo S90 Edition',
    tags: ['Configurator'],
    category: 'Configurator',
    image: 'https://images.unsplash.com/photo-1617469767053-d3b523a0b982?q=80&w=2000&auto=format&fit=crop',
  },
  {
    id: 5,
    title: 'Minimalist Dining',
    tags: ['Interior'],
    category: 'Architecture',
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=2000&auto=format&fit=crop',
  },
  {
    id: 6,
    title: 'Future UI Kit',
    tags: ['UI'],
    category: 'Web',
    image: 'https://images.unsplash.com/photo-1581091012184-7a9b3d73c386?q=80&w=2000&auto=format&fit=crop',
  },
];

const CATEGORIES = ['All', 'Animation', 'Web', 'Configurator', 'VR/AR', 'Architecture'];

export default function LatestWorkVariant() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProjects = ALL_PROJECTS.filter((project) => {
    const matchesCategory = activeCategory === 'All' || project.category === activeCategory;
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          project.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="works" className="flex flex-col w-full bg-white text-ink relative overflow-hidden font-[family-name:var(--font-dm-sans)] pb-8">
      <div className="max-w-[1280px] xl:max-w-[1400px] 2xl:max-w-none w-full mx-auto px-5 lg:px-16 2xl:px-24 pt-16 md:pt-32 2xl:pt-40 pb-8 flex flex-col gap-12 relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 pb-8 border-b border-black/10">
          <div className="flex flex-col gap-6">
            <LatestWorkHeading />
            <div className="flex flex-wrap items-center gap-2 md:gap-4 font-bold text-sm">
              {CATEGORIES.map(category => {
                const isActive = activeCategory === category;

                return (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={` cursor-pointer px-5 py-2 rounded-full transition-all duration-300 ${
                      isActive
                        ? 'text-white hover:scale-105'
                        : 'bg-black/5 hover:bg-black/10 text-black/70 hover:text-black [box-shadow:rgba(0,0,0,0.08)_0px_1px_2px,rgba(0,0,0,0.06)_0px_6px_10px_-4px,rgba(0,0,0,0.05)_0px_-1px_0px_inset]'
                    }`}
                    style={
                      isActive
                        ? {
                            backgroundColor: 'var(--color-accent)',
                            boxShadow:
                              'inset 0 2px 4px rgba(0,0,0,0.15), 0 1px 0 rgba(255,255,255,0.15), 0 8px 20px -7px rgba(24, 173, 218, 0.75)',
                          }
                        : {}
                    }
                  >
                    {category}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Full-Bleed 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group bg-white rounded-3xl cursor-pointer border-2 border-black/10 shadow-[0_4px_0_0_rgba(220,220,220,1)] hover:border-accent hover:shadow-[0_4px_0_0_rgba(21,182,232,1)] transition-all duration-300 transform hover:-translate-y-1 flex flex-col p-3"
            >
              {/* Image Container with Inner Overlay */}
              <div className="relative h-56 md:h-64 lg:h-72 w-full overflow-hidden rounded-2xl">
                
                {/* Background Image */}
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{ backgroundImage: `url('${project.image}')` }}
                />
                
                {/* Dark Overlay & Hover Content (Revealed on hover) */}
                <div className="absolute inset-0 bg-black/35 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-between p-5">
                  
                  {/* Overlay Tags (Top Left) */}
                  <div className="flex flex-wrap gap-2 transform -translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 pt-1 text-xs font-[family-name:var(--font-dm-sans)] font-semibold tracking-widest bg-white/20 backdrop-blur-md text-white rounded-full uppercase"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  {/* Overlay Title & CTA (Bottom Left) */}
                  <div className="flex flex-col gap-1.5 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <h3 className="text-2xl font-bold text-white tracking-wide">{project.title}</h3>
                    <span className="flex items-center gap-1.5 text-sm font-bold text-white group-hover:text-accent transition-colors duration-300">
                      View Project
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </span>
                  </div>
                </div>

              </div>

              {/* Bottom Content Container (Default State) */}
              {/* Fades out on hover, cleanly preserving the physical white space gap at the bottom */}
              <div className="flex flex-col gap-4 mt-4 px-2 pb-1 opacity-100 group-hover:opacity-0 transition-opacity duration-300">
                

              </div>
            </div>
          ))}

          {filteredProjects.length === 0 && (
            <div className="col-span-full flex justify-center py-24 text-mist font-bold bg-white">
              No projects found.
            </div>
          )}
        </div>

        {/* Explore More Button */}
        <div className="flex justify-center pt-4">
          <Button3D arrowDirection="down" className="px-4 py-1 text-xs 2xl:text-sm">
            Explore More
          </Button3D>
        </div>
      </div>
    </section>
  );
}