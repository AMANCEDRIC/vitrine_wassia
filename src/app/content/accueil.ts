/**
 * Textes de la page d'accueil.
 *
 * TEXTE FINAL FOURNI PAR LE CLIENT (2026-11-15, « il n'a rien à changer ») : recopié mot pour mot.
 * Ne pas reformuler. Seules adaptations : apostrophes typographiques et espaces insécables
 * avant « : » et « ? ».
 */
import { ActiviteId } from './poles';
import { lienWhatsapp } from './site';

export const BANNIERE = {
  nom: 'GROUPE WASSIA SARL HOLDING',
  devise: 'Votre Référence, Notre Engagement',
  texte:
    'Un groupe ivoirien qui accompagne les entreprises, les commerçants et les investisseurs en Côte d’Ivoire et à l’international, avec transparence et professionnalisme.',
  boutonServices: 'Découvrir nos services',
  boutonWhatsapp: 'Nous contacter sur WhatsApp',
} as const;

export const PRESENTATION = {
  titre: 'Qui sommes-nous ?',
  paragraphes: [
    'Le GROUPE WASSIA SARL HOLDING, basé à Treichville, Abidjan, est un groupe ivoirien actif dans l’accompagnement financier, l’immobilier, l’agrobusiness, le commerce international et la gestion de flottes.',
    'Notre engagement est simple : un accompagnement clair, des conditions expliquées par écrit avant tout engagement, et un suivi humain à chaque étape.',
  ],
} as const;

export interface TexteAccueil {
  /** Accroche en gras (seulement pour l'Accompagnement Finance). */
  accroche?: string;
  paragraphes: readonly string[];
  bouton: string;
  /** Ancre de la page visée (ex. `contact` pour aller directement au formulaire). */
  fragment?: string;
}

/** Texte de chaque pôle et service sur l'accueil, avec le libellé de son bouton. */
export const TEXTES_ACCUEIL: Record<ActiviteId, TexteAccueil> = {
  finance: {
    accroche: 'Vous avez un projet et vous cherchez un financement ?',
    paragraphes: [
      'Nous vous accompagnons dans la constitution et la présentation de votre dossier auprès de nos partenaires financiers agréés.',
      'Nous ne collectons pas l’épargne du public et nous n’octroyons pas de prêts. Les conditions de financement (montant, durée, taux, frais, garanties) sont fixées uniquement par l’établissement partenaire agréé, après étude de votre dossier, et vous sont communiquées par écrit avant tout engagement.',
    ],
    bouton: 'Demander un accompagnement',
    fragment: 'contact',
  },
  immobilier: {
    paragraphes: [
      'Achat, vente et gestion de terrains et de biens immobiliers en Côte d’Ivoire.',
      'Nous vous accompagnons pour des biens avec Titre Foncier Définitif ou ACD vérifié, avec accompagnement juridique complet.',
    ],
    bouton: 'Voir le pôle Immobilier',
  },
  agrobusiness: {
    paragraphes: [
      'Nous développons des activités agricoles et de transformation, avec nos partenaires industriels et investisseurs, pour valoriser les produits locaux et créer de la valeur en Côte d’Ivoire.',
    ],
    bouton: 'Voir le pôle Agrobusiness',
  },
  commerce: {
    paragraphes: [
      'Sourcing, importation et distribution de produits depuis la Chine, l’Inde, Dubaï, l’Égypte, l’Europe et l’Afrique.',
      'Accompagnement et suivi des formalités de dédouanement et de transit, avec nos transitaires partenaires agréés, sous réserve des contrôles et décisions des autorités douanières. Livraison suivie par GPS jusqu’à votre magasin ou entrepôt.',
    ],
    bouton: 'Voir le pôle Import-Export',
  },
  flottes: {
    paragraphes: [
      'Gestion et sécurisation de vos véhicules et taxis à Abidjan.',
      'Suivi GPS 24h/24, sélection et suivi des chauffeurs, suivi des recettes perçues selon le contrat de gestion signé, et alertes de sécurité.',
      'Immobilisation sécurisée du véhicule à distance, uniquement à l’arrêt et avec l’accord du propriétaire, conformément au contrat signé.',
    ],
    bouton: 'Voir le pôle Flottes & GPS',
  },
  voyage: {
    paragraphes: [
      'Accompagnement pour vos voyages, vos démarches de visa, vos études à l’étranger, et votre pèlerinage en partenariat avec une agence agréée. Les visas sont délivrés uniquement par l’ambassade ou le consulat compétent. WASSIA ne délivre pas les visas.',
    ],
    bouton: 'Voir Voyage & Hadj',
  },
  energie: {
    paragraphes: [
      'Nous développons des solutions d’énergie verte et des unités en cours de développement avec nos partenaires industriels et investisseurs, ainsi que la distribution et la commercialisation d’équipements via nos partenaires fabricants.',
    ],
    bouton: 'Voir Énergie Verte',
  },
};

