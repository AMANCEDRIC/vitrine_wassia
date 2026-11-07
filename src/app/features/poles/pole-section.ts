import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/** Carte de service avec un filet de couleur en haut (pages des pôles). */
@Component({
  selector: 'app-service-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class:
      'block min-w-0 flex-[1_1_320px] rounded-xl border border-t-4 border-trait bg-white p-[26px]',
    '[style.border-top-color]': 'accent()',
  },
  template: `
    <h3 class="m-0 mb-2.5 font-display text-[19px] leading-[1.3] font-bold text-marine">
      {{ titre() }}
    </h3>
    <ng-content />
  `,
})
export class ServiceCard {
  readonly titre = input.required<string>();
  readonly accent = input('var(--color-emeraude)');
}

/** Citation d'accroche en tête des pages de pôle. */
@Component({
  selector: 'app-pole-quote',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section>
      <div class="container-site py-12 nav:py-[72px]">
        <p
          class="m-0 max-w-[900px] font-display text-xl leading-normal font-semibold text-marine nav:text-2xl"
        >
          « <ng-content /> »
        </p>
      </div>
    </section>
  `,
})
export class PoleQuote {}
