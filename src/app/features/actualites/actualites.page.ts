import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ACTUALITES } from '@content/accueil';
import { Icon } from '@shared/ui/icon/icon';
import { PageHero } from '@shared/ui/page-hero/page-hero';

/** Page Actualités : toutes les actualités et projets du groupe (articles encore à rédiger). */
@Component({
  selector: 'app-actualites-page',
  imports: [PageHero, NgOptimizedImage, RouterLink, Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-page-hero
      eyebrow="Actualités"
      titre="Actualités et projets du groupe"
      intro="Les nouveautés et les projets de nos cinq pôles d’activités."
    />

    <section class="bg-white">
      <div class="container-site py-14 nav:py-[120px]">
        <ul class="m-0 grid list-none gap-x-7 gap-y-12 p-0 sm:grid-cols-2 lg:grid-cols-3">
          @for (article of actualites; track article.titre) {
            <li class="group news-card border-t-2 border-nuit pt-[18px]">
              <article>
                <div class="relative aspect-[8/5] overflow-hidden bg-marine">
                  <img
                    [ngSrc]="article.image"
                    [alt]="article.alt"
                    fill
                    class="news-image object-cover"
                  />
                </div>
                <div class="flex flex-col gap-2.5 pt-5">
                  <span
                    class="flex items-center gap-2.5 font-display text-xs font-semibold tracking-[.14em] text-sapin uppercase"
                    ><span class="skew-bar h-[15px] w-[7px] bg-or" aria-hidden="true"></span
                    >{{ article.categorie }}</span
                  >
                  <h2
                    class="m-0 font-display text-[1.3rem] leading-[1.25] font-bold tracking-[-.02em] text-nuit transition-colors duration-300 group-hover:text-sapin"
                  >
                    {{ article.titre }}
                  </h2>
                  <span class="text-sm text-ardoise">
                    @if (article.date) {
                      <time [attr.datetime]="article.date">{{ article.date }}</time>
                    } @else {
                      Article à paraître
                    }
                  </span>
                </div>
              </article>
            </li>
          }
        </ul>
      </div>
    </section>

    <!-- Appel à l'action, identique à celui de la page À propos -->
    <section class="bg-sapin text-white">
      <div
        class="container-site flex flex-wrap items-center justify-between gap-x-12 gap-y-7 py-14 nav:py-20"
      >
        <h2
          class="m-0 max-w-[760px] font-display text-[1.8rem] leading-[1.1] font-extrabold tracking-[-.035em] nav:text-[clamp(1.8rem,3.4vw,2.8rem)]"
        >
          Parlons de votre projet avec le pôle qui vous correspond.
        </h2>
        <a routerLink="/contact" class="btn-or"
          >Nous contacter <app-icon name="fleche" [size]="20" class="btn-fleche"
        /></a>
      </div>
    </section>
  `,
})
export class ActualitesPage {
  protected readonly actualites = ACTUALITES;
}
