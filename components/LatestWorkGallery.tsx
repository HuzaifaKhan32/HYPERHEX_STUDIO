'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import Button3D from './Button3D';
import Image from 'next/image';

const BLACK = 'var(--color-on-surface)';
const ACCENT = 'var(--color-accent)';
const MIST = '#9a9fa5';

function RevealLine({
  children, progress, range, className, style,
}: {
  children: React.ReactNode; progress: MotionValue<number>; range: [number, number]; className?: string; style?: React.CSSProperties;
}) {
  const reduced = useReducedMotion();
  const y = useTransform(progress, range, [28, 0]);
  const opacity = useTransform(progress, range, [0.4, 1]);
  if (reduced) return <span className={className} style={style}>{children}</span>;
  return (
    <motion.span className={`block will-change-transform ${className ?? ''}`} style={{ y, opacity, ...style }}>
      {children}
    </motion.span>
  );
}

function RevealWord({
  children, progress, range, className, targetColor,
}: {
  children: string; progress: MotionValue<number>; range: [number, number]; className?: string; targetColor: string;
}) {
  const reduced = useReducedMotion();
  const color = useTransform(progress, range, [MIST, targetColor]);
  const y = useTransform(progress, range, [24, 0]);
  const opacity = useTransform(progress, range, [0.45, 1]);
  if (reduced) return <span className={`block ${className ?? ''}`} style={{ color: targetColor }}>{children}</span>;
  return (
    <motion.span className={`block will-change-transform ${className ?? ''}`} style={{ color, y, opacity }}>
      {children}
    </motion.span>
  );
}

const headingBase = 'font-[family-name:var(--font-zalando-expanded)] font-black uppercase tracking-[-0.04em]';

function LatestWorkHeading() {
  const ref = useRef<HTMLHeadingElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'start 0.4'] });
  return (
    <h2 ref={ref} className={`${headingBase} w-full`}>
      <span className="flex flex-col text-left md:hidden">
        <RevealLine progress={scrollYProgress} range={[0, 0.55]} className="text-[clamp(56px,18vw,84px)] leading-[0.92] tracking-[-0.05em]" style={{ color: BLACK }}>Latest</RevealLine>
        <RevealWord progress={scrollYProgress} range={[0.35, 1]} targetColor={ACCENT} className="mt-2 text-[clamp(48px,10vw,72px)] leading-none tracking-[0.06em]">Work</RevealWord>
      </span>
      <span className="hidden flex-col md:flex">
        <RevealLine progress={scrollYProgress} range={[0, 0.55]} className="text-[clamp(72px,6vw,120px)] leading-[0.95]" style={{ color: BLACK }}>Latest</RevealLine>
        <RevealLine progress={scrollYProgress} range={[0.35, 1]} className="text-[clamp(56px,4.5vw,84px)] leading-[0.95]" style={{ color: ACCENT }}>Work</RevealLine>
      </span>
    </h2>
  );
}

type Project = {
  id: string;
  title: string;
  category: 'Animation' | 'Visualization';
  imageUrl: string;
  embedUrl?: string;
  isVideo: boolean;
};

// ── YouTube video helper ───────────────────────────────────────────────────
function yt(id: string, title: string, category: 'Animation' = 'Animation'): Project {
  return {
    id,
    title,
    category,
    imageUrl: `https://img.youtube.com/vi/${id}/maxresdefault.jpg`,
    embedUrl: `https://www.youtube.com/embed/${id}?autoplay=1&rel=0`,
    isVideo: true,
  };
}

// ── Portfolio image helper ─────────────────────────────────────────────────
function imgProject(id: string, title: string, path: string): Project {
  return {
    id,
    title,
    category: 'Visualization',
    imageUrl: path,
    isVideo: false,
  };
}

