/** Textes de la page d'accueil (maquette Main.html et Site-Accueil-Mobile). */

export interface LienAction {
  label: string;
  /** Libellé raccourci sur mobile (boutons côte à côte). */
  labelCourt?: string;
  route: string;
  fragment?: string;
  /** `or` : bouton doré (offre phare) ; `lien` : lien texte secondaire avec flèche. */
  style: 'or' | 'lien';
}

export interface Diapositive {
  eyebrow: string;
  titre: string;
  texte: string;
  /** Texte raccourci de la version mobile (sinon `texte`). */
  texteMobile?: string;
  actions: LienAction[];
  image: string;
  alt: string;
}

export const DIAPOSITIVES: readonly Diapositive[] = [
  {
    eyebrow: 'Holding multisectorielle · Côte d’Ivoire',
    titre: 'L’excellence au service de vos biens, de votre mobilité et de votre avenir financier.',
    texte:
      'Intermédiation financière, gestion locative à loyer garanti, gestion de flottes sécurisée par GPS, solutions de voyage et projets durables : nous bâtissons des garanties solides pour les particuliers, les investisseurs et les professionnels.',
    texteMobile:
      'Loyers garantis, flottes de véhicules sécurisées par GPS, épargne par carte QR, voyage et projets durables.',
    actions: [
      {
        label: 'Loyer garanti',
        route: '/immobilier-mobilite',
        fragment: 'immobilier',
        style: 'or',
      },
      {
        label: 'Recette véhicule garantie',
        labelCourt: 'Recette garantie',
        route: '/immobilier-mobilite',
        fragment: 'flottes',
        style: 'or',
      },
      { label: 'Découvrir nos services', route: '/', fragment: 'poles', style: 'lien' },
    ],
    image: 'images/illustrations/immobilier-mobilite.svg',
    alt: 'Illustration : immeuble, maison et véhicule suivi par GPS',
  },
  {
    eyebrow: 'Épargne communautaire',
    titre: 'Votre épargne, tracée et confirmée par SMS.',
    texte:
      'Une carte membre à QR code, un agent de proximité sur votre marché et un solde que vous suivez à chaque passage.',
    actions: [
      { label: 'Devenir membre', route: '/services-financiers', fragment: 'contact', style: 'or' },
      { label: 'Comment ça marche', route: '/', fragment: 'carte', style: 'lien' },
    ],
    image: 'images/illustrations/carte-membre.svg',
    alt: 'Illustration : commerçante avec sa carte membre à QR code',
  },
  {
    eyebrow: 'Voyage et tourisme',
    titre: 'Voyagez l’esprit tranquille, du visa au billet.',
    texte:
      'Accompagnement des dossiers de visa, réservations et organisation de séjours pour les particuliers et les professionnels.',
    actions: [
      { label: 'Découvrir le pôle Voyage', route: '/voyage', style: 'or' },
      { label: 'Nous contacter', route: '/', fragment: 'contact', style: 'lien' },
    ],
    image: 'images/illustrations/voyage.svg',
    alt: 'Illustration : avion, valises et passeport',
  },
];

/**
 * Engagements affichés sous la bannière.
 * À CONFIRMER PAR ÉCRIT PAR LE CLIENT avant la mise en ligne (garanties de loyer et de recette).
 */
export const ENGAGEMENTS: readonly { titre: string; texte: string }[] = [
  {
    titre: 'Loyer garanti',
    texte: 'Un revenu locatif assuré chaque mois pour les propriétaires bailleurs.',
  },
  {
    titre: 'Recette journalière garantie',
    texte: 'Flottes de transport gérées par WASSIA, pannes prises en charge.',
  },
  {
    titre: 'Géolocalisation 24 h/24',
    texte: 'Suivi en temps réel et sécurisation des véhicules par balise GPS.',
  },
  {
    titre: 'Épargne par carte QR',
    texte: 'Chaque versement est enregistré, tracé et confirmé par SMS.',
  },
];

export type Forme =
  | { type: 'path'; d: string }
  | { type: 'circle'; cx: number; cy: number; r: number }
  | { type: 'rect'; x: number; y: number; width: number; height: number; rx?: number };

export interface EtapeCarte {
  titre: string;
  texte: string;
  /** Texte raccourci de la version mobile. */
  texteMobile: string;
  /** Formes de l'illustration (viewBox 64 × 64). */
  dessin: readonly Forme[];
}

