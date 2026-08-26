import type { ClientLogoId } from '@/components/client-logos';

export type PillBg = 'cream' | 'black';

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
  cream: '#F4F1EA',

  black: '#0a0a0a',
};

/** All client logos have cream background */
export function assignPillBg(globalIndex: number): PillBg {
  return 'cream';
}

export function logoVariantForBg(bg: PillBg): 'light' | 'dark' {
  return bg === 'black' ? 'dark' : 'light';
}

const CLIENTS: { id: ClientLogoId; name: string }[] = [
  { id: 'ahsan_associates', name: 'Ahsan Associates' },
  { id: 'ahsan_town', name: 'Ahsan Town' },
  { id: 'ashaab', name: 'Ashaab' },
  { id: 'ce_and_builders', name: 'CE and Builders' },
  { id: 'commtel', name: 'Commtel' },
  { id: 'ivf_academy', name: 'IVF Academy USA' },
  { id: 'khalifa', name: 'Khalifa' },
  { id: 'lakhani', name: 'Lakhani Properties' },
  { id: 'nayyer', name: 'Nayyer' },
  { id: 'stadium_view', name: 'Stadium View Residencia' },
  { id: 'dha_city', name: 'DHA City' },
  { id: 'nexgen', name: 'NEXGEN Heights' },
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
