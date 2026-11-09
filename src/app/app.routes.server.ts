import { RenderMode, ServerRoute } from '@angular/ssr';

/** Pages pré-rendues au build : le site est servi en HTML statique. */
const PAGES = [
  '',
  'a-propos',
  'services-financiers',
  'immobilier-mobilite',
  'voyage',
  'agrobusiness',
  'actualites',
  'contact',
  'merci',
  'cgu',
  'confidentialite',
  'mentions-legales',
];

export const serverRoutes: ServerRoute[] = [
  ...PAGES.map((path): ServerRoute => ({ path, renderMode: RenderMode.Prerender })),
  // Toute autre adresse : page 404 rendue à la demande, avec un vrai code HTTP 404.
  { path: '**', renderMode: RenderMode.Server, status: 404 },
];
