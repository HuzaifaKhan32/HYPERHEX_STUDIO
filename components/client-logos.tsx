import Image from 'next/image';

// Exact paths matching your public/ folder filenames
const CLIENT_LOGO_PATHS = {
  ahsan_associates: '/clients-logo/ahsan-associates.webp',
  ahsan_town: '/clients-logo/ahsan-town.webp',
  ashaab: '/clients-logo/Ashaab_Logo_Final-03-removebg-preview.webp',
  ce_and_builders: '/clients-logo/CE AND BUILDERS-2.webp',
  commtel: '/clients-logo/COMMTEL-removebg-preview.webp',
  dha_city: '/clients-logo/dha-city.webp',
  ivf_academy: '/clients-logo/IVF ACADEMY USA.webp',
  khalifa: '/clients-logo/KHALIFA-removebg-preview.webp',
  lakhani: '/clients-logo/LAKHANI PROPERTIES.webp',
  nayyer: '/clients-logo/Nayyer-Logo-FF-01-(1)-01-22.webp',
  stadium_view: '/clients-logo/Stadium View Residencia_Upper Case Logo-02.webp',
} as const;

export type ClientLogoId = keyof typeof CLIENT_LOGO_PATHS;

// Optical weight scales visually calibrated from your asset preview:
const SCALES: Record<ClientLogoId, number> = {
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