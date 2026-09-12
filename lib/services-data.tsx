import type { ReactNode } from 'react';

const iconClass = 'h-7 w-7';

export type ImageConfig = {
  fit: 'contain' | 'cover';
  position: string;
  scale: number;
  x: number;
  y: number;
  depth: number;
  hoverScale: number;
};

export type ServiceItem = {
  title: string;
  description: string;
  panel: 'cyan' | 'ink';
  href: string;
  icon: ReactNode;
  imagePath: string;
  imageConfig: ImageConfig;
  category: string;
  index: string;
};

export const services: ServiceItem[] = [
  {
    title: 'Architecture Visualization',
    description:
      'Photorealistic renders and spatial studies that communicate form, light, and material.',
    panel: 'cyan',
    href: '#works',
    imagePath: '/services/architecture.png',
    category: 'ARCHITECTURE',
    index: '01',
    imageConfig: {
      fit: 'cover',
      position: 'center 35%',
      scale: 1.05,
      x: 0,
      y: -5,
      depth: 25,
      hoverScale: 1.05,
    },
    icon: (
      <svg className={iconClass} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M3 21h18M5 21V9l7-5 7 5v12" stroke="currentColor" strokeWidth="1.75" strokeLinejoin="round" />
        <path d="M9 21v-6h6v6" stroke="currentColor" strokeWidth="1.75" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: '3D Product',
    description:
      'Studio-grade product modeling and rendering for e-commerce and campaigns.',
    panel: 'ink',
    href: '#works',
    imagePath: '/services/Kamera.png',
    category: '3D PRODUCT',
    index: '02',
    imageConfig: {
      fit: 'contain',
      position: 'center center',
      scale: 0.88,
      x: 0,
      y: 5,
      depth: 35,
      hoverScale: 1.05,
    },
    icon: (
      <svg className={iconClass} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 3 4.5 7.5v9L12 21l7.5-4.5v-9L12 3Z" stroke="currentColor" strokeWidth="1.75" strokeLinejoin="round" />
        <path d="M12 12V3M12 12l7.5-4.5M12 12 4.5 7.5" stroke="currentColor" strokeWidth="1.75" />
      </svg>
    ),
  },
  {
    title: '3D Product Configurator',
    description:
      'Real-time configurators with instant visual feedback and material swaps.',
    panel: 'cyan',
    href: '#works',
    imagePath: '/services/speaker.png',
    category: 'CONFIGURATOR',
    index: '03',
    imageConfig: {
      fit: 'contain',
      position: 'center center',
      scale: 0.90,
      x: 0,
      y: 8,
      depth: 35,
      hoverScale: 1.04,
    },
    icon: (
      <svg className={iconClass} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="3" y="7" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="1.75" />
        <circle cx="12" cy="13" r="3" stroke="currentColor" strokeWidth="1.75" />
        <path d="M8 7 9.5 4h5L16 7" stroke="currentColor" strokeWidth="1.75" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: '3D Animation',
    description:
      'Procedural animations and physics simulations for visual storytelling.',
    panel: 'ink',
    href: '#works',
    imagePath: '/services/Kamera.png',
    category: 'ANIMATION',
    index: '04',
    imageConfig: {
      fit: 'contain',
      position: 'center center',
      scale: 0.85,
      x: 0,
      y: 0,
      depth: 30,
      hoverScale: 1.06,
    },
    icon: (
      <svg className={iconClass} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M4 12c2-6 6-6 8 0s6 6 8 0M4 12c2 6 6 6 8 0s6-6 8 0"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    title: 'Interactive Web Experience',
    description:
      'Immersive spatial interfaces and scroll-driven narratives.',
    panel: 'cyan',
    href: '#works',
    imagePath: '/services/laptop.png',
    category: 'WEB',
    index: '05',
    imageConfig: {
      fit: 'contain',
      position: 'center center',
      scale: 0.92,
      x: 0,
      y: 5,
      depth: 28,
      hoverScale: 1.04,
    },
    icon: (
      <svg className={iconClass} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="2" y="4" width="20" height="16" rx="2" stroke="currentColor" strokeWidth="1.75" />
        <path d="M2 8h20M8 4v4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: 'VR Development',
    description:
      'Room-scale VR experiences for product demos and training.',
    panel: 'ink',
    href: '#works',
    imagePath: '/services/VR.png',
    category: 'VIRTUAL REALITY',
    index: '06',
    imageConfig: {
      fit: 'contain',
      position: 'center center',
      scale: 0.85,
      x: 0,
      y: 10,
      depth: 32,
      hoverScale: 1.05,
    },
    icon: (
      <svg className={iconClass} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M4 10a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v4a4 4 0 0 1-4 4h-1.5l-1.5 2h-3l-1.5-2H8a4 4 0 0 1-4-4v-4Z"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: 'Interactive Real-Time',
    description:
      'Unreal and WebGL pipelines for live configurators and digital twins.',
    panel: 'cyan',
    href: '#works',
    imagePath: '/services/real-time-interactive.png',
    category: 'REAL-TIME',
    index: '07',
    imageConfig: {
      fit: 'contain',
      position: 'center center',
      scale: 0.88,
      x: 0,
      y: 5,
      depth: 30,
      hoverScale: 1.05,
    },
    icon: (
      <svg className={iconClass} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.75" />
        <path d="M12 8v4l2.5 1.5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: 'Web Development',
    description:
      'Performance-first Next.js builds and front-end architecture.',
    panel: 'ink',
    href: '#works',
    imagePath: '/services/laptop.png',
    category: 'WEB DEV',
    index: '08',
    imageConfig: {
      fit: 'contain',
      position: 'center center',
      scale: 0.90,
      x: 0,
      y: 8,
      depth: 28,
      hoverScale: 1.04,
    },
    icon: (
      <svg className={iconClass} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M8 6l-4 6 4 6M16 6l4 6-4 6M14 4l-4 16" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: 'AI Content Creation',
    description:
      'AI-powered content generation and intelligent visual workflows.',
    panel: 'cyan',
    href: '#works',
    imagePath: '/services/speaker.png',
    category: 'AI CONTENT',
    index: '09',
    imageConfig: {
      fit: 'contain',
      position: 'center center',
      scale: 0.88,
      x: 0,
      y: 5,
      depth: 32,
      hoverScale: 1.05,
    },
    icon: (
      <svg className={iconClass} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 2L2 7v10l10 5 10-5V7L12 2z" stroke="currentColor" strokeWidth="1.75" strokeLinejoin="round" />
        <path d="M12 12l10-5M12 12v10M12 12L2 7" stroke="currentColor" strokeWidth="1.75" />
        <circle cx="12" cy="12" r="2" fill="currentColor" />
      </svg>
    ),
  },
  {
    title: 'Drone Animation',
    description:
      'Dynamic aerial cinematography and FPV drone simulations.',
    panel: 'cyan',
    href: '#works',
    imagePath: '/services/drone.png',
    category: 'DRONE',
    index: '10',
    imageConfig: {
      fit: 'contain',
      position: 'center center',
      scale: 0.92,
      x: 0,
      y: 8,
      depth: 30,
      hoverScale: 1.04,
    },
    icon: (
      <svg className={iconClass} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 12m-2 0a2 2 0 1 0 4 0a2 2 0 1 0-4 0" stroke="currentColor" strokeWidth="1.75" />
        <path d="M12 14l-4 4M12 10l4-4M10 12l-4-4M14 12l4 4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
        <circle cx="5" cy="5" r="2" stroke="currentColor" strokeWidth="1.75" />
        <circle cx="19" cy="19" r="2" stroke="currentColor" strokeWidth="1.75" />
        <circle cx="19" cy="5" r="2" stroke="currentColor" strokeWidth="1.75" />
        <circle cx="5" cy="19" r="2" stroke="currentColor" strokeWidth="1.75" />
      </svg>
    ),
  },
];