import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ETAPES_CARTE } from '@content/accueil';
import { DEVENIR_MEMBRE } from '@core/layout/nav-links';
import { Icon } from '@shared/ui/icon/icon';

/**
 * « La carte membre à QR code » : les 4 étapes, en escalier relié par une ligne pointillée sur
 * ordinateur (≥ 1024px), empilées en dessous. Texte raccourci sur mobile.
 */
@Component({
  selector: 'app-card-steps',
  imports: [RouterLink, Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './card-steps.html',
})
export class CardSteps {
  protected readonly etapes = ETAPES_CARTE;
  protected readonly devenirMembre = DEVENIR_MEMBRE;
}
