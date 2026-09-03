'use client';

import { ClientLogo } from '@/components/client-logos';
import { useReducedMotion } from 'framer-motion';
import { useCallback, useEffect, useRef } from 'react';
import { MARQUEE_ITEMS, PILL_BG_COLORS, logoVariantForBg, type MarqueeItem } from '@/lib/clients-data';

const BASE_SPEED = -55;
const RETURN_RATE = 1.6;

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
  // Retain all items, but allow a maximum of 2 label blocks ("Our Clients")
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
  const trackRef = useRef<HTMLDivElement>(null);
  const sequenceRef = useRef<HTMLDivElement>(null);

  const offsetRef = useRef(0);
  const velocityRef = useRef(reducedMotion ? 0 : BASE_SPEED);
  const draggingRef = useRef(false);
  const pointerRef = useRef({ x: 0, t: 0, vx: 0 });
  const sequenceWidthRef = useRef(0);

  const wrapOffset = useCallback(() => {
    const w = sequenceWidthRef.current;
    if (w <= 0) return;
    while (offsetRef.current <= -w) offsetRef.current += w;
    while (offsetRef.current > 0) offsetRef.current -= w;
  }, []);

  const applyTransform = useCallback(() => {
    if (trackRef.current) {
      trackRef.current.style.transform = `translate3d(${offsetRef.current}px, 0, 0)`;
    }
  }, []);

  useEffect(() => {
    const measure = () => {
      if (!sequenceRef.current) return;
      sequenceWidthRef.current = sequenceRef.current.offsetWidth;
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  useEffect(() => {
    let rafId = 0;
    let lastTime = performance.now();
    const targetSpeed = reducedMotion ? 0 : BASE_SPEED;

    const tick = (now: number) => {
      const dt = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;

      if (!draggingRef.current) {
        const blend = 1 - Math.exp(-RETURN_RATE * dt);
        velocityRef.current += (targetSpeed - velocityRef.current) * blend;
        offsetRef.current += velocityRef.current * dt;
        wrapOffset();
        applyTransform();
      }

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [reducedMotion, wrapOffset, applyTransform]);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    draggingRef.current = true;
    pointerRef.current = { x: e.clientX, t: e.timeStamp, vx: velocityRef.current };
    e.currentTarget.setPointerCapture(e.pointerId);
    e.currentTarget.style.cursor = 'grabbing';
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current) return;
    const dx = e.clientX - pointerRef.current.x;
    const dt = (e.timeStamp - pointerRef.current.t) / 1000;
    offsetRef.current += dx;
    if (dt > 0) {
      const vx = dx / dt;
      pointerRef.current.vx = vx;
      velocityRef.current = vx;
    }
    pointerRef.current.x = e.clientX;
    pointerRef.current.t = e.timeStamp;
    wrapOffset();
    applyTransform();
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current) return;
    draggingRef.current = false;
    velocityRef.current = pointerRef.current.vx;
    e.currentTarget.releasePointerCapture(e.pointerId);
    e.currentTarget.style.cursor = 'grab';
  };

  return (
    <section
      aria-label="Our clients"
      className="w-full overflow-hidden bg-transparent pt-12 pb-8 md:pt-14 md:pb-10"
    >
      <div
        data-cursor="drag"
        className="w-full cursor-grab touch-none select-none overflow-hidden"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        <div
          ref={trackRef}
          className="flex will-change-transform"
          style={{ transform: 'translate3d(0, 0, 0)' }}
        >
          <div ref={sequenceRef} className="flex shrink-0">
            <MarqueeSequence items={MARQUEE_ITEMS} />
          </div>
          <div className="flex shrink-0" aria-hidden="true">
            <MarqueeSequence items={MARQUEE_ITEMS} />
          </div>
        </div>
      </div>
    </section>
  );
}