/**
 * Conditions du crédit et de l'épargne préalable, issues du « Dossier officiel complet 2026 ».
 *
 * À FAIRE VALIDER PAR LE CLIENT avant la mise en ligne : taux, frais de dossier, grille, exemples
 * et comparatif. La grille est indicative : les conditions réelles sont confirmées en agence.
 */

/** Taux unique du crédit, en % par mois (6 % sur 6 mois, 12 % sur 12 mois, 18 % sur 18 mois). */
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
 * Échéances d'un prêt : intérêts = montant × 1 % × mois, hebdomadaire = total / (mois × 4).
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
      'Vous versez 1 000 F CFA en espèces à l’inscription et recevez aussitôt votre carte d’épargne PVC à QR code. Les 4 000 F restants sont prélevés progressivement sur vos versements des 8 premières semaines.',
  },
  {
    numero: '2',
    titre: 'Épargne préalable : 8 semaines minimum',
    texte:
      'Pendant 8 semaines consécutives (2 mois), vous épargnez au moins 2 000 F par semaine, par jour ou par semaine selon votre activité, même à partir de 500 F par jour.',
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
      'Une fois l’accord notifié, vous réglez les frais de dossier en espèces avant de recevoir votre chèque ou virement. Aucun autre frais n’est demandé : pas d’assurance cachée, pas de commission annexe.',
  },
];

export const EXEMPLES_CREDIT: readonly {
  nom: string;
  profil: string;
  lignes: readonly string[];
}[] = [
  {
    nom: 'Maman Koffi',
    profil: 'Vendeuse de vivriers · prêt de 250 000 F sur 6 mois',
    lignes: [
      'Elle ouvre son compte avec 1 000 F en espèces et reçoit sa carte PVC.',
      'Elle épargne 2 000 F par semaine pendant 8 semaines.',
      'Analyse sous 48 h. Elle règle 8 000 F de frais de dossier et reçoit 250 000 F.',
      'Elle arrête d’épargner et rembourse 44 166 F par mois (ou 11 041 F par semaine).',
      'Au total, elle rend 265 000 F, dont 15 000 F d’intérêts, puis récupère son épargne.',
    ],
  },
  {
    nom: 'M. Diabaté',
    profil: 'Chauffeur · prêt de 1 000 000 F sur 12 mois',
    lignes: [
      'Il épargne 10 000 F par semaine pendant 8 semaines, puis 4 semaines de plus pour viser 1 000 000 F : son épargne garantie atteint 116 000 F.',
      'Analyse sous 48 h. Il règle 25 000 F de frais de dossier et reçoit 1 000 000 F.',
      'Il rembourse 93 333 F par mois (ou 23 333 F par semaine), soit 1 120 000 F au total.',
      'Une fois le prêt soldé, il récupère ses 116 000 F d’épargne.',
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
    taux: '10 % à 30 % par mois',
    exigences: 'Aucun contrat, recouvrement abusif',
  },
  {
    acteur: 'Microfinances classiques',
    taux: '2 % à 2,5 % par mois + 5 % de frais + assurance',
    exigences: 'Garanties lourdes ou fiches de paie',
  },
  {
    acteur: 'Banques traditionnelles',
    taux: '8 % à 12 % par an',
    exigences: 'Fiches de paie, garanties hypothécaires',
  },
  {
    acteur: 'GROUPE WASSIA',
    taux: '1 % par mois (6 % / 12 % / 18 %)',
    exigences: 'Aucune assurance cachée, aucune retenue indue',
    wassia: true,
  },
];

export const SLOGAN = 'WASSIA, 1 % par mois, pas de frais cachés. On vous aide, on ne vous étouffe pas.';
