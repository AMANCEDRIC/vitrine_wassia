import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IDENTITE, PHILOSOPHIE, SYNERGIES } from '@content/groupe';
import { POLES, SERVICES } from '@content/poles';
import { SITE } from '@content/site';
import { Icon } from '@shared/ui/icon/icon';
import { PageHero } from '@shared/ui/page-hero/page-hero';

@Component({
  selector: 'app-about-page',
  imports: [PageHero, RouterLink, Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './about.page.html',
})
export class AboutPage {
  protected readonly site = SITE;
  protected readonly identite = IDENTITE;
  protected readonly philosophie = PHILOSOPHIE;
  protected readonly synergies = SYNERGIES;
  /** Organigramme : pôles avec leur titre court et leur résumé de l'accueil mobile. */
  protected readonly poles = POLES.map((p) => ({
    ...p,
    titre: p.titreCourt,
    resume: p.resumeCourt,
  }));
  protected readonly services = SERVICES;

  protected readonly roles = [
    'Direction stratégique',
    'Conformité juridique',
    'Gestion financière centralisée',
  ];
}
