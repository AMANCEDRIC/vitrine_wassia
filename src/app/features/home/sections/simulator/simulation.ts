import { DureeCredit, calculerCredit, fraisDuMontant } from '@content/credit';

export interface ResultatSimulation {
  /** Mensualité (prêt) ou capital à terme (épargne). */
  principal: number;
  /** Total à rembourser (prêt) ou total versé (épargne). */
  total: number;
  /** Coût du crédit (prêt) ou intérêts gagnés (épargne). */
  interets: number;
  /** Part du capital (prêt) ou des versements (épargne) dans le total, en %. */
  partBase: number;
}

export interface ResultatPret extends ResultatSimulation {
  hebdomadaire: number;
  /** Frais de dossier, réglés en espèces au décaissement (en plus du total à rembourser). */
  frais: number;
}

/** Prêt WASSIA : taux unique de 1 % par mois, échéances de la grille du dossier officiel. */
export function simulerPret(montant: number, mois: DureeCredit): ResultatPret {
  const ligne = calculerCredit(montant, fraisDuMontant(montant), mois);
  return {
    principal: ligne.mensualite,
    total: ligne.total,
    interets: ligne.interets,
    partBase: (montant / ligne.total) * 100,
    hebdomadaire: ligne.hebdomadaire,
    frais: ligne.frais,
  };
}

/** Épargne : versements mensuels capitalisés, VF = V·((1 + r)^n − 1) / r (r = taux mensuel). */
export function simulerEpargne(
  montant: number,
  tauxAnnuel: number,
  mois: number,
): ResultatSimulation {
  const r = tauxAnnuel / 1200;
  const capital = r ? (montant * (Math.pow(1 + r, mois) - 1)) / r : montant * mois;
  const verse = montant * mois;
  return {
    principal: capital,
    total: verse,
    interets: capital - verse,
    partBase: capital ? (verse / capital) * 100 : 100,
  };
}

/** 1234567 → « 1 234 567 F » (espaces comme la maquette). */
export function formaterFrancs(n: number): string {
  return `${Math.round(n)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} F`;
}

/** 18 → « 1 an et 6 mois ». */
export function formaterDuree(mois: number): string {
  const ans = Math.floor(mois / 12);
  const reste = mois % 12;
  const a = ans ? `${ans} ${ans > 1 ? 'ans' : 'an'}` : '';
  const b = reste ? `${reste} mois` : '';
  return a && b ? `${a} et ${b}` : a || b;
}

export function borner(valeur: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, valeur));
}
