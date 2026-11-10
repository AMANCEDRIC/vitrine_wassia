import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  afterNextRender,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ACTUALITES } from '@content/accueil';
import { Icon } from '@shared/ui/icon/icon';

const DELAI_AUTO_MS = 5000;

/**
 * Actualités et projets : carrousel qui avance tout seul toutes les 5 s et revient au début à la fin.
 * Il se met en pause au survol, au focus et quand l'onglet est caché. Il reste utilisable au doigt
 * (défilement avec aimantation), avec les flèches et avec les points.
 * Pas de défilement automatique si l'utilisateur a demandé à réduire les animations.
 */
@Component({
  selector: 'app-news',
  imports: [NgOptimizedImage, RouterLink, Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './news.html',
})
export class News {
  protected readonly actualites = ACTUALITES;

  /** Position courante et nombre de positions possibles (dépend du nombre de cartes visibles). */
  protected readonly courante = signal(0);
  protected readonly positions = signal<number[]>(ACTUALITES.map((_, i) => i));

  private readonly piste = viewChild.required<ElementRef<HTMLElement>>('piste');
  private enPause = false;

  constructor() {
    const destroyRef = inject(DestroyRef);

    afterNextRender(() => {
      const piste = this.piste().nativeElement;
      const recalculer = (): void => {
        this.positions.set(Array.from({ length: this.maxIndex() + 1 }, (_, i) => i));
        this.courante.set(Math.min(Math.round(piste.scrollLeft / this.pas()), this.maxIndex()));
      };
      recalculer();

      piste.addEventListener('scroll', recalculer, { passive: true });
      window.addEventListener('resize', recalculer);

      const reduit = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const minuteur = reduit
        ? undefined
        : window.setInterval(() => {
            if (!this.enPause && !document.hidden) {
              this.suivant();
            }
          }, DELAI_AUTO_MS);

      destroyRef.onDestroy(() => {
        piste.removeEventListener('scroll', recalculer);
        window.removeEventListener('resize', recalculer);
        window.clearInterval(minuteur);
      });
    });
  }

  protected pause(active: boolean): void {
    this.enPause = active;
  }

  /** Pause seulement pour une navigation au clavier : un clic sur une flèche ne fige pas le carrousel. */
  protected focusEntrant(event: FocusEvent): void {
    if ((event.target as HTMLElement).matches(':focus-visible')) {
      this.pause(true);
    }
  }

  protected precedent(): void {
    const i = this.courante();
    this.aller(i === 0 ? this.maxIndex() : i - 1);
  }

  protected suivant(): void {
    const i = this.courante();
    this.aller(i >= this.maxIndex() ? 0 : i + 1);
  }

  protected aller(index: number): void {
    this.courante.set(index);
    this.piste().nativeElement.scrollTo({ left: index * this.pas(), behavior: 'smooth' });
  }

  /** Largeur d'une carte + écart entre deux cartes. */
  private pas(): number {
    const piste = this.piste().nativeElement;
    const cartes = piste.children;
    if (cartes.length < 2) {
      return piste.clientWidth || 1;
    }
    return (cartes[1] as HTMLElement).offsetLeft - (cartes[0] as HTMLElement).offsetLeft || 1;
  }

  private maxIndex(): number {
    const piste = this.piste().nativeElement;
    return Math.max(0, Math.round((piste.scrollWidth - piste.clientWidth) / this.pas()));
  }
}
