import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/** Bloc de service des pages de pôle (maquette v2) : filet supérieur de couleur, sans cadre. */
@Component({
  selector: 'app-service-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'block min-w-0 flex-[1_1_300px] border-t-[3px] pt-[22px]',
    '[style.border-top-color]': 'accent()',
  },
  template: `
    <h3
      class="m-0 mb-3 font-display text-[1.35rem] leading-[1.25] font-bold tracking-[-.02em] text-nuit nav:text-[1.45rem]"
    >
      {{ titre() }}
    </h3>
    <ng-content />
  `,
})
export class ServiceCard {
  readonly titre = input.required<string>();
  readonly accent = input('var(--color-nuit)');
}

/** Citation d'accroche en tête des pages de pôle : grand texte, filet vertical émeraude. */
@Component({
  selector: 'app-pole-quote',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="bg-white">
      <div class="mx-auto max-w-[1100px] px-4 py-14 xs:px-5 nav:px-8 nav:py-24">
        <blockquote class="m-0 border-l-[6px] border-emeraude pl-5 nav:pl-10">
          <p
            class="m-0 font-display text-[1.4rem] leading-[1.3] font-bold tracking-[-.03em] text-nuit nav:text-[clamp(1.5rem,2.8vw,2.4rem)] nav:leading-[1.25]"
          >
            « <ng-content /> »
          </p>
        </blockquote>
      </div>
    </section>
  `,
})
export class PoleQuote {}
