import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SITE, lienTelephone, lienWhatsapp } from '@content/site';

interface Info {
  texte: string;
  lien?: string;
}

/**
 * Bandeau défilant au-dessus de l'en-tête : coordonnées du groupe.
 * La liste est rendue 4 fois (assez pour couvrir un grand écran) pour une boucle continue ; défilement en pause au survol,
 * figé si l'utilisateur a demandé à réduire les animations.
 */
@Component({
  selector: 'app-utility-bar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block bg-nuit text-[13px] text-brume' },
  template: `
    <div class="ticker mx-auto max-w-site py-2.5" aria-label="Informations pratiques">
      <div class="ticker-track">
        @for (copie of copies; track copie) {
          <ul class="m-0 flex list-none p-0" [attr.aria-hidden]="copie > 0 ? 'true' : null">
            @for (info of infos; track info.texte) {
              <li class="flex items-center gap-3 pr-12 whitespace-nowrap">
                <span class="size-1.5 rounded-full bg-or" aria-hidden="true"></span>
                @if (info.lien) {
                  <a
                    [href]="info.lien"
                    class="hover:text-white"
                    [attr.tabindex]="copie > 0 ? -1 : null"
                    >{{ info.texte }}</a
                  >
                } @else {
                  <span>{{ info.texte }}</span>
                }
              </li>
            }
          </ul>
        }
      </div>
    </div>
  `,
})
export class UtilityBar {
  protected readonly copies = [0, 1, 2, 3];
  protected readonly infos: readonly Info[] = [
    { texte: `Siège social : ${SITE.siege}` },
    { texte: `Téléphone : ${SITE.telephone}`, lien: lienTelephone(SITE.telephone) },
    { texte: SITE.email, lien: `mailto:${SITE.email}` },
    { texte: `WhatsApp : ${SITE.telephone}`, lien: lienWhatsapp() },
  ];
}
