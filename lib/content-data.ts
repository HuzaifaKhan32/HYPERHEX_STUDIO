export type ProjectCategory =
  | 'All'
  | 'Animations'
  | 'Drone'
  | 'Visualization'
  | 'Configurator'
  | '360 Tour'
  | 'VR'
  | 'Interactive real-time'
  | 'Web'
  | 'Interior Designs'
  | 'AI Content Creation';

export interface Project {
  id: string;
  slug: string;
  title: string;
  brand: string;
  category: ProjectCategory | ProjectCategory[];
  imageUrl: string;
  embedUrl?: string;
  projectUrl?: string;
  isVideo: boolean;
  gallery?: string[];
  comingSoon?: boolean;
  objectFit?: 'cover' | 'contain';
  client?: string;
  year?: string;
  description?: string;
  serviceIds?: string[];
  tags?: string[];
}

export interface Service {
  id: string;
  slug: string;
  counter: string;
  title: string;
  description: string;
  longDescription: string;
  imageSrc: string;
  capabilities: string[];
  processStep?: string[];
  relatedCategories: ProjectCategory[];
}

// ── Unified Services Data Source ───────────────────────────────────────────
export const SERVICES: Service[] = [
  {
    id: 'architectural-visualization',
    slug: 'architectural-visualization',
    counter: '01 / 09',
    title: 'Architecture Visualization',
    description: 'Photorealistic 3D interior & exterior rendering, spatial walkthroughs, and lighting simulation.',
    longDescription: 'We craft hyper-realistic architectural renders, spatial walkthroughs, and lighting simulations that translate blueprinted vision into tangible digital reality for real-estate developments, luxury homes, and commercial venues.',
    imageSrc: '/services/architecture.png',
    capabilities: [
      'Exterior 3D Rendering & Photomontage',
      'Luxury Interior Spatial Design',
      'Day & Night Lighting Simulation',
      'High-Resolution Promotional Stills',
      'Architectural Animation Walkthroughs'
    ],
    relatedCategories: ['Visualization', 'Interior Designs', '360 Tour'],
  },
  {
    id: '3d-product-visualization',
    slug: '3d-product-visualization',
    counter: '02 / 09',
    title: '3D Product Visualization',
    description: 'Studio-grade 3D product rendering, ray-traced materials, and high-precision visual showcases.',
    longDescription: 'Elevate physical products into flawless studio-grade 3D visual showcases. We craft ray-traced materials, macro-level texture fidelity, and cinematic lighting setups for luxury goods and industrial products.',
    imageSrc: '/services/Kamera.webp',
    capabilities: [
      'Macro Material & Texture Synthesis',
      'Studio Cinematic Lighting Setup',
      'Ray-Traced Product Stills',
      'Exploded-View & Mechanical Renders',
      'E-Commerce 360 Spin Visuals'
    ],
    relatedCategories: ['Visualization', 'Animations'],
  },
  {
    id: '3d-product-configurators',
    slug: '3d-product-configurators',
    counter: '03 / 09',
    title: '3D Product Configurators',
    description: 'Interactive real-time 3D configuration engines with instant material, color, and trim options.',
    longDescription: 'Empower customers to customize every aspect of luxury vehicles, timepieces, and manufactured goods in real-time with instant material swap, lighting controls, and photorealistic WebGL rendering.',
    imageSrc: '/services/real-time-interactive.webp',
    capabilities: [
      'Real-Time WebGL/Three.js Engines',
      'Instant Trim & Material Swapping',
      'Dynamic Camera Orbit Controls',
      'High-Poly Asset Optimization',
      'E-Commerce Cart Integration'
    ],
    relatedCategories: ['Configurator', 'Interactive real-time'],
  },
  {
    id: 'interactive-web-experiences',
    slug: 'interactive-web-experiences',
    counter: '04 / 09',
    title: 'Interactive Web Experiences',
    description: 'Immersive web applications featuring dynamic 3D stages, micro-interactions, and visual storytelling.',
    longDescription: 'Engineered web applications that blend editorial aesthetics with rich GPU-accelerated 3D stages, fluid page transitions, and captivating micro-interactions.',
    imageSrc: '/services/laptop.png',
    capabilities: [
      'GPU-Accelerated Web Stages',
      'Fluid Micro-Animations & Scroll Effects',
      'Interactive Storytelling Interfaces',
      'Headless & Next.js Architecture',
      'Responsive WebGL Frameworks'
    ],
    relatedCategories: ['Web', 'Interactive real-time'],
  },
  {
    id: 'vr-development',
    slug: 'vr-development',
    counter: '05 / 09',
    title: 'VR Development',
    description: 'Spatial virtual reality applications, virtual showrooms, and head-mounted interactive environments.',
    longDescription: 'Immerse stakeholders and clients in full-scale spatial virtual reality environments, virtual showrooms, and interactive headset walkthroughs built for WebXR and dedicated HMD platforms.',
    imageSrc: '/services/VR.webp',
    capabilities: [
      'WebXR & HMD Spatial Environments',
      'Interactive Virtual Showrooms',
      'Zero-Latency Spatial Physics',
      'Multi-User Collaborative VR',
      'Spatial Audio Integration'
    ],
    relatedCategories: ['VR', '360 Tour'],
  },
  {
    id: '3d-animation',
    slug: '3d-animation',
    counter: '06 / 09',
    title: 'Drone Animation',
    description: 'Cinematic aerial drone animations, masterplan fly-throughs, and high-impact FPV site showcases.',
    longDescription: 'Capture breathtaking aerial perspectives with broadcast-quality drone animations, masterplan fly-throughs, site survey visualisations, and immersive FPV aerial sequences.',
    imageSrc: '/services/drone.webp',
    capabilities: [
      'Cinematic Aerial Choreography',
      'Masterplan Fly-Through Films',
      'Architectural Site Overview',
      'FPV & Drone Visualizations',
      'Sound Design & Audio Synchronization'
    ],
    relatedCategories: ['Animations', 'Drone', 'AI Content Creation'],
  },
  {
    id: 'web-development',
    slug: 'web-development',
    counter: '07 / 09',
    title: 'Web Development',
    description: 'Performant, scalable full-stack web platforms engineered with modern frontend technologies.',
    longDescription: 'Production-ready digital platforms built with Next.js, TypeScript, and modern headless CMS infrastructure to ensure ultra-fast load times, SEO indexability, and bulletproof security.',
    imageSrc: '/services/laptop.png',
    capabilities: [
      'Next.js App Router Architecture',
      'Custom Headless CMS Integration',
      'Lighthouse & Core Web Vitals Optimization',
      'Responsive Cross-Device Layouts',
      'API & Backend Microservices'
    ],
    relatedCategories: ['Web'],
  },
  {
    id: 'interactive-real-time',
    slug: 'interactive-real-time',
    counter: '08 / 09',
    title: 'Interactive Real Time',
    description: 'Real-time 3D graphics engines delivering zero-latency visual feedback and physical interactions.',
    longDescription: 'High-performance interactive 3D graphics engines delivering zero-latency visual feedback, physics simulation, and real-time ray-traced viewports in browser and desktop applications.',
    imageSrc: '/services/real-time-interactive.webp',
    capabilities: [
      'Zero-Latency Shader Systems',
      'Physically Based Render Pipelines',
      'Real-Time Lighting & Reflections',
      'Cross-Platform Web Graphics',
      'Custom Shader Controls'
    ],
    relatedCategories: ['Interactive real-time', 'Configurator'],
  },
  {
    id: 'marketing-sales',
    slug: 'marketing-sales',
    counter: '09 / 09',
    title: 'Marketing & Sales',
    description: 'High-converting digital brand assets, interactive sales tools, and strategic media campaigns.',
    longDescription: 'Strategic digital marketing collateral, interactive sales toolkits, and social media campaigns designed to convert viewers into high-value clients across commercial real estate, luxury retail, and tech.',
    imageSrc: '/services/speaker.webp',
    capabilities: [
      'Interactive Sales Presentations',
      'High-Impact Pitch Decks & Media',
      'AI Content & Social Media Visuals',
      'Brand Identity & Motion Toolkits',
      'Conversion-Optimized Landing Stages'
    ],
    relatedCategories: ['AI Content Creation', 'Web', 'Animations'],
  },
];

