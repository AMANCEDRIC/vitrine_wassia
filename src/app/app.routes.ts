import { Route, Routes } from '@angular/router';
import { ACTIVITES } from '@content/poles';

const SUFFIXE = ' · GROUPE WASSIA';

export const routes: Routes = [
  {
    path: '',
    title: 'GROUPE WASSIA SARL HOLDING · Holding multisectorielle en Côte d’Ivoire',
    loadComponent: () => import('@features/home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'a-propos',
    title: 'À propos' + SUFFIXE,
    data: {
      description:
        'L’identité, la philosophie et la synergie du GROUPE WASSIA SARL HOLDING : cinq pôles d’activités et deux services spécialisés.',
    },
    loadComponent: () => import('@features/about/about.page').then((m) => m.AboutPage),
  },
  ...ACTIVITES.map((a): Route => ({
    path: a.route.slice(1),
    title: a.titre + SUFFIXE,
    data: { activite: a.id, description: a.resume },
    // Le pôle Finance garde la page complète de style-v2 (épargne, crédit, accompagnement de dossiers).
    loadComponent: () =>
      a.id === 'finance'
        ? import('@features/poles/finance/finance.page').then((m) => m.FinancePage)
        : import('@features/poles/activite/activite.page').then((m) => m.ActivitePage),
  })),
  // Anciennes adresses (avant les documents officiels de novembre 2026).
  { path: 'accompagnement-finance', redirectTo: 'services-financiers' },
  { path: 'immobilier-mobilite', redirectTo: 'immobilier' },
  {
    path: 'actualites',
    title: 'Actualités et projets' + SUFFIXE,
    data: {
      description: 'Les actualités et les projets du GROUPE WASSIA dans ses pôles d’activités.',
    },
    loadComponent: () =>
      import('@features/actualites/actualites.page').then((m) => m.ActualitesPage),
  },
  {
    path: 'contact',
    title: 'Contact' + SUFFIXE,
    data: {
      description:
        'Contactez le GROUPE WASSIA : adresse du siège, téléphone, WhatsApp, e-mail et formulaire de demande.',
    },
    loadComponent: () => import('@features/contact/contact.page').then((m) => m.ContactPage),
  },
  {
    path: 'merci',
    title: 'Demande envoyée' + SUFFIXE,
    loadComponent: () => import('@features/merci/merci.page').then((m) => m.MerciPage),
  },
  {
    path: 'cgu',
    title: 'Conditions générales d’utilisation' + SUFFIXE,
    data: { page: 'cgu' },
    loadComponent: () => import('@features/legal/legal.page').then((m) => m.LegalPage),
  },
  {
    path: 'confidentialite',
    title: 'Politique de confidentialité' + SUFFIXE,
    data: { page: 'confidentialite' },
    loadComponent: () => import('@features/legal/legal.page').then((m) => m.LegalPage),
  },
  {
    path: 'mentions-legales',
    title: 'Mentions légales' + SUFFIXE,
    data: { page: 'mentions-legales' },
    loadComponent: () => import('@features/legal/legal.page').then((m) => m.LegalPage),
  },
  {
    path: '**',
    title: 'Page introuvable' + SUFFIXE,
    loadComponent: () => import('@features/not-found/not-found.page').then((m) => m.NotFoundPage),
  },
];
