'use client';

import { useRef, type ReactNode } from 'react';

const TRANSLATE = {
  0: 'translateY(-101%)',
  1: 'translateX(101%)',
  2: 'translateY(101%)',
  3: 'translateX(-101%)',
} as const;

export type ServiceCardProps = {
  title: string;
  description: string;
  href: string;
  panel: 'cyan' | 'ink';
  icon: ReactNode;
  className?: string;
};

function getDirection(ev: React.MouseEvent, el: HTMLElement) {
  const rect = el.getBoundingClientRect();
  const w = rect.width;
  const h = rect.height;
  const x = (ev.clientX - rect.left - w / 2) * (w > h ? h / w : 1);
  const y = (ev.clientY - rect.top - h / 2) * (h > w ? w / h : 1);
  return Math.round((((Math.atan2(y, x) * (180 / Math.PI)) + 180) / 90) + 3) % 4;
}

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export default function ServiceCard({
  title,
  description,
  href,
  panel,
  icon,
  className = '',
}: ServiceCardProps) {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const isCyanPanel = panel === 'cyan';

  function handleEnter(e: React.MouseEvent<HTMLAnchorElement>) {
    const overlay = panelRef.current;
    const card = cardRef.current;
    if (!overlay || !card || prefersReducedMotion()) return;

    const dir = getDirection(e, card) as keyof typeof TRANSLATE;
    overlay.style.transition = 'none';
    overlay.style.transform = TRANSLATE[dir];
    overlay.style.opacity = '1';
    void overlay.offsetWidth;
    overlay.style.transition =
      'transform 0.35s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease';
    overlay.style.transform = 'translate(0, 0)';
  }

  function handleLeave(e: React.MouseEvent<HTMLAnchorElement>) {
    const overlay = panelRef.current;
    const card = cardRef.current;
    if (!overlay || !card || prefersReducedMotion()) return;

    const dir = getDirection(e, card) as keyof typeof TRANSLATE;
    overlay.style.transition = 'none';
    overlay.style.transform = 'translate(0, 0)';
    overlay.style.opacity = '1';
    void overlay.offsetWidth;
    overlay.style.transition =
      'transform 0.35s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease';
    overlay.style.transform = TRANSLATE[dir];
  }

  return (
    /* Outer Frame: Acts as the 2px Black Border across all sides & chamfer */
    <a
      ref={cardRef}
      href={href}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      className={`service-card group relative block h-full min-h-[300px] rounded-none bg-black p-[2px] [clip-path:polygon(0_0,100%_0,100%_calc(100%-24px),calc(100%-24px)_100%,0_100%)] hover:drop-shadow-[0_0_25px_rgba(21,182,232,0.9)] hover:-translate-y-0.5 active:translate-y-1 transition-all duration-300 focus-visible:outline-none ${className}`}
    >
      {/* Inner Card Body */}
      <div className="relative h-full w-full min-h-[296px] overflow-hidden rounded-none bg-white text-black [clip-path:polygon(0_0,100%_0,100%_calc(100%-23px),calc(100%-23px)_100%,0_100%)]">

        {/* Default Unhovered State */}
        <div className="relative z-0 flex h-full min-h-[296px] flex-col justify-between items-center text-center p-8">
          <div className="flex flex-1 flex-col items-center justify-center gap-6 w-full">
            <h3 className="font-[family-name:var(--font-dm-sans)] text-2xl md:text-3xl leading-tight font-black text-ink uppercase tracking-tight px-2">
              {title}
            </h3>
          </div>
          <div className="flex items-center gap-2 font-[family-name:var(--font-dm-sans)] text-xs md:text-sm font-bold tracking-widest uppercase text-ink/50 group-hover:text-accent transition-colors">
            Hover Me
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>

        {/* Hovered State Overlay (Directional Slide-in) */}
        <div
          ref={panelRef}
          className={`service-card-panel absolute inset-0 z-10 flex flex-col justify-between p-8 text-left ${isCyanPanel ? 'bg-primary-container text-ink' : 'bg-ink text-white'
            }`}
        >
          <div
            className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-full ${isCyanPanel ? 'bg-ink/10 text-ink' : 'bg-white/10 text-white'
              } [&_svg]:h-7 [&_svg]:w-7 [&_svg]:shrink-0`}
          >
            {icon}
          </div>

          <div className="flex min-h-0 flex-col gap-3">
            <h4 className="font-[family-name:var(--font-dm-sans)] text-2xl font-extrabold tracking-tight uppercase">
              {title}
            </h4>
            <p
              className={`font-[family-name:var(--font-dm-sans)] text-sm leading-6 ${isCyanPanel ? 'text-ink/80' : 'text-white/80'
                }`}
            >
              {description}
            </p>
          </div>
        </div>

      </div>
    </a>
  );
}