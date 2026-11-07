/**
 * Bornes et valeurs par défaut du simulateur (reprises de la maquette).
 * Les taux sont des EXEMPLES : le client doit confirmer les conditions réelles avant la mise en ligne.
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

export const SIMULATEUR: Record<ModeSimulation, ConfigSimulation> = {
  pret: {
    montant: { min: 50_000, max: 10_000_000, pas: 10_000, defaut: 500_000 },
    taux: { min: 0, max: 36, pas: 0.5, defaut: 12 },
    duree: { min: 3, max: 60, pas: 1, defaut: 12 },
  },
  epargne: {
    montant: { min: 5_000, max: 1_000_000, pas: 5_000, defaut: 25_000 },
    taux: { min: 0, max: 15, pas: 0.5, defaut: 3 },
    duree: { min: 1, max: 60, pas: 1, defaut: 12 },
  },
};
