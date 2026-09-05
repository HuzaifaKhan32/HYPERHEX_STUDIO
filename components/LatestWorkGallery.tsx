'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Button3D from './Button3D';
import StaggeredHeading from '@/components/ui/StaggeredHeading';

const BLACK = '#161d1e';
const ACCENT = '#15b6e8';

// Heading reveal: badge, then "Latest", then "Work" — staggered so the block
// reads as a sequence rather than a flat fade.
const headingContainerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};
const headingItemVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
};

function LatestWorkHeading() {
  return (
    <motion.div
      className="flex flex-col gap-3 select-none"
      variants={headingContainerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
    >
      <motion.div
        variants={headingItemVariants}
        className="inline-flex w-fit items-center gap-2 rounded-full border border-[#bac9cc] bg-white px-4 py-2 shadow-sm transition-transform hover:-translate-y-0.5"
      >
        <span className="h-2 w-2 animate-pulse rounded-full bg-[#15b6e8]" />
        <span className="text-xs font-semibold tracking-wide text-[#3b494c]">
          Latest Work
        </span>
      </motion.div>

      <h2 className="flex flex-col text-4xl font-extrabold tracking-tight md:text-6xl lg:text-7xl 2xl:text-8xl">
        <motion.span variants={headingItemVariants} className="text-[#161d1e]">Latest</motion.span>
        <motion.span variants={headingItemVariants} className="bg-gradient-to-b from-[#15b6e8] to-transparent bg-clip-text text-transparent">Work</motion.span>
      </h2>
    </motion.div>
  );
}

const CATEGORIES = [
  'All',
  'Animations',
  "Visualization",
  'Configurator',
  '360 Tour',
  'VR',
  'Web',
  'Branding & Advertisement',
  'Interior & Construction',
] as const;

type CategoryType = (typeof CATEGORIES)[number];

type Project = {
  id: string;
  title: string;
  category: CategoryType | CategoryType[];
  imageUrl: string;
  embedUrl?: string;
  projectUrl?: string;
  isVideo: boolean;
};

// ── YouTube video helper ───────────────────────────────────────────────────
function yt(id: string, title: string, category: CategoryType | CategoryType[] = 'Animations'): Project {
  return {
    id,
    title,
    category,
    imageUrl: `/images/case-studies/${id}.webp`,
    embedUrl: `https://www.youtube.com/embed/${id}?autoplay=1&rel=0`,
    isVideo: true,
  };
}

function yt_drone(id: string, title: string, category: CategoryType | CategoryType[] = ['Animations', '360 Tour']): Project {
  return {
    id,
    title,
    category,
    imageUrl: `/images/case-studies/${id}.webp`,
    embedUrl: `https://www.youtube.com/embed/${id}?autoplay=1&rel=0`,
    isVideo: true,
  };
}

// ── Portfolio image helper ─────────────────────────────────────────────────
function imgProject(
  id: string,
  title: string,
  path: string,
  category: CategoryType | CategoryType[] = 'Interior & Construction'
): Project {
  return {
    id,
    title,
    category,
    imageUrl: path,
    isVideo: false,
  };
}

// ── Web live project helper ────────────────────────────────────────────────
function webProject(
  id: string,
  title: string,
  path: string,
  projectUrl: string,
  category: CategoryType | CategoryType[] = 'Web'
): Project {
  return {
    id,
    title,
    category,
    imageUrl: path,
    projectUrl,
    isVideo: false,
  };
}

const ALL_PROJECTS: Project[] = [
  webProject('web-ce', 'CE and Builders', '/images/ce-and-builders.webp', 'https://ceandbuilders.com/', ['Web', 'Interior & Construction']),
  webProject('web-nayyer', 'Nayyer Builders', '/images/nayyer-builder.webp', 'https://nayyerbuilders.com/', ['Web', 'Interior & Construction']),
  webProject('web-kurta', 'Kurta Dukan', '/images/kurta-Dukan.webp', 'https://www.kurtadukan.com/', ['Web', 'Branding & Advertisement']),
  webProject('web-leather', 'Leather Crafted', '/images/leather-crafted.webp', 'https://leather-crafted.com/', ['Web', 'Branding & Advertisement']),
  yt('QM7FBByPTX8', 'I Handle The Heat', ['Animations', 'Branding & Advertisement']),
  yt('SXNb1vR_snw', 'NS Arcade | 3D Animation', ['Animations', 'Interior & Construction']),
  yt('Jq_njk26M3E', 'Commtel | 3D Design & Animation', ['Animations', 'Branding & Advertisement']),
  yt('7JT-j8gz5uU', 'Luxury Watch 3D animation', ['Animations', 'Branding & Advertisement']),
  yt_drone('7wRGPltVun4', 'Jaguar Builder', ['Animations', '360 Tour', 'Interior & Construction']),
  yt_drone('YvvRPa5zVAM', 'Ahsan Town Project', ['Animations', '360 Tour', 'Interior & Construction']),
  yt_drone('NJgPMovdV2Y', 'Al Jannat Farmhouse', ['Animations', '360 Tour', 'Interior & Construction']),
  yt('QhWmY9lXlZY', 'Modern Apartment Interior Design', ['Interior & Construction', '360 Tour', 'Animations']),
  yt('oQnWA-22Bf4', 'Governor House – Conference Room', ['Interior & Construction', '360 Tour', 'Animations']),
  yt('9JFPZnPXQ1Y', 'Call Center Interior 3D', ['Interior & Construction', '360 Tour', 'Animations']),
  yt('WKOskq3aIQQ', 'Mumtaz Residency', ['Interior & Construction', 'Animations']),
  yt('m2FYElEVclc', 'Nexgen Heights', ['Interior & Construction', 'Animations']),
  imgProject('img-car', 'Car Configurator', '/portfolio/car-configurator.jpg', ['Configurator', 'VR']),
  imgProject('img-commtel', 'Commtel Project', '/portfolio/commtel.jpg', ['VR', '360 Tour', 'Branding & Advertisement']),
  imgProject('img-exterior', 'Exterior House', '/portfolio/exterior-house.jpg', ['Interior & Construction', '360 Tour']),
  imgProject('img-governor', 'Governor House Render', '/portfolio/governor-house.jpg', ['Interior & Construction', '360 Tour']),
  imgProject('img-ivf', 'IVF Academy', '/portfolio/IVF.png', ['Interior & Construction', 'Branding & Advertisement']),
  imgProject('img-arcade', 'NS Arcade', '/portfolio/ns-arcade.jpg', ['Interior & Construction', 'Branding & Advertisement']),
  imgProject('img-watch', 'Luxury Watch 3D', '/portfolio/watch.png', ['Branding & Advertisement', 'Animations']),
];

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

export default function LatestWorkGallery() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);
  const [selectedProject, setSelectedProject] = useState<typeof ALL_PROJECTS[number] | null>(null);

  const filtered = useMemo(
    () =>
      ALL_PROJECTS.filter((p) => {
        if (activeCategory === 'All') return true;
        if (Array.isArray(p.category)) {
          return p.category.includes(activeCategory as CategoryType);
        }
        return p.category === activeCategory;
      }),
    [activeCategory]
  );

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

  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [selectedProject]);

  return (
    <section id="works" className="flex flex-col w-full bg-surface text-on-surface relative overflow-hidden font-[family-name:var(--font-dm-sans)] pb-6">
      <div className="max-w-[1280px] xl:max-w-[1400px] 2xl:max-w-none w-full mx-auto px-5 lg:px-16 2xl:px-24 pt-16 md:pt-16 2xl:pt-20 pb-8 flex flex-col gap-12 relative z-10">

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 pb-8 border-b border-outline-variant/30">
          <div className="flex flex-col gap-6">
            <LatestWorkHeading />
            <motion.div
              className="flex flex-wrap items-center gap-2.5 sm:gap-3 font-bold text-sm"
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
                    className={`flex items-center justify-center px-5 py-2.5 bg-surface-bright rounded-xl border-2 font-bold text-xs sm:text-sm uppercase tracking-wider cursor-pointer transition-[color,border-color,box-shadow] duration-150 ${
                      isActive
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

        {/* Main Gallery Grid.
            Two distinct animation regimes share this grid — and critically,
            NEVER both on the same card:
            - Category switch remounts the whole set (key={activeCategory}),
              every visible card plays its scroll-triggered `whileInView`
              entrance, staggered by index.
            - "Explore More"/"View Less" does NOT remount the grid. Only
              cards beyond INITIAL_COUNT mount/unmount, and they use
              `animate` (mount-triggered) instead of `whileInView`, so their
              stagger delay actually fires instead of being resolved
              together with a conflicting trigger on the same element —
              that conflict (both `animate` and `whileInView` present at
              once) is what caused every card to previously snap to visible
              immediately regardless of its intended delay. */}
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
                <motion.div
                  key={project.id}
                  layout
                  variants={isDrawerCard ? drawerCardVariants : cardVariants}
                  initial="hidden"
                  exit={isDrawerCard ? 'exit' : undefined}
                  transition={{ delay: staggerIndex * STAGGER_STEP }}
                  // Mutually exclusive triggers — see comment above the grid.
                  {...(isDrawerCard
                    ? { animate: 'visible' }
                    : { whileInView: 'visible', viewport: { once: true, margin: '-100px' } })}
                  onClick={() => setSelectedProject(project)}
                  data-cursor="project"
                  className="group relative aspect-[5/3] overflow-hidden rounded-xl cursor-pointer bg-[#111]"
                >
                  {/* Thumbnail */}
                  <Image
                    src={project.imageUrl}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    quality={80}
                    loading={index < INITIAL_COUNT ? 'eager' : 'lazy'}
                    priority={index < 3}
                    className="object-cover transition-transform duration-400 ease-out group-hover:scale-110"
                  />
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 pointer-events-none">
                    <span className="text-xs uppercase tracking-[0.3em] mb-2 text-white/60">
                      {Array.isArray(project.category) ? project.category[0] : project.category}
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