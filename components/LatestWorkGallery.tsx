'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import Button3D from './Button3D';
import Image from 'next/image';
import StaggeredHeading from '@/components/ui/StaggeredHeading';

const BLACK = '#161d1e';
const ACCENT = '#15b6e8';



function LatestWorkHeading() {
  return (
    <div className="w-full">
      {/* Mobile Heading */}
      <div className="md:hidden">
        <StaggeredHeading
          staggerDelay={0.07}
          lines={[
            {
              words: [{ text: 'Latest', color: BLACK }],
              className: 'text-[clamp(56px,18vw,84px)] leading-[0.92] tracking-[-0.05em]',
            },
            {
              words: [{ text: 'Work', color: ACCENT }],
              className: 'mt-2 text-[clamp(48px,10vw,72px)] leading-none tracking-[0.06em]',
            },
          ]}
        />
      </div>

      {/* Desktop Heading */}
      <div className="hidden md:block">
        <StaggeredHeading
          staggerDelay={0.07}
          lines={[
            {
              words: [{ text: 'Latest', color: BLACK }],
              className: 'text-[clamp(72px,6vw,120px)] leading-[0.95]',
            },
            {
              words: [{ text: 'Work', color: ACCENT }],
              className: 'text-[clamp(56px,4.5vw,84px)] leading-[0.95]',
            },
          ]}
        />
      </div>
    </div>
  );
}

type Project = {
  id: string;
  title: string;
  category: 'Animation' | 'Visualization' | 'Web' | "Drone Animation";
  imageUrl: string;
  embedUrl?: string;
  projectUrl?: string;
  isVideo: boolean;
};

// ── YouTube video helper ───────────────────────────────────────────────────
function yt(id: string, title: string, category: 'Animation' = 'Animation'): Project {
  return {
    id,
    title,
    category,
    imageUrl: `/images/case-studies/${id}.jpg`,
    embedUrl: `https://www.youtube.com/embed/${id}?autoplay=1&rel=0`,
    isVideo: true,
  };
}

function yt_drone(id: string, title: string, category: 'Drone Animation' = 'Drone Animation'): Project {
  return {
    id,
    title,
    category,
    imageUrl: `/images/case-studies/${id}.jpg`,
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

// ── Web live project helper ────────────────────────────────────────────────
function webProject(id: string, title: string, path: string, projectUrl: string): Project {
  return {
    id,
    title,
    category: 'Web',
    imageUrl: path,
    projectUrl,
    isVideo: false,
  };
}

const ALL_PROJECTS: Project[] = [
  webProject('web-ce', 'CE and Builders', '/images/ce-and-builders.png', 'https://ceandbuilders.com/'),
  webProject('web-nayyer', 'Nayyer Builders', '/images/nayyer-builder.png', 'https://nayyerbuilders.com/'),
  webProject('web-kurta', 'Kurta Dukan', '/images/kurta-Dukan.png', 'https://www.kurtadukan.com/'),
  webProject('web-leather', 'Leather Crafted', '/images/leather-crafted.png', 'https://leather-crafted.com/'),
  yt('QM7FBByPTX8', 'I Handle The Heat', 'Animation'),
  yt('SXNb1vR_snw', 'NS Arcade | 3D Animation', 'Animation'),
  yt('Jq_njk26M3E', 'Commtel | 3D Design & Animation', 'Animation'),
  yt('7JT-j8gz5uU', 'Luxury Watch 3D animation', 'Animation'),
  yt_drone('7wRGPltVun4', 'Jaguar Builder', 'Drone Animation'),
  yt_drone('YvvRPa5zVAM', 'Ahsan Town Project', 'Drone Animation'),
  yt_drone('NJgPMovdV2Y', 'Al Jannat Farmhouse', 'Drone Animation'),
  yt('QhWmY9lXlZY', 'Modern Apartment Interior Design', 'Animation'),
  yt('oQnWA-22Bf4', 'Governor House – Conference Room', 'Animation'),
  yt('9JFPZnPXQ1Y', 'Call Center Interior 3D', 'Animation'),
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

const CATEGORIES = ['All', 'Web', 'Animation', 'Visualization', "Drone Animation"] as const;

// Cards animate in once using whileInView on each card individually with index-based delay
const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  },
};

export default function LatestWorkGallery() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [visibleCount, setVisibleCount] = useState(6);
  const [selectedProject, setSelectedProject] = useState<typeof ALL_PROJECTS[number] | null>(null);
  const reduced = useReducedMotion();

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

        {/* Main Gallery Grid — each card reveals once, staggered by index */}
        <div
          key={activeCategory}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {visible.map((project, index) => (
            <motion.div
              key={project.id}
              variants={cardVariants}
              initial={reduced ? 'visible' : 'hidden'}
              whileInView="visible"
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: index * 0.08 }}
              onClick={() => setSelectedProject(project)}
              data-cursor="project"
              className="group relative aspect-[5/3] overflow-hidden rounded-xl cursor-pointer bg-[#111]"
            >
              {/* Thumbnail */}
              <img
                src={project.imageUrl}
                alt={project.title}
                loading="eager"
                decoding="async"
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
                ) : project.projectUrl ? (
                  <div className="mt-4 px-5 py-2 rounded-full bg-white text-black font-semibold text-xs md:text-sm uppercase tracking-wider flex items-center gap-2 shadow-lg">
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                      <polyline points="15 3 21 3 21 9"></polyline>
                      <line x1="10" y1="14" x2="21" y2="3"></line>
                    </svg>
                    View Project
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
              {/* Top-right badge (video play icon or web external link icon) */}
              {project.isVideo ? (
                <div className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-black/50 border border-white/20 backdrop-blur-sm flex items-center justify-center pointer-events-none">
                  <svg className="w-3.5 h-3.5 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                </div>
              ) : project.projectUrl ? (
                <div className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-black/50 border border-white/20 backdrop-blur-sm flex items-center justify-center pointer-events-none">
                  <svg className="w-3.5 h-3.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                    <polyline points="15 3 21 3 21 9"></polyline>
                    <line x1="10" y1="14" x2="21" y2="3"></line>
                  </svg>
                </div>
              ) : null}
            </motion.div>
          ))}
          {filtered.length === 0 && (
            <div className="col-span-full flex justify-center py-24 text-mist font-bold">No projects found.</div>
          )}
        </div>

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
                <div className="p-5 md:p-6 bg-[#0c0c0c] border-t border-white/10 backdrop-blur-md flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.4em] text-white/60 mb-1">
                      {selectedProject.category}
                    </p>
                    <h2 className="text-xl md:text-2xl font-bold uppercase tracking-wide text-white">
                      {selectedProject.title}
                    </h2>
                  </div>
                  {selectedProject.projectUrl && (
                    <a
                      href={selectedProject.projectUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-white font-bold text-xs sm:text-sm uppercase tracking-wider transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(21,182,232,0.4)] self-start sm:self-auto shrink-0"
                      style={{ backgroundColor: 'var(--color-accent)' }}
                    >
                      <span>Visit Live Site</span>
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                        <polyline points="15 3 21 3 21 9"></polyline>
                        <line x1="10" y1="14" x2="21" y2="3"></line>
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
