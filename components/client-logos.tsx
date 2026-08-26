import Image from 'next/image';

// Exact paths matching your public/ folder filenames
const CLIENT_LOGO_PATHS = {
  ahsan_associates: '/clients-logo/ahsan-associates.png',
  ahsan_town: '/clients-logo/ahsan-town.png',
  ashaab: '/clients-logo/Ashaab_Logo_Final-03-removebg-preview.png',
  ce_and_builders: '/clients-logo/CE AND BUILDERS.png',
  commtel: '/clients-logo/COMMTEL-removebg-preview.png',
  dha_city: '/clients-logo/dha city.png',
  ivf_academy: '/clients-logo/IVF ACADEMY USA.png',
  khalifa: '/clients-logo/KHALIFA-removebg-preview.png',
  lakhani: '/clients-logo/LAKHANI PROPERTIES.png',
  nayyer: '/clients-logo/Nayyer-Logo-FF-01-(1)-01-22.png',
  stadium_view: '/clients-logo/Stadium View Residencia_Upper Case Logo-02.png',
} as const;

export type ClientLogoId = keyof typeof CLIENT_LOGO_PATHS;

// Optical weight scales visually calibrated from your asset preview:
const SCALES: Record<ClientLogoId, number> = {
  // 🔴 Very Small / High Padding (Need Major Boost)
  stadium_view: 2.1,
  ashaab: 1.85,
  khalifa: 1.8,
  
  // 🟡 Medium / Boxed Badges (Need Moderate Boost)
  lakhani: 1.35,
  ahsan_town: 1.25,
  
  // 🟢 Horizontal Wide Logos (Slight Boost)
  commtel: 1.15,
  dha_city: 1.15,
  ivf_academy: 1.1,
  nayyer: 1.1,

  // 🔵 Bold / Tall Logos (Baseline Standard Scale)
  ahsan_associates: 1.0,
  ce_and_builders: 1.0,
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
    <div className="flex items-center justify-center overflow-hidden p-2">
      <Image 
        src={src} 
        alt={`${id.replace(/_/g, ' ')} logo`} 
        width={200} 
        height={100} 
        quality={90}
        className={`max-h-12 w-auto object-contain pointer-events-none select-none ${variantStyles} ${className}`}
        draggable={false}
        style={{ 
          transform: `scale(${scale})`,
          imageRendering: 'auto',
        }}
      />
    </div>
  );
}