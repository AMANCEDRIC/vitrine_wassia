import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found-page',
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section>
      <div
        class="mx-auto flex max-w-[760px] flex-col items-center gap-5 px-4 py-16 text-center nav:px-10 nav:py-24"
      >
        <span class="eyebrow text-sapin">Erreur 404</span>
        <h1 class="m-0 font-display text-[26px] leading-[1.2] font-bold text-marine nav:text-4xl">
          Cette page n’existe pas
        </h1>
        <p class="m-0 text-base leading-[1.6] text-ardoise nav:text-lg">
          Le lien est peut-être incomplet, ou la page a été déplacée.
        </p>
        <div class="mt-2 flex flex-wrap justify-center gap-3">
          <a routerLink="/" class="btn bg-sapin px-[22px] py-3.5 text-[15px] font-bold text-white"
            >Retour à l’accueil</a
          >
          <a
            routerLink="/"
            fragment="poles"
            class="btn-contour-marine px-[21px] py-[13px] text-[15px]"
            >Voir nos activités</a
          >
        </div>
      </div>
    </section>
  `,
})
export class NotFoundPage {}
