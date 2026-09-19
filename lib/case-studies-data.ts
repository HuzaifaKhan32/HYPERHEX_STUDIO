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
  isVideo: boolean = true,
  customThumbnail?: string
): CaseStudy {
  return {
    id,
    title,
    category,
    thumbnail: customThumbnail ?? `/images/case-studies/${id}.webp`,
    embedUrl: `https://www.youtube.com/embed/${id}?rel=0`,
    isVideo,
  };
}

// ── Main Featured Case Studies (Deduplicated, Unique) ──────────────────────
export const MAIN_CASE_STUDIES: CaseStudy[] = [
  createCaseStudy('7JT-j8gz5uU', 'Luxury Watch 3D Animation', 'Cinematic Product Visualization'),
  createCaseStudy('WKOskq3aIQQ', 'Mumtaz Residency', '3D Architecture Visualization'),
  createCaseStudy('oQnWA-22Bf4', 'Governor House – Conference Room', '3D Visualization', true, '/images/case-studies/governor-house.webp'),
  createCaseStudy('m2FYElEVclc', 'Nexgen Heights', '3D Architectural Animation', true, '/images/case-studies/nexgen.webp'),
  createCaseStudy('a0ESDiUHZFI', 'Naran Club', '3D Architectural Animation'),
];

// ── Sub Featured Case Studies (Deduplicated, Unique) ───────────────────────
export const SUB_CASE_STUDIES: CaseStudy[] = [
  createCaseStudy('QM7FBByPTX8', 'I Handle The Heat', 'AI 3D Animation'),
  createCaseStudy('YvvRPa5zVAM', 'Ahsan Town Project', 'Cinematic Drone Animation'),
  createCaseStudy('SXNb1vR_snw', 'NS Arcade', 'Architectural Visualization', true, '/images/case-studies/ns-arcade.webp'),
  createCaseStudy('xHP3l2UPVwk', 'Commtel', '3D Design & Planning', true, '/images/case-studies/commtel.webp'),
  createCaseStudy('QhWmY9lXlZY', 'Modern Apartment Interior Design ', '3D Visualization', true, '/images/case-studies/interior-3d.webp'),
  createCaseStudy('NJgPMovdV2Y', 'Al Jannat Farmhouse', 'Cinematic Drone Video'),
  createCaseStudy('9JFPZnPXQ1Y', 'Call Center Interior 3D', '3D Planning', true, '/images/case-studies/call-center.webp'),
  createCaseStudy('7wRGPltVun4', 'Jaguar Builders', 'Cinematic Drone Film'),
  
];
