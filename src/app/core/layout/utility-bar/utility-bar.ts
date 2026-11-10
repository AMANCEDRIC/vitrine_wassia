import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SITE, lienTelephone, lienWhatsapp } from '@content/site';
import { Icon } from '@shared/ui/icon/icon';
import { IconName } from '@shared/ui/icon/icons';

interface Info {
  texte: string;
  lien?: string;
  icone: IconName;
}

/**
 * Bandeau défilant au-dessus de l'en-tête : coordonnées du groupe, sur tous les écrans.
 * La liste est rendue 4 fois (assez pour couvrir un grand écran) pour une boucle continue ;
 * défilement en pause au survol, figé si l'utilisateur a demandé à réduire les animations.
 */
@Component({
  selector: 'app-utility-bar',
  imports: [Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block border-b border-white/8 bg-nuit text-[13.5px] text-brume' },
  template: `
    <div class="ticker mx-auto max-w-site py-2.5" aria-label="Informations pratiques">
      <div class="ticker-track">
        @for (copie of copies; track copie) {
          <ul class="m-0 flex list-none p-0" [attr.aria-hidden]="copie > 0 ? 'true' : null">
            @for (info of infos; track info.texte) {
              <li class="flex items-center gap-2 pr-12 whitespace-nowrap">
                <app-icon
                  [name]="info.icone"
                  [size]="14"
                  [color]="info.icone === 'whatsapp' ? 'var(--color-emeraude)' : 'var(--color-or)'"
                />
                @if (info.lien) {
                  <a
                    [href]="info.lien"
                    class="hover:text-white hover:underline"
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
    { texte: `Siège social : ${SITE.siege}`, icone: 'carte' },
    {
      texte: `Téléphone : ${SITE.telephone}`,
      lien: lienTelephone(SITE.telephone),
      icone: 'telephone',
    },
    { texte: SITE.email, lien: `mailto:${SITE.email}`, icone: 'email' },
    { texte: `WhatsApp : ${SITE.telephone}`, lien: lienWhatsapp(), icone: 'whatsapp' },
  ];
}
