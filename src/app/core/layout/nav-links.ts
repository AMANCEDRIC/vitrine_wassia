/** Entrées du menu principal (ordinateur et mobile). */
export interface NavLink {
  label: string;
  route: string;
  fragment?: string;
  /** « Nos activités » ouvre la liste des pôles et des services. */
  poles?: boolean;
}

export const NAV_LINKS: readonly NavLink[] = [
  { label: 'Accueil', route: '/' },
  { label: 'À propos', route: '/a-propos' },
  { label: 'Nos activités', route: '/', fragment: 'poles', poles: true },
  { label: 'Actualités', route: '/actualites' },
  { label: 'Simulateur', route: '/', fragment: 'simulateur' },
  { label: 'Contact', route: '/contact' },
];

/** Bouton d'action principal (« Devenir membre ») : le formulaire du pôle Services financiers. */
export const ACTION_PRINCIPALE = {
  label: 'Devenir membre',
  route: '/services-financiers',
  fragment: 'contact',
} as const;
