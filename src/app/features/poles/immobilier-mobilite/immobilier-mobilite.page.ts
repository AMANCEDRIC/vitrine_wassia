import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FORMULAIRES } from '@content/formulaires';
import { ContactForm } from '@shared/ui/contact-form/contact-form';
import { Icon } from '@shared/ui/icon/icon';
import { PageHero } from '@shared/ui/page-hero/page-hero';

/**
 * Pôles 2 (Immobilier) et 3 (Mobilité) réunis sur une page, comme dans la maquette.
 * Les garanties (loyer, recette, pannes) sont à confirmer par écrit par le client.
 */
@Component({
  selector: 'app-immobilier-mobilite-page',
  imports: [PageHero, ContactForm, RouterLink, Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './immobilier-mobilite.page.html',
})
export class ImmobilierMobilitePage {
  protected readonly formulaireBien = FORMULAIRES['estimation-bien'];
  protected readonly formulaireVehicule = FORMULAIRES['gestion-vehicule'];

  protected readonly servicesImmobilier = [
    {
      titre: 'Gestion locative à loyer garanti',
      texte:
        'Nous prenons votre bien en gestion complète et vous versons votre loyer à date fixe, quel que soit le taux d’occupation.',
    },
    {
      titre: 'Réhabilitation, rénovation, restructuration',
      texte:
        'Un bien ou un magasin dégradé ? WASSIA investit dans sa rénovation complète pour lui redonner sa valeur sur le marché locatif.',
    },
    {
      titre: 'Achat, vente et courtage foncier',
      texte:
        'Sécurisation des transactions de terrains et de propriétés, pour le compte de la holding ou de ses investisseurs.',
    },
  ];

  protected readonly servicesFlottes = [
    {
      titre: 'Recette journalière garantie',
      texte:
        'Vous nous confiez votre voiture, votre taxi ou votre moto. Nous vous versons la recette quotidienne convenue, même si le véhicule n’a pas roulé.',
    },
    {
      titre: 'Pannes et entretien pris en charge',
      texte:
        'Le contrat de gestion met à la charge de WASSIA les pannes mécaniques et électriques et l’entretien régulier.',
    },
    {
      titre: 'Balises GPS : vente et installation',
      texte:
        'Suivi en temps réel 24 h/24, historique des trajets, coupure moteur à distance. Également proposé aux particuliers et aux transporteurs.',
    },
  ];

  protected readonly comparatif = [
    {
      service: 'Paiement du loyer',
      traditionnel: 'Risque d’impayé ou de vacance',
      wassia: 'Loyer versé chaque mois',
    },
    {
      service: 'Recette du véhicule',
      traditionnel: 'Annulée en cas de panne ou de repos',
      wassia: 'Recette journalière garantie',
    },
    {
      service: 'Frais de pannes',
      traditionnel: 'À la charge du propriétaire',
      wassia: 'Pris en charge par WASSIA',
    },
    {
      service: 'Sécurité du véhicule',
      traditionnel: 'Variable',
      wassia: 'GPS et suivi 24 h/24 intégrés',
    },
  ];
}
