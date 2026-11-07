import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { LEGAL, LegalPageId } from '@content/legal';
import { PageHero } from '@shared/ui/page-hero/page-hero';

/** CGU, politique de confidentialité et mentions légales : un seul gabarit, contenu dans `legal.ts`. */
@Component({
  selector: 'app-legal-page',
  imports: [PageHero],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './legal.page.html',
})
export class LegalPage {
  private readonly id = toSignal(
    inject(ActivatedRoute).data.pipe(map((data) => data['page'] as LegalPageId)),
    { requireSync: true },
  );

  protected readonly page = computed(() => LEGAL[this.id()]);
}
