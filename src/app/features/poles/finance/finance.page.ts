import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import {
  CONDITIONS_EPARGNE,
  ETAPES_CREDIT,
  EXEMPLES_CREDIT,
  PIECES_A_FOURNIR,
  SLOGAN,
  TAUX_MENSUEL,
} from '@content/credit';
import { PAGES_ACTIVITES } from '@content/activites';
import { FAQ_FINANCE } from '@content/faq';
import { FORMULAIRES } from '@content/formulaires';
import { PARTENAIRE_BANCAIRE, SITE, textePartenariat } from '@content/site';
import { ContactForm } from '@shared/ui/contact-form/contact-form';
import { Faq } from '@shared/ui/faq/faq';
import { Icon } from '@shared/ui/icon/icon';
import { PageHero } from '@shared/ui/page-hero/page-hero';
import { PoleQuote, ServiceCard } from '../pole-section';

@Component({
  selector: 'app-finance-page',
  imports: [PageHero, PoleQuote, ServiceCard, ContactForm, RouterLink, NgOptimizedImage, Icon, Faq],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './finance.page.html',
})
export class FinancePage {
  protected readonly site = SITE;
  protected readonly partenaire = PARTENAIRE_BANCAIRE;
  protected readonly partenariat = textePartenariat();
  protected readonly faq = FAQ_FINANCE;
  protected readonly formulaire = FORMULAIRES['devenir-membre'];
  protected readonly formulaireDossier = FORMULAIRES['dossier-financement'];
  /** Formulaire affiché dans la section Contact (boutons radio). */
  protected readonly choix = signal<'membre' | 'dossier'>('membre');
  protected readonly options = [
    { valeur: 'membre' as const, libelle: 'Devenir membre' },
    { valeur: 'dossier' as const, libelle: 'Faire accompagner mon dossier de financement' },
  ];
  /** Sections « Comment ça se passe » et « Avec les autres pôles » de l'accompagnement de dossiers. */
  protected readonly accompagnement = PAGES_ACTIVITES.finance.sections.filter(
    (s) => s.id === 'etapes' || s.id === 'synergie',
  );

  protected readonly chiffres = [
    { valeur: '1 000 F', libelle: 'à l’inscription' },
    { valeur: '8 sem.', libelle: 'd’épargne avant le prêt' },
    { valeur: '48 h', libelle: 'pour la réponse' },
  ];

  protected readonly tauxMensuel = TAUX_MENSUEL;
  protected readonly conditions = CONDITIONS_EPARGNE;
  protected readonly pieces = PIECES_A_FOURNIR;
  protected readonly etapesCredit = ETAPES_CREDIT;
  protected readonly exemples = EXEMPLES_CREDIT;
  protected readonly slogan = SLOGAN;

  protected readonly etapes = [
    {
      titre: 'Un agent vous inscrit',
      texte:
        'Il vient à votre étal ou à votre boutique, saisit votre dossier et vous remet votre carte membre à QR code.',
    },
    {
      titre: 'Vous versez à votre rythme',
      texte:
        'Chaque versement se fait en espèces auprès de l’agent ou par Wave. Votre épargne apparaît tout de suite sur votre carte.',
    },
    {
      titre: 'Vous recevez un SMS',
      texte:
        'Chaque versement est confirmé par SMS avec votre nouveau solde, sans rien avoir à écrire.',
    },
  ];
}
