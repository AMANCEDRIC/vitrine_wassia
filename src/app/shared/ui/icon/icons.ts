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
  facebook: 'M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z',
  linkedin:
    'M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2zM4 2a2 2 0 1 1 0 4 2 2 0 0 1 0-4z',
  instagram:
    'M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zM16 11.4A4 4 0 1 1 12.6 8a4 4 0 0 1 3.4 3.4zM17.5 6.5h.01',
  tiktok:
    'M16 3c.4 2.6 2 4.2 4.5 4.5v3.2c-1.7 0-3.2-.5-4.5-1.4V15a6 6 0 1 1-6-6v3.3a2.7 2.7 0 1 0 2.7 2.7V3z',
  carte:
    'M12 21s-7-6.1-7-11.5a7 7 0 0 1 14 0C19 14.9 12 21 12 21zM12 12a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z',
  // Maquette v2
  fleche: 'M5 12h14M13 6l6 6-6 6',
  'fleche-gauche': 'M19 12H5M11 6l-6 6 6 6',
  'fleche-externe': 'M7 17 17 7M9 7h8v8',
  telephone:
    'M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2',
  email: 'M3 5h18v14H3zM3 7l9 6 9-6',
  whatsapp: 'M4 20l1.3-4A8 8 0 1 1 8 18.7z',
} as const;

export type IconName = keyof typeof ICONS;
