'use client';

import { useRef, type ReactNode } from 'react';

const FACET_CLIP =
  'polygon(0 0, 100% 0, 100% calc(100% - 32px), calc(100% - 32px) 100%, 0 100%)';

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
    <a
      ref={cardRef}
      href={href}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      className={`service-card group relative block h-full min-h-[300px] focus-visible:outline-none transition-[filter] duration-700 hover:filter-[drop-shadow(0_14px_32px_rgba(0,227,253,0.28))] focus-visible:filter-[drop-shadow(0_14px_32px_rgba(0,227,253,0.28))] ${className}`}
    >
      <div
        className="relative h-full min-h-[300px] bg-ink"
        style={{ clipPath: FACET_CLIP }}
      >
        <div
          className="absolute inset-[2px] flex h-[calc(100%-4px)] flex-col justify-between overflow-hidden bg-white p-8"
          style={{ clipPath: FACET_CLIP }}
        >
          <div className="relative z-0 flex h-full min-h-0 flex-col justify-between">
            <div
              className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-primary-container/20 text-ink [&_svg]:h-7 [&_svg]:w-7 [&_svg]:shrink-0"
            >
              {icon}
            </div>

            <svg
              className="pointer-events-none absolute -top-3 -right-3 h-32 w-32 text-primary-container/40 opacity-50 transition-opacity group-hover:opacity-100"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              viewBox="0 0 100 100"
              aria-hidden="true"
            >
              <path d="M50 5 L95 30 L95 80" strokeDasharray="2 4" />
            </svg>

            <div className="flex min-h-0 flex-col gap-3">
              <h3
                className="font-[family-name:var(--font-dm-sans)] text-2xl leading-tight font-extrabold text-ink"
              >
                {title}
              </h3>
              <p
                className="line-clamp-4 font-[family-name:var(--font-dm-sans)] text-base leading-6 text-ink/80"
              >
                {description}
              </p>
            </div>
          </div>

          <div
            ref={panelRef}
            className={`service-card-panel absolute inset-0 z-10 flex flex-col items-center justify-center gap-4 p-8 text-center ${
              isCyanPanel ? 'bg-primary-container' : 'bg-ink'
            }`}
          >
            <h4
              className={`font-[family-name:var(--font-dm-sans)] text-2xl font-extrabold tracking-tight uppercase ${
                isCyanPanel ? 'text-ink' : 'text-white'
              }`}
            >
              {title}
            </h4>
            <span
              className={`mt-2 flex items-center gap-2 font-[family-name:var(--font-dm-sans)] text-sm font-bold tracking-widest uppercase transition-transform duration-300 group-hover:translate-x-2 ${
                isCyanPanel ? 'text-ink' : 'text-primary-container'
              }`}
            >
              View Service
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M5 12h14M13 6l6 6-6 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </a>
  );
}
