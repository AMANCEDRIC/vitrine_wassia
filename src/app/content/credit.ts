/**
 * Conditions du crédit et de l'épargne préalable, issues du « Dossier officiel complet 2026 ».
 *
 * À FAIRE VALIDER PAR LE CLIENT avant la mise en ligne : taux, frais de dossier, grille, exemples
 * et comparatif. La grille est indicative : les conditions réelles sont confirmées en agence.
 */

/** Taux unique du crédit, en % par mois (6\u00a0% sur 6 mois, 12\u00a0% sur 12 mois, 18\u00a0% sur 18 mois). */
export const TAUX_MENSUEL = 1;

export const DUREES_CREDIT = [6, 12, 18] as const;
export type DureeCredit = (typeof DUREES_CREDIT)[number];

/** Montant du prêt et frais de dossier, réglés en espèces au décaissement. */
export const GRILLE_CREDIT: readonly { montant: number; frais: number }[] = [
  { montant: 250_000, frais: 8_000 },
  { montant: 500_000, frais: 15_000 },
  { montant: 1_000_000, frais: 25_000 },
  { montant: 3_000_000, frais: 50_000 },
  { montant: 5_000_000, frais: 75_000 },
  { montant: 10_000_000, frais: 120_000 },
];

export interface LigneCredit {
  montant: number;
  frais: number;
  mois: DureeCredit;
  interets: number;
  total: number;
  mensualite: number;
  hebdomadaire: number;
}

/**
 * Échéances d'un prêt : intérêts = montant × 1\u00a0% × mois, hebdomadaire = total / (mois × 4).
 * Les échéances sont arrondies à l'entier inférieur, comme dans la grille du dossier.
 */
export function calculerCredit(montant: number, frais: number, mois: DureeCredit): LigneCredit {
  const interets = Math.round((montant * TAUX_MENSUEL * mois) / 100);
  const total = montant + interets;
  return {
    montant,
    frais,
    mois,
    interets,
    total,
    mensualite: Math.floor(total / mois),
    hebdomadaire: Math.floor(total / (mois * 4)),
  };
}

export function fraisDuMontant(montant: number): number {
  return GRILLE_CREDIT.find((l) => l.montant === montant)?.frais ?? 0;
}

export const ETAPES_CREDIT: readonly { numero: string; titre: string; texte: string }[] = [
  {
    numero: '1',
    titre: 'Ouverture du compte épargne et carte PVC',
    texte:
      'Vous versez 1\u00a0000\u00a0F CFA en espèces à l’inscription et recevez aussitôt votre carte d’épargne PVC à QR code. Les 4\u00a0000\u00a0F restants sont prélevés progressivement sur vos versements des 8 premières semaines.',
  },
  {
    numero: '2',
    titre: 'Épargne préalable : 8 semaines minimum',
    texte:
      'Pendant 8 semaines consécutives (2 mois), vous épargnez au moins 2\u00a0000\u00a0F par semaine, par jour ou par semaine selon votre activité, même à partir de 500\u00a0F par jour.',
  },
  {
    numero: '2 bis',
    titre: 'Continuer d’épargner selon votre projet',
    texte:
      'Après les 8 semaines, vous pouvez demander un prêt. Si le montant visé demande une épargne plus élevée, vous continuez d’épargner avant de déposer la demande : plus l’épargne est solide, plus la capacité de crédit s’élargit.',
  },
  {
    numero: '3',
    titre: 'Demande de prêt et analyse en 48 heures',
    texte:
      'Vous faites votre demande en agence. L’analyse prend 48 heures au maximum et repose sur 3 critères : la régularité des versements, la viabilité du projet et le sérieux. Aucune garantie immobilière ni bulletin de salaire n’est demandé.',
  },
  {
    numero: '4',
    titre: 'Frais de dossier au décaissement',
    texte:
      'Une fois l’accord notifié, vous réglez les frais de dossier en espèces avant de recevoir votre chèque ou virement. Aucun autre frais n’est demandé à l’octroi : pas d’assurance cachée, pas de commission annexe.',
  },
];

export const EXEMPLES_CREDIT: readonly {
  nom: string;
  profil: string;
  lignes: readonly string[];
}[] = [
  {
    nom: 'Maman Koffi',
    profil: 'Vendeuse de vivriers · prêt de 250\u00a0000\u00a0F sur 6 mois',
    lignes: [
      'Elle ouvre son compte avec 1\u00a0000\u00a0F en espèces et reçoit sa carte PVC.',
      'Elle épargne 2\u00a0000\u00a0F par semaine pendant 8 semaines.',
      'Analyse sous 48 h. Elle règle 8\u00a0000\u00a0F de frais de dossier et reçoit 250\u00a0000\u00a0F.',
      'Elle arrête d’épargner et rembourse 44\u00a0166\u00a0F par mois (ou 11\u00a0041\u00a0F par semaine).',
      'Au total, elle rend 265\u00a0000\u00a0F, dont 15\u00a0000\u00a0F d’intérêts, puis récupère son épargne.',
    ],
  },
  {
    nom: 'M. Diabaté',
    profil: 'Chauffeur · prêt de 1\u00a0000\u00a0000\u00a0F sur 12 mois',
    lignes: [
      'Il épargne 10\u00a0000\u00a0F par semaine pendant 8 semaines, puis 4 semaines de plus pour viser 1\u00a0000\u00a0000\u00a0F : son épargne garantie atteint 116\u00a0000\u00a0F.',
      'Analyse sous 48 h. Il règle 25\u00a0000\u00a0F de frais de dossier et reçoit 1\u00a0000\u00a0000\u00a0F.',
      'Il rembourse 93\u00a0333\u00a0F par mois (ou 23\u00a0333\u00a0F par semaine), soit 1\u00a0120\u00a0000\u00a0F au total.',
      'Une fois le prêt soldé, il récupère ses 116\u00a0000\u00a0F d’épargne.',
    ],
  },
];

