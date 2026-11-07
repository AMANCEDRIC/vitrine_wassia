import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CHIFFRES_CLES, ChiffreCle } from '@content/accueil';
import { CountUp } from '@shared/ui/count-up/count-up';

type ChiffreConnu = ChiffreCle & { valeur: number };

/**
 * Bandeau de chiffres clés animés. Il ne s'affiche que lorsque TOUS les chiffres sont renseignés
 * dans `content/accueil.ts` (valeurs réelles fournies par le client).
 */
@Component({
  selector: 'app-key-figures',
  imports: [CountUp],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (chiffres) {
      <section class="bg-white" aria-label="Chiffres clés">
        <div class="container-site grid grid-cols-2 gap-6 py-10 nav:grid-cols-4 nav:py-12">
          @for (c of chiffres; track c.label) {
            <div class="flex flex-col items-center gap-1 text-center">
              <span
                class="font-display text-[34px] leading-none font-black text-marine nav:text-[44px]"
              >
                <app-count-up [valeur]="c.valeur" [suffixe]="c.suffixe ?? ''" />
              </span>
              <span class="text-sm font-semibold text-ardoise">{{ c.label }}</span>
            </div>
          }
        </div>
      </section>
    }
  `,
})
export class KeyFigures {
  protected readonly chiffres: readonly ChiffreConnu[] | null = CHIFFRES_CLES.every(
    (c): c is ChiffreConnu => c.valeur !== null,
  )
    ? (CHIFFRES_CLES as readonly ChiffreConnu[])
    : null;
}
