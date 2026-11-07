import { IconName } from '@shared/ui/icon/icons';

export type PoleId = 'finance' | 'immobilier' | 'mobilite' | 'voyage' | 'agrobusiness';

export interface Pole {
  id: PoleId;
  /** Titre de la carte sur la page d'accueil (ordinateur). */
  titre: string;
  /** Titre court : accueil mobile et menu mobile. */
  titreCourt: string;
  /** Libellé du pied de page. */
  libelleFooter: string;
  resume: string;
  /** Résumé de l'accueil mobile. */
  resumeCourt: string;
  route: string;
  fragment?: string;
  icone: IconName;
  /** Classes de la pastille d'icône (couleur du pôle). */
  pastille: string;
  /** Couleur du trait de l'icône. */
  traitIcone: string;
}

/**
 * Les 5 pôles retenus par Cédric le 2026-11-07 (version « Agrobusiness & Énergies vertes »).
 * Couleurs : charte graphique, avec Voyage (or) et Agrobusiness (bleu roi + or) repris de la maquette,
 * à faire valider par le client.
 */
export const POLES: readonly Pole[] = [
  {
    id: 'finance',
    titre: 'Services financiers et inclusion',
    titreCourt: 'Services financiers et inclusion',
    libelleFooter: 'Services financiers',
    resume:
      'Intermédiation en opérations de banque, tontines numérisées par carte QR, solidarité mutualisée.',
    resumeCourt: 'Intermédiation bancaire, tontines par carte QR, solidarité.',
    route: '/services-financiers',
    icone: 'finance',
    pastille: 'bg-emeraude',
    traitIcone: 'var(--color-marine)',
  },
  {
    id: 'immobilier',
    titre: 'Immobilier et patrimoine',
    titreCourt: 'Immobilier et patrimoine',
    libelleFooter: 'Immobilier',
    resume:
      'Gestion locative à loyer garanti, rénovation de biens dégradés, achat, vente et courtage foncier.',
    resumeCourt: 'Loyer garanti, rénovation, courtage foncier.',
    route: '/immobilier-mobilite',
    fragment: 'immobilier',
    icone: 'immobilier',
    pastille: 'bg-sapin',
    traitIcone: '#ffffff',
  },
  {
    id: 'mobilite',
    titre: 'Mobilité, transport et GPS',
    titreCourt: 'Mobilité, transport et GPS',
    libelleFooter: 'Mobilité et GPS',
    resume:
      'Gestion déléguée de véhicules et de motos, recette garantie, balises GPS, logistique et courrier express.',
    resumeCourt: 'Recette garantie, pannes prises en charge, balises GPS.',
    route: '/immobilier-mobilite',
    fragment: 'flottes',
    icone: 'mobilite',
    pastille: 'bg-marine',
    traitIcone: '#ffffff',
  },
  {
    id: 'voyage',
    titre: 'Voyage, tourisme et mobilité',
    titreCourt: 'Voyage, tourisme et mobilité',
    libelleFooter: 'Voyage et tourisme',
    resume:
      'Billetterie aérienne, assistance visa et e-visa, conseil aux voyageurs, conciergerie de séjour.',
    resumeCourt: 'Billets d’avion, visas et e-visas, conciergerie.',
    route: '/voyage',
    icone: 'voyage',
    pastille: 'bg-or',
    traitIcone: 'var(--color-marine)',
  },
  {
    id: 'agrobusiness',
    titre: 'Agrobusiness, industrie et énergies vertes',
    titreCourt: 'Agrobusiness et énergies vertes',
    libelleFooter: 'Agrobusiness',
    resume:
      'Production agricole et élevage, transformation, import-export, énergies renouvelables.',
    resumeCourt: 'Agriculture, transformation, import-export, solaire.',
    route: '/agrobusiness',
    icone: 'agrobusiness',
    pastille: 'bg-roi',
    traitIcone: 'var(--color-or)',
  },
];
