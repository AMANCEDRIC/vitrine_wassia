import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/**
 * Bandeau titre des pages intérieures. Les boutons d'action sont projetés dans le composant.
 */
@Component({
  selector: 'app-page-hero',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="text-white" [class]="fond() === 'roi' ? 'bg-roi' : 'bg-marine'">
      <div
        class="container-site flex flex-col gap-4 py-11"
        [class]="large() ? 'nav:py-[72px]' : 'nav:py-16'"
      >
        <span class="eyebrow text-or-clair">{{ eyebrow() }}</span>
        <h1
          class="m-0 font-display text-[30px] leading-[1.15] font-bold"
          [class]="large() ? 'max-w-[760px] nav:text-[44px]' : 'max-w-[800px] nav:text-[42px]'"
        >
          {{ titre() }}
        </h1>
        @if (intro(); as intro) {
          <p
            class="m-0 text-lg leading-[1.6] text-brume"
            [class]="large() ? 'max-w-[640px]' : 'max-w-[720px]'"
          >
            {{ intro }}
          </p>
        }
        <div class="mt-2 flex flex-wrap gap-3 empty:hidden">
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
  readonly fond = input<'marine' | 'roi'>('marine');
  /** Variante « À propos » : un peu plus haute, titre plus grand. */
  readonly large = input(false);
}
