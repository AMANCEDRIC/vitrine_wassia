import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';

/** Point affiché à droite de la bannière quand il n'y a pas d'illustration (ex. zones de l'Import-Export). */
export interface PointBanniere {
  titre: string;
  texte: string;
}

/**
 * Bandeau titre des pages intérieures (maquette v2) : fond nuit, panneau diagonal et filet or à
 * droite (ordinateur). Les boutons d'action sont projetés dans le composant.
 * Pages d'activité (maquette « Site-Pole-* ») : fin du titre soulignée d'une barre or penchée, et
 * illustration ou liste de points à droite.
 */
@Component({
  selector: 'app-page-hero',
  imports: [NgOptimizedImage],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="relative overflow-hidden bg-nuit text-white">
      <div
        class="hero-panel"
        [class.hero-panel-etroit]="!media()"
        [style.background]="fond() === 'roi' ? 'var(--color-sapin)' : 'var(--color-marine)'"
        aria-hidden="true"
      ></div>
      <div class="hero-filet" [class.hero-filet-etroit]="!media()" aria-hidden="true"></div>
      <div
        class="container-site relative flex flex-col gap-10 py-14 nav:flex-row nav:flex-wrap nav:items-center nav:gap-14"
        [class]="large() ? 'nav:pt-[104px] nav:pb-28' : 'nav:pt-24 nav:pb-[104px]'"
      >
        <div class="flex min-w-0 flex-col gap-6" [class]="media() ? 'nav:flex-[1.1_1_540px]' : ''">
          <span class="eyebrow eyebrow-or text-or">{{ eyebrow() }}</span>
          <h1
            class="m-0 max-w-[900px] font-display text-[2.3rem] leading-[1.05] font-extrabold tracking-[-.04em] nav:text-[clamp(2.6rem,5vw,4.6rem)] nav:leading-[1.03]"
          >
            {{ titre() }}
            @if (souligne(); as souligne) {
              <span class="relative inline-block"
                >{{ souligne
                }}<span
                  class="skew-bar absolute inset-x-[.04em] bottom-[.02em] h-[.09em] bg-or"
                  aria-hidden="true"
                ></span
              ></span>
            }
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

        @if (image(); as image) {
          <div
            class="min-w-0 border border-white/35 bg-roi p-2.5 shadow-[0_40px_80px_rgba(0,0,0,.35)] nav:flex-[.9_1_400px] nav:p-3.5"
          >
            <div class="relative aspect-[8/5] overflow-hidden bg-illustration">
              <img [ngSrc]="image" [alt]="imageAlt()" fill priority class="object-cover" />
            </div>
          </div>
        } @else if (points().length) {
          <ul
            class="m-0 grid min-w-0 list-none gap-px border border-white/20 bg-white/20 p-0 nav:flex-[.9_1_400px]"
          >
            @for (point of points(); track point.titre) {
              <li class="flex flex-col gap-1 bg-nuit/95 px-6 py-5">
                <span class="font-display text-lg font-bold text-white">{{ point.titre }}</span>
                <span class="text-[15px] text-brume">{{ point.texte }}</span>
              </li>
            }
          </ul>
        }
      </div>
    </section>
  `,
})
export class PageHero {
  readonly eyebrow = input.required<string>();
  readonly titre = input.required<string>();
  /** Fin du titre, soulignée d'une barre or penchée. */
  readonly souligne = input<string>();
  readonly intro = input<string>();
  /** Couleur du panneau diagonal : `marine` (par défaut) ou `roi` (variante, panneau vert). */
  readonly fond = input<'marine' | 'roi'>('marine');
  /** Variante « À propos » : un peu plus haute. */
  readonly large = input(false);
  /** Illustration affichée à droite (ordinateur), sous le texte (mobile). */
  readonly image = input<string>();
  readonly imageAlt = input('');
  /** Liste affichée à droite quand il n'y a pas d'illustration. */
  readonly points = input<readonly PointBanniere[]>([]);

  protected readonly media = computed(() => !!this.image() || this.points().length > 0);
}
