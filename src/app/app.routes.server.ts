import { RenderMode, ServerRoute } from '@angular/ssr';
import { ACTIVITES } from './content/poles';

/** Pages pré-rendues au build : le site est servi en HTML statique. */
const PAGES = [
  '',
  'a-propos',
  ...ACTIVITES.map((a) => a.route.slice(1)),
  'actualites',
  'contact',
  'merci',
  'cgu',
  'confidentialite',
  'mentions-legales',
];

/**
 * Anciennes adresses, redirigées vers les nouvelles pages (`redirectTo` dans `app.routes.ts`).
 * Le pré-rendu ne produit pas de fichier pour une redirection : les versions statiques reçoivent
 * une page de redirection écrite à la main (`public/<adresse>/index.html`), servie en priorité.
 */
const REDIRECTIONS = ['services-financiers', 'immobilier-mobilite'];

export const serverRoutes: ServerRoute[] = [
  ...PAGES.map((path): ServerRoute => ({ path, renderMode: RenderMode.Prerender })),
  ...REDIRECTIONS.map((path): ServerRoute => ({ path, renderMode: RenderMode.Server })),
  // Toute autre adresse : page 404 rendue à la demande, avec un vrai code HTTP 404.
  { path: '**', renderMode: RenderMode.Server, status: 404 },
];
