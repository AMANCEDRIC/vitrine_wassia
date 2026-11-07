import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/**
 * Liste de questions fréquentes en accordéon (balises natives <details>/<summary> :
 * accessibles au clavier et lisibles sans JavaScript). Une seule réponse ouverte à la fois.
 */
@Component({
  selector: 'app-faq',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="flex flex-col gap-3">
      @for (item of questions(); track item.question; let premier = $first) {
        <details
          class="faq-item group rounded-xl border border-trait bg-white transition-[border-color,box-shadow] duration-500 ease-doux open:border-sapin/40 open:shadow-[0_10px_24px_rgba(10,42,94,.08)]"
          [attr.name]="nom()"
          [open]="premier"
        >
          <summary
            class="flex cursor-pointer list-none items-center justify-between gap-4 p-5 font-display text-base font-bold text-marine nav:px-6 [&::-webkit-details-marker]:hidden"
          >
            {{ item.question }}
            <span
              class="flex size-8 flex-none items-center justify-center rounded-full bg-fond text-sapin transition-[rotate,background-color] duration-500 ease-doux group-open:rotate-45 group-open:bg-sapin group-open:text-white"
              aria-hidden="true"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2.5"
                stroke-linecap="round"
              >
                <path d="M12 5v14M5 12h14" />
              </svg>
            </span>
          </summary>
          <p class="faq-answer m-0 px-5 pb-5 text-[15px] leading-[1.65] text-ardoise nav:px-6">
            {{ item.reponse }}
          </p>
        </details>
      }
    </div>
  `,
})
export class Faq {
  readonly questions = input.required<readonly { question: string; reponse: string }[]>();
  /** Nom de groupe : ouvrir une question referme les autres. */
  readonly nom = input('faq');
}
