import { Injectable, inject } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { ActivatedRouteSnapshot, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

const DESCRIPTION_PAR_DEFAUT =
  'GROUPE WASSIA SARL HOLDING, holding multisectorielle ivoirienne : services financiers et inclusion, immobilier à loyer garanti, mobilité et GPS, voyage et tourisme, agrobusiness et énergies vertes.';

/**
 * Met à jour la meta description à chaque navigation, à partir de `data.description` de la route.
 * Le titre de la page est géré par la propriété `title` des routes.
 */
@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly router = inject(Router);
  private readonly meta = inject(Meta);

  init(): void {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => this.updateDescription(this.router.routerState.snapshot.root));
  }

  private updateDescription(root: ActivatedRouteSnapshot): void {
    let route = root;
    while (route.firstChild) {
      route = route.firstChild;
    }
    const description = (route.data['description'] as string | undefined) ?? DESCRIPTION_PAR_DEFAUT;
    this.meta.updateTag({ name: 'description', content: description });
    this.meta.updateTag({ property: 'og:description', content: description });
  }
}
