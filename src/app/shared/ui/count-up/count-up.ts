import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  afterNextRender,
  computed,
  inject,
  input,
  signal,
} from '@angular/core';

const DUREE_MS = 1800;

/**
 * Nombre qui défile de 0 à sa valeur quand il apparaît à l'écran.
 * Le HTML pré-rendu contient directement la valeur finale (lisible sans JavaScript).
 */
@Component({
  selector: 'app-count-up',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `{{ affichage() }}{{ suffixe() }}`,
})
export class CountUp {
  readonly valeur = input.required<number>();
  readonly suffixe = input('');

  private readonly format = new Intl.NumberFormat('fr-FR');
  /** Valeur en cours d'animation ; `null` = afficher la valeur finale (serveur, sans animation). */
  private readonly courant = signal<number | null>(null);
  protected readonly affichage = computed(() =>
    this.format.format(this.courant() ?? this.valeur()),
  );

  constructor() {
    const host = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
    const destroyRef = inject(DestroyRef);

    afterNextRender(() => {
      const reduit = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (reduit || typeof IntersectionObserver === 'undefined') {
        return;
      }
      this.courant.set(0);
      let image = 0;
      const observateur = new IntersectionObserver(
        ([entree]) => {
          if (!entree.isIntersecting) {
            return;
          }
          observateur.disconnect();
          const debut = performance.now();
          const cible = this.valeur();
          const pas = (maintenant: number): void => {
            const t = Math.min(1, (maintenant - debut) / DUREE_MS);
            const progression = 1 - Math.pow(1 - t, 3); // ralentit en fin de course
            this.courant.set(Math.round(cible * progression));
            if (t < 1) {
              image = requestAnimationFrame(pas);
            }
          };
          image = requestAnimationFrame(pas);
        },
        { threshold: 0.4 },
      );
      observateur.observe(host);
      destroyRef.onDestroy(() => {
        observateur.disconnect();
        cancelAnimationFrame(image);
      });
    });
  }
}
