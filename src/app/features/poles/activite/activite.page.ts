import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map } from 'rxjs';
import { PAGES_ACTIVITES } from '@content/activites';
import { FORMULAIRES } from '@content/formulaires';
import { ACTIVITES, ActiviteId, POLES } from '@content/poles';
import { ContactForm } from '@shared/ui/contact-form/contact-form';
import { Icon } from '@shared/ui/icon/icon';
import { PageHero } from '@shared/ui/page-hero/page-hero';
import { PoleQuote, ServiceCard } from '../pole-section';

/**
 * Page d'un pôle ou d'un service : un seul gabarit, contenu dans `content/activites.ts`.
 * L'activité affichée vient de `route.data.activite`.
 */
@Component({
  selector: 'app-activite-page',
  imports: [PageHero, PoleQuote, ServiceCard, ContactForm, RouterLink, NgOptimizedImage, Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './activite.page.html',
})
export class ActivitePage {
  private readonly id = toSignal(
    inject(ActivatedRoute).data.pipe(map((data) => data['activite'] as ActiviteId)),
    { requireSync: true },
  );

  protected readonly page = computed(() => PAGES_ACTIVITES[this.id()]);
  protected readonly activite = computed(() => ACTIVITES.find((a) => a.id === this.id())!);
  protected readonly formulaire = computed(() => FORMULAIRES[this.page().formulaire]);

  /** « Nos activités · Pôle 2 » ou « Nos activités · Autres services ». */
  protected readonly eyebrow = computed(() => {
    const rang = POLES.findIndex((p) => p.id === this.id());
    return rang >= 0 ? `Nos activités · Pôle ${rang + 1}` : 'Nos activités · Autres services';
  });

  /** Les autres activités, proposées en bas de page. */
  protected readonly autres = computed(() => ACTIVITES.filter((a) => a.id !== this.id()));
}
