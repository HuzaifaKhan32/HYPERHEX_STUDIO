'use client';

import { ClientLogo } from '@/components/client-logos';
import { useReducedMotion } from 'framer-motion';
import { MARQUEE_ITEMS, PILL_BG_COLORS, logoVariantForBg, type MarqueeItem } from '@/lib/clients-data';

const PILL_BASE =
  'inline-flex shrink-0 items-center justify-center rounded-full h-[62px] min-w-[110px] px-4 mx-1.5 sm:h-[120px] sm:min-w-[160px] sm:px-8 sm:mx-3';

function MarqueePill({ item }: { item: MarqueeItem }) {
  if (item.type === 'label') {
    return (
      <span
        className={`${PILL_BASE} font-[family-name:var(--font-jetbrains)] text-[10px] sm:text-base font-medium tracking-[0.12em] text-black uppercase px-4 sm:px-14`}
      >
        {item.name}
      </span>
    );
  }

  const logoVariant = logoVariantForBg(item.pillBg);

  const dynamicPx =
    item.name.length > 10
      ? 'px-10 sm:px-14'
      : item.name.length > 6
      ? 'px-7 sm:px-10'
      : 'px-5 sm:px-8';

  return (
    <span
      className={`${PILL_BASE} ${dynamicPx}`}
      style={{ backgroundColor: PILL_BG_COLORS[item.pillBg] }}
      aria-label={item.name}
    >
      <ClientLogo
        id={item.id}
        variant={logoVariant}
        className="h-8 w-auto max-h-[36px] max-w-[120px] object-contain sm:h-16 md:h-20 sm:max-h-[85px] sm:max-w-[220px]"
      />
    </span>
  );
}

function MarqueeSequence({ items }: { items: MarqueeItem[] }) {
  let labelCount = 0;
  const filteredItems = items.filter((item) => {
    if (item.type === 'label') {
      labelCount++;
      return labelCount <= 2;
    }
    return true;
  });

  return (
    <div className="flex shrink-0 items-center">
      {filteredItems.map((item, index) => (
        <MarqueePill
          key={`${item.type}-${item.type === 'client' ? item.id : item.name}-${index}`}
          item={item}
        />
      ))}
    </div>
  );
}

export default function ClientMarquee() {
  const reducedMotion = useReducedMotion() ?? false;

  return (
    <section
      aria-label="Our clients"
      className="w-full overflow-hidden bg-transparent pt-2 pb-8 md:pt-4 md:pb-4"
    >
      <style jsx>{`
        @keyframes marquee-scroll {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(-50%, 0, 0);
          }
        }
        .animate-marquee-css {
          animation: marquee-scroll 35s linear infinite;
        }
        .animate-marquee-css:hover {
          animation-play-state: paused;
        }
      `}</style>
      <div className="w-full overflow-hidden select-none">
        <div
          className={`flex w-max will-change-transform ${
            reducedMotion ? '' : 'animate-marquee-css'
          }`}
          style={{
            contentVisibility: 'auto',
            contain: 'layout paint style',
          }}
        >
          <MarqueeSequence items={MARQUEE_ITEMS} />
          <MarqueeSequence items={MARQUEE_ITEMS} />
        </div>
      </div>
    </section>
  );
}