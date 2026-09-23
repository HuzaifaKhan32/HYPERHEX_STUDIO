'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Button3D from './Button3D';
import StaggeredHeading from '@/components/ui/StaggeredHeading';
import SectionPill from '@/components/ui/SectionPill';

const BLACK = '#161d1e';
const ACCENT = '#15b6e8';

// Heading reveal: badge, then "Latest", then "Work" — staggered so the block
// reads as a sequence rather than a flat fade.
const headingContainerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.14, delayChildren: 0.05 } },
};
const headingItemVariants = {
  hidden: { opacity: 0, y: -36, filter: 'blur(12px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};

function LatestWorkHeading() {
  return (
    <motion.div
      className="flex w-full flex-col items-center justify-center text-center gap-3 select-none"
      variants={headingContainerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.18 }}
    >
      <motion.div variants={headingItemVariants}>
        <SectionPill label="Latest Work" />
      </motion.div>

      <h2 className="flex flex-wrap items-center justify-center gap-3 text-center text-5xl md:text-7xl lg:text-8xl 2xl:text-9xl font-black tracking-tight" style={{ fontFamily: 'var(--font-zalando-expanded, sans-serif)' }}>
        <motion.span variants={headingItemVariants} className="text-[#161d1e]">Latest</motion.span>
        <motion.span variants={headingItemVariants} className="bg-gradient-to-b from-[#15b6e8] to-transparent bg-clip-text text-transparent">Work</motion.span>
      </h2>
    </motion.div>
  );
}

import { PROJECTS, ProjectCategory as CategoryType, Project } from '@/lib/content-data';

const CATEGORIES = [
  'All',
  'Animations',
  'Drone',
  'Visualization',
  'Configurator',
  '360 Tour',
  'VR',
  'Interactive real-time',
  'Web',
  'Interior Designs',
  'AI Content Creation',
] as const;

const ALL_PROJECTS: Project[] = PROJECTS;


// Base grid-reveal variants used for the initial whileInView entrance. Only
// opacity/y are animated (compositor-friendly).
const cardVariants = {
  hidden: { opacity: 0, y: 36 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  },
};

// Separate variants for cards entering/leaving via "Explore More" / "View
// Less" — these mount on click, not on scroll, so they use `animate`
// instead of `whileInView` (see note on the element below for why the two
// must never be combined on the same card).
const drawerCardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.45,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  },
  exit: {
    opacity: 0,
    y: 24,
    scale: 0.96,
    transition: {
      duration: 0.3,
      ease: [0.4, 0, 1, 1] as [number, number, number, number],
    },
  },
};

const INITIAL_COUNT = 6;
const PAGE_SIZE = 6;
const STAGGER_STEP = 0.08;

// Memoized card component to prevent unnecessary re-renders
const ProjectCard = React.memo(({
  project,
  index,
  isDrawerCard,
  staggerIndex,
  onClick
}: {
  project: Project;
  index: number;
  isDrawerCard: boolean;
  staggerIndex: number;
  onClick: () => void;
}) => {
  return (
    <motion.div
      layout
      variants={isDrawerCard ? drawerCardVariants : cardVariants}
      initial="hidden"
      exit={isDrawerCard ? 'exit' : undefined}
      transition={{ delay: staggerIndex * STAGGER_STEP }}
      style={{ willChange: isDrawerCard ? 'transform, opacity' : undefined }}
      // Mutually exclusive triggers
      {...(isDrawerCard
        ? { animate: 'visible' }
        : { whileInView: 'visible', viewport: { once: true, margin: '-100px' } })}
      onClick={onClick}
      data-cursor="project"
      className="group relative aspect-[5/3] overflow-hidden rounded-xl cursor-pointer bg-[#111]"
    >
      {/* Thumbnail */}
      <Image
        src={project.imageUrl}
        alt={project.title}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        quality={90}
        loading={index < INITIAL_COUNT ? 'eager' : 'lazy'}
        priority={index < INITIAL_COUNT}
        className={`${project.objectFit === 'contain' ? 'object-contain' : 'object-cover'} object-center transition-transform duration-400 ease-out group-hover:scale-110`}
        unoptimized={false}
      />
      {/* Hover overlay */}
      <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 pointer-events-none">
        <span className="text-xs uppercase tracking-[0.3em] mb-2 text-white/60">
          {Array.isArray(project.category) ? project.category[0] : project.category}
        </span>
        <h3 className="text-xl md:text-2xl font-bold uppercase tracking-wider px-6 text-center text-white">
          {project.title}
        </h3>
        {project.comingSoon ? (
          <div className="mt-4 px-5 py-2 rounded-full bg-gradient-to-r from-accent to-accent-dim text-white font-semibold text-xs md:text-sm uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-accent/30">
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
            Coming Soon
          </div>
        ) : project.isVideo ? (
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
              <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
            </svg>
            View Image
          </div>
        )}
      </div>

      {/* Top-left Coming Soon badge with pulse */}
      {project.comingSoon && (
        <div className="absolute top-3 left-3 z-10 flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-accent to-accent-dim backdrop-blur-sm border border-accent/30 shadow-lg shadow-accent/20 pointer-events-none">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
          </span>
          <span className="text-[10px] font-bold uppercase tracking-wider text-white">Coming Soon</span>
        </div>
      )}

      {/* Top-right badge (video play icon or web external link icon) */}
      {!project.comingSoon && project.isVideo ? (
        <div className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-black/50 border border-white/20 backdrop-blur-sm flex items-center justify-center pointer-events-none">
          <svg className="w-3.5 h-3.5 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
        </div>
      ) : !project.comingSoon && project.projectUrl ? (
        <div className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-black/50 border border-white/20 backdrop-blur-sm flex items-center justify-center pointer-events-none">
          <svg className="w-3.5 h-3.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
            <polyline points="15 3 21 3 21 9"></polyline>
            <line x1="10" y1="14" x2="21" y2="3"></line>
          </svg>
        </div>
      ) : null}
    </motion.div>
  );
});

