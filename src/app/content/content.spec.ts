import { routes } from '../app.routes';
import { serverRoutes } from '../app.routes.server';
import { FORMULAIRES } from './formulaires';
import { POLES } from './poles';
import { CONVENTIONNEMENT_EN_COURS, PARTENAIRE_BANCAIRE, textePartenariat } from './site';

describe('Contenus', () => {
  it('liste les 5 pôles retenus, avec des identifiants uniques', () => {
    expect(POLES.map((p) => p.id)).toEqual([
      'finance',
      'immobilier',
      'mobilite',
      'voyage',
      'agrobusiness',
    ]);
  });

  it('fait pointer chaque pôle vers une route existante et pré-rendue', () => {
    const paths = routes.map((r) => r.path);
    const prerendues = serverRoutes.map((r) => r.path);
    for (const pole of POLES) {
      const path = pole.route.slice(1);
      expect(paths).toContain(path);
      expect(prerendues).toContain(path);
    }
  });

  it('demande un téléphone obligatoire dans chaque formulaire', () => {
    for (const config of Object.values(FORMULAIRES)) {
      const tel = config.champs.find((c) => c.name === 'telephone');
      expect(tel?.required).toBe(true);
    }
  });

  it('ne cite aucune banque partenaire tant qu’aucune convention n’est signée', () => {
    expect(PARTENAIRE_BANCAIRE.nom).toBeNull();
    expect(textePartenariat()).toBe(CONVENTIONNEMENT_EN_COURS);
    expect(CONVENTIONNEMENT_EN_COURS).toContain('APBEF-CI');
  });
});
