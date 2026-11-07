import {
  DOCUMENT,
  Injectable,
  Injector,
  PLATFORM_ID,
  afterNextRender,
  inject,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

/**
 * Blocs animés à l'apparition : contenu des sections (titres, paragraphes, cartes, éléments de liste).
 * La bannière de l'accueil, l'en-tête et le pied de page ne sont pas concernés.
 */
const SELECTEUR = [
  'main section .container-site > *',
  'main section .container-site > .flex > *',
  'main section .container-site > .grid > *',
  'main section .container-site > ul > li',
  'main section .container-site > ol > li',
].join(',');

const DECALAGE_MS = 90;
const DECALAGE_MAX_MS = 450;

/**
 * Apparition progressive des blocs au défilement (fondu + légère montée), avec un décalage
 * entre éléments voisins. Côté serveur et sans JavaScript, le contenu reste visible :
 * les classes ne sont ajoutées que dans le navigateur.
 */
@Injectable({ providedIn: 'root' })
export class RevealService {
  private readonly router = inject(Router);
  private readonly injector = inject(Injector);
  private readonly document = inject(DOCUMENT);
  private readonly navigateur = isPlatformBrowser(inject(PLATFORM_ID));
  private observateur?: IntersectionObserver;

  init(): void {
    if (!this.navigateur || typeof IntersectionObserver === 'undefined') {
      return;
    }
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => afterNextRender(() => this.preparer(), { injector: this.injector }));
  }

  private preparer(): void {
    this.observateur?.disconnect();

    const tous = Array.from(this.document.querySelectorAll<HTMLElement>(SELECTEUR));
    // On anime les éléments les plus fins : un conteneur dont un enfant est déjà animé est ignoré.
    const cibles = tous.filter(
      (el) =>
        !el.classList.contains('reveal-done') &&
        !tous.some((autre) => autre !== el && el.contains(autre)),
    );

    this.observateur = new IntersectionObserver(
      (entrees, obs) => {
        for (const entree of entrees) {
          if (entree.isIntersecting) {
            entree.target.classList.add('reveal-visible');
            obs.unobserve(entree.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    );

    const rangs = new Map<Element | null, number>();
    for (const el of cibles) {
      const rang = rangs.get(el.parentElement) ?? 0;
      rangs.set(el.parentElement, rang + 1);
      el.style.setProperty('--reveal-delay', `${Math.min(rang * DECALAGE_MS, DECALAGE_MAX_MS)}ms`);
      el.classList.add('reveal-init');
      // Une fois l'animation finie, on rend à l'élément ses propres transitions (survol des cartes…).
      const terminer = (event: TransitionEvent): void => {
        if (event.target !== el || !el.classList.contains('reveal-visible')) {
          return;
        }
        el.removeEventListener('transitionend', terminer);
        el.classList.remove('reveal-init', 'reveal-visible');
        el.classList.add('reveal-done');
        el.style.removeProperty('--reveal-delay');
      };
      el.addEventListener('transitionend', terminer);
      this.observateur.observe(el);
    }
  }
}
