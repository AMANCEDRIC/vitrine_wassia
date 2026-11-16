import { IconName } from '@shared/ui/icon/icons';

export type PoleId = 'finance' | 'immobilier' | 'flottes' | 'commerce' | 'agrobusiness';
export type ServiceId = 'voyage' | 'energie';
export type ActiviteId = PoleId | ServiceId;

export interface Activite {
  id: ActiviteId;
  /** Titre de la ligne sur la page d'accueil (ordinateur). */
  titre: string;
  /** Titre court : menus et organigramme. */
  titreCourt: string;
  /** Libellé du pied de page et du bandeau défilant. */
  libelleFooter: string;
  resume: string;
  /** Résumé de l'accueil mobile et des menus. */
  resumeCourt: string;
  route: string;
  icone: IconName;
  /** Classes de la pastille d'icône (couleur de l'activité). */
  pastille: string;
  /** Couleur du trait de l'icône. */
  traitIcone: string;
}

/**
 * Les 5 pôles, dans l'ordre et avec les noms validés par le client (texte de l'accueil, 15/11/2026).
 * Couleurs : charte graphique, à faire valider par le client pour Import-Export.
 */
export const POLES: readonly Activite[] = [
  {
    id: 'finance',
    titre: 'Services financiers et inclusion',
    titreCourt: 'Services financiers et inclusion',
    libelleFooter: 'Services financiers',
    resume:
      'Intermédiation en opérations de banque, épargne par carte QR, accès au crédit et accompagnement de dossiers de financement.',
    resumeCourt: 'Épargne par carte QR, crédit, dossiers de financement.',
    route: '/services-financiers',
    icone: 'finance',
    pastille: 'bg-emeraude',
    traitIcone: 'var(--color-marine)',
  },
  {
    id: 'immobilier',
    titre: 'Immobilier',
    titreCourt: 'Immobilier',
    libelleFooter: 'Immobilier',
    resume:
      'Gestion locative sécurisée, réhabilitation et finition de chantiers, transactions foncières.',
    resumeCourt: 'Gestion locative, réhabilitation, foncier.',
    route: '/immobilier',
    icone: 'immobilier',
    pastille: 'bg-sapin',
    traitIcone: '#ffffff',
  },
  {
    id: 'agrobusiness',
    titre: 'Agrobusiness',
    titreCourt: 'Agrobusiness',
    libelleFooter: 'Agrobusiness',
    resume:
      'Filières agricoles, élevage, aquaculture et transformation locale, avec nos partenaires.',
    resumeCourt: 'Agriculture, élevage, transformation.',
    route: '/agrobusiness',
    icone: 'agrobusiness',
    pastille: 'bg-roi',
    traitIcone: 'var(--color-or)',
  },
  {
    id: 'commerce',
    titre: 'Import-Export & Commerce Général',
    titreCourt: 'Import-Export & Commerce Général',
    libelleFooter: 'Import-Export',
    resume:
      'Sourcing direct en Asie, au Golfe, en Afrique et en Europe, dédouanement et distribution en Côte d’Ivoire.',
    resumeCourt: 'Sourcing mondial, gros et détail.',
    route: '/import-export',
    icone: 'commerce',
    pastille: 'bg-nuit',
    traitIcone: 'var(--color-or)',
  },
  {
    id: 'flottes',
    titre: 'Flottes & GPS',
    titreCourt: 'Flottes & GPS',
    libelleFooter: 'Flottes & GPS',
    resume:
      'Gestion déléguée de véhicules de transport, supervision GPS 24 h/24, encadrement des chauffeurs.',
    resumeCourt: 'Gestion de véhicules, GPS 24 h/24.',
    route: '/flottes-gps',
    icone: 'mobilite',
    pastille: 'bg-marine',
    traitIcone: '#ffffff',
  },
];

/** Les 2 « autres services spécialisés » du dossier officiel. */
export const SERVICES: readonly Activite[] = [
  {
    id: 'voyage',
    titre: 'Voyage, Hadj, Oumrah & Mobilité',
    titreCourt: 'Voyage, Hadj, Oumrah & Mobilité',
    libelleFooter: 'Voyage, Hadj, Oumrah',
    resume:
      'Billetterie, assistance visa, Hadj et Oumrah, études en Arabie saoudite, avec une agence agréée.',
    resumeCourt: 'Billets, visas, Hadj, Oumrah, études.',
    route: '/voyage',
    icone: 'voyage',
    pastille: 'bg-or',
    traitIcone: 'var(--color-marine)',
  },
  {
    id: 'energie',
    titre: 'Énergie Verte',
    titreCourt: 'Énergie Verte',
    libelleFooter: 'Énergie Verte',
    resume:
      'Solutions solaires, équipements industriels et unités de production avec nos partenaires.',
    resumeCourt: 'Solaire, machines, unités de production.',
    route: '/energie-verte',
    icone: 'energie',
    pastille: 'bg-vert-fonce',
    traitIcone: 'var(--color-or-clair)',
  },
];

/** Toutes les activités : les 5 pôles puis les 2 services. */
export const ACTIVITES: readonly Activite[] = [...POLES, ...SERVICES];

/** Menus et pied de page : les pôles, puis les autres services, chacun sous son titre. */
export const GROUPES_ACTIVITES: readonly { titre: string; activites: readonly Activite[] }[] = [
  { titre: 'Nos pôles', activites: POLES },
  { titre: 'Nos autres services', activites: SERVICES },
];
