import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  ESPACE_AGENTS,
  RESEAUX_SOCIAUX,
  SITE,
  SLOGAN,
  lienTelephone,
  textePartenariat,
} from '@content/site';
import { ACTION_PRINCIPALE } from '../nav-links';
import { Icon } from '@shared/ui/icon/icon';
import { ACTIVITES } from '@content/poles';

@Component({
  selector: 'app-footer',
  imports: [RouterLink, Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './footer.html',
})
export class Footer {
  protected readonly site = SITE;
  protected readonly slogan = SLOGAN;
  protected readonly espaceAgents = ESPACE_AGENTS;
  protected readonly partenariat = textePartenariat();
  protected readonly poles = ACTIVITES;
  protected readonly actionPrincipale = ACTION_PRINCIPALE;
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
