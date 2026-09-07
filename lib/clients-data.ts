import type { ClientLogoId } from '@/components/client-logos';

export type PillBg = 'black' | "";

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
  black: '#0a0a0a',
  '': '',
};

export function assignPillBg(globalIndex: number): PillBg {
  return '';
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
  { id: 'dha_city', name: 'DHA City' },
  { id: 'ivf_academy', name: 'IVF Academy USA' },
  { id: 'jaguar', name: 'Jaguar' },
  { id: 'khalifa', name: 'Khalifa' },
  { id: 'lakhani', name: 'Lakhani Properties' },
  { id: 'mumtaz', name: 'Mumtaz' },
  { id: 'nayyer', name: 'Nayyer' },
  { id: 'nexgen_heights', name: 'Nexgen Heights' },
  { id: 'nr_interior', name: 'NR Interior' },
  { id: 'ns_arcade', name: 'NS Arcade' },
  { id: 'safari_village', name: 'Safari Village' },
  { id: 'ss_enterprises', name: 'SS Enterprises' },
  { id: 'stadium_view', name: 'Stadium View Residencia' },
];

// Deterministic pseudo-random generator (Mulberry32) for SSR-safe shuffling
function pseudoRandom(seed: number) {
  let t = (seed += 0x6d2b79f5);
  t = Math.imul(t ^ (t >>> 15), t | 1);
  t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
}

export function seededShuffle<T>(array: T[], seed = 7): T[] {
  const shuffled = [...array];
  let s = seed;
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(pseudoRandom(s++) * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function buildMarqueeSequence(): MarqueeItem[] {
  const items: MarqueeItem[] = [];
  const shuffledClients = seededShuffle(CLIENTS, 7);
  const halfLength = Math.ceil(shuffledClients.length / 2);

  // First half of client logos
  shuffledClients.slice(0, halfLength).forEach((client, index) => {
    items.push({
      type: 'client',
      id: client.id,
      name: client.name,
      pillBg: assignPillBg(index),
    });
  });

  // 'Our Clients' badge after first half
  items.push({ type: 'label', name: 'Our Clients' });

  // Second half of client logos
  shuffledClients.slice(halfLength).forEach((client, index) => {
    items.push({
      type: 'client',
      id: client.id,
      name: client.name,
      pillBg: assignPillBg(halfLength + index),
    });
  });

  // 'Our Clients' badge after second half
  items.push({ type: 'label', name: 'Our Clients' });

  return items;
}

export const MARQUEE_ITEMS = buildMarqueeSequence();
