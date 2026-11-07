import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import {
  IsActiveMatchOptions,
  NavigationStart,
  Router,
  RouterLink,
  RouterLinkActive,
} from '@angular/router';
import { filter } from 'rxjs';
import { ESPACE_AGENTS, SITE } from '@content/site';
import { POLES } from '@content/poles';
import { Icon } from '@shared/ui/icon/icon';
import { DEVENIR_MEMBRE, NAV_LINKS } from '../nav-links';
import { MobileMenu } from '../mobile-menu/mobile-menu';

/** Délai avant fermeture quand la souris quitte le menu (laisse le temps de rejoindre le panneau). */
const DELAI_FERMETURE_MS = 250;

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive, Icon, MobileMenu],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'sticky top-0 z-30 block',
    '(document:click)': 'clicDocument($event)',
    '(document:keydown.escape)': 'fermerActivites(true)',
  },
  templateUrl: './header.html',
})
export class Header {
  protected readonly site = SITE;
  protected readonly espaceAgents = ESPACE_AGENTS;
  protected readonly links = NAV_LINKS;
  protected readonly poles = POLES;
  protected readonly devenirMembre = DEVENIR_MEMBRE;

  protected readonly exactPath: IsActiveMatchOptions = {
    paths: 'exact',
    queryParams: 'ignored',
    fragment: 'ignored',
    matrixParams: 'ignored',
  };

  protected readonly menuOpen = signal(false);
  /** Panneau « Nos activités » ouvert. */
  protected readonly activitesOuvert = signal(false);

  private readonly menuActivites = viewChild<ElementRef<HTMLElement>>('menuActivites');
  private readonly declencheur = viewChild<ElementRef<HTMLButtonElement>>('declencheur');
  private minuteur?: ReturnType<typeof setTimeout>;
  private ouvertParSurvol = false;

  constructor() {
    const abonnement = inject(Router)
      .events.pipe(filter((event) => event instanceof NavigationStart))
      .subscribe(() => this.fermerActivites());
    inject(DestroyRef).onDestroy(() => {
      abonnement.unsubscribe();
      clearTimeout(this.minuteur);
    });
  }

  protected survolActivites(entree: boolean): void {
    clearTimeout(this.minuteur);
    if (entree) {
      this.ouvertParSurvol = !this.activitesOuvert();
      this.activitesOuvert.set(true);
    } else {
      this.ouvertParSurvol = false;
      this.minuteur = setTimeout(() => this.activitesOuvert.set(false), DELAI_FERMETURE_MS);
    }
  }

  /** Clic ou Entrée sur « Nos activités ». Un clic juste après l'ouverture au survol garde le panneau ouvert. */
  protected basculerActivites(): void {
    clearTimeout(this.minuteur);
    if (this.ouvertParSurvol) {
      this.ouvertParSurvol = false;
      return;
    }
    this.activitesOuvert.update((ouvert) => !ouvert);
  }

  protected fermerActivites(rendreFocus = false): void {
    if (!this.activitesOuvert()) {
      return;
    }
    clearTimeout(this.minuteur);
    this.activitesOuvert.set(false);
    if (rendreFocus) {
      this.declencheur()?.nativeElement.focus();
    }
  }

  protected clicDocument(event: MouseEvent): void {
    const zone = this.menuActivites()?.nativeElement;
    if (zone && !zone.contains(event.target as Node)) {
      this.fermerActivites();
    }
  }

  /** Ferme le panneau quand le focus clavier en sort. */
  protected focusSortant(event: FocusEvent): void {
    const zone = this.menuActivites()?.nativeElement;
    if (zone && !zone.contains(event.relatedTarget as Node | null)) {
      this.fermerActivites();
    }
  }
}
