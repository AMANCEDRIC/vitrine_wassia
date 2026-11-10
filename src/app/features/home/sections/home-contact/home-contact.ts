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
    <section id="contact" class="relative overflow-hidden bg-marine text-brume-clair">
      <span
        class="skew-bar absolute inset-y-0 -right-[120px] hidden w-[260px] bg-roi opacity-60 nav:block"
        aria-hidden="true"
      ></span>
      <div
        class="container-site relative flex flex-col gap-8 py-14 nav:flex-row nav:flex-wrap nav:items-start nav:gap-x-[72px] nav:gap-y-14 nav:py-[120px]"
      >
        <div class="flex min-w-0 flex-col gap-5 nav:flex-[.9_1_440px]">
          <span class="eyebrow eyebrow-or text-brume-clair">Contact</span>
          <h2
            class="section-title text-white nav:text-[clamp(2.1rem,4vw,3.5rem)] nav:leading-[1.06]"
          >
            Prêt à sécuriser vos biens ou à développer votre projet<span class="hidden nav:inline">
              avec WASSIA</span
            >&nbsp;?
          </h2>
          <div class="hidden flex-col gap-10 nav:flex">
            <p class="m-0 max-w-[480px] text-[1.12rem] leading-[1.65]">
              Choisissez ce qui vous correspond, nous vous répondons selon le pôle concerné.
            </p>
            <dl class="m-0 grid gap-[22px]">
              <div>
                <dt class="eyebrow eyebrow-nue text-xs text-or-clair">Siège social</dt>
                <dd class="m-0 mt-1 text-[1.15rem] font-semibold text-white">{{ site.siege }}</dd>
              </div>
              <div>
                <dt class="eyebrow eyebrow-nue text-xs text-or-clair">Téléphone</dt>
                <dd class="m-0 mt-1">
                  <a [href]="tel" [class]="lien">{{ site.telephone }}</a>
                </dd>
              </div>
              <div>
                <dt class="eyebrow eyebrow-nue text-xs text-or-clair">WhatsApp</dt>
                <dd class="m-0 mt-1">
                  <a [href]="whatsapp" target="_blank" rel="noopener" [class]="lien">{{
                    site.telephone
                  }}</a>
                </dd>
              </div>
              <div>
                <dt class="eyebrow eyebrow-nue text-xs text-or-clair">E-mail</dt>
                <dd class="m-0 mt-1">
                  <a [href]="'mailto:' + site.email" [class]="lien">{{ site.email }}</a>
                </dd>
              </div>
            </dl>
            <!--
              Carte de la commune du siège (OpenStreetMap : pas de cookie ni de mesure d'audience).
              À recentrer sur l'adresse exacte du siège quand le client l'aura fournie.
            -->
            <div class="overflow-hidden border border-white/25 bg-roi">
              <iframe
                title="Carte : siège du GROUPE WASSIA à Yopougon, Abidjan"
                src="https://www.openstreetmap.org/export/embed.html?bbox=-4.12%2C5.30%2C-4.03%2C5.37&amp;layer=mapnik&amp;marker=5.3364%2C-4.075"
                class="block h-[200px] w-full border-0 grayscale-[30%]"
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
                <app-icon name="fleche-externe" [size]="16" />
              </a>
            </div>
          </div>
        </div>

        <div class="min-w-0 nav:flex-[1.1_1_520px]">
          <app-contact-form [config]="formulaire" idPrefix="accueil" />
        </div>

        <a [href]="whatsapp" target="_blank" rel="noopener" class="btn-contour-clair nav:hidden"
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
  protected readonly lien =
    'border-b border-white text-[1.15rem] font-semibold text-white transition-colors hover:border-or';
}
