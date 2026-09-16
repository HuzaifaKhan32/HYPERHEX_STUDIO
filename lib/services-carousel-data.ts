export interface ServiceData {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  imagePath: string;
  imageAlt: string;
  category: string;
}

export const servicesData: ServiceData[] = [
  {
    id: 'product-visualization',
    number: '01 / 04',
    title: '3D Product',
    subtitle: 'Visualization',
    description: 'Create stunning 3D experiences and use beautiful custom elements',
    imagePath: '/services/Kamera.png',
    imageAlt: '3D Product Visualization',
    category: 'VISUALIZATION',
  },
  {
    id: 'ui-ux-design',
    number: '02 / 04',
    title: 'UI/UX',
    subtitle: 'Design',
    description: 'Craft intuitive interfaces that delight users and drive engagement',
    imagePath: '/services/laptop.png',
    imageAlt: 'UI/UX Design',
    category: 'DESIGN',
  },
  {
    id: 'web-development',
    number: '03 / 04',
    title: 'Web',
    subtitle: 'Development',
    description: 'Build powerful, performant web experiences with modern technologies',
    imagePath: '/services/laptop.png',
    imageAlt: 'Web Development',
    category: 'DEVELOPMENT',
  },
  {
    id: 'brand-identity',
    number: '04 / 04',
    title: 'Brand',
    subtitle: 'Identity',
    description: 'Develop distinctive brand systems that resonate with your audience',
    imagePath: '/services/speaker.png',
    imageAlt: 'Brand Identity',
    category: 'BRANDING',
  },
];
