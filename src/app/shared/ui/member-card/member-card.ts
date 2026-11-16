import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { SITE } from '@content/site';

/**
 * Carte membre prépayée (480 × 303 px, réduite à 75 % puis 62,5 % sous 520 px), recto ou verso.
 * Le QR code est fictif.
 */
@Component({
  selector: 'app-member-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class:
      'relative block h-[189px] w-[300px] overflow-hidden rounded-[14px] xs:h-[227px] xs:w-[360px]',
  },
  templateUrl: './member-card.html',
})
export class MemberCard {
  readonly verso = input(false);

  protected readonly site = SITE;
  protected readonly numero = 'WAS-000124';
}
