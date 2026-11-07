import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ENGAGEMENTS } from '@content/accueil';
import { POLES } from '@content/poles';
import { Icon } from '@shared/ui/icon/icon';

/** Bandeau des 4 engagements et grille des 5 pôles. */
@Component({
  selector: 'app-poles-grid',
  imports: [RouterLink, Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './poles-grid.html',
})
export class PolesGrid {
  protected readonly engagements = ENGAGEMENTS;
  protected readonly poles = POLES;
}
