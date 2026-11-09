import { formaterDuree, formaterFrancs, simulerEpargne, simulerPret } from './simulation';

describe('simulerPret', () => {
  it('reprend la grille du dossier (250 000 F sur 6 mois)', () => {
    const r = simulerPret(250_000, 6);
    expect(r.interets).toBe(15_000);
    expect(r.total).toBe(265_000);
    expect(r.principal).toBe(44_166);
    expect(r.hebdomadaire).toBe(11_041);
    expect(r.frais).toBe(8_000);
  });

  it('reprend la grille du dossier (1 000 000 F sur 12 mois)', () => {
    const r = simulerPret(1_000_000, 12);
    expect(r.interets).toBe(120_000);
    expect(r.total).toBe(1_120_000);
    expect(r.principal).toBe(93_333);
    expect(r.hebdomadaire).toBe(23_333);
    expect(r.frais).toBe(25_000);
  });

  it('reprend la grille du dossier (10 000 000 F sur 18 mois)', () => {
    const r = simulerPret(10_000_000, 18);
    expect(r.total).toBe(11_800_000);
    expect(r.principal).toBe(655_555);
    expect(r.hebdomadaire).toBe(163_888);
  });
});

describe('simulerEpargne', () => {
  it('capitalise une épargne mensuelle', () => {
    const r = simulerEpargne(25_000, 0, 12);
    expect(r.principal).toBe(300_000);
    const avecInterets = simulerEpargne(25_000, 3, 12);
    expect(avecInterets.principal).toBeGreaterThan(300_000);
    expect(avecInterets.total).toBe(300_000);
  });

  it('formate les montants en francs', () => {
    expect(formaterFrancs(1_234_567)).toBe('1 234 567 F');
  });
});

describe('formaterDuree', () => {
  it.each([
    [1, '1 mois'],
    [12, '1 an'],
    [18, '1 an et 6 mois'],
    [24, '2 ans'],
  ])('%i mois → %s', (mois, attendu) => {
    expect(formaterDuree(mois)).toBe(attendu);
  });
});
