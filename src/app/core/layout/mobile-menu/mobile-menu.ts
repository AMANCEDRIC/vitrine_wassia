import {
  ChangeDetectionStrategy,
  Component,
  DOCUMENT,
  DestroyRef,
  ElementRef,
  effect,
  inject,
  input,
  output,
  untracked,
} from '@angular/core';
import { IsActiveMatchOptions, RouterLink, RouterLinkActive } from '@angular/router';
import { ESPACE_AGENTS, SITE, lienTelephone, lienWhatsapp } from '@content/site';
import { POLES } from '@content/poles';
import { Icon } from '@shared/ui/icon/icon';
import { DEVENIR_MEMBRE, NAV_LINKS } from '../nav-links';

/** Distance de glissement vers la droite (px) qui referme le panneau. */
const SEUIL_GLISSEMENT_PX = 70;

/**
 * Menu mobile : panneau qui glisse depuis la droite, fond assombri, liens qui apparaissent en cascade.
 * Toujours présent dans le DOM (pour animer aussi la fermeture) ; inactif (`inert`) quand il est fermé.
 * Fermeture : bouton, Échap, toucher le fond, glisser le panneau vers la droite, ou choisir un lien.
 */
@Component({
  selector: 'app-mobile-menu',
  imports: [RouterLink, RouterLinkActive, Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'mobile-menu fixed inset-0 z-50 lg:hidden',
    '[class.is-open]': 'ouvert()',
    '[inert]': '!ouvert()',
    '(document:keydown.escape)': 'ouvert() && fermer()',
  },
  templateUrl: './mobile-menu.html',
})
export class MobileMenu {
  readonly ouvert = input(false);
  readonly closed = output<void>();

  protected readonly site = SITE;
  protected readonly espaceAgents = ESPACE_AGENTS;
  protected readonly links = NAV_LINKS;
  protected readonly poles = POLES;
  protected readonly devenirMembre = DEVENIR_MEMBRE;
  protected readonly tel = lienTelephone(SITE.telephone);
  protected readonly whatsapp = lienWhatsapp();
  protected readonly exactPath: IsActiveMatchOptions = {
    paths: 'exact',
    queryParams: 'ignored',
    fragment: 'ignored',
    matrixParams: 'ignored',
  };

  private readonly document = inject(DOCUMENT);
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private debutGlissement: { x: number; y: number } | null = null;

  constructor() {
    // Bloque le défilement de la page derrière le menu et place le focus sur « Fermer ».
    effect(() => {
      const ouvert = this.ouvert();
      untracked(() => {
        this.document.body.style.overflow = ouvert ? 'hidden' : '';
        if (ouvert) {
          setTimeout(
            () => this.host.nativeElement.querySelector<HTMLElement>('.mm-close')?.focus(),
            80,
          );
        }
      });
    });
    inject(DestroyRef).onDestroy(() => (this.document.body.style.overflow = ''));
  }

  protected fermer(): void {
    this.closed.emit();
  }

  protected toucheDebut(event: TouchEvent): void {
    const t = event.touches[0];
    this.debutGlissement = { x: t.clientX, y: t.clientY };
  }

  protected toucheFin(event: TouchEvent): void {
    if (!this.debutGlissement) {
      return;
    }
    const t = event.changedTouches[0];
    const dx = t.clientX - this.debutGlissement.x;
    const dy = Math.abs(t.clientY - this.debutGlissement.y);
    this.debutGlissement = null;
    if (dx > SEUIL_GLISSEMENT_PX && dx > dy * 1.5) {
      this.fermer();
    }
  }
}
