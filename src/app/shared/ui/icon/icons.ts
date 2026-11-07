/**
 * Tracés des icônes de la maquette (viewBox 24 × 24, trait de 2 px).
 */
export const ICONS = {
  finance: 'M3 10 12 4l9 6M5 10v8M9.5 10v8M14.5 10v8M19 10v8M3 20h18',
  immobilier: 'M4 21V4h10v17M14 9h6v12M8 8h2M8 12h2M8 16h2M2 21h20',
  mobilite: 'M5 17h14M3 13l2-6h14l2 6v4H3zM7 17v2M17 17v2',
  voyage: 'M2 16 22 4l-5 17-5-6-4 3 1-6z',
  agrobusiness: 'M12 21v-9M12 12c0-4 3-6 7-6 0 4-3 6-7 6zM12 14c0-3-2.5-5-6-5 0 3 2.5 5 6 5z',
  chevron: 'm9 6 6 6-6 6',
  menu: 'M4 7h16M4 12h16M4 17h16',
  fermer: 'M6 6l12 12M18 6 6 18',
  check: 'M20 6 9 17l-5-5',
} as const;

export type IconName = keyof typeof ICONS;