// Helper functions for YouTube videos & image projects
function createYtProject(
  id: string,
  slug: string,
  title: string,
  category: ProjectCategory | ProjectCategory[],
  imageUrl?: string,
  brand?: string,
  objectFit?: 'cover' | 'contain',
  serviceIds?: string[],
  description?: string
): Project {
  return {
    id,
    slug,
    title,
    brand: brand || title.split('|')[0].trim().split('–')[0].trim(),
    category,
    imageUrl: imageUrl || `/images/case-studies/${id}.webp`,
    embedUrl: `https://www.youtube.com/embed/${id}?rel=0`,
    isVideo: true,
    objectFit,
    serviceIds,
    description: description || `Cinematic 3D animation and visual production for ${title}.`,
  };
}

function createWebProject(
  id: string,
  slug: string,
  title: string,
  path: string,
  projectUrl: string,
  brand: string,
  serviceIds: string[] = ['web-development'],
  description?: string
): Project {
  return {
    id,
    slug,
    title,
    brand,
    category: 'Web',
    imageUrl: path,
    projectUrl,
    isVideo: false,
    serviceIds,
    description: description || `Full-stack web application designed and engineered for ${title}.`,
  };
}

function createImgProject(
  id: string,
  slug: string,
  title: string,
  path: string,
  category: ProjectCategory | ProjectCategory[],
  brand?: string,
  gallery?: string[],
  comingSoon?: boolean,
  objectFit?: 'cover' | 'contain',
  serviceIds?: string[],
  description?: string
): Project {
  return {
    id,
    slug,
    title,
    brand: brand || title.split('|')[0].trim().split('–')[0].trim(),
    category,
    imageUrl: path,
    isVideo: false,
    gallery,
    comingSoon,
    objectFit,
    serviceIds,
    description: description || `High-precision 3D render showcase and spatial project for ${title}.`,
  };
}

