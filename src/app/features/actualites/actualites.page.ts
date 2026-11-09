import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ACTUALITES } from '@content/accueil';
import { PageHero } from '@shared/ui/page-hero/page-hero';

/** Page Actualités : toutes les actualités et projets du groupe (articles encore à rédiger). */
@Component({
  selector: 'app-actualites-page',
  imports: [PageHero, NgOptimizedImage, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-page-hero
      eyebrow="Actualités"
      titre="Actualités et projets du groupe"
      intro="Les nouveautés et les projets de nos cinq pôles d’activités."
    />

    <section>
      <div class="container-site py-12 nav:py-[72px]">
        <ul class="m-0 grid list-none gap-6 p-0 sm:grid-cols-2 lg:grid-cols-3">
          @for (article of actualites; track article.titre) {
            <li class="card card-hover news-card overflow-hidden">
              <article>
                <div class="relative h-[190px] overflow-hidden bg-illustration">
                  <img
                    [ngSrc]="article.image"
                    [alt]="article.alt"
                    fill
                    class="news-image object-cover"
                  />
                  <span
                    class="absolute top-3 left-3 rounded-full bg-white/90 px-3 py-1 font-sans text-xs font-semibold tracking-[.08em] text-sapin uppercase backdrop-blur"
                    >{{ article.categorie }}</span
                  >
                </div>
                <div class="flex flex-col gap-2.5 p-[22px]">
                  <h2 class="m-0 font-display text-lg leading-[1.35] font-bold text-marine">
                    {{ article.titre }}
                  </h2>
                  <span class="text-[13px] text-ardoise">
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
    <section class="bg-marine text-white">
      <div class="container-site flex flex-wrap items-center justify-between gap-6 py-12 nav:py-16">
        <h2
          class="m-0 max-w-[640px] font-display text-[26px] leading-[1.25] font-bold nav:text-[30px]"
        >
          Parlons de votre projet avec le pôle qui vous correspond.
        </h2>
        <a routerLink="/contact" class="btn-or px-[26px] text-base">Nous contacter</a>
      </div>
    </section>
  `,
})
export class ActualitesPage {
  protected readonly actualites = ACTUALITES;
}
