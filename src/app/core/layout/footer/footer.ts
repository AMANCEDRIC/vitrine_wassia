import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  AGENCE,
  ESPACE_AGENTS,
  RESEAUX_SOCIAUX,
  SITE,
  SLOGAN,
  lienTelephone,
  textePartenariat,
} from '@content/site';
import { DEVENIR_MEMBRE } from '../nav-links';
import { Icon } from '@shared/ui/icon/icon';
import { POLES } from '@content/poles';

@Component({
  selector: 'app-footer',
  imports: [RouterLink, Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './footer.html',
})
export class Footer {
  protected readonly site = SITE;
  protected readonly agence = AGENCE;
  protected readonly slogan = SLOGAN;
  protected readonly espaceAgents = ESPACE_AGENTS;
  protected readonly partenariat = textePartenariat();
  protected readonly poles = POLES;
  protected readonly devenirMembre = DEVENIR_MEMBRE;
  protected readonly tel = lienTelephone(SITE.telephone);
  /** Seuls les réseaux dont l'adresse est connue sont affichés. */
  protected readonly reseaux = RESEAUX_SOCIAUX.flatMap((r) =>
    r.url ? [{ ...r, url: r.url }] : [],
  );

  protected readonly legal = [
    { label: 'Conditions d’utilisation', court: 'Conditions d’utilisation', route: '/cgu' },
    {
      label: 'Politique de confidentialité',
      court: 'Confidentialité',
      route: '/confidentialite',
    },
    { label: 'Mentions légales', court: 'Mentions légales', route: '/mentions-legales' },
  ];
}
