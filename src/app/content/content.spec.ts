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
import {
  CONDITIONS_EPARGNE,
  DISCIPLINE_REMBOURSEMENT,
  DUREES_CREDIT,
  GRILLE_CREDIT,
  PIECES_A_FOURNIR,
  calculerCredit,
} from './credit';
import { FAQ_FINANCE } from './faq';
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
      'Services financiers et inclusion',
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
    expect(redirection('accompagnement-finance')).toBe('services-financiers');
    expect(redirection('immobilier-mobilite')).toBe('immobilier');
  });

  it('donne à chaque activité une page et un formulaire existant', () => {
    for (const activite of ACTIVITES) {
      const page = PAGES_ACTIVITES[activite.id];
      expect(page.sections.length).toBeGreaterThan(0);
      // Chaque page porte au moins une phrase de prudence (note ou encadré) et un texte de contact.
      expect(page.sections.some((sec) => sec.note || sec.encadre)).toBe(true);
      expect(page.introFormulaire).not.toBe('');
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

  it('affiche le statut d’IOB et ne dit plus « ne collecte pas l’épargne »', () => {
    expect(SITE.mentionIob).toContain('intermédiaire en opérations de banque');
  });

  it('ne promet aucune garantie de loyer ou de recette et ne contredit pas l’épargne', () => {
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
      '85 %',
      '85 %',
      '70 %',
      '70 %',
      'ne collecte pas l’épargne',
      'ne collectons pas l’épargne',
      'n’octroie pas de prêts',
      'n’octroyons pas de prêts',
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
      'Nous vous accompagnons dans la constitution et la présentation de votre dossier',
    );
    expect(TEXTES_ACCUEIL.voyage.paragraphes.join(' ')).toContain(
      'WASSIA ne délivre pas les visas',
    );
  });

  it('calcule la grille de crédit à 1 % par mois', () => {
    expect(GRILLE_CREDIT).toHaveLength(6);
    expect(DUREES_CREDIT).toEqual([6, 12, 18]);
    for (const { montant, frais } of GRILLE_CREDIT) {
      for (const mois of DUREES_CREDIT) {
        const ligne = calculerCredit(montant, frais, mois);
        expect(ligne.interets).toBe((montant * mois) / 100);
        expect(ligne.total).toBe(montant + ligne.interets);
      }
    }
  });

  it('reprend les règles d’épargne de la fiche d’enrôlement 2026', () => {
    const epargne = CONDITIONS_EPARGNE.map((c) => c.titre + ' ' + c.texte)
      .join(' ')
      .replace(/\u00a0/g, ' ');
    for (const extrait of [
      '5 000 F',
      '1 000 F',
      '4 000 F',
      '8 semaines',
      '100 %',
      'compte courant',
    ]) {
      expect(epargne).toContain(extrait);
    }
  });

  it('indique le délai de grâce, la pénalité et la procédure amiable', () => {
    const retards = DISCIPLINE_REMBOURSEMENT.map((d) => d.delai + ' ' + d.texte)
      .join(' ')
      .replace(/\u00a0/g, ' ');
    for (const extrait of ['5 jours', '400 F', '30 jours', 'amiable']) {
      expect(retards).toContain(extrait);
    }
  });

  it('liste les pièces à fournir, dont les cas particuliers', () => {
    const pieces = PIECES_A_FOURNIR.map((p) => p.titre + ' ' + p.texte).join(' ');
    for (const extrait of [
      'CNI',
      'CMU',
      'passeport',
      'tuteur',
      'extrait de naissance',
      'référent',
    ]) {
      expect(pieces).toContain(extrait);
    }
  });

  it('répond dans la FAQ aux questions sur les retards, les documents et la restitution', () => {
    const questions = FAQ_FINANCE.map((q) => q.question).join(' ');
    expect(questions).toMatch(/retard/);
    expect(questions).toMatch(/documents/);
    expect(questions).toMatch(/récupérer/);
  });

  it('ne cite aucune banque partenaire tant qu’aucune convention n’est signée', () => {
    expect(PARTENAIRE_BANCAIRE.nom).toBeNull();
    expect(textePartenariat()).toBe(CONVENTIONNEMENT_EN_COURS);
    expect(CONVENTIONNEMENT_EN_COURS).toContain('APBEF-CI');
  });
});
