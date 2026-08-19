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
          className="mt-2 text-[clamp(36px,8.5vw,48px)] leading-none tracking-[0.06em]"
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
    image: 'https://unsplash.com/s/photos/luxury-car',
    size: 'large',
  },
  {
    id: 2,
    title: 'Hexa Core Identity',
    tags: ['Abstract'],
    category: 'Web',
    image: 'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?q=80&w=2000&auto=format&fit=crop',
    size: 'small',
  },
  {
    id: 3,
    title: 'Oculus Pavilion',
    tags: ['Arch Viz'],
    category: 'Architecture',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBram133FDBUkeTUJanmE-UwThl0XbgL8yz-yeSb8dbG1b68V7mDE7TKizyLPdvHQ8CLWIp5TIXM2SbgqZ1W1rE0IRGZd21yyZOG7DIYFIwE8GpQcS64Yf1uH5g6oKj4WXFeiTDEbZCqiH4G404qH0OWkrQHKBbUw_FAb6MloqEpkz9j-8JcIjbvRVnNEkWpdKz4JCbYJpIHCJe6hmrNBawvlhWRTZQk972ZyN0Z-Ac2UqKVNS_LbO4PA',
    size: 'small',
  },
  {
    id: 4,
    title: 'Lumina Gallery Experience',
    tags: ['VR / AR', 'Experiential'],
    category: 'VR/AR',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBGRXZ2HQNVaWAGM5dghSx2ej5LDbqJaQ_qnbgJJxJFOFujpLzypiWcmorWncUia77MxgtqGF_yeuPA4NmOWIRcdNcEeO3RVRr2gWlisPTaNgn1AwNzUsbricZX76ebI7n6DpebTtmCG6XvqSuxV_qxrr7v2PDbKnV4Srq1LRE4DyGtNRYBFFVqoiJ2YGQ7hOiuWq3H4rUw2wK9EN16aJ_5mUwy3WMRYXwCw8Go724MXGjs2kQ1ogkySw',
    size: 'large',
  },
];

const CATEGORIES = ['All', 'Animation', 'Web', 'Configurator', 'VR/AR', 'Architecture'];

export default function LatestWork() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProjects = ALL_PROJECTS.filter((project) => {
    const matchesCategory = activeCategory === 'All' || project.category === activeCategory;
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          project.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="works" className="flex flex-col w-full bg-white text-ink relative overflow-hidden font-[family-name:var(--font-dm-sans)]">
      <div className="max-w-[1280px] xl:max-w-[1400px] 2xl:max-w-none w-full mx-auto px-5 lg:px-16 2xl:px-24 pt-16 md:pt-32 2xl:pt-40 pb-8 md:pb-16 2xl:pb-20 flex flex-col gap-12 relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 pb-8 border-b border-black/10">
          <div className="flex flex-col gap-6">
            <LatestWorkHeading />
            <div className="flex flex-wrap items-center gap-2 md:gap-4 font-bold text-sm">
              {CATEGORIES.map(category => (
                <button 
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-5 py-2 rounded-full shadow-md transition-all duration-300 ${
                    activeCategory === category 
                      ? 'text-white hover:scale-105' 
                      : 'bg-black/5 hover:bg-black/10 text-black/70 hover:text-black'
                  }`}
                  style={activeCategory === category ? { backgroundColor: 'var(--color-accent)' } : {}}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
          
          <div className="w-full md:w-auto relative group">
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 text-black/40 group-focus-within:text-[var(--color-accent)] transition-colors w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full md:w-64 pl-12 pr-4 py-3 rounded-xl bg-white border border-black/5 focus:border-[var(--color-accent)] outline-none transition-all duration-300 shadow-sm placeholder:text-black/40 text-black" 
              placeholder="Search projects..." 
              type="text" 
            />
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 auto-rows-[300px] md:auto-rows-[400px] 2xl:auto-rows-[500px] gap-4 2xl:gap-8">
          
          {filteredProjects.map((project) => (
            <div key={project.id} className={`group relative rounded-2xl overflow-hidden cursor-pointer bg-white shadow-sm ${project.size === 'large' ? 'md:col-span-2 lg:col-span-2' : ''}`}>
              <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" style={{ backgroundImage: `url('${project.image}')` }}></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="absolute top-6 left-6 flex flex-wrap gap-2">
                {project.tags.map(tag => (
                  <span key={tag} className="px-3 py-1 text-xs font-[family-name:var(--font-dm-sans)] tracking-widest bg-white/20 backdrop-blur-md text-white rounded-full uppercase">{tag}</span>
                ))}
              </div>
              
              <div className="absolute bottom-6 left-6 right-6 translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 flex justify-between items-end">
                <div className="flex flex-col gap-2">
                  <h3 className={`${project.size === 'large' ? 'text-3xl 2xl:text-5xl' : 'text-2xl 2xl:text-4xl'} font-[family-name:var(--font-syne)] text-white font-bold tracking-tight`}>{project.title}</h3>
                  <span className="font-bold flex items-center gap-1 group/link" style={{ color: 'var(--color-accent)' }}>
                    View Project 
                    <svg className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </span>
                </div>
              </div>
            </div>
          ))}

          {filteredProjects.length === 0 && (
            <div className="col-span-full flex justify-center py-24 text-mist font-bold">
              No projects found.
            </div>
          )}

        </div>

        {/* Explore More Button - Moved outside the grid to prevent auto-rows stretching */}
        <div className="flex justify-center pt-4">
          <Button3D arrowDirection="down" className="!py-1.5 !pr-1.5 !pl-4 !text-xs !gap-2 [&>div]:!h-6 [&>div]:!w-6 [&>div>span>svg]:!h-3 [&>div>span>svg]:!w-3 [&>span]:!w-1.5 [&>span]:!h-1.5 2xl:[&>div]:!h-6 2xl:[&>div]:!w-6">
            Explore More
          </Button3D>
        </div>

      </div>
    </section>
  );
}
