import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FORMULAIRES } from '@content/formulaires';
import { ContactForm } from '@shared/ui/contact-form/contact-form';
import { PageHero } from '@shared/ui/page-hero/page-hero';
import { PoleQuote, ServiceCard } from '../pole-section';

@Component({
  selector: 'app-voyage-page',
  imports: [PageHero, PoleQuote, ServiceCard, ContactForm, RouterLink, NgOptimizedImage],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './voyage.page.html',
})
export class VoyagePage {
  protected readonly formulaire = FORMULAIRES.voyage;

  protected readonly services = [
    {
      titre: 'Billetterie internationale',
      texte:
        'Réservation et émission de billets d’avion vers toutes les destinations, vols réguliers ou low-cost, en partenariat avec des agences agréées.',
    },
    {
      titre: 'Assistance visa, e-visa et conformité consulaire',
      texte:
        'Un accompagnement pour vos demandes de visa. Nous vérifions d’abord vos dossiers administratifs et votre passeport pour maximiser vos chances.',
    },
    {
      titre: 'Conseil en mobilité et sourcing international',
      texte:
        'Orientation pour les hommes d’affaires et commerçants (missions d’achat en Asie ou au Moyen-Orient), les étudiants et les voyageurs : conditions sanitaires, sécuritaires et réglementaires.',
    },
    {
      titre: 'Tourisme et conciergerie de séjour',
      texte:
        'Sélection et réservation d’hôtels de standing, de résidences meublées et de circuits touristiques, pour un séjour en toute quiétude.',
    },
  ];

  protected readonly destinations = [
    'Chine',
    'Turquie',
    'Dubaï',
    'Inde',
    'Europe (Schengen)',
    'Canada',
    'États-Unis',
  ];
}
