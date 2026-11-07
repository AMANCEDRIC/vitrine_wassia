import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import { POLES } from '@content/poles';
import { SITE } from '@content/site';
import { Icon } from '@shared/ui/icon/icon';
import { PageHero } from '@shared/ui/page-hero/page-hero';

@Component({
  selector: 'app-about-page',
  imports: [PageHero, RouterLink, NgOptimizedImage, Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './about.page.html',
})
export class AboutPage {
  protected readonly site = SITE;
  /** Organigramme : pôles avec un titre court et leur résumé de l'accueil mobile. */
  protected readonly poles = POLES.map((p) => ({
    ...p,
    titre: p.id === 'voyage' ? 'Voyage et tourisme' : p.titreCourt,
    resume: p.resumeCourt,
  }));

  protected readonly roles = [
    'Direction stratégique',
    'Conformité juridique',
    'Gestion financière centralisée',
  ];

  protected readonly engagements = [
    {
      titre: 'La garantie intégrale',
      texte:
        'Nous assumons les aléas opérationnels (vacance locative, pannes mécaniques, retards de paiement) pour offrir un revenu garanti et prévisible à nos partenaires.',
    },
    {
      titre: 'L’inclusion et la proximité',
      texte:
        'Grâce à l’épargne numérisée, à l’assistance santé et scolaire et à l’accompagnement au voyage, nous rendons les services essentiels accessibles au plus grand nombre.',
    },
    {
      titre: 'L’innovation et la sécurité',
      texte:
        'Le GPS, les cartes d’épargne à QR code et les plateformes de suivi rendent chaque opération traçable et transparente.',
    },
  ];
}
