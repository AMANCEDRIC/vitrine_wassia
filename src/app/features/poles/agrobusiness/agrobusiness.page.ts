import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FORMULAIRES } from '@content/formulaires';
import { ContactForm } from '@shared/ui/contact-form/contact-form';
import { PageHero } from '@shared/ui/page-hero/page-hero';
import { ServiceCard } from '../pole-section';

@Component({
  selector: 'app-agrobusiness-page',
  imports: [PageHero, ServiceCard, ContactForm, RouterLink, NgOptimizedImage],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './agrobusiness.page.html',
})
export class AgrobusinessPage {
  protected readonly formulaire = FORMULAIRES.agrobusiness;

  protected readonly domaines = [
    {
      titre: 'Production agricole, élevage et aquaculture',
      texte: 'Production végétale, élevage et aquaculture, pour approvisionner les marchés locaux.',
    },
    {
      titre: 'Agro-industrie, commerce général et import-export',
      texte: 'Transformation des produits agricoles, négoce et import-export de marchandises.',
    },
    {
      titre: 'Énergies renouvelables et projets durables',
      texte:
        'Installations solaires, biomasse et autres solutions d’énergie propre pour les exploitations, les entreprises et les ménages.',
    },
  ];
}