const ALL_PROJECTS: Project[] = [
  yt('7JT-j8gz5uU', 'HyperHex 3D Showcase', 'Animation'),
  yt('7wRGPltVun4', 'Apex Vanguard V8', 'Animation'),
  yt('YvvRPa5zVAM', 'Hexa Core Identity', 'Animation'),
  yt('NJgPMovdV2Y', 'Oculus Pavilion', 'Animation'),
  yt('a0ESDiUHZFI', 'Naran Club', 'Animation'),
  yt('QhWmY9lXlZY', 'Modern Apartment', 'Animation'),
  yt('oQnWA-22Bf4', 'Governor House', 'Animation'),
  yt('9JFPZnPXQ1Y', 'Call Center Interior', 'Animation'),
  yt('WKOskq3aIQQ', 'Mumtaz Residency', 'Animation'),
  yt('m2FYElEVclc', 'Nexgen Heights', 'Animation'),
  imgProject('img-car', 'Car Configurator', '/portfolio/car-configurator.jpg'),
  imgProject('img-commtel', 'Commtel Project', '/portfolio/commtel.jpg'),
  imgProject('img-exterior', 'Exterior House', '/portfolio/exterior-house.jpg'),
  imgProject('img-governor', 'Governor House Render', '/portfolio/governor-house.jpg'),
  imgProject('img-ivf', 'IVF Academy', '/portfolio/IVF.png'),
  imgProject('img-arcade', 'NS Arcade', '/portfolio/ns-arcade.jpg'),
  imgProject('img-watch', 'Luxury Watch 3D', '/portfolio/watch.png'),
];

const CATEGORIES = ['All', 'Animation', 'Visualization'] as const;

