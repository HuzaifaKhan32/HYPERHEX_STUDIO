'use client';

// CAROUSEL ONLY - Client Component
// This component handles ONLY the interactive carousel
// The wrapper (static parts) is in HeroSection.tsx (server component)

import ImageCarousel from './ImageCarousel';

const carouselImages = [
  {
    src: '/media/hero-loop-4.mp4',
    poster: '/media/hero-loop-4-thumbnail.webp',
    alt: 'Hero 3D Showcase Video',
    type: 'video' as const,
  },
  {
    src: '/media/hero-loop-5.mp4',
    poster: '/media/hero-loop-5-thumbnail.webp',
    alt: 'Hero 3D Showcase Video',
    type: 'video' as const,
  },
  {
    src: '/media/hero-loop-6.mp4',
    poster: '/media/hero-loop-6-thumbnail.webp',
    alt: 'Hero 3D Showcase Video',
    type: 'video' as const,
  },
  {
    src: '/media/hero-loop-7.mp4',
    poster: '/media/hero-loop-7-thumbnail.webp',
    alt: 'Hero 3D Showcase Video',
    type: 'video' as const,
  },
];

export default function HeroCarousel() {
  return (
    <ImageCarousel images={carouselImages} />
  );
}