export const COMPARATIF: readonly {
  acteur: string;
  taux: string;
  exigences: string;
  wassia?: boolean;
}[] = [
  {
    acteur: 'Prêteurs informels (margouillats, tontines)',
    taux: '10\u00a0% à 30\u00a0% par mois',
    exigences: 'Aucun contrat, recouvrement abusif',
  },
  {
    acteur: 'Microfinances classiques',
    taux: '2\u00a0% à 2,5\u00a0% par mois + 5\u00a0% de frais + assurance',
    exigences: 'Garanties lourdes ou fiches de paie',
  },
  {
    acteur: 'Banques traditionnelles',
    taux: '8\u00a0% à 12\u00a0% par an',
    exigences: 'Fiches de paie, garanties hypothécaires',
  },
  {
    acteur: 'GROUPE WASSIA',
    taux: '1\u00a0% par mois (6\u00a0% / 12\u00a0% / 18\u00a0%)',
    exigences: 'Aucune assurance cachée, aucune retenue indue',
    wassia: true,
  },
];

export const SLOGAN =
  'WASSIA, 1\u00a0% par mois, pas de frais cachés. On vous aide, on ne vous étouffe pas.';

/*
 * Conditions reprises de la « Fiche d'enrôlement client & contrat d'adhésion compte épargne »
 * (Formulaire officiel d'enrôlement 2026, fourni par le client) : extrait des conditions générales
 * d'adhésion, discipline de remboursement et pièces demandées à l'ouverture.
 * À FAIRE VALIDER PAR LE CLIENT avant la mise en ligne, comme le reste de ce fichier.
 */

/** Règles du compte d'épargne (articles 1 à 4 des conditions générales d'adhésion). */
export const CONDITIONS_EPARGNE: readonly { titre: string; texte: string }[] = [
  {
    titre: 'Un compte d’épargne, pas un compte courant',
    texte:
      'Les comptes ouverts auprès de GROUPE WASSIA SARL sont exclusivement des comptes d’épargne de préparation au crédit. WASSIA n’est pas une banque commerciale et n’ouvre aucun compte courant.',
  },
  {
    titre: 'Ouverture du compte : 5\u00a0000\u00a0F',
    texte:
      'Vous réglez 1\u00a0000\u00a0F en espèces le jour de l’enrôlement et recevez aussitôt votre carte QR code. Les 4\u00a0000\u00a0F restants sont déduits automatiquement de vos versements d’épargne pendant les 8 semaines obligatoires.',
  },
  {
    titre: 'Droit au prêt',
    texte:
      'L’accès au prêt dépend du respect strict de la régularité d’épargne pendant 8 semaines minimum. Le déblocage est soumis au paiement des frais de dossier en espèces au décaissement. Dès réception du prêt, vous cessez d’épargner pour vous consacrer au remboursement.',
  },
  {
    titre: '100\u00a0% de votre épargne restituée',
    texte:
      'L’épargne accumulée constitue une garantie. Une fois le prêt totalement remboursé, 100\u00a0% de votre épargne vous est restituée sur demande.',
  },
];

/** Que se passe-t-il quand une échéance n'est pas payée à temps (article 5). */
export const DISCIPLINE_REMBOURSEMENT: readonly { delai: string; titre: string; texte: string }[] =
  [
    {
      delai: 'Jusqu’à 5 jours',
      titre: 'Délai de grâce',
      texte: 'Un délai de grâce de 5 jours est accordé pour chaque échéance, sans pénalité.',
    },
    {
      delai: 'Après 5 jours',
      titre: 'Pénalité de retard',
      texte: 'Une pénalité de 400\u00a0F par jour de retard est appliquée.',
    },
    {
      delai: 'À 30 jours',
      titre: 'Procédure amiable',
      texte:
        'En cas d’impayé prolongé atteignant 30 jours, vous vous engagez à vous présenter en agence pour convenir d’un rééchelonnement amiable.',
    },
  ];

export const DISCIPLINE_NOTE =
  'Le recours à la justice ou à la force publique constitue l’ultime recours que GROUPE WASSIA s’efforce toujours d’éviter.';

/** Pièces et informations demandées à l'enrôlement. */
export const PIECES_A_FOURNIR: readonly { titre: string; texte: string }[] = [
  {
    titre: 'Une pièce d’identité',
    texte:
      'Carte nationale d’identité (CNI), carte CMU ou passeport, avec son numéro, ainsi que votre numéro mobile money (Wave, Orange, MTN ou Moov).',
  },
  {
    titre: 'Une photo',
    texte:
      'Une photo est prise directement lors de l’ouverture, pour votre fiche dans la base de données digitale.',
  },
  {
    titre: 'Une personne de confiance',
    texte:
      'Un référent, membre de votre famille ou voisin de marché : nom, lien avec vous, activité, téléphone, domicile et depuis quand vous le connaissez. Il est informé de votre démarche d’épargne.',
  },
  {
    titre: 'Si vous avez moins de 18 ans',
    texte:
      'Vous êtes accompagné d’un parent ou tuteur légal, muni de sa pièce d’identité, lors de la souscription.',
  },
  {
    titre: 'Si vous n’avez pas de CNI',
    texte:
      'L’enrôlement est autorisé sur présentation de la carte CMU accompagnée de l’extrait de naissance original.',
  },
  {
    titre: 'Si vous êtes vendeur ambulant, livreur ou chauffeur',
    texte:
      'Vous fournissez l’identité complète d’un proche qui dispose d’un emplacement fixe (par exemple vendeurs d’eau, livreurs, chauffeurs).',
  },
];
