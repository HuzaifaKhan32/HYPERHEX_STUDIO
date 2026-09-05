'use client';

import { ClientLogo } from '@/components/client-logos';
import { MARQUEE_ITEMS, PILL_BG_COLORS, logoVariantForBg, type MarqueeItem } from '@/lib/clients-data';
import InfiniteMarquee from '@/components/ui/InfiniteMarquee';

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

export default function ClientMarquee() {
  const pillElements = MARQUEE_ITEMS.map((item, index) => (
    <MarqueePill
      key={`${item.type}-${item.type === 'client' ? item.id : item.name}-${index}`}
      item={item}
    />
  ));

  return (
    <section
      aria-label="Our clients"
      className="relative w-full overflow-hidden bg-transparent pt-2 pb-8 md:pt-3 md:pb-3"
    >
      {/* Side Fade Masks */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-10 md:w-28 z-10 bg-gradient-to-r from-background via-background/80 to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-10 md:w-28 z-10 bg-gradient-to-l from-background via-background/80 to-transparent" />

      <InfiniteMarquee
        items={pillElements}
        speed={1.5}
        gap={0}
        pauseOnHover={true}
        direction="left"
      />
    </section>
  );
}