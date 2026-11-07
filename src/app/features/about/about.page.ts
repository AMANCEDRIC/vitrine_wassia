import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import { POLES } from '@content/poles';
import { SITE } from '@content/site';
import { PageHero } from '@shared/ui/page-hero/page-hero';

/** Couleurs des pôles dans l'organigramme (maquette Site-A-propos). */
const ORGANIGRAMME: Record<string, string> = {
  finance: 'bg-emeraude text-marine',
  immobilier: 'bg-sapin text-white',
  mobilite: 'bg-marine text-white',
  voyage: 'bg-or text-marine',
  agrobusiness: 'bg-roi text-or',
};

@Component({
  selector: 'app-about-page',
  imports: [PageHero, RouterLink, NgOptimizedImage],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './about.page.html',
})
export class AboutPage {
  protected readonly site = SITE;
  protected readonly poles = POLES.map((p) => ({
    id: p.id,
    titre: p.id === 'voyage' ? 'Voyage et tourisme' : p.titreCourt,
    couleur: ORGANIGRAMME[p.id],
  }));

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
