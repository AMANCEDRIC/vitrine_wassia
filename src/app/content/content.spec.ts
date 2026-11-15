import { routes } from '../app.routes';
import { serverRoutes } from '../app.routes.server';
import { CONTACT_SUJETS } from '../shared/data/contact.model';
import {
  ATOUTS,
  BANNIERE,
  CONFIANCE,
  DIAPOSITIVES,
  ENGAGEMENTS,
  PRESENTATION,
  TEXTES_ACCUEIL,
} from './accueil';
import { PAGES_ACTIVITES } from './activites';
import { SYNERGIES } from './groupe';
import { LEGAL } from './legal';
import { FORMULAIRES } from './formulaires';
import { ACTIVITES, POLES, SERVICES } from './poles';
import {
  CONVENTIONNEMENT_EN_COURS,
  PARTENAIRE_BANCAIRE,
  SITE,
  SLOGAN,
  textePartenariat,
} from './site';

describe('Contenus', () => {
  it('suit l’ordre du client : 5 pôles et 2 autres services, identifiants uniques', () => {
    expect(POLES.map((p) => p.id)).toEqual([
      'finance',
      'immobilier',
      'agrobusiness',
      'commerce',
      'flottes',
    ]);
    expect(POLES.map((p) => p.titre)).toEqual([
      'Accompagnement Finance',
      'Immobilier',
      'Agrobusiness',
      'Import-Export & Commerce Général',
      'Flottes & GPS',
    ]);
    expect(SERVICES.map((s) => s.id)).toEqual(['voyage', 'energie']);
    expect(new Set(ACTIVITES.map((a) => a.route)).size).toBe(ACTIVITES.length);
  });

  it('fait pointer chaque activité vers une route existante et pré-rendue', () => {
    const paths = routes.map((r) => r.path);
    const prerendues = serverRoutes.map((r) => r.path);
    for (const activite of ACTIVITES) {
      const path = activite.route.slice(1);
      expect(paths).toContain(path);
      expect(prerendues).toContain(path);
    }
  });

  it('redirige les anciennes adresses vers les nouvelles pages', () => {
    const redirection = (path: string) => routes.find((r) => r.path === path)?.redirectTo;
    expect(redirection('services-financiers')).toBe('accompagnement-finance');
    expect(redirection('immobilier-mobilite')).toBe('immobilier');
  });

  it('donne à chaque activité une page et un formulaire existant', () => {
    for (const activite of ACTIVITES) {
      const page = PAGES_ACTIVITES[activite.id];
      expect(page.sections.length).toBeGreaterThan(0);
      expect(page.avertissements.length).toBeGreaterThan(0);
      expect(CONTACT_SUJETS).toContain(page.formulaire);
    }
  });

  it('demande un téléphone obligatoire dans chaque formulaire', () => {
    for (const config of Object.values(FORMULAIRES)) {
      const tel = config.champs.find((c) => c.name === 'telephone');
      expect(tel?.required).toBe(true);
    }
  });

  it('place le siège à Treichville et affiche le RCCM du dossier officiel', () => {
    expect(SITE.siege).toContain('Treichville');
    expect(SITE.rccm).toBe('CI-ABJ-03-2026-B12-08942');
  });

  it('précise que WASSIA ne collecte pas l’épargne et n’octroie pas de prêts', () => {
    expect(SITE.mentionFinance).toContain('ne collecte pas l’épargne du public');
    expect(PAGES_ACTIVITES.finance.avertissements.join(' ')).toContain('n’octroie pas de prêts');
  });

  it('ne promet aucune garantie de loyer ou de recette, ni épargne, ni tontine', () => {
    const textes = JSON.stringify([
      PAGES_ACTIVITES,
      ACTIVITES,
      BANNIERE,
      PRESENTATION,
      TEXTES_ACCUEIL,
      CONFIANCE,
      DIAPOSITIVES,
      ENGAGEMENTS,
      ATOUTS,
      SYNERGIES,
      LEGAL,
    ]).toLowerCase();
    for (const interdit of [
      'loyer garanti',
      'recette garantie',
      'recette journalière garantie',
      'tontine',
      'compte d’épargne',
      'carte membre',
      '% par mois',
    ]) {
      expect(textes).not.toContain(interdit);
    }
  });

  it('reprend le texte d’accueil du client pour chaque activité, avec sa devise', () => {
    expect(SLOGAN).toBe('Votre Référence, Notre Engagement');
    expect(BANNIERE.devise).toBe(SLOGAN);
    for (const activite of ACTIVITES) {
      const texte = TEXTES_ACCUEIL[activite.id];
      expect(texte.paragraphes.length).toBeGreaterThan(0);
      expect(texte.bouton).not.toBe('');
    }
    expect(TEXTES_ACCUEIL.finance.paragraphes.join(' ')).toContain(
      'Nous ne collectons pas l’épargne du public',
    );
    expect(TEXTES_ACCUEIL.voyage.paragraphes.join(' ')).toContain(
      'WASSIA ne délivre pas les visas',
    );
  });

  it('ne cite aucune banque partenaire tant qu’aucune convention n’est signée', () => {
    expect(PARTENAIRE_BANCAIRE.nom).toBeNull();
    expect(textePartenariat()).toBe(CONVENTIONNEMENT_EN_COURS);
    expect(CONVENTIONNEMENT_EN_COURS).toContain('APBEF-CI');
  });
});
