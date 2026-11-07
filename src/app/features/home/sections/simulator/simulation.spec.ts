import { formaterDuree, formaterFrancs, simuler } from './simulation';

describe('simuler', () => {
  it('calcule la mensualité d’un prêt comme la maquette (500 000 F, 12 %, 12 mois)', () => {
    const r = simuler('pret', 500_000, 12, 12);
    expect(formaterFrancs(r.principal)).toBe('44 424 F');
    expect(formaterFrancs(r.total)).toBe('533 093 F');
    expect(formaterFrancs(r.interets)).toBe('33 093 F');
  });

  it('répartit le capital sans intérêts quand le taux est nul', () => {
    const r = simuler('pret', 120_000, 0, 12);
    expect(r.principal).toBe(10_000);
    expect(r.interets).toBe(0);
    expect(r.partBase).toBe(100);
  });

  it('capitalise une épargne mensuelle', () => {
    const r = simuler('epargne', 25_000, 0, 12);
    expect(r.principal).toBe(300_000);
    const avecInterets = simuler('epargne', 25_000, 3, 12);
    expect(avecInterets.principal).toBeGreaterThan(300_000);
    expect(avecInterets.total).toBe(300_000);
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