// ── Unified Projects Data Source ───────────────────────────────────────────
export const PROJECTS: Project[] = [
  // 1. Animations
  createYtProject('jnaCWbBifcQ', 'ai-vision-studio', 'AI Vision Studio', 'Animations', '/portfolio/vision.webp', 'Vision Studio', undefined, ['3d-animation'], 'Cinematic studio motion and visual identity animation.'),
  createYtProject('etXi1RoYDnA', 'stadium-view-visualization', 'Stadium View Visualization', 'Animations', '/portfolio/stadium-view-visualization.webp', 'Stadium View Visualization', undefined, ['architectural-visualization', '3d-animation'], 'Large-scale arena spatial rendering and dynamic lighting fly-through.'),
  createYtProject('SXNb1vR_snw', 'ns-arcade-3d-animation', 'NS Arcade | 3D Animation', 'Animations', '/portfolio/ns-arcade.webp', 'NS Arcade', undefined, ['architectural-visualization', '3d-animation'], '3D commercial plaza animation showcasing interior arcade and retail spaces.'),
  createYtProject('Jq_njk26M3E', 'commtel-3d-design', 'Commtel | 3D Design & Animation', 'Animations', '/portfolio/commtel.webp', 'Commtel', undefined, ['3d-product-visualization', '3d-animation'], 'Industrial telecom device breakdown and 3D product animation.'),
  createYtProject('7JT-j8gz5uU', 'luxury-watch-3d-animation', 'Luxury Watch 3D Animation', 'Animations', undefined, 'Luxury Watch', undefined, ['3d-product-visualization', '3d-animation'], 'Ray-traced luxury wristwatch animation with photorealistic macro detail.'),
  createYtProject('WKOskq3aIQQ', 'mumtaz-residency', 'Mumtaz Residency', 'Animations', undefined, 'Mumtaz Residency', undefined, ['architectural-visualization', '3d-animation'], 'High-rise residential tower exterior render and elevation animation.'),
  createYtProject('m2FYElEVclc', 'nexgen-heights', 'Nexgen Heights', 'Animations', undefined, 'Nexgen Heights', undefined, ['architectural-visualization', '3d-animation'], 'Mixed-use skyscraper 3D architectural animation and nighttime lighting.'),

  // 2. Drone
  createYtProject('7wRGPltVun4', 'jaguar-builder', 'Jaguar Builder', ['Drone', 'Animations', '360 Tour'], undefined, 'Jaguar', 'contain', ['3d-animation', 'architectural-visualization'], 'Cinematic aerial drone film and architectural site overview for Jaguar Builders.'),
  createYtProject('YvvRPa5zVAM', 'ahsan-town-project', 'Ahsan Town Project', ['Drone', 'Animations', '360 Tour'], undefined, 'Ahsan Town', undefined, ['3d-animation', 'architectural-visualization'], 'Masterplan aerial drone animation and urban development showcase.'),
  createYtProject('NJgPMovdV2Y', 'al-jannat-farmhouse', 'Al Jannat Farmhouse', ['Drone', 'Animations', '360 Tour'], undefined, 'Al Jannat', undefined, ['3d-animation', 'architectural-visualization'], 'Luxury estate drone film highlighting expansive grounds and landscaping.'),

  // 3. Visualization
  createImgProject('img-nexgen', 'nexgen-heights-stills', 'Nexgen Heights Gallery', '/portfolio/nexgen-1.webp', ['Visualization'], 'Nexgen Heights', [
    '/portfolio/nexgen-1.webp',
    '/portfolio/nexgen-2.webp',
    '/portfolio/nexgen-3.webp',
    '/portfolio/nexgen-4.webp',
    '/portfolio/nexgen-5.webp',
    '/portfolio/nexgen-6.webp',
    '/portfolio/nexgen-7.webp',
    '/portfolio/nexgen-8.webp',
    '/portfolio/nexgen-9.webp',
    '/portfolio/nexgen-10.webp',
    '/portfolio/nexgen-11.webp',
    '/portfolio/nexgen-12.webp',
    '/portfolio/nexgen-13.webp',
  ], false, undefined, ['architectural-visualization'], 'Comprehensive exterior and interior render suite for Nexgen Heights.'),
  createImgProject('img-commtel', 'commtel-project', 'Commtel Project Stills', '/portfolio/commtel.webp', ['Visualization'], 'Commtel', undefined, false, undefined, ['3d-product-visualization'], 'High-detail product stills for Commtel hardware devices.'),
  createImgProject('img-arcade', 'ns-arcade-stills', 'NS Arcade Stills', '/portfolio/ns-arcade.webp', ['Visualization'], 'NS Arcade', undefined, false, undefined, ['architectural-visualization'], 'Commercial plaza exterior elevation rendering for NS Arcade.'),
  createImgProject('img-watch', 'luxury-watch-3d-stills', 'Luxury Watch 3D Stills', '/portfolio/watch.png', ['Visualization'], 'Luxury Watch', undefined, false, undefined, ['3d-product-visualization'], 'Studio macro product shots of luxury watch mechanism.'),
  createImgProject('img-dha-suffa', 'dha-suffa-university', 'DHA Suffa University', '/portfolio/dha-suffa-4.webp', ['Visualization'], 'DHA Suffa University', [
    '/portfolio/dha-suffa.webp',
    '/portfolio/dha-suffa-2.webp',
    '/portfolio/dha-suffa-3.webp',
    '/portfolio/dha-suffa-4.webp',
  ], false, undefined, ['architectural-visualization'], 'Educational campus architectural visualization and site planning.'),

  // 4. Configurator & Interactive Real-Time
  createImgProject('img-car', 'car-configurator', 'Car Configurator Engine', '/portfolio/car-configurator.jpg', ['Configurator', 'Interactive real-time'], 'Car Configurator', undefined, false, undefined, ['3d-product-configurators', 'interactive-real-time'], 'Real-time 3D vehicle customization engine with dynamic shader controls.'),

  // 5. 360 Tour
  createImgProject('img-esouth', 'e-south-360-tour', 'E-South 360 Tour', '/portfolio/e-south.webp', ['360 Tour'], 'E-South', undefined, true, undefined, ['vr-development', 'architectural-visualization'], 'Interactive 360 virtual tour of E-South complex.'),
  createImgProject('img-amna', 'amna-ashraf-360-tour', 'Amna Ashraf 360 Tour', '/portfolio/amna-ashraf.webp', ['360 Tour'], 'Amna Ashraf', undefined, true, undefined, ['vr-development', 'architectural-visualization'], 'Interactive 360 virtual walkthrough for Amna Ashraf residence.'),

  // 6. VR
  createYtProject('8-daQ4f573M', 'vr-experience', 'VR Experience', 'VR', '/portfolio/VR.webp', 'VR Experience', 'contain', ['vr-development'], 'Immersive virtual reality spatial experience with interactive controls.'),

  // 7. Web
  createWebProject('web-ce', 'ce-and-builders', 'CE and Builders', '/images/ce-and-builders.webp', 'https://ceandbuilders.com/', 'CE and Builders', ['web-development', 'interactive-web-experiences'], 'High-performance construction and real-estate platform engineered for CE and Builders.'),
  createWebProject('web-nayyer', 'nayyer-builders', 'Nayyer Builders', '/images/nayyer-builder.webp', 'https://nayyerbuilders.com/', 'Nayyer Builders', ['web-development', 'interactive-web-experiences'], 'Modern architectural portal showcasing property developments for Nayyer Builders.'),
  createWebProject('web-kurta', 'kurta-dukan', 'Kurta Dukan', '/images/kurta-Dukan.webp', 'https://www.kurtadukan.com/', 'Kurta Dukan', ['web-development', 'marketing-sales'], 'E-commerce fashion platform with custom product showcase for Kurta Dukan.'),
  createWebProject('web-leather', 'leather-crafted', 'Leather Crafted', '/portfolio/leather-crafted.webp', 'https://leather-crafted.com/', 'Leather Crafted', ['web-development', '3d-product-visualization'], 'Luxury leather goods e-commerce experience showcasing artisan craftsmanship.'),

  // 8. Interior Designs
  createYtProject('QhWmY9lXlZY', 'modern-apartment-interior', 'Modern Apartment Interior Design', ['Interior Designs', 'Animations'], '/portfolio/interior-3d.webp', 'Modern Apartment', undefined, ['architectural-visualization'], 'Photorealistic interior design walkthrough for a modern luxury penthouse.'),
  createYtProject('oQnWA-22Bf4', 'governor-house-conference-room', 'Governor House – Conference Room', ['Interior Designs', 'Animations'], '/portfolio/governor-house.webp', 'Governor House', undefined, ['architectural-visualization'], 'State conference hall 3D interior design walkthrough and lighting setup.'),
  createYtProject('9JFPZnPXQ1Y', 'call-center-interior-3d', 'Call Center Interior 3D', ['Interior Designs', 'Animations'], '/portfolio/call-center.webp', 'Call Center', undefined, ['architectural-visualization'], 'Commercial corporate interior layout and workstation spatial rendering.'),
  createImgProject('img-governor', 'governor-house-render', 'Governor House Stills', '/portfolio/governor-house.webp', ['Interior Designs', 'Visualization'], 'Governor House', undefined, false, undefined, ['architectural-visualization'], 'Official architectural interior stills for Governor House conference room.'),
  createImgProject('img-bedroom', 'luxury-bedroom-suite', 'Luxury Bedroom Suite', '/portfolio/bedroom.webp', ['Interior Designs', 'Visualization'], 'Luxury Bedroom', [
    '/portfolio/bedroom.webp',
    '/portfolio/washroom.webp',
    '/portfolio/kitchen.webp',
    '/portfolio/lounge.webp',
    '/portfolio/swimming-pool.webp'
  ], false, undefined, ['architectural-visualization'], 'High-end interior design suite including master bedroom, washroom, kitchen, lounge, and pool.'),

  // 9. AI Content Creation
  createYtProject('Xz3ssJbRLJ4', 'ai-stadium-view', 'AI Stadium View', 'AI Content Creation', '/portfolio/stadium-view.webp', 'Stadium View', undefined, ['marketing-sales', '3d-animation'], 'Generative AI content creation and stadium visualization.'),
  createYtProject('yU94W0ca258', 'ai-view-creation', 'AI View Creation', 'AI Content Creation', '/portfolio/view.webp', 'View Creation', undefined, ['marketing-sales', '3d-animation'], 'AI-augmented environmental scene generation and motion rendering.'),
  createYtProject('QM7FBByPTX8', 'i-handle-the-heat', 'I Handle The Heat', ['AI Content Creation', 'Animations'], undefined, 'I Handle The Heat', undefined, ['3d-animation', 'marketing-sales'], 'High-energy commercial animation with AI effects.'),
];

// Helper Selectors
export function getServiceBySlug(slug: string): Service | undefined {
  return SERVICES.find((s) => s.slug === slug || s.id === slug);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug || p.id === slug);
}

export function getProjectsByService(serviceId: string): Project[] {
  const service = getServiceBySlug(serviceId);
  if (!service) return [];
  return PROJECTS.filter((project) => {
    if (project.serviceIds?.includes(service.id)) return true;
    if (Array.isArray(project.category)) {
      return project.category.some((cat) => service.relatedCategories.includes(cat));
    }
    return service.relatedCategories.includes(project.category);
  });
}

export function getProjectsByCategory(category: ProjectCategory): Project[] {
  if (category === 'All') return PROJECTS;
  return PROJECTS.filter((p) => {
    if (Array.isArray(p.category)) {
      return p.category.includes(category);
    }
    return p.category === category;
  });
}
