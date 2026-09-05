import Image from 'next/image';

// Exact paths matching your public/clients-logo/ folder filenames
const CLIENT_LOGO_PATHS = {
  ahsan_associates: '/client-dark-logo/AHSAN-ASSOCIATES.webp',
  ahsan_town: '/client-dark-logo/ahsan.webp',
  ashaab: '/client-dark-logo/ashaab.webp',
  ce_and_builders: '/client-dark-logo/ce-and-builders.webp',
  commtel: '/client-dark-logo/commtel.webp',
  dha_city: '/client-dark-logo/dha-city.webp',
  ivf_academy: '/client-dark-logo/IVF-ACADEMY-USA.webp',
  jaguar: '/client-dark-logo/jaguar.webp',
  khalifa: '/client-dark-logo/khalifa.webp',
  lakhani: '/client-dark-logo/lakhani.webp',
  mumtaz: '/client-dark-logo/mumtaz.webp',
  nayyer: '/client-dark-logo/nayyer.webp',
  nexgen_heights: '/client-dark-logo/nexgen.webp',
  nr_interior: '/client-dark-logo/nr-interior.png',
  ns_arcade: '/client-dark-logo/ns-arcade.png',
  safari_village: '/client-dark-logo/safari.webp',
  ss_enterprises: '/client-dark-logo/ss-enterprise.png',
  stadium_view: '/client-dark-logo/stadium-view.webp',
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