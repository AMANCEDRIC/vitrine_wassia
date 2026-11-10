import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Icon } from '../icon/icon';

/** Bandeau d'appel à l'action placé en bas des pages qui n'ont pas de formulaire (fond vert sapin). */
@Component({
  selector: 'app-page-cta',
  imports: [RouterLink, Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="bg-sapin text-white">
      <div
        class="container-site flex flex-wrap items-center justify-between gap-x-12 gap-y-7 py-14 nav:py-20"
      >
        <div class="flex max-w-[760px] flex-col gap-3">
          <h2
            class="m-0 font-display text-[1.8rem] leading-[1.1] font-extrabold tracking-[-.035em] nav:text-[clamp(1.8rem,3.4vw,2.8rem)]"
          >
            {{ titre() }}
          </h2>
          @if (texte(); as texte) {
            <p class="m-0 text-base leading-[1.6] text-white/90 nav:text-lg">{{ texte }}</p>
          }
        </div>
        <div class="flex flex-wrap gap-3.5">
          <a routerLink="/contact" class="btn-or"
            >Nous contacter <app-icon name="fleche" [size]="20" class="btn-fleche"
          /></a>
          <a routerLink="/" fragment="poles" class="btn-contour-clair">Nos activités</a>
        </div>
      </div>
    </section>
  `,
})
export class PageCta {
  readonly titre = input.required<string>();
  readonly texte = input<string>();
}