ProjectCard.displayName = 'ProjectCard';

export default function LatestWorkGallery() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);
  const [selectedProject, setSelectedProject] = useState<typeof ALL_PROJECTS[number] | null>(null);
  const [iframeError, setIframeError] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Projects matching active category ordered by CATEGORIES filter pill hierarchy
  const filtered = useMemo(() => {
    const list = ALL_PROJECTS.filter((p) => {
      if (activeCategory === 'All') return true;
      if (Array.isArray(p.category)) {
        return p.category.includes(activeCategory as CategoryType);
      }
      return p.category === activeCategory;
    });

    if (activeCategory === 'All') {
      const categoryOrderMap = new Map<string, number>();
      CATEGORIES.forEach((cat, idx) => {
        categoryOrderMap.set(cat, idx);
      });

      return [...list].sort((a, b) => {
        const catA = Array.isArray(a.category) ? a.category[0] : a.category;
        const catB = Array.isArray(b.category) ? b.category[0] : b.category;
        const orderA = categoryOrderMap.get(catA) ?? 99;
        const orderB = categoryOrderMap.get(catB) ?? 99;
        return orderA - orderB;
      });
    }

    return list;
  }, [activeCategory]);

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;
  const isExpanded = visibleCount > INITIAL_COUNT;

  const handleLoadMore = () => {
    if (hasMore) setVisibleCount((prev) => prev + PAGE_SIZE);
  };

  const handleViewLess = () => {
    setVisibleCount(INITIAL_COUNT);
  };

  const handleCategory = (cat: string) => {
    setActiveCategory(cat);
    setVisibleCount(INITIAL_COUNT);
  };

  const handlePrevImage = () => {
    if (!selectedProject?.gallery) return;
    setCurrentImageIndex((prev) => (prev === 0 ? selectedProject.gallery!.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    if (!selectedProject?.gallery) return;
    setCurrentImageIndex((prev) => (prev === selectedProject.gallery!.length - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
      setIframeError(false);
      setCurrentImageIndex(0); // Reset to first image when opening modal
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [selectedProject]);

  return (
    <section id="works" className="flex flex-col w-full bg-surface text-on-surface relative overflow-hidden font-[family-name:var(--font-dm-sans)] pb-6">
      <div className="max-w-[1280px] xl:max-w-[1400px] 2xl:max-w-none w-full mx-auto px-5 lg:px-16 2xl:px-24 pt-16 md:pt-16 2xl:pt-20 pb-8 flex flex-col gap-12 relative z-10">

        {/* Header */}
        <div className="flex flex-col gap-8 pb-8 border-b border-outline-variant/30">
          <div className="flex flex-col items-center justify-center text-center gap-6 w-full">
            <LatestWorkHeading />
            <div className="flex flex-col items-center justify-center text-center gap-3 w-full">
              {/* Parent Category Filters */}
              <motion.div
                className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 font-bold text-sm text-center w-full"
                variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.05, delayChildren: 0.3 } } }}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-100px' }}
              >
                {CATEGORIES.map((category) => {
                  const isActive = activeCategory === category;
                  return (
                    <motion.button
                      key={category}
                      type="button"
                      onClick={() => handleCategory(category)}
                      aria-pressed={isActive}
                      variants={{
                        hidden: { opacity: 0, y: 16 },
                        visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
                      }}
                      whileHover={{ y: -2 }}
                      whileTap={{ y: 1, scale: 0.97 }}
                      className={`flex items-center justify-center px-5 py-2.5 bg-surface-bright rounded-xl border-2 font-bold text-xs sm:text-sm uppercase tracking-wider cursor-pointer transition-[color,border-color,box-shadow] duration-150 ${isActive
                          ? 'border-accent text-accent shadow-[0_4px_0_0_rgba(21,182,232,1)]'
                          : 'border-outline-variant/30 text-on-surface shadow-[0_4px_0_0_var(--color-outline-variant)] hover:border-accent hover:text-accent hover:shadow-[0_4px_0_0_rgba(21,182,232,1)]'
                        }`}
                    >
                      {category}
                    </motion.button>
                  );
                })}
              </motion.div>
            </div>
          </div>
        </div>

        {/* Main Gallery Grid */}
        <motion.div
          key={activeCategory}
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          <AnimatePresence mode="popLayout">
            {visible.map((project, index) => {
              const isDrawerCard = index >= INITIAL_COUNT;
              const staggerIndex = isDrawerCard ? index - INITIAL_COUNT : index;

              return (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={index}
                  isDrawerCard={isDrawerCard}
                  staggerIndex={staggerIndex}
                  onClick={() => setSelectedProject(project)}
                />
              );
            })}
          </AnimatePresence>
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
                    {iframeError ? (
                      <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-black p-8 text-white">
                        <svg className="w-16 h-16 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                        <p className="text-center text-sm">Unable to load video. Please try opening it directly on YouTube.</p>
                        <a
                          href={`https://www.youtube.com/watch?v=${selectedProject.embedUrl?.split('/embed/')[1]?.split('?')[0]}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-2 px-6 py-2 bg-[#ff0000] hover:bg-[#cc0000] text-white rounded-lg font-semibold text-sm transition-colors"
                        >
                          Open in YouTube
                        </a>
                      </div>
                    ) : (
                      <iframe
                        src={selectedProject.embedUrl}
                        title={selectedProject.title}
                        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        onError={() => setIframeError(true)}
                        className="absolute inset-0 w-full h-full"
                        style={{ border: 'none' }}
                      />
                    )}
                  </div>
                ) : selectedProject.gallery ? (
                  <div className="relative w-full overflow-hidden bg-black" style={{ aspectRatio: '16/9' }}>
                    <AnimatePresence mode="wait" initial={false}>
                      <motion.div
                        key={currentImageIndex}
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -100 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="absolute inset-0 w-full h-full"
                      >
                        <Image
                          src={selectedProject.gallery[currentImageIndex]}
                          alt={`${selectedProject.title} - Image ${currentImageIndex + 1}`}
                          fill
                          sizes="100vw"
                          quality={100}
                          unoptimized
                          style={{ imageRendering: '-webkit-optimize-contrast' }}
                          className={`${selectedProject.objectFit === 'contain' ? 'object-contain' : 'object-cover'} object-center`}
                          priority
                        />
                      </motion.div>
                    </AnimatePresence>

                    {/* Navigation Buttons */}
                    {selectedProject.gallery.length > 1 && (
                      <>
                        <button
                          onClick={handlePrevImage}
                          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 text-white/80 hover:text-white bg-black/60 backdrop-blur-md rounded-full p-3 border border-white/15 shadow-lg transition-all hover:scale-110 active:scale-95 cursor-pointer"
                          aria-label="Previous image"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="m15 18-6-6 6-6" />
                          </svg>
                        </button>
                        <button
                          onClick={handleNextImage}
                          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 text-white/80 hover:text-white bg-black/60 backdrop-blur-md rounded-full p-3 border border-white/15 shadow-lg transition-all hover:scale-110 active:scale-95 cursor-pointer"
                          aria-label="Next image"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="m9 18 6-6-6-6" />
                          </svg>
                        </button>

                        {/* Image Counter */}
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 bg-black/60 backdrop-blur-md rounded-full px-4 py-2 border border-white/15 shadow-lg">
                          <span className="text-white text-sm font-semibold">
                            {currentImageIndex + 1} / {selectedProject.gallery.length}
                          </span>
                        </div>
                      </>
                    )}
                  </div>
                ) : (
                  <div className="relative w-full overflow-hidden bg-black" style={{ aspectRatio: '16/9' }}>
                    <Image
                      src={selectedProject.imageUrl}
                      alt={selectedProject.title}
                      fill
                      sizes="100vw"
                      quality={100}
                      unoptimized
                      style={{ imageRendering: '-webkit-optimize-contrast' }}
                      className={`${selectedProject.objectFit === 'contain' ? 'object-contain' : 'object-cover'} object-center`}
                      priority
                    />
                  </div>
                )}
                <div className="p-5 md:p-6 bg-[#0c0c0c] border-t border-white/10 backdrop-blur-md flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.4em] text-white/60 mb-1">
                      {Array.isArray(selectedProject.category) ? selectedProject.category.join(' • ') : selectedProject.category}
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