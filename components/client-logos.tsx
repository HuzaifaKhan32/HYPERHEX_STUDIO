import type { SVGProps } from 'react';

type LogoProps = SVGProps<SVGSVGElement> & {
  variant: 'light' | 'dark';
};

/** HyperHex theme palette — matches globals.css tokens */
const T = {
  ink: '#0a0a0a',
  paper: '#ffffff',
  mist: '#9a9fa5',
  accent: '#15b6e8',
  accentDim: '#0c86ac',
  primary: '#006875',
  primaryContainer: '#00e3fd',
  onSurface: '#161d1e',
  onSurfaceVariant: '#3b494c',
  inverseOnSurface: '#ebf2f4',
} as const;

export function NikeLogo({ variant, ...props }: LogoProps) {
  const fill = variant === 'light' ? T.onSurface : T.paper;
  return (
    <svg viewBox="0 0 120 48" fill="none" aria-hidden="true" {...props}>
      <path
        d="M8 36C28 14 48 8 72 10c14 1 24 6 32 14-18-4-34-2-48 8-10 8-18 18-24 28l-8-10Z"
        fill={fill}
      />
    </svg>
  );
}

export function BmwLogo({ variant, ...props }: LogoProps) {
  const ring = variant === 'light' ? T.onSurface : T.paper;
  return (
    <svg viewBox="0 0 80 80" fill="none" aria-hidden="true" {...props}>
      <circle cx="40" cy="40" r="36" stroke={ring} strokeWidth="4" />
      <circle cx="40" cy="40" r="22" stroke={ring} strokeWidth="3" />
      <path d="M40 4v72M4 40h72" stroke={ring} strokeWidth="3" />
    </svg>
  );
}

export function SpotifyLogo({ variant, ...props }: LogoProps) {
  const fill = variant === 'light' ? T.accent : T.primaryContainer;
  const wave = variant === 'light' ? T.paper : T.ink;
  return (
    <svg viewBox="0 0 120 48" fill="none" aria-hidden="true" {...props}>
      <circle cx="24" cy="24" r="20" fill={fill} />
      <path
        d="M16 22c12-4 24-4 36 0M14 30c14-4 28-4 42 0M12 38c16-4 32-4 48 0"
        stroke={wave}
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function AdobeLogo({ variant, ...props }: LogoProps) {
  const primary = variant === 'light' ? T.accent : T.primaryContainer;
  const secondary = variant === 'light' ? T.primary : T.mist;
  return (
    <svg viewBox="0 0 100 48" fill="none" aria-hidden="true" {...props}>
      <path d="M18 4h24L58 44H34L18 4Z" fill={primary} />
      <path d="M42 4h24l16 40H58L42 4Z" fill={secondary} />
    </svg>
  );
}

export function TeslaLogo({ variant, ...props }: LogoProps) {
  const fill = variant === 'light' ? T.onSurface : T.paper;
  return (
    <svg viewBox="0 0 100 48" fill="none" aria-hidden="true" {...props}>
      <path d="M50 6l28 14v6L50 28 22 20v-6L50 6Z" fill={fill} />
      <path d="M50 28v18M38 44h24" stroke={fill} strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}

export function MetaLogo({ variant, ...props }: LogoProps) {
  const stroke = variant === 'light' ? T.accentDim : T.primaryContainer;
  return (
    <svg viewBox="0 0 120 48" fill="none" aria-hidden="true" {...props}>
      <path
        d="M24 32c0-10 6-18 14-18 5 0 9 3 12 8 3-5 7-8 12-8 8 0 14 8 14 18"
        stroke={stroke}
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function AppleLogo({ variant, ...props }: LogoProps) {
  const fill = variant === 'light' ? T.onSurface : T.paper;
  return (
    <svg viewBox="0 0 64 64" fill="none" aria-hidden="true" {...props}>
      <path
        d="M40 10c-2 0-6 2-8 5-2-3-1-8 2-11-4 1-8 4-10 9-3 8 2 18 8 24 3 3 6 4 10 4 2 0 5-1 7-2-1-3-2-6-1-9 2-4 6-7 10-8-3-3-6-5-8-8Z"
        fill={fill}
      />
    </svg>
  );
}

export function GoogleLogo({ variant, ...props }: LogoProps) {
  if (variant === 'dark') {
    return (
      <svg viewBox="0 0 120 48" fill="none" aria-hidden="true" {...props}>
        <text x="8" y="34" fill={T.paper} fontSize="28" fontWeight="700" fontFamily="sans-serif">
          Google
        </text>
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 120 48" fill="none" aria-hidden="true" {...props}>
      <text x="6" y="34" fontSize="28" fontWeight="700" fontFamily="sans-serif">
        <tspan fill={T.accent}>G</tspan>
        <tspan fill={T.primary}>o</tspan>
        <tspan fill={T.accentDim}>o</tspan>
        <tspan fill={T.accent}>g</tspan>
        <tspan fill={T.primary}>l</tspan>
        <tspan fill={T.accentDim}>e</tspan>
      </text>
    </svg>
  );
}

export function SamsungLogo({ variant, ...props }: LogoProps) {
  const fill = variant === 'light' ? T.onSurface : T.paper;
  return (
    <svg viewBox="0 0 140 48" fill="none" aria-hidden="true" {...props}>
      <text
        x="4"
        y="32"
        fill={fill}
        fontSize="22"
        fontWeight="700"
        fontFamily="sans-serif"
        letterSpacing="4"
      >
        SAMSUNG
      </text>
    </svg>
  );
}

export function SonyLogo({ variant, ...props }: LogoProps) {
  const fill = variant === 'light' ? T.onSurface : T.paper;
  return (
    <svg viewBox="0 0 100 48" fill="none" aria-hidden="true" {...props}>
      <text
        x="4"
        y="32"
        fill={fill}
        fontSize="26"
        fontWeight="700"
        fontFamily="sans-serif"
        letterSpacing="6"
      >
        SONY
      </text>
    </svg>
  );
}

export function UberLogo({ variant, ...props }: LogoProps) {
  const fill = variant === 'light' ? T.onSurface : T.paper;
  return (
    <svg viewBox="0 0 100 48" fill="none" aria-hidden="true" {...props}>
      <text x="6" y="34" fill={fill} fontSize="28" fontWeight="700" fontFamily="sans-serif">
        Uber
      </text>
    </svg>
  );
}

export function AirbnbLogo({ variant, ...props }: LogoProps) {
  const fill = variant === 'light' ? T.accent : T.primaryContainer;
  return (
    <svg viewBox="0 0 80 64" fill="none" aria-hidden="true" {...props}>
      <path
        d="M40 8c-8 12-20 20-20 32a20 20 0 1 0 40 0c0-12-12-20-20-32Z"
        fill={fill}
      />
    </svg>
  );
}

export const CLIENT_LOGO_COMPONENTS = {
  nike: NikeLogo,
  bmw: BmwLogo,
  spotify: SpotifyLogo,
  adobe: AdobeLogo,
  tesla: TeslaLogo,
  meta: MetaLogo,
  apple: AppleLogo,
  google: GoogleLogo,
  samsung: SamsungLogo,
  sony: SonyLogo,
  uber: UberLogo,
  airbnb: AirbnbLogo,
} as const;

export type ClientLogoId = keyof typeof CLIENT_LOGO_COMPONENTS;

export function ClientLogo({
  id,
  variant,
  className,
}: {
  id: ClientLogoId;
  variant: 'light' | 'dark';
  className?: string;
}) {
  const Component = CLIENT_LOGO_COMPONENTS[id];
  return <Component variant={variant} className={className} />;
}
