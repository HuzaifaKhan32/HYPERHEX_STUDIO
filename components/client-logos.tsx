import Image from 'next/image';

// Exact paths matching your public/clients-logo/ folder filenames
const CLIENT_LOGO_PATHS = {
  ahsan_associates: '/clients-logo/ahsan-associates.webp',
  ahsan_town: '/clients-logo/ahsan-town.webp',
  ashaab: '/clients-logo/ashaab.webp',
  ce_and_builders: '/clients-logo/CE AND BUILDERS.webp',
  commtel: '/clients-logo/commtel.webp',
  dha_city: '/clients-logo/dha-city.webp',
  ivf_academy: '/clients-logo/IVF-ACADEMY-USA.webp',
  jaguar: '/clients-logo/jaguar.webp',
  khalifa: '/clients-logo/khalifa.webp',
  lakhani: '/clients-logo/LAKHANI-PROPERTIES.webp',
  mumtaz: '/clients-logo/mumtaz.webp',
  nayyer: '/clients-logo/nayyer.webp',
  nexgen_heights: '/clients-logo/nexgen-heights.webp',
  nr_interior: '/clients-logo/nr-interior.webp',
  ns_arcade: '/clients-logo/ns-arcade.png',
  safari_village: '/clients-logo/safari_village.webp',
  ss_enterprises: '/clients-logo/ss-enterprises.webp',
  stadium_view: '/clients-logo/stadium-view.webp',
} as const;

export type ClientLogoId = keyof typeof CLIENT_LOGO_PATHS;

// Optical weight scales visually calibrated from your asset preview:
const SCALES: Partial<Record<ClientLogoId, number>> = {
  // 🔴 Very Small / High Padding (Need Major Boost)
  stadium_view: 1.5,
  ashaab: 1.5,
  khalifa: 1.7,
  
  // 🟡 Medium / Boxed Badges (Need Moderate Boost)
  lakhani: 1,
  ahsan_town: 1,
  
  // 🟢 Horizontal Wide Logos (Slight Boost)
  commtel: 1,
  dha_city: 1,
  ivf_academy: 0.8,
  nayyer: 1.2,

  // 🔵 Bold / Tall Logos (Baseline Standard Scale)
  ahsan_associates: 1,
  ce_and_builders: 1,

  // 🟣 Additional / Newly Added Logos
  jaguar: 1,
  mumtaz: 1,
  nexgen_heights: 1,
  nr_interior: 1,
  ns_arcade: 1,
  safari_village: 1,
  ss_enterprises: 1,
};

export function ClientLogo({
  id,
  variant = 'light',
  className = '',
}: {
  id: ClientLogoId;
  variant?: 'light' | 'dark';
  className?: string;
}) {
  const src = CLIENT_LOGO_PATHS[id];
  const scale = SCALES[id] ?? 1;

  // Applies brightness/invert filter for dark mode variants if needed
  const variantStyles = variant === 'dark' ? 'brightness-0 invert' : '';

  return (
    <div className="flex items-center justify-center overflow-hidden py-2 px-1">
      <Image 
        src={src} 
        alt={`${id.replace(/_/g, ' ')} logo`} 
        width={200} 
        height={100} 
        quality={90}
        className={`max-h-10 w-auto object-contain pointer-events-none select-none ${variantStyles} ${className}`}
        draggable={false}
        style={{ 
          transform: `scale(${scale})`,
          imageRendering: 'auto',
        }}
      />
    </div>
  );
}