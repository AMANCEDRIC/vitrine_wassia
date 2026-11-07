import {
  ChangeDetectionStrategy,
  Component,
  DOCUMENT,
  DestroyRef,
  ElementRef,
  afterNextRender,
  inject,
  output,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { ESPACE_AGENTS, SITE } from '@content/site';
import { POLES } from '@content/poles';
import { Icon } from '@shared/ui/icon/icon';
import { DEVENIR_MEMBRE, NAV_LINKS } from '../nav-links';

/** Menu plein écran du mobile (écran « Site-Menu-Mobile » de la maquette). */
@Component({
  selector: 'app-mobile-menu',
  imports: [RouterLink, Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    id: 'menu-mobile',
    role: 'dialog',
    'aria-modal': 'true',
    'aria-label': 'Menu',
    class: 'fixed inset-0 z-50 flex flex-col overflow-y-auto bg-white nav:hidden',
    '(document:keydown.escape)': 'close()',
  },
  templateUrl: './mobile-menu.html',
})
export class MobileMenu {
  readonly closed = output<void>();

  protected readonly site = SITE;
  protected readonly espaceAgents = ESPACE_AGENTS;
  protected readonly links = NAV_LINKS;
  protected readonly poles = POLES;
  protected readonly devenirMembre = DEVENIR_MEMBRE;

  private readonly document = inject(DOCUMENT);
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);

  constructor() {
    afterNextRender(() => {
      this.document.body.style.overflow = 'hidden';
      this.host.nativeElement.querySelector<HTMLElement>('button')?.focus();
    });
    inject(DestroyRef).onDestroy(() => (this.document.body.style.overflow = ''));
  }

  protected close(): void {
    this.closed.emit();
  }
}
