import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SITE } from '@content/site';
import { Icon } from '@shared/ui/icon/icon';

@Component({
  selector: 'app-merci-page',
  imports: [RouterLink, Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="relative overflow-hidden bg-nuit text-brume">
      <div class="hero-panel hero-panel-etroit" aria-hidden="true"></div>
      <div class="hero-filet hero-filet-etroit" aria-hidden="true"></div>
      <div class="container-site relative flex flex-col gap-6 py-20 nav:py-[120px]">
        <span class="mb-3 flex size-[72px] items-center justify-center bg-or" aria-hidden="true">
          <app-icon name="check" [size]="36" color="var(--color-nuit)" />
        </span>
        <h1
          class="m-0 max-w-[820px] font-display text-[2.4rem] leading-[1.04] font-extrabold tracking-[-.04em] text-white nav:text-[clamp(2.4rem,5vw,4.6rem)]"
        >
          Merci, votre demande est envoyée
        </h1>
        <p class="m-0 max-w-[600px] text-lg leading-[1.6] nav:text-[1.2rem]">
          Un conseiller WASSIA vous recontacte par téléphone.
          <span class="hidden nav:inline"
            >Vous pouvez aussi nous écrire à
            <a [href]="'mailto:' + site.email" class="text-or-clair underline hover:text-white">{{
              site.email
            }}</a
            >.</span
          >
        </p>
        <div class="mt-4 flex flex-col gap-3.5 xs:flex-row xs:flex-wrap">
          <a routerLink="/" class="btn-or"
            >Retour à l’accueil <app-icon name="fleche" [size]="20" class="btn-fleche"
          /></a>
          <a routerLink="/" fragment="poles" class="btn-contour-clair hidden nav:inline-flex"
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
