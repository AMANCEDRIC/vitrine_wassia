import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ESPACE_AGENTS, SITE, textePartenariat } from '@content/site';
import { POLES } from '@content/poles';

@Component({
  selector: 'app-footer',
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './footer.html',
})
export class Footer {
  protected readonly site = SITE;
  protected readonly espaceAgents = ESPACE_AGENTS;
  protected readonly partenariat = textePartenariat();
  protected readonly poles = POLES;

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
