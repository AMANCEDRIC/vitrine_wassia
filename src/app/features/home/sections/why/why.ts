import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ATOUTS } from '@content/accueil';
import { Icon } from '@shared/ui/icon/icon';

/** « Pourquoi choisir le GROUPE WASSIA ? » : six atouts numérotés. */
@Component({
  selector: 'app-why',
  imports: [RouterLink, DecimalPipe, Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="bg-fond">
      <div class="container-site py-14 nav:py-[120px]">
        <div class="mb-10 flex flex-wrap items-end justify-between gap-x-12 gap-y-6 nav:mb-16">
          <div class="flex max-w-[820px] flex-col gap-5">
            <span class="eyebrow text-ardoise">Pourquoi WASSIA</span>
            <h2 class="section-title">Pourquoi choisir le GROUPE WASSIA ?</h2>
            <p class="section-lead">
              Six raisons de nous confier vos biens, votre mobilité et votre épargne.
            </p>
          </div>
          <a routerLink="/contact" class="btn-contour-marine"
            >Parlons-en <app-icon name="fleche" [size]="20" class="btn-fleche"
          /></a>
        </div>

        <ul class="m-0 grid list-none gap-x-12 gap-y-10 p-0 md:grid-cols-2 lg:grid-cols-3 nav:gap-y-14">
          @for (atout of atouts; track atout.titre; let i = $index) {
            <li class="border-t-2 border-nuit pt-[22px]">
              <span
                class="mb-4 flex items-center gap-3 font-display text-[13px] font-semibold tracking-[.1em] text-sapin"
                >{{ i + 1 | number: '2.0' }}
                <span class="h-px flex-1 bg-trait" aria-hidden="true"></span>
              </span>
              <h3
                class="m-0 mb-2.5 font-display text-[1.4rem] leading-[1.25] font-bold tracking-[-.02em] text-nuit"
              >
                {{ atout.titre }}
              </h3>
              <p class="m-0 text-ardoise">{{ atout.texte }}</p>
            </li>
          }
        </ul>
      </div>
    </section>
  `,
})
export class Why {
  protected readonly atouts = ATOUTS;
}
