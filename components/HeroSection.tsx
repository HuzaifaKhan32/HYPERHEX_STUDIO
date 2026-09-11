// HERO SECTION - Server Component
// This renders static HTML immediately without waiting for JS
// Only the carousel interaction is deferred to client

import Button3D from './Button3D';

export default function HeroSection() {
  return (
    <div className="relative w-full bg-background px-3 pb-4 md:px-5 sm:px-8 lg:px-12 2xl:px-16">
      <div className="relative mx-auto w-full max-w-[1280px] xl:max-w-[1400px] 2xl:max-w-none origin-top overflow-hidden rounded-[1.5rem] md:rounded-[2rem] border border-outline-variant/30 aspect-[9/16] sm:aspect-[4/3] md:aspect-[16/9] lg:aspect-[1312/568] min-h-[600px] sm:min-h-[500px] md:min-h-[400px]">

        {/* POSTER: Fast thumbnail loads immediately (before video) */}
        <div className="absolute inset-0 bg-black">
          <img
            src="/media/hero-loop-4-thumbnail.webp"
            alt="Hero Section Preview"
            className="w-full h-full object-cover"
            loading="eager"
          />
        </div>

        {/* Dynamically import carousel only when needed (client-side) */}
        <HeroCarousel />

        <div className="absolute inset-0 z-10 w-full p-5 sm:p-8 lg:p-10 2xl:p-14 pointer-events-none">

          {/* TOP-RIGHT: Availability Badge - Static HTML, renders immediately */}
          <div className="absolute top-20 right-5 sm:top-8 lg:top-10 lg:right-10 2xl:top-14 2xl:right-14 z-20 flex flex-col items-end pointer-events-auto">
            <div className="flex flex-col items-end font-[family-name:var(--font-dm-sans)]">
              <span className="text-xs sm:text-sm" style={{ color: 'var(--color-mist)' }}>
                We&apos;re available
              </span>
              <div className="flex items-center gap-2">
                <div className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
                </div>
                <span className="text-xs font-bold sm:text-sm" style={{ color: 'var(--color-paper)' }}>
                  for you
                </span>
              </div>
            </div>
          </div>

          {/* BOTTOM-RIGHT: About + CTA - Static HTML, renders immediately */}
          <div className="absolute bottom-5 right-5 sm:bottom-8 sm:right-8 lg:bottom-10 lg:right-10 2xl:bottom-14 2xl:right-14 z-20 flex flex-col items-end gap-4 text-right sm:gap-5 pointer-events-auto">
            <div
              data-cursor="text"
              className="flex flex-col items-end gap-2"
            >
              <div className="flex items-center gap-2">
                <div
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: 'var(--color-accent)' }}
                />
                <span
                  className="font-[family-name:var(--font-jetbrains)] text-[clamp(10px,1.2vw,14px)] font-bold tracking-widest uppercase"
                  style={{ color: 'var(--color-paper)' }}
                >
                  (ABOUT)
                </span>
              </div>
              <p
                className="max-w-[220px] sm:max-w-[260px] 2xl:max-w-[320px] font-[family-name:var(--font-dm-sans)] text-[clamp(12px,1.2vw,16px)]"
                style={{ color: 'var(--color-paper)' }}
              >
                Building stunning websites that every shot drives income forwards.
              </p>
            </div>

            <Button3D href="#contact">Book a Call</Button3D>
          </div>

        </div>
      </div>
    </div>
  );
}

// Import carousel as dynamic client component
// This keeps it in a separate JS bundle
import dynamic from 'next/dynamic';

const HeroCarousel = dynamic(
  () => import('./Hero'),
  {
    loading: () => (
      <div className="absolute inset-0 bg-background" />
    ),
    ssr: true, // Still render on server initially, hydrate on client
  }
);