/*
 * Mise en page d'origine de l'accueil (carrousel, bandeau des engagements, « Pourquoi WASSIA »),
 * remplie avec les textes du client ci-dessus (choix de Cédric, 2026-11-15).
 */

export interface LienAction {
  label: string;
  /** Libellé raccourci sur mobile (boutons côte à côte). */
  labelCourt?: string;
  /** Lien interne… */
  route?: string;
  fragment?: string;
  /** …ou lien externe (WhatsApp), ouvert dans un nouvel onglet. */
  href?: string;
  /** `or` : bouton doré (offre phare) ; `lien` : bouton secondaire. */
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

/** Carrousel de la bannière : la bannière du client, puis deux de ses textes de pôles. */
export const DIAPOSITIVES: readonly Diapositive[] = [
  {
    eyebrow: BANNIERE.nom,
    titre: BANNIERE.devise,
    texte: BANNIERE.texte,
    actions: [
      { label: BANNIERE.boutonServices, route: '/', fragment: 'poles', style: 'or' },
      {
        label: BANNIERE.boutonWhatsapp,
        labelCourt: 'WhatsApp',
        href: lienWhatsapp(),
        style: 'lien',
      },
    ],
    image: 'images/illustrations/immobilier-mobilite.svg',
    alt: 'Illustration : immeuble, maison et véhicule suivi par GPS',
  },
  {
    eyebrow: 'Accompagnement Finance',
    titre: TEXTES_ACCUEIL.finance.accroche ?? '',
    texte: TEXTES_ACCUEIL.finance.paragraphes[0],
    actions: [
      {
        label: TEXTES_ACCUEIL.finance.bouton,
        route: '/accompagnement-finance',
        fragment: 'contact',
        style: 'or',
      },
    ],
    image: 'images/illustrations/transport.svg',
    alt: 'Illustration : véhicules de transport et commerce',
  },
  {
    eyebrow: 'Nos autres services',
    titre: 'Voyage, Hadj, Oumrah & Mobilité',
    texte: TEXTES_ACCUEIL.voyage.paragraphes[0],
    actions: [{ label: TEXTES_ACCUEIL.voyage.bouton, route: '/voyage', style: 'or' }],
    image: 'images/illustrations/voyage.svg',
    alt: 'Illustration : avion, valises et passeport',
  },
];

/** Bandeau des 4 engagements sous la bannière (phrases du client). */
export const ENGAGEMENTS: readonly { titre: string; texte: string }[] = [
  {
    titre: 'Transparence avant tout',
    texte: 'Aucune promesse de résultat garanti. Aucun frais caché.',
  },
  {
    titre: 'Des conditions écrites',
    texte: 'Toutes les conditions vous sont expliquées par écrit avant tout engagement.',
  },
  {
    titre: 'Un accompagnement clair',
    texte:
      'Un groupe ivoirien qui accompagne les entreprises, les commerçants et les investisseurs en Côte d’Ivoire et à l’international.',
  },
  {
    titre: 'Un suivi humain',
    texte: 'Un suivi humain à chaque étape.',
  },
];

/** Bloc « Pourquoi choisir le GROUPE WASSIA ? » (dossier institutionnel officiel 2026). */
export const ATOUTS: readonly { titre: string; texte: string }[] = [
  {
    titre: 'Un interlocuteur unique et crédible',
    texte:
      'Une société holding légalement constituée à Abidjan, avec une gouvernance claire, un siège physique à Treichville et une vision à long terme.',
  },
  {
    titre: 'Une transparence contractuelle',
    texte:
      'Des conditions contractuelles claires, sans frais dissimulés, et un suivi rigoureux de chaque opération. Aucune promesse de résultat garanti.',
  },
  {
    titre: 'Un ancrage local, un réseau mondial',
    texte:
      'La maîtrise des réalités du terrain en Côte d’Ivoire, avec des partenaires stratégiques en Asie, en Europe et en Afrique.',
  },
  {
    titre: 'Un impact social mesurable',
    texte:
      'Chaque partenariat contribue à l’emploi des jeunes, à l’autonomie des femmes et des paysans et à la transformation locale de nos richesses.',
  },
  {
    titre: 'Des pôles qui se renforcent',
    texte:
      'Du champ au marché, de l’usine au magasin : nos pôles travaillent ensemble pour offrir un service global et sécurisé.',
  },
  {
    titre: 'Des partenaires agréés',
    texte:
      'Financement, transit, voyage : nous travaillons avec des partenaires agréés. WASSIA ne collecte pas l’épargne du public et n’octroie pas de prêts.',
  },
];

export const TITRES_ACCUEIL = {
  poles: 'Nos 5 pôles principaux',
  services: 'Nos autres services',
  servicesIntro: 'Découvrez aussi nos autres services :',
} as const;

/** Bande de confiance en bas de l'accueil. */
export const CONFIANCE = {
  titre: 'Notre engagement : Transparence avant tout.',
  texte:
    'Aucune promesse de résultat garanti. Aucun frais caché. Toutes les conditions vous sont expliquées par écrit avant tout engagement.',
} as const;

/** Bloc Contact de l'accueil. */
export const CONTACT_ACCUEIL = {
  titre: 'Contact',
  adresse: 'GROUPE WASSIA SARL HOLDING - Agence Treichville, Avenue 21, Abidjan',
  boutonWhatsapp: 'WhatsApp',
} as const;

export interface Actualite {
  categorie: string;
  titre: string;
  /** Date de publication (ISO) ; vide tant que l'article n'est pas rédigé. */
  date: string;
  image: string;
  alt: string;
}

/** Articles prévus, encore à rédiger. */
export const ACTUALITES: readonly Actualite[] = [
  {
    categorie: 'Import-Export',
    titre: 'Importer en groupage : comment partager un conteneur',
    date: '',
    image: 'images/illustrations/transport.svg',
    alt: 'Illustration : véhicules de transport de marchandises',
  },
  {
    categorie: 'Flottes & GPS',
    titre: 'GPS : suivre son véhicule 24 h/24 depuis son téléphone',
    date: '',
    image: 'images/illustrations/transport.svg',
    alt: 'Illustration : véhicules de transport suivis par GPS',
  },
  {
    categorie: 'Voyage',
    titre: 'Hadj et Oumrah : préparer son dossier',
    date: '',
    image: 'images/illustrations/voyage.svg',
    alt: 'Illustration : avion, valises et passeport',
  },
  {
    categorie: 'Énergie Verte',
    titre: 'Un projet solaire pour une exploitation agricole',
    date: '',
    image: 'images/illustrations/agrobusiness.svg',
    alt: 'Illustration : panneaux solaires et champs cultivés',
  },
  {
    categorie: 'Immobilier',
    titre: 'Acheter un terrain : vérifier le Titre Foncier ou l’ACD',
    date: '',
    image: 'images/illustrations/immobilier-mobilite.svg',
    alt: 'Illustration : immeubles et maisons',
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
  { label: 'Dossiers accompagnés', valeur: null, suffixe: '+' },
  { label: 'Véhicules suivis par GPS', valeur: null, suffixe: '+' },
  { label: 'Biens en gestion', valeur: null, suffixe: '+' },
  { label: 'Pays partenaires', valeur: null, suffixe: '+' },
];