export const ETAPES_CARTE: readonly EtapeCarte[] = [
  {
    titre: 'Rencontrez un agent WASSIA',
    texte: 'Il vient sur votre marché et enregistre votre commerce avec votre pièce d’identité.',
    texteMobile: 'Il enregistre votre commerce avec votre pièce d’identité.',
    dessin: [
      { type: 'circle', cx: 32, cy: 22, r: 12 },
      { type: 'path', d: 'M8 58c0-14 10-22 24-22s24 8 24 22' },
    ],
  },
  {
    titre: 'Recevez votre carte à QR code',
    texte: 'Une carte prépayée à votre nom, activée par un SMS de bienvenue.',
    texteMobile: 'Une carte PVC à votre nom, activée par SMS.',
    dessin: [
      { type: 'rect', x: 6, y: 14, width: 52, height: 36, rx: 6 },
      { type: 'path', d: 'M6 26h52' },
      { type: 'rect', x: 14, y: 34, width: 12, height: 10 },
      { type: 'path', d: 'M34 36h16M34 42h10' },
    ],
  },
  {
    titre: 'Épargnez et suivez vos versements',
    texte:
      'À chaque passage de l’agent, un reçu et un SMS indiquent le montant versé et votre nouveau solde.',
    texteMobile: 'Un reçu et un SMS à chaque passage de l’agent.',
    dessin: [
      { type: 'rect', x: 18, y: 6, width: 28, height: 52, rx: 6 },
      { type: 'path', d: 'M26 14h12' },
      { type: 'path', d: 'M24 34l6 6 10-12' },
    ],
  },
  {
    titre: 'Demandez un crédit adapté',
    texte:
      'Votre épargne régulière facilite l’accès au crédit. Votre agent dépose le dossier, un chef l’approuve selon le montant.',
    texteMobile: '',
    dessin: [
      { type: 'circle', cx: 32, cy: 32, r: 24 },
      { type: 'path', d: 'M32 18v28M24 26c0-4 4-6 8-6s8 2 8 6-4 5-8 6-8 2-8 6 4 6 8 6 8-2 8-6' },
    ],
  },
];

export interface Actualite {
  categorie: string;
  titre: string;
  /** Date de publication (ISO) ; vide tant que l'article n'est pas rédigé. */
  date: string;
  image: string;
  alt: string;
}

/** Articles prévus par la maquette, encore à rédiger. */
export const ACTUALITES: readonly Actualite[] = [
  {
    categorie: 'Finance',
    titre: 'Lancement des souscriptions à la carte membre',
    date: '',
    image: 'images/illustrations/carte-membre.svg',
    alt: 'Illustration : commerçante avec sa carte membre à QR code',
  },
  {
    categorie: 'Mobilité',
    titre: 'Ouverture de nouvelles lignes de transport',
    date: '',
    image: 'images/illustrations/transport.svg',
    alt: 'Illustration : bus sur une ligne de transport',
  },
  {
    categorie: 'Voyage',
    titre: 'Visa : préparer un dossier consulaire complet',
    date: '',
    image: 'images/illustrations/voyage.svg',
    alt: 'Illustration : avion, valises et passeport',
  },
  {
    categorie: 'Agrobusiness',
    titre: 'Un projet solaire pour une exploitation agricole',
    date: '',
    image: 'images/illustrations/agrobusiness.svg',
    alt: 'Illustration : panneaux solaires et champs cultivés',
  },
  {
    categorie: 'Immobilier',
    titre: 'Loyer garanti : comment ça fonctionne pour le propriétaire',
    date: '',
    image: 'images/illustrations/immobilier-mobilite.svg',
    alt: 'Illustration : immeuble, maison et véhicule suivi par GPS',
  },
];

/** Bloc « Pourquoi choisir le GROUPE WASSIA ? » (atouts tirés des documents du client). */
export const ATOUTS: readonly { titre: string; texte: string }[] = [
  {
    titre: 'Des garanties concrètes',
    texte:
      'Loyer versé chaque mois aux propriétaires, recette journalière convenue pour les véhicules en gestion : nous portons les aléas à votre place.',
  },
  {
    titre: 'Des agents près de chez vous',
    texte:
      'Nos agents viennent à votre rencontre sur les marchés et dans les quartiers pour vous inscrire et suivre vos versements.',
  },
  {
    titre: 'Chaque franc tracé',
    texte:
      'Chaque versement est enregistré, rattaché à votre carte membre et confirmé par SMS avec votre nouveau solde.',
  },
  {
    titre: 'La technologie au service de la confiance',
    texte:
      'Carte membre à QR code, suivi GPS des véhicules 24 h/24, plateformes de suivi : chaque opération est transparente.',
  },
  {
    titre: 'Un groupe, cinq pôles',
    texte:
      'Finance, immobilier, mobilité, voyage et agrobusiness : un interlocuteur unique pour vos biens, votre mobilité et vos projets.',
  },
  {
    titre: 'Un statut d’intermédiaire en opérations de banque',
    texte:
      'WASSIA intervient comme IOB au service de l’inclusion financière, en cours de conventionnement avec des établissements bancaires agréés APBEF-CI.',
  },
];

export interface ChiffreCle {
  label: string;
  /** Valeur réelle fournie par le client ; `null` tant qu'elle n'est pas connue. */
  valeur: number | null;
  suffixe?: string;
}

/**
 * Bandeau de chiffres clés (compteurs animés sous la bannière).
 * MASQUÉ tant que toutes les valeurs ne sont pas renseignées : ne jamais inventer de chiffres.
 * À compléter avec les données du client (exemples de libellés à adapter).
 */
export const CHIFFRES_CLES: readonly ChiffreCle[] = [
  { label: 'Commerçants inscrits', valeur: null, suffixe: '+' },
  { label: 'Cartes membres actives', valeur: null, suffixe: '+' },
  { label: 'Véhicules suivis par GPS', valeur: null, suffixe: '+' },
  { label: 'Biens en gestion', valeur: null, suffixe: '+' },
];
