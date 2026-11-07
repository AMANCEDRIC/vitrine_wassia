import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  afterNextRender,
  computed,
  inject,
  signal,
} from '@angular/core';

/** Au-delà de cette hauteur défilée, le bouton propose de remonter. */
const SEUIL_HAUT_PX = 400;
const CIRCONFERENCE = 2 * Math.PI * 22;

/**
 * Bouton flottant : « Descendre » (d'un écran) en haut de page, « Remonter en haut » ensuite.
 * L'anneau doré indique la progression du défilement dans la page.
 */
@Component({
  selector: 'app-scroll-button',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class:
      'fixed right-4 bottom-[max(1rem,env(safe-area-inset-bottom))] z-40 nav:right-6 nav:bottom-6',
  },
  template: `
    <button
      type="button"
      class="group relative flex size-12 cursor-pointer items-center justify-center rounded-full bg-marine text-white shadow-[0_8px_24px_rgba(0,13,31,.3)] transition-[translate,transform,background-color] duration-500 ease-doux hover:-translate-y-1 hover:bg-roi nav:size-14"
      [class.opacity-0]="!pret()"
      [attr.aria-label]="enHaut() ? 'Descendre' : 'Remonter en haut de la page'"
      [attr.title]="enHaut() ? 'Descendre' : 'Remonter en haut'"
      (click)="agir()"
    >
      <svg class="absolute inset-0 -rotate-90" viewBox="0 0 56 56" aria-hidden="true">
        <circle
          cx="28"
          cy="28"
          r="22"
          fill="none"
          stroke="rgba(255,255,255,.15)"
          stroke-width="3"
        />
        <circle
          cx="28"
          cy="28"
          r="22"
          fill="none"
          stroke="var(--color-or)"
          stroke-width="3"
          stroke-linecap="round"
          [attr.stroke-dasharray]="circonference"
          [attr.stroke-dashoffset]="decalage()"
        />
      </svg>
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2.5"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-hidden="true"
        class="relative transition-transform duration-500"
        [class.rotate-180]="enHaut()"
      >
        <path d="M12 19V5M5 12l7-7 7 7" />
      </svg>
    </button>
  `,
})
export class ScrollButton {
  protected readonly circonference = CIRCONFERENCE;
  protected readonly pret = signal(false);
  private readonly defile = signal(0);
  private readonly progression = signal(0);

  protected readonly enHaut = computed(() => this.defile() < SEUIL_HAUT_PX);
  protected readonly decalage = computed(() => CIRCONFERENCE * (1 - this.progression()));

  constructor() {
    const destroyRef = inject(DestroyRef);
    afterNextRender(() => {
      let image = 0;
      const mesurer = (): void => {
        image = 0;
        const max = document.documentElement.scrollHeight - window.innerHeight;
        this.defile.set(window.scrollY);
        this.progression.set(max > 0 ? Math.min(1, window.scrollY / max) : 0);
      };
      const auDefilement = (): void => {
        if (!image) {
          image = window.requestAnimationFrame(mesurer);
        }
      };
      mesurer();
      this.pret.set(true);
      window.addEventListener('scroll', auDefilement, { passive: true });
      window.addEventListener('resize', auDefilement);
      destroyRef.onDestroy(() => {
        window.removeEventListener('scroll', auDefilement);
        window.removeEventListener('resize', auDefilement);
        window.cancelAnimationFrame(image);
      });
    });
  }

  protected agir(): void {
    const reduit = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const behavior: ScrollBehavior = reduit ? 'auto' : 'smooth';
    if (this.enHaut()) {
      window.scrollBy({ top: window.innerHeight * 0.85, behavior });
    } else {
      window.scrollTo({ top: 0, behavior });
    }
  }
}
