import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/**
 * Bandeau titre des pages intérieures (maquette v2) : fond nuit, panneau diagonal et filet or à
 * droite (ordinateur). Les boutons d'action sont projetés dans le composant.
 */
@Component({
  selector: 'app-page-hero',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="relative overflow-hidden bg-nuit text-white">
      <div
        class="hero-panel hero-panel-etroit"
        [style.background]="fond() === 'roi' ? 'var(--color-sapin)' : 'var(--color-marine)'"
        aria-hidden="true"
      ></div>
      <div class="hero-filet hero-filet-etroit" aria-hidden="true"></div>
      <div
        class="container-site relative flex flex-col gap-6 py-14"
        [class]="large() ? 'nav:pt-[104px] nav:pb-28' : 'nav:pt-24 nav:pb-[104px]'"
      >
        <span class="eyebrow eyebrow-or text-or">{{ eyebrow() }}</span>
        <h1
          class="m-0 max-w-[900px] font-display text-[2.3rem] leading-[1.05] font-extrabold tracking-[-.04em] nav:text-[clamp(2.6rem,5vw,4.6rem)] nav:leading-[1.03]"
        >
          {{ titre() }}
        </h1>
        @if (intro(); as intro) {
          <p
            class="m-0 text-lg leading-[1.6] text-brume nav:text-[1.2rem]"
            [class]="large() ? 'max-w-[560px]' : 'max-w-[640px]'"
          >
            {{ intro }}
          </p>
        }
        <div class="mt-3 flex flex-wrap gap-3.5 empty:hidden">
          <ng-content />
        </div>
      </div>
    </section>
  `,
})
export class PageHero {
  readonly eyebrow = input.required<string>();
  readonly titre = input.required<string>();
  readonly intro = input<string>();
  /** Couleur du panneau diagonal : `marine` (par défaut) ou `roi` (variante, panneau vert). */
  readonly fond = input<'marine' | 'roi'>('marine');
  /** Variante « À propos » : un peu plus haute. */
  readonly large = input(false);
}
