import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

/** Bandeau d'appel à l'action placé en bas des pages qui n'ont pas de formulaire. */
@Component({
  selector: 'app-page-cta',
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="relative overflow-hidden bg-marine text-white">
      <span class="step-deco step-deco-a" aria-hidden="true"></span>
      <div
        class="container-site relative flex flex-wrap items-center justify-between gap-6 py-12 nav:py-16"
      >
        <div class="flex max-w-[640px] flex-col gap-2">
          <h2 class="m-0 font-display text-[26px] leading-[1.25] font-bold nav:text-[30px]">
            {{ titre() }}
          </h2>
          @if (texte(); as texte) {
            <p class="m-0 text-base leading-[1.6] text-brume">{{ texte }}</p>
          }
        </div>
        <div class="flex flex-wrap gap-3">
          <a routerLink="/contact" class="btn-or px-[26px] text-base">Nous contacter</a>
          <a routerLink="/" fragment="poles" class="btn-contour-clair px-[22px] text-base"
            >Nos activités</a
          >
        </div>
      </div>
    </section>
  `,
})
export class PageCta {
  readonly titre = input.required<string>();
  readonly texte = input<string>();
}
