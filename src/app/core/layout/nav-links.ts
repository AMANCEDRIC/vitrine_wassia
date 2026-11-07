/** Entrées du menu principal (ordinateur et mobile). */
export interface NavLink {
  label: string;
  route: string;
  fragment?: string;
  /** « Nos activités » ouvre la liste des pôles. */
  poles?: boolean;
}

export const NAV_LINKS: readonly NavLink[] = [
  { label: 'Accueil', route: '/' },
  { label: 'À propos', route: '/a-propos' },
  { label: 'Nos activités', route: '/', fragment: 'poles', poles: true },
  { label: 'Actualités', route: '/', fragment: 'actualites' },
  { label: 'Simulateur', route: '/', fragment: 'simulateur' },
  { label: 'Contact', route: '/', fragment: 'contact' },
];

/** Destination du bouton « Devenir membre » : le formulaire du pôle Services financiers. */
export const DEVENIR_MEMBRE = { route: '/services-financiers', fragment: 'contact' } as const;
