import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { ETAPES_CARTE } from '@content/accueil';

/**
 * « La carte membre à QR code » : carrousel de 4 étapes sur ordinateur, liste de 3 étapes sur mobile.
 *
 * Avance automatique : le point de l'étape en cours se remplit en 6 s (animation CSS) ; à la fin de
 * cette animation, on passe à l'étape suivante. La pause au survol ou au focus fige donc à la fois
 * la barre et le défilement. Si l'utilisateur a demandé à réduire les animations, la barre ne s'anime
 * pas et le carrousel reste manuel.
 */
@Component({
  selector: 'app-card-steps',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './card-steps.html',
})
export class CardSteps {
  protected readonly etapes = ETAPES_CARTE;
  protected readonly etapesMobile = ETAPES_CARTE.filter((e) => e.texteMobile);
  protected readonly courante = signal(0);
  protected readonly enPause = signal(false);
  protected readonly decalage = computed(() => `translateX(-${this.courante() * 25}%)`);

  protected aller(index: number): void {
    const total = this.etapes.length;
    this.courante.set(((index % total) + total) % total);
  }

  /** Pause seulement pour une navigation au clavier : un clic sur une flèche ne doit pas figer le carrousel. */
  protected focusEntrant(event: FocusEvent): void {
    if ((event.target as HTMLElement).matches(':focus-visible')) {
      this.enPause.set(true);
    }
  }

  protected precedent(): void {
    this.aller(this.courante() - 1);
  }

  protected suivant(): void {
    this.aller(this.courante() + 1);
  }
}
