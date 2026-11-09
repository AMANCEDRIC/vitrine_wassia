/**
 * Bornes et valeurs par défaut du simulateur d'épargne (reprises de la maquette).
 * Le taux d'épargne est un EXEMPLE : le client doit confirmer les conditions réelles.
 *
 * Le simulateur de prêt n'a pas de curseurs : il suit la grille du dossier officiel
 * (`content/credit.ts`, taux de 1 % par mois, durées de 6, 12 ou 18 mois).
 */
export type ModeSimulation = 'pret' | 'epargne';

export interface Curseur {
  min: number;
  max: number;
  pas: number;
  defaut: number;
}

export interface ConfigSimulation {
  montant: Curseur;
  taux: Curseur;
  duree: Curseur;
}

export const SIMULATEUR_EPARGNE: ConfigSimulation = {
  montant: { min: 5_000, max: 1_000_000, pas: 5_000, defaut: 25_000 },
  taux: { min: 0, max: 15, pas: 0.5, defaut: 3 },
  duree: { min: 1, max: 60, pas: 1, defaut: 12 },
};

/** Montant et durée proposés par défaut pour le prêt (valeurs de la grille). */
export const PRET_PAR_DEFAUT = { montant: 500_000, duree: 12 } as const;
