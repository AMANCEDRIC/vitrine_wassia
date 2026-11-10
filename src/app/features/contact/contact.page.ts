import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FORMULAIRES } from '@content/formulaires';
import { SITE, lienTelephone, lienWhatsapp } from '@content/site';
import { ContactForm } from '@shared/ui/contact-form/contact-form';
import { Icon } from '@shared/ui/icon/icon';
import { PageHero } from '@shared/ui/page-hero/page-hero';

/** Page Contact : coordonnées du siège, carte et formulaire général. */
@Component({
  selector: 'app-contact-page',
  imports: [PageHero, ContactForm, Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-page-hero
      eyebrow="Contact"
      titre="Parlons de votre projet"
      intro="Choisissez ce qui vous correspond : nous vous répondons selon le pôle concerné."
    />

    <section id="contact" class="relative overflow-hidden bg-marine text-white">
      <span
        class="skew-bar absolute inset-y-0 -right-[120px] hidden w-[260px] bg-roi opacity-60 nav:block"
        aria-hidden="true"
      ></span>
      <div
        class="container-site relative flex flex-wrap gap-10 py-14 nav:gap-x-[72px] nav:py-[120px]"
      >
        <div class="flex min-w-0 flex-[1_1_360px] flex-col gap-6">
          <address class="m-0 flex flex-col gap-[22px] text-[15px] text-brume not-italic">
            <div class="flex flex-col gap-0.5">
              <span
                class="font-display text-xs font-semibold tracking-[.14em] text-or-clair uppercase"
                >Siège social</span
              >
              <span class="text-[1.1rem] font-semibold text-white">{{ site.siege }}</span>
            </div>
            <div class="flex flex-col gap-0.5">
              <span
                class="font-display text-xs font-semibold tracking-[.14em] text-or-clair uppercase"
                >Téléphone</span
              >
              <a
                [href]="tel"
                class="self-start border-b border-white text-[1.1rem] font-semibold text-white hover:border-or"
                >{{ site.telephone }}</a
              >
            </div>
            <div class="flex flex-col gap-0.5">
              <span
                class="font-display text-xs font-semibold tracking-[.14em] text-or-clair uppercase"
                >WhatsApp</span
              >
              <a
                [href]="whatsapp"
                target="_blank"
                rel="noopener"
                class="self-start border-b border-white text-[1.1rem] font-semibold text-white hover:border-or"
                >{{ site.telephone }}</a
              >
            </div>
            <div class="flex flex-col gap-0.5">
              <span
                class="font-display text-xs font-semibold tracking-[.14em] text-or-clair uppercase"
                >E-mail</span
              >
              <a
                [href]="'mailto:' + site.email"
                class="self-start border-b border-white text-[1.1rem] font-semibold break-all text-white hover:border-or"
                >{{ site.email }}</a
              >
            </div>
          </address>

          <!--
            Carte de la commune du siège (OpenStreetMap : pas de cookie ni de mesure d'audience).
            À recentrer sur l'adresse exacte du siège quand le client l'aura fournie.
          -->
          <div class="overflow-hidden border border-white/25 bg-roi">
            <iframe
              title="Carte : siège du GROUPE WASSIA à Yopougon, Abidjan"
              src="https://www.openstreetmap.org/export/embed.html?bbox=-4.12%2C5.30%2C-4.03%2C5.37&amp;layer=mapnik&amp;marker=5.3364%2C-4.075"
              class="block h-[220px] w-full border-0 grayscale-[30%]"
              loading="lazy"
              referrerpolicy="no-referrer"
            ></iframe>
            <a
              href="https://www.google.com/maps/search/?api=1&amp;query=Yopougon%2C%20Abidjan%2C%20C%C3%B4te%20d%27Ivoire"
              target="_blank"
              rel="noopener"
              class="flex min-h-11 items-center gap-2 px-4 py-3 font-display text-sm font-semibold text-brume-clair transition-colors duration-500 ease-doux hover:text-white"
            >
              <app-icon name="carte" [size]="16" color="var(--color-or)" />
              Itinéraire vers le siège (nouvel onglet)
            </a>
          </div>
        </div>

        <div class="min-w-0 flex-[1_1_460px]">
          <app-contact-form [config]="formulaire" idPrefix="contact" />
        </div>
      </div>
    </section>
  `,
})
export class ContactPage {
  protected readonly site = SITE;
  protected readonly formulaire = FORMULAIRES.general;
  protected readonly tel = lienTelephone(SITE.telephone);
  protected readonly whatsapp = lienWhatsapp();
}
