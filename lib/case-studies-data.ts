export interface CaseStudy {
  id: string;
  title: string;
  category: string;
  thumbnail: string;
  embedUrl: string;
  isVideo: boolean;
}

function createCaseStudy(
  id: string,
  title: string,
  category: string,
  isVideo: boolean = true
): CaseStudy {
  return {
    id,
    title,
    category,
    thumbnail: `/images/case-studies/${id}.jpg`,
    embedUrl: `https://www.youtube.com/embed/${id}?autoplay=1&rel=0`,
    isVideo,
  };
}

// ── Main Featured Case Studies (Deduplicated, Unique) ──────────────────────
export const MAIN_CASE_STUDIES: CaseStudy[] = [
  createCaseStudy('7JT-j8gz5uU', 'HyperHex Showcase', 'Animation / 3D'),
  createCaseStudy('7wRGPltVun4', 'Volvo Experience', 'Automotive / 3D'),
  createCaseStudy('YvvRPa5zVAM', 'Interactive Web', 'Interactive Web'),
  createCaseStudy('NJgPMovdV2Y', 'Exterior House', 'Product Render'),
  createCaseStudy('a0ESDiUHZFI', 'Governor House', 'Spatial Design'),
];

// ── Sub Featured Case Studies (Deduplicated, Unique) ───────────────────────
export const SUB_CASE_STUDIES: CaseStudy[] = [
  createCaseStudy('QhWmY9lXlZY', 'IVF Academy', 'UI/UX System'),
  createCaseStudy('oQnWA-22Bf4', 'NS Arcade', 'ArchViz Render'),
  createCaseStudy('9JFPZnPXQ1Y', 'Naran Club', 'Animation'),
  createCaseStudy('WKOskq3aIQQ', 'Modern Apartment', 'Architecture'),
  createCaseStudy('m2FYElEVclc', 'Call Center Design', 'Interior Design'),
];
