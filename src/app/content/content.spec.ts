import { routes } from '../app.routes';
import { serverRoutes } from '../app.routes.server';
import {
  CONDITIONS_EPARGNE,
  DISCIPLINE_REMBOURSEMENT,
  DUREES_CREDIT,
  GRILLE_CREDIT,
  PIECES_A_FOURNIR,
  calculerCredit,
} from './credit';
import { FAQ_FINANCE } from './faq';
import { FORMULAIRES } from './formulaires';
import { POLES } from './poles';
import {
  AGENCE,
  CONVENTIONNEMENT_EN_COURS,
  PARTENAIRE_BANCAIRE,
  SITE,
  textePartenariat,
} from './site';

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

  it('garde le siège à Yopougon et ajoute l’agence de Treichville', () => {
    expect(SITE.siege).toContain('Yopougon');
    expect(AGENCE.adresse).toContain('Treichville');
  });

  it('ne cite aucune banque partenaire tant qu’aucune convention n’est signée', () => {
    expect(PARTENAIRE_BANCAIRE.nom).toBeNull();
    expect(textePartenariat()).toBe(CONVENTIONNEMENT_EN_COURS);
    expect(CONVENTIONNEMENT_EN_COURS).toContain('APBEF-CI');
  });
});
