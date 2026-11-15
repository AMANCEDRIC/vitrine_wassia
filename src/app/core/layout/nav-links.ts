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
  { label: 'Contact', route: '/contact' },
];

/** Bouton d'action principal de l'en-tête : le formulaire du pôle Accompagnement Finance. */
export const ACTION_PRINCIPALE = {
  label: 'Monter mon dossier',
  route: '/accompagnement-finance',
  fragment: 'contact',
} as const;
