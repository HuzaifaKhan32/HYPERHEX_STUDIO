'use client';

import React, { useRef, useState } from 'react';
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import Button3D from './Button3D';
import Image from 'next/image';

const BLACK = '#161d1e';
const ACCENT = '#15b6e8';
const MIST = '#9a9fa5';
const PAGE_SIZE = 3; // cards per "page" load

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

const ALL_PROJECTS = [
  { id: 'web-1', title: 'CE and Builders',     tags: ['Web Design', 'Live Site'], category: 'Web', type: 'image' as const, image: '/images/ce-and-builders.png', projectUrl: 'https://ceandbuilders.com/' },
  { id: 'web-2', title: 'Nayyer Builders',     tags: ['Development', 'Live Site'], category: 'Web', type: 'image' as const, image: '/images/nayyer-builder.png', projectUrl: 'https://nayyerbuilders.com/' },
  { id: 'web-3', title: 'Kurta Dukan',         tags: ['E-Commerce', 'Live Site'],  category: 'Web', type: 'image' as const, image: '/images/kurta-Dukan.png', projectUrl: 'https://www.kurtadukan.com/' },
  { id: 'web-4', title: 'Leather Crafted',     tags: ['E-Commerce', 'Live Site'],  category: 'Web', type: 'image' as const, image: '/images/leather-crafted.png', projectUrl: 'https://leather-crafted.com/' },
  { id: 'yt-1', title: 'I Handle The Heat',   tags: ['AI 3D', 'Animation'],   category: 'Animation',     type: 'video' as const, videoId: 'QM7FBByPTX8' },
  { id: 'yt-2', title: 'NS Arcade 3D',        tags: ['Arch Viz', 'Animation'], category: 'Animation',     type: 'video' as const, videoId: 'SXNb1vR_snw' },
  { id: 'yt-3', title: 'Commtel 3D Design',    tags: ['3D Design', 'Animation'],category: 'Animation',     type: 'video' as const, videoId: 'Jq_njk26M3E' },
  { id: 1,  title: 'HyperHex 3D Showcase',tags: ['Motion', 'Showcase'],   category: 'Animation',     type: 'video' as const, videoId: '7JT-j8gz5uU' },
  { id: 2,  title: 'Apex Vanguard V8',    tags: ['Automotive', 'Render'], category: 'Animation',     type: 'video' as const, videoId: '7wRGPltVun4' },
  { id: 3,  title: 'Hexa Core Identity',  tags: ['Abstract'],             category: 'Animation',     type: 'video' as const, videoId: 'YvvRPa5zVAM' },
  { id: 4,  title: 'Oculus Pavilion',     tags: ['Arch Viz'],             category: 'Animation',     type: 'video' as const, videoId: 'NJgPMovdV2Y' },
  { id: 5,  title: 'Governor House',      tags: ['Spatial Design'],       category: 'Animation',     type: 'video' as const, videoId: 'oQnWA-22Bf4' },
  { id: 6,  title: 'Naran Club',          tags: ['Motion', 'Video'],      category: 'Animation',     type: 'video' as const, videoId: 'a0ESDiUHZFI' },
  { id: 7,  title: 'Modern Apartment',    tags: ['Interior'],             category: 'Animation',     type: 'video' as const, videoId: 'QhWmY9lXlZY' },
  { id: 8,  title: 'Call Center Interior',tags: ['Architecture'],         category: 'Animation',     type: 'video' as const, videoId: '9JFPZnPXQ1Y' },
  { id: 9,  title: 'Mumtaz Residency',    tags: ['ArchViz'],              category: 'Animation',     type: 'video' as const, videoId: 'WKOskq3aIQQ' },
  { id: 10, title: 'Nexgen Heights',      tags: ['Architecture'],         category: 'Animation',     type: 'video' as const, videoId: 'm2FYElEVclc' },
  { id: 11, title: 'Car Configurator',    tags: ['Automotive', '3D'],     category: 'Visualization', type: 'image' as const, image: '/portfolio/car-configurator.jpg' },
  { id: 12, title: 'Commtel Project',     tags: ['Interactive', 'Web'],   category: 'Visualization', type: 'image' as const, image: '/portfolio/commtel.jpg' },
  { id: 13, title: 'Exterior House',      tags: ['Product Render'],       category: 'Visualization', type: 'image' as const, image: '/portfolio/exterior-house.jpg' },
  { id: 14, title: 'Governor House Render',tags:['ArchViz Render'],       category: 'Visualization', type: 'image' as const, image: '/portfolio/governor-house.jpg' },
  { id: 15, title: 'IVF Academy',         tags: ['UI/UX System'],         category: 'Visualization', type: 'image' as const, image: '/portfolio/IVF.png' },
  { id: 16, title: 'NS Arcade',           tags: ['ArchViz Render'],       category: 'Visualization', type: 'image' as const, image: '/portfolio/ns-arcade.jpg' },
  { id: 17, title: 'Luxury Watch 3D',     tags: ['Product Design'],       category: 'Visualization', type: 'image' as const, image: '/portfolio/watch.png' },
];

const CATEGORIES = ['All', 'Web', 'Animation', 'Visualization'];

