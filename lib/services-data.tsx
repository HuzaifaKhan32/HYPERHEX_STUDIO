import type { ReactNode } from 'react';

const iconClass = 'h-7 w-7';

export type ServiceItem = {
  title: string;
  description: string;
  panel: 'cyan' | 'ink';
  href: string;
  icon: ReactNode;
};

export const services: ServiceItem[] = [
  {
    title: 'Architecture Visualization',
    description:
      'Photorealistic renders and spatial studies that communicate form, light, and material before a single beam is placed.',
    panel: 'cyan',
    href: '#contact',
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
      'Studio-grade product modeling and rendering for e-commerce, pitch decks, and launch campaigns.',
    panel: 'ink',
    href: '#contact',
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
      'Real-time configurators that let users swap materials, colors, and options with instant visual feedback.',
    panel: 'cyan',
    href: '#contact',
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
      'High-end procedural animations and physics-based simulations for hyper-realistic visual storytelling.',
    panel: 'ink',
    href: '#contact',
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
      'Immersive spatial interfaces, scroll-driven narratives, and avant-garde UI/UX built for the browser.',
    panel: 'cyan',
    href: '#contact',
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
      'Room-scale and standalone VR experiences for product demos, training, and brand activations.',
    panel: 'ink',
    href: '#contact',
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
      'Unreal and WebGL pipelines for live configurators, digital twins, and real-time visualization.',
    panel: 'cyan',
    href: '#contact',
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
      'Performance-first Next.js builds, design-system integration, and production-ready front-end architecture.',
    panel: 'ink',
    href: '#contact',
    icon: (
      <svg className={iconClass} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M8 6l-4 6 4 6M16 6l4 6-4 6M14 4l-4 16" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: 'Marketing & Sales',
    description:
      'Campaign visuals, conversion-focused landing experiences, and sales enablement assets that drive revenue.',
    panel: 'cyan',
    href: '#contact',
    icon: (
      <svg className={iconClass} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M12 3v3M12 18v3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M3 12h3M18 12h3"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
        />
        <circle cx="12" cy="12" r="3.5" stroke="currentColor" strokeWidth="1.75" />
      </svg>
    ),
  },
];
