import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PRESENTATION } from '@content/accueil';
import { Icon } from '@shared/ui/icon/icon';

/** « Qui sommes-nous ? » : petite présentation du groupe (texte final du client). */
@Component({
  selector: 'app-presentation',
  imports: [RouterLink, Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="bg-fond">
      <div class="container-site flex flex-wrap items-start gap-x-16 gap-y-6 py-14 nav:py-[100px]">
        <div class="flex min-w-0 flex-[1_1_300px] flex-col gap-5">
          <span class="eyebrow text-ardoise">Le groupe</span>
          <h2 class="section-title">{{ presentation.titre }}</h2>
        </div>
        <div class="flex min-w-0 flex-[1.6_1_460px] flex-col gap-5">
          @for (paragraphe of presentation.paragraphes; track $index) {
            <p class="m-0 text-[17px] leading-[1.7] text-encre-douce nav:text-lg">
              {{ paragraphe }}
            </p>
          }
          <a routerLink="/a-propos" class="btn-contour-marine mt-1 self-start"
            >En savoir plus <app-icon name="fleche" [size]="20" class="btn-fleche"
          /></a>
        </div>
      </div>
    </section>
  `,
})
export class Presentation {
  protected readonly presentation = PRESENTATION;
}
