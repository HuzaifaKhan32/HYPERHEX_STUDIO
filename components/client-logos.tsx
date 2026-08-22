import Image from 'next/image';

const CLIENT_LOGO_PATHS = {
  ahsan_associates: '/Clients logo/AHSAN ASSOCIATES.png',
  ahsan_town: '/Clients logo/AHSAN_TOWN-removebg-preview.png',
  ashaab: '/Clients logo/Ashaab_Logo_Final-03-removebg-preview.png',
  ce_and_builders: '/Clients logo/CE AND BUILDERS.png',
  commtel: '/Clients logo/COMMTEL-removebg-preview.png',
  ivf_academy: '/Clients logo/IVF ACADEMY USA.png',
  khalifa: '/Clients logo/KHALIFA-removebg-preview.png',
  lakhani: '/Clients logo/LAKHANI PROPERTIES.png',
  nayyer: '/Clients logo/Nayyer-Logo-FF-01-(1)-01-22.png',
  stadium_view: '/Clients logo/Stadium View Residencia_Upper Case Logo-02.png',
  dha_city: '/Clients logo/dha city.png',
} as const;

export type ClientLogoId = keyof typeof CLIENT_LOGO_PATHS;

export function ClientLogo({
  id,
  variant,
  className,
}: {
  id: ClientLogoId;
  variant: 'light' | 'dark';
  className?: string;
}) {
  const src = CLIENT_LOGO_PATHS[id];
  
  // Note: Since these are colored PNGs, 'variant' might not apply perfectly, 
  // but we can adjust CSS filters if needed (e.g., invert for dark themes).
  // For now, we'll just render the image.
  const scales: Partial<Record<ClientLogoId, string>> = {
    khalifa: 'scale(1.8)',
    ashaab: 'scale(1.6)',
    stadium_view: 'scale(1.6)',
  };

  return (
    <Image 
      src={src} 
      alt={`${id.replace(/_/g, ' ')} logo`} 
      width={200} 
      height={100} 
      className={`${className || ''} pointer-events-none select-none`}
      draggable={false}
      style={{ 
        objectFit: 'contain',
        transform: scales[id]
      }}
    />
  );
}