export default function LatestWorkGallery() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [visibleCount, setVisibleCount] = useState(6);
  const [selectedProject, setSelectedProject] = useState<typeof ALL_PROJECTS[number] | null>(null);

  const filtered = ALL_PROJECTS.filter(
    (p) => activeCategory === 'All' || p.category === activeCategory
  );

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;
  const isExpanded = visibleCount > 6;

  const handleLoadMore = () => {
    if (hasMore) setVisibleCount((prev) => prev + 6);
  };

  const handleViewLess = () => {
    setVisibleCount(6);
  };

  const handleCategory = (cat: string) => {
    setActiveCategory(cat);
    setVisibleCount(6);
  };

  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [selectedProject]);

  return (
    <section id="works" className="flex flex-col w-full bg-surface text-on-surface relative overflow-hidden font-[family-name:var(--font-dm-sans)] pb-8">
      <div className="max-w-[1280px] xl:max-w-[1400px] 2xl:max-w-none w-full mx-auto px-5 lg:px-16 2xl:px-24 pt-16 md:pt-32 2xl:pt-40 pb-8 flex flex-col gap-12 relative z-10">

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 pb-8 border-b border-outline-variant/30">
          <div className="flex flex-col gap-6">
            <LatestWorkHeading />
            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 font-bold text-sm">
              {CATEGORIES.map((category) => {
                const isActive = activeCategory === category;
                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() => handleCategory(category)}
                    aria-pressed={isActive}
                    className={`flex items-center justify-center px-5 py-2.5 bg-surface-bright rounded-xl border-2 font-bold text-xs sm:text-sm uppercase tracking-wider cursor-pointer transition-all duration-150 ${
                      isActive
                        ? 'border-accent text-accent shadow-[0_4px_0_0_rgba(21,182,232,1)] -translate-y-0.5'
                        : 'border-outline-variant/30 text-on-surface shadow-[0_4px_0_0_var(--color-outline-variant)] hover:border-accent hover:text-accent hover:shadow-[0_4px_0_0_rgba(21,182,232,1)] hover:-translate-y-0.5 active:shadow-[0_0px_0_0_rgba(21,182,232,1)] active:translate-y-1'
                    }`}
                  >
                    {category}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Main Gallery Grid from User Snippet */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {visible.map((project) => (
            <motion.div
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.35 }}
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className="group relative aspect-[5/3] overflow-hidden rounded-xl cursor-pointer bg-[#111]"
            >
              {/* Thumbnail */}
              <img
                src={project.imageUrl}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 pointer-events-none">
                <span className="text-xs uppercase tracking-[0.3em] mb-2 text-white/60">
                  {project.category}
                </span>
                <h3 className="text-xl md:text-2xl font-bold uppercase tracking-wider px-6 text-center text-white">
                  {project.title}
                </h3>
                {project.isVideo ? (
                  <div className="mt-4 px-5 py-2 rounded-full bg-white text-black font-semibold text-xs md:text-sm uppercase tracking-wider flex items-center gap-2 shadow-lg">
                    <svg className="w-3.5 h-3.5 fill-black" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                    Watch Video
                  </div>
                ) : (
                  <div className="mt-4 px-5 py-2 rounded-full bg-white text-black font-semibold text-xs md:text-sm uppercase tracking-wider flex items-center gap-2 shadow-lg">
                    <svg className="w-3.5 h-3.5 fill-black" viewBox="0 0 24 24">
                      <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
                    </svg>
                    View Image
                  </div>
                )}
              </div>
              {/* Small play badge (always visible on video cards) */}
              {project.isVideo && (
                <div className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-black/50 border border-white/20 backdrop-blur-sm flex items-center justify-center pointer-events-none">
                  <svg className="w-3.5 h-3.5 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                </div>
              )}
            </motion.div>
          ))}
          {filtered.length === 0 && (
            <div className="col-span-full flex justify-center py-24 text-mist font-bold">No projects found.</div>
          )}
        </motion.div>

        {/* Explore More / View Less */}
        <div className="flex justify-center pt-4 gap-4">
          {hasMore && (
            <Button3D onClick={handleLoadMore} arrowDirection="down" className="px-4 py-1 text-xs 2xl:text-sm">
              Explore More
            </Button3D>
          )}
          {isExpanded && !hasMore && (
            <Button3D onClick={handleViewLess} arrowDirection="up" className="px-4 py-1 text-xs 2xl:text-sm">
              View Less
            </Button3D>
          )}
          {isExpanded && hasMore && (
            <Button3D onClick={handleViewLess} arrowDirection="up" className="px-4 py-1 text-xs 2xl:text-sm">
              View Less
            </Button3D>
          )}
        </div>

      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div 
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12"
          >
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 bg-black/80 backdrop-blur-xl cursor-zoom-out"
              onClick={() => setSelectedProject(null)}
            />
            
            {/* Modal Content */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, filter: 'blur(20px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10 w-full max-w-4xl max-h-[85vh] flex flex-col"
            >
              <div className="bg-[#111] rounded-2xl overflow-hidden shadow-2xl relative w-full flex flex-col border border-white/10">
                {/* Responsive Close Button inside wrapper */}
                <button 
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 z-50 text-white/80 hover:text-white bg-black/60 backdrop-blur-md rounded-full p-2 border border-white/15 shadow-lg transition-all hover:scale-105 cursor-pointer"
                  aria-label="Close modal"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 6 6 18" />
                    <path d="m6 6 12 12" />
                  </svg>
                </button>

                {selectedProject.isVideo ? (
                  <div className="relative w-full aspect-video">
                    <iframe
                      src={selectedProject.embedUrl}
                      title={selectedProject.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="absolute inset-0 w-full h-full"
                      style={{ border: 'none' }}
                    />
                  </div>
                ) : (
                  <div className="relative w-full overflow-y-auto max-h-[60vh] flex items-center justify-center bg-black">
                    <img
                      src={selectedProject.imageUrl}
                      alt={selectedProject.title}
                      className="w-full h-auto max-h-[60vh] object-contain mx-auto"
                    />
                  </div>
                )}
                <div className="p-5 md:p-6 bg-[#0c0c0c] border-t border-white/10 backdrop-blur-md">
                  <p className="text-xs uppercase tracking-[0.4em] text-white/60 mb-1">
                    {selectedProject.category}
                  </p>
                  <h2 className="text-xl md:text-2xl font-bold uppercase tracking-wide text-white">
                    {selectedProject.title}
                  </h2>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
