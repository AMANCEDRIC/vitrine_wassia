import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FORMULAIRES } from '@content/formulaires';
import { SITE, lienTelephone, lienWhatsapp } from '@content/site';
import { ContactForm } from '@shared/ui/contact-form/contact-form';
import { Icon } from '@shared/ui/icon/icon';

@Component({
  selector: 'app-home-contact',
  imports: [ContactForm, Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="contact" class="bg-marine text-white">
      <div
        class="container-site flex flex-col gap-[22px] py-12 nav:flex-row nav:flex-wrap nav:gap-14 nav:py-20"
      >
        <div class="flex min-w-0 flex-col gap-5 nav:flex-[1_1_360px]">
          <h2 class="m-0 font-display text-[26px] leading-[1.2] font-bold nav:text-[34px]">
            Prêt à sécuriser vos biens ou à développer votre projet<span class="hidden nav:inline">
              avec WASSIA</span
            >&nbsp;?
          </h2>
          <div class="hidden flex-col gap-5 nav:flex">
            <p class="m-0 text-[17px] leading-[1.6] text-brume">
              Choisissez ce qui vous correspond, nous vous répondons selon le pôle concerné.
            </p>
            <address class="mt-2 flex flex-col gap-2 text-[15px] text-brume not-italic">
              <span>Siège social : {{ site.siege }}</span>
              <span
                >Téléphone : <a [href]="tel" class="hover:text-white">{{ site.telephone }}</a></span
              >
              <span
                >WhatsApp :
                <a [href]="whatsapp" target="_blank" rel="noopener" class="hover:text-white">{{
                  site.telephone
                }}</a></span
              >
              <a [href]="'mailto:' + site.email" class="hover:text-white">{{ site.email }}</a>
            </address>
            <!--
              Carte de la commune du siège (OpenStreetMap : pas de cookie ni de mesure d'audience).
              À recentrer sur l'adresse exacte du siège quand le client l'aura fournie.
            -->
            <div class="overflow-hidden rounded-[10px] border border-ligne-sombre bg-roi">
              <iframe
                title="Carte : siège du GROUPE WASSIA à Yopougon, Abidjan"
                src="https://www.openstreetmap.org/export/embed.html?bbox=-4.12%2C5.30%2C-4.03%2C5.37&amp;layer=mapnik&amp;marker=5.3364%2C-4.075"
                class="block h-[180px] w-full border-0 grayscale-[30%]"
                loading="lazy"
                referrerpolicy="no-referrer"
              ></iframe>
              <a
                href="https://www.google.com/maps/search/?api=1&amp;query=Yopougon%2C%20Abidjan%2C%20C%C3%B4te%20d%27Ivoire"
                target="_blank"
                rel="noopener"
                class="flex items-center gap-2 px-4 py-3 text-[13px] font-semibold text-brume transition-colors duration-500 ease-doux hover:text-white"
              >
                <app-icon name="carte" [size]="16" color="var(--color-or)" />
                Itinéraire vers le siège (nouvel onglet)
              </a>
            </div>
          </div>
        </div>

        <div class="min-w-0 nav:flex-[1_1_460px]">
          <app-contact-form [config]="formulaire" idPrefix="accueil" />
        </div>

        <a
          [href]="whatsapp"
          target="_blank"
          rel="noopener"
          class="btn-contour-clair py-[15px] nav:hidden"
          >Écrire sur WhatsApp {{ site.telephone }}</a
        >
      </div>
    </section>
  `,
})
export class HomeContact {
  protected readonly site = SITE;
  protected readonly formulaire = FORMULAIRES.general;
  protected readonly tel = lienTelephone(SITE.telephone);
  protected readonly whatsapp = lienWhatsapp();
}
