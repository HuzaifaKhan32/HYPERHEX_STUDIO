import type { ClientLogoId } from '@/components/client-logos';

export type PillBg = 'red' | 'cream' | 'cyan' | 'white' | 'black';

export type MarqueeClientItem = {
  type: 'client';
  id: ClientLogoId;
  name: string;
  pillBg: PillBg;
};

export type MarqueeLabelItem = {
  type: 'label';
  name: 'Our Clients';
};

export type MarqueeItem = MarqueeClientItem | MarqueeLabelItem;

export const PILL_BG_COLORS: Record<PillBg, string> = {
  red: '#DC2626',
  cream: '#F4F1EA',
  cyan: '#00e3fd',
  white: '#ffffff',
  black: '#0a0a0a',
};

/** 1% red, 5% cream, remainder cyan / white / black */
export function assignPillBg(globalIndex: number): PillBg {
  const bucket = globalIndex % 100;
  if (bucket === 0) return 'red';
  if (bucket >= 1 && bucket <= 5) return 'cream';
  const rest: PillBg[] = ['cyan', 'white', 'black'];
  return rest[(bucket - 6) % 3];
}

export function logoVariantForBg(bg: PillBg): 'light' | 'dark' {
  return bg === 'black' || bg === 'red' ? 'dark' : 'light';
}

const CLIENTS: { id: ClientLogoId; name: string }[] = [
  { id: 'nike', name: 'Nike' },
  { id: 'bmw', name: 'BMW' },
  { id: 'spotify', name: 'Spotify' },
  { id: 'adobe', name: 'Adobe' },
  { id: 'tesla', name: 'Tesla' },
  { id: 'meta', name: 'Meta' },
  { id: 'apple', name: 'Apple' },
  { id: 'google', name: 'Google' },
  { id: 'samsung', name: 'Samsung' },
  { id: 'sony', name: 'Sony' },
  { id: 'uber', name: 'Uber' },
  { id: 'airbnb', name: 'Airbnb' },
];

export function buildMarqueeSequence(): MarqueeItem[] {
  const items: MarqueeItem[] = [];
  let globalIndex = 0;

  for (let i = 0; i < CLIENTS.length; i += 3) {
    const batch = CLIENTS.slice(i, i + 3);
    batch.forEach((client) => {
      items.push({
        type: 'client',
        id: client.id,
        name: client.name,
        pillBg: assignPillBg(globalIndex),
      });
      globalIndex += 1;
    });
    items.push({ type: 'label', name: 'Our Clients' });
  }

  return items;
}

export const MARQUEE_ITEMS = buildMarqueeSequence();
