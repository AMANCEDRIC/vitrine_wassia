import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FORMULAIRES } from '@content/formulaires';
import { SITE, lienTelephone, lienWhatsapp } from '@content/site';
import { ContactForm } from '@shared/ui/contact-form/contact-form';

@Component({
  selector: 'app-home-contact',
  imports: [ContactForm],
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
            <!-- Carte du siège : à intégrer quand l'adresse précise sera fournie (voir CGU / cookies) -->
            <div
              class="flex h-[150px] items-center justify-center rounded-[10px] border border-ligne-sombre bg-roi text-[13px] text-brume"
            >
              Carte du siège à intégrer
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
