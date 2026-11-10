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
 * Barre d'informations au-dessus de l'en-tête : coordonnées du groupe.
 * Ordinateur (≥ 1024px) : une ligne fixe, WhatsApp à droite (maquette v2).
 * Tablette et mobile : bandeau défilant, la liste est rendue 4 fois pour une boucle continue ;
 * défilement en pause au survol, figé si l'utilisateur a demandé à réduire les animations.
 */
@Component({
  selector: 'app-utility-bar',
  imports: [Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block border-b border-white/8 bg-nuit text-[13.5px] text-brume' },
  template: `
    <ul
      class="m-0 mx-auto hidden max-w-site list-none flex-wrap items-center gap-x-7 gap-y-2 px-8 py-2.5 lg:flex"
      aria-label="Informations pratiques"
    >
      @for (info of infos; track info.texte; let dernier = $last) {
        <li [class.ml-auto]="dernier">
          @if (info.lien) {
            <a
              [href]="info.lien"
              class="inline-flex items-center gap-2 hover:text-white hover:underline"
            >
              <app-icon
                [name]="info.icone"
                [size]="14"
                [color]="dernier ? 'var(--color-emeraude)' : 'var(--color-or)'"
              />
              {{ info.texte }}
            </a>
          } @else {
            <span class="inline-flex items-center gap-2">
              <app-icon [name]="info.icone" [size]="14" color="var(--color-or)" />
              {{ info.texte }}
            </span>
          }
        </li>
      }
    </ul>
    <div class="ticker mx-auto max-w-site py-2.5 lg:hidden" aria-label="Informations pratiques">
      <div class="ticker-track">
        @for (copie of copies; track copie) {
          <ul class="m-0 flex list-none p-0" [attr.aria-hidden]="copie > 0 ? 'true' : null">
            @for (info of infos; track info.texte) {
              <li class="flex items-center gap-3 pr-12 whitespace-nowrap">
                <span class="skew-bar h-3 w-[5px] bg-or" aria-hidden="true"></span>
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
