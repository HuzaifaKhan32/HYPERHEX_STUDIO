import { MetadataRoute } from 'next';
import { SITE_CONFIG } from '@/lib/site-config';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_CONFIG.url;

  // Main indexable pages
  const routes = [
    '',
    '/services',
    '/projects',
    '/about',
    '/contact',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split('T')[0],
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  // Service pages (we will expand this dynamically as phase 3/4 content model is built)
  const serviceSlugs = [
    'architectural-visualization',
    '3d-product-visualization',
    '3d-product-configurators',
    'interactive-web-experiences',
    'vr-development',
    '3d-animation',
    'web-development',
    'interactive-real-time',
    'marketing-sales',
  ];

  const serviceRoutes = serviceSlugs.map((slug) => ({
    url: `${baseUrl}/services/${slug}`,
    lastModified: new Date().toISOString().split('T')[0],
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...routes, ...serviceRoutes];
}
