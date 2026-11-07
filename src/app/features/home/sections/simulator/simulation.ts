import { ModeSimulation } from '@content/simulateur';

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

/**
 * Même calcul que la maquette :
 * - prêt : mensualité constante M = C·r / (1 − (1 + r)^−n), avec r le taux mensuel ;
 * - épargne : versements mensuels capitalisés, VF = V·((1 + r)^n − 1) / r.
 */
export function simuler(
  mode: ModeSimulation,
  montant: number,
  tauxAnnuel: number,
  mois: number,
): ResultatSimulation {
  const r = tauxAnnuel / 1200;
  if (mode === 'pret') {
    const mensualite = r ? (montant * r) / (1 - Math.pow(1 + r, -mois)) : montant / mois;
    const total = mensualite * mois;
    return {
      principal: mensualite,
      total,
      interets: total - montant,
      partBase: total ? (montant / total) * 100 : 100,
    };
  }
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
