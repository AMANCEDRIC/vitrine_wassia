import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
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
