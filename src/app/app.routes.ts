import { Routes } from '@angular/router';

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
        'L’histoire, la vision et la gouvernance du GROUPE WASSIA SARL HOLDING, holding animatrice de cinq pôles d’activités.',
    },
    loadComponent: () => import('@features/about/about.page').then((m) => m.AboutPage),
  },
  {
    path: 'services-financiers',
    title: 'Services financiers et inclusion' + SUFFIXE,
    data: {
      description:
        'Intermédiation en opérations de banque, épargne communautaire par carte membre à QR code et solidarité mutualisée.',
    },
    loadComponent: () => import('@features/poles/finance/finance.page').then((m) => m.FinancePage),
  },
  {
    path: 'immobilier-mobilite',
    title: 'Immobilier et mobilité' + SUFFIXE,
    data: {
      description:
        'Gestion locative à loyer garanti, rénovation de biens, gestion de flottes avec recette journalière et balises GPS.',
    },
    loadComponent: () =>
      import('@features/poles/immobilier-mobilite/immobilier-mobilite.page').then(
        (m) => m.ImmobilierMobilitePage,
      ),
  },
  {
    path: 'voyage',
    title: 'Voyage, tourisme et mobilité' + SUFFIXE,
    data: {
      description:
        'Billetterie aérienne, assistance visa et e-visa, conseil en mobilité internationale et conciergerie de séjour.',
    },
    loadComponent: () => import('@features/poles/voyage/voyage.page').then((m) => m.VoyagePage),
  },
  {
    path: 'agrobusiness',
    title: 'Agrobusiness, industrie et énergies vertes' + SUFFIXE,
    data: {
      description:
        'Production agricole, élevage, transformation, import-export et énergies renouvelables.',
    },
    loadComponent: () =>
      import('@features/poles/agrobusiness/agrobusiness.page').then((m) => m.AgrobusinessPage),
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
