import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ENGAGEMENTS, TEXTES_ACCUEIL, TITRES_ACCUEIL } from '@content/accueil';
import { ACTIVITES, POLES, SERVICES } from '@content/poles';
import { Icon } from '@shared/ui/icon/icon';

/**
 * Bandeau défilant, 4 engagements, puis les 5 pôles et les 2 autres services en lignes.
 * Chaque ligne affiche le premier paragraphe du texte d'accueil du client.
 */
@Component({
  selector: 'app-poles-grid',
  imports: [RouterLink, Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './poles-grid.html',
})
export class PolesGrid {
  protected readonly engagements = ENGAGEMENTS;
  protected readonly titres = TITRES_ACCUEIL;
  protected readonly activites = ACTIVITES;
  protected readonly groupes = [
    { titre: null, intro: null, activites: POLES, depart: 0 },
    {
      titre: TITRES_ACCUEIL.services,
      intro: TITRES_ACCUEIL.servicesIntro,
      activites: SERVICES,
      depart: POLES.length,
    },
  ].map((g) => ({
    ...g,
    activites: g.activites.map((a) => ({ ...a, texte: TEXTES_ACCUEIL[a.id].paragraphes[0] })),
  }));
}
