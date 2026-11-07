import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SITE } from '@content/site';
import { Icon } from '@shared/ui/icon/icon';

@Component({
  selector: 'app-merci-page',
  imports: [RouterLink, Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section>
      <div
        class="mx-auto flex max-w-[760px] flex-col items-center gap-5 px-4 py-16 text-center nav:px-10 nav:py-24"
      >
        <div class="flex size-[84px] items-center justify-center rounded-full bg-succes-fond">
          <app-icon name="check" [size]="44" color="var(--color-succes)" />
        </div>
        <h1 class="m-0 font-display text-[26px] leading-[1.2] font-bold text-marine nav:text-4xl">
          Merci, votre demande est envoyée
        </h1>
        <p class="m-0 text-base leading-[1.6] text-ardoise nav:text-lg">
          Un conseiller WASSIA vous recontacte par téléphone.
          <span class="hidden nav:inline"
            >Vous pouvez aussi nous écrire à
            <a [href]="'mailto:' + site.email" class="text-sapin underline">{{ site.email }}</a
            >.</span
          >
        </p>
        <div
          class="mt-2 flex w-full flex-col justify-center gap-3 nav:w-auto nav:flex-row nav:flex-wrap"
        >
          <a routerLink="/" class="btn bg-sapin px-[22px] py-3.5 text-[15px] font-bold text-white"
            >Retour à l’accueil</a
          >
          <a
            routerLink="/"
            fragment="poles"
            class="btn-contour-marine hidden px-[21px] py-[13px] text-[15px] nav:inline-flex"
            >Voir nos activités</a
          >
        </div>
      </div>
    </section>
  `,
})
export class MerciPage {
  protected readonly site = SITE;
}