// // ── Real YouTube play button SVG (official shape) ──────────────────────────
// function YouTubePlayButton() {
//   return (
//     <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
//       <svg
//         viewBox="0 0 68 48"
//         className="w-16 h-12 drop-shadow-[0_2px_12px_rgba(0,0,0,0.5)] transition-transform duration-300 group-hover:scale-110"
//       >
//         {/* Red rounded-rect background — the actual YouTube logo shape */}
//         <path
//           d="M66.52 7.74c-.78-2.93-2.49-5.41-5.42-6.19C55.79.13 34 0 34 0S12.21.13 6.9 1.55c-2.93.78-4.63 3.26-5.42 6.19C.06 13.05 0 24 0 24s.06 10.95 1.48 16.26c.78 2.93 2.49 5.41 5.42 6.19C12.21 47.87 34 48 34 48s21.79-.13 27.1-1.55c2.93-.78 4.64-3.26 5.42-6.19C67.94 34.95 68 24 68 24s-.06-10.95-1.48-16.26z"
//           fill="#FF0000"
//         />
//         {/* White triangle */}
//         <path d="M45 24 27 14v20z" fill="#fff" />
//       </svg>
//     </div>
//   );
// }

// // ── Video Card ─────────────────────────────────────────────────────────────
// function VideoCard({ project }: { project: (typeof ALL_PROJECTS)[number] & { type: 'video' } }) {
//   const [playing, setPlaying] = useState(false);
//   const thumbnailUrl = `https://img.youtube.com/vi/${project.videoId}/maxresdefault.jpg`;

//   return (
//     <motion.div
//       layout
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       exit={{ opacity: 0, y: 20 }}
//       transition={{ duration: 0.35 }}
//       className="group bg-surface-bright rounded-3xl cursor-pointer border-2 border-outline-variant/30 shadow-[0_4px_0_0_var(--color-outline-variant)] hover:border-[var(--color-accent)] hover:shadow-[0_4px_0_0_rgba(21,182,232,1)] transition-all duration-300 transform hover:-translate-y-1 flex flex-col p-3"
//     >
//       <div className="relative h-56 md:h-64 lg:h-72 w-full overflow-hidden rounded-2xl bg-black">
//         {!playing ? (
//           <>
//             {/* Thumbnail */}
//             <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-105">
//               <Image src={thumbnailUrl} alt={project.title} fill sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw" quality={85} className="object-cover" />
//             </div>

//             {/* Subtle dark scrim */}
//             <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300" />

//             {/* Official YouTube logo — click triggers play */}
//             <button
//               onClick={() => setPlaying(true)}
//               aria-label={`Play ${project.title}`}
//               className="absolute inset-0 w-full h-full z-20"
//             >
//               <YouTubePlayButton />
//             </button>

//             {/* Hover overlay: tags top, title bottom */}
//             <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-between p-5 z-[5] pointer-events-none">
//               <div className="flex flex-wrap gap-2 transform -translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
//                 {project.tags.map((tag) => (
//                   <span key={tag} className="px-2 pt-1 text-xs font-semibold tracking-widest bg-white/20 backdrop-blur-md text-white rounded-full uppercase">{tag}</span>
//                 ))}
//               </div>
//               <div className="flex flex-col gap-1.5 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
//                 <h3 className="text-2xl font-bold text-white tracking-wide">{project.title}</h3>
//               </div>
//             </div>
//           </>
//         ) : (
//           <iframe
//             src={`https://www.youtube.com/embed/${project.videoId}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
//             title={project.title}
//             allow="autoplay; encrypted-media; fullscreen"
//             allowFullScreen
//             className="absolute inset-0 w-full h-full rounded-2xl"
//             style={{ border: 0 }}
//           />
//         )}
//       </div>
//     </motion.div>
//   );
// }

// ── Image Card ─────────────────────────────────────────────────────────────
function ImageCard({ project }: { project: (typeof ALL_PROJECTS)[number] & { type: 'image' } }) {
  const handleClick = () => {
    if ('projectUrl' in project && project.projectUrl) {
      window.open(project.projectUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.35 }}
      onClick={handleClick}
      className="group bg-surface-bright rounded-3xl cursor-pointer border-2 border-outline-variant/30 shadow-[0_4px_0_0_var(--color-outline-variant)] hover:border-[var(--color-accent)] hover:shadow-[0_4px_0_0_rgba(21,182,232,1)] transition-all duration-300 transform hover:-translate-y-1 flex flex-col p-3"
    >
      <div className="relative h-56 md:h-64 lg:h-72 w-full overflow-hidden rounded-2xl">
        <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-105">
          <Image src={project.image!} alt={project.title} fill sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw" quality={85} className="object-cover" />
        </div>
        <div className="absolute inset-0 bg-black/35 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-between p-5">
          <div className="flex flex-wrap gap-2 transform -translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
            {project.tags.map((tag) => (
              <span key={tag} className="px-2 pt-1 text-xs font-semibold tracking-widest bg-white/20 backdrop-blur-md text-white rounded-full uppercase">{tag}</span>
            ))}
          </div>
          <div className="flex flex-col gap-1.5 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
            <h3 className="text-2xl font-bold text-white tracking-wide">{project.title}</h3>
            <span className="flex items-center gap-1.5 text-sm font-bold text-white group-hover:text-[var(--color-accent)] transition-colors duration-300">
              View Project
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ── Main Section ───────────────────────────────────────────────────────────
export default function LatestWorkVariant() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [visibleCount, setVisibleCount] = useState(6); // initial 3×3

  const filtered = ALL_PROJECTS.filter(
    (p) => activeCategory === 'All' || p.category === activeCategory
  );

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;
  const isExpanded = visibleCount > 6;

  const handleLoadMore = () => {
    if (hasMore) {
      setVisibleCount((prev) => prev + 6); // load 6 more
    }
  };

  const handleViewLess = () => {
    setVisibleCount(6); // collapse back to 3×3
  };

  // Reset visible count when category changes
  const handleCategory = (cat: string) => {
    setActiveCategory(cat);
    setVisibleCount(6);
  };

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

        {/* Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-8">
          {visible.map((project) =>
             <ImageCard key={project.id} project={project as any} />
          )}
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
    </section>
  );
}