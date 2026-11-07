import {
  ChangeDetectionStrategy,
  Component,
  DOCUMENT,
  DestroyRef,
  afterNextRender,
  inject,
  signal,
} from '@angular/core';
import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
} from '@angular/router';

/** Durée minimale d'affichage, pour éviter un simple clignotement. */
const MIN_ARRIVEE_MS = 900;
const MIN_NAVIGATION_MS = 450;

const sansFragment = (url: string): string => url.split('#')[0];

/**
 * Écran de chargement : affiché à l'arrivée sur le site (il fait partie du HTML pré-rendu,
 * donc visible tout de suite), puis à chaque changement de page.
 * Un simple changement d'ancre sur la même page (#contact, #poles…) ne le déclenche pas.
 * Sécurité : si JavaScript ne se charge pas, une animation CSS le masque après 4 s.
 */
@Component({
  selector: 'app-page-loader',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'page-loader',
    '[class.is-hidden]': '!visible()',
    '[class.is-first]': 'premiere()',
    '[attr.aria-hidden]': '!visible()',
  },
  templateUrl: './page-loader.html',
})
export class PageLoader {
  protected readonly visible = signal(true);
  /** Premier affichage : animation de secours CSS active. */
  protected readonly premiere = signal(true);

  constructor() {
    const router = inject(Router);
    const document = inject(DOCUMENT);
    const destroyRef = inject(DestroyRef);

    afterNextRender(() => {
      let debut = performance.now();
      let minuteur: number | undefined;
      let urlCourante = sansFragment(router.url);

      const masquer = (minimum: number): void => {
        window.clearTimeout(minuteur);
        const reste = Math.max(0, minimum - (performance.now() - debut));
        minuteur = window.setTimeout(() => this.visible.set(false), reste);
      };

      // Arrivée : on attend la fin du chargement de la page (images, polices).
      if (document.readyState === 'complete') {
        masquer(MIN_ARRIVEE_MS);
      } else {
        window.addEventListener('load', () => masquer(MIN_ARRIVEE_MS), { once: true });
      }

      const abonnement = router.events.subscribe((event) => {
        if (event instanceof NavigationStart) {
          if (sansFragment(event.url) === urlCourante) {
            return;
          }
          this.premiere.set(false);
          window.clearTimeout(minuteur);
          debut = performance.now();
          this.visible.set(true);
        } else if (
          event instanceof NavigationEnd ||
          event instanceof NavigationCancel ||
          event instanceof NavigationError
        ) {
          if (event instanceof NavigationEnd) {
            urlCourante = sansFragment(event.urlAfterRedirects);
          }
          if (!this.premiere()) {
            masquer(MIN_NAVIGATION_MS);
          }
        }
      });

      destroyRef.onDestroy(() => {
        abonnement.unsubscribe();
        window.clearTimeout(minuteur);
      });
    });
  }
}
