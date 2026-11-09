import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ATOUTS } from '@content/accueil';

/** « Pourquoi choisir le GROUPE WASSIA ? » : six atouts numérotés. */
@Component({
  selector: 'app-why',
  imports: [RouterLink, DecimalPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="relative overflow-hidden bg-linear-160 from-roi to-marine text-white">
      <span class="step-deco step-deco-a" aria-hidden="true"></span>
      <div class="container-site relative flex flex-col gap-10 py-12 nav:py-20">
        <div class="flex flex-wrap items-end justify-between gap-6">
          <div class="flex max-w-[640px] flex-col gap-3">
            <span class="eyebrow text-or-clair">Pourquoi WASSIA</span>
            <h2 class="m-0 font-display text-[26px] leading-[1.2] font-bold nav:text-4xl">
              Pourquoi choisir le GROUPE WASSIA ?
            </h2>
            <p class="m-0 text-[17px] leading-[1.6] text-brume">
              Six raisons de nous confier vos biens, votre mobilité et votre épargne.
            </p>
          </div>
          <a routerLink="/contact" class="btn-or px-5 py-[13px] text-sm">Parlons-en</a>
        </div>

        <ul class="m-0 grid list-none gap-5 p-0 md:grid-cols-2 nav:grid-cols-3">
          @for (atout of atouts; track atout.titre; let i = $index) {
            <li
              class="group flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/5 p-6 transition-[translate,background-color,border-color] duration-500 ease-doux hover:-translate-y-1 hover:border-or/50 hover:bg-white/10"
            >
              <span
                class="font-display text-[34px] leading-none font-black text-transparent transition-colors duration-500 ease-doux [-webkit-text-stroke:1.5px_var(--color-or)] group-hover:text-or"
                aria-hidden="true"
                >{{ i + 1 | number: '2.0' }}</span
              >
              <h3 class="m-0 font-display text-lg leading-snug font-bold">{{ atout.titre }}</h3>
              <p class="m-0 text-[15px] leading-[1.6] text-brume">{{ atout.texte }}</p>
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
