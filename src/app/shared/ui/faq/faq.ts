import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/**
 * Liste de questions fréquentes en accordéon (balises natives <details>/<summary> :
 * accessibles au clavier et lisibles sans JavaScript). Une seule réponse ouverte à la fois.
 */
@Component({
  selector: 'app-faq',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="flex flex-col border-b border-trait">
      @for (item of questions(); track item.question; let premier = $first) {
        <details
          class="faq-item group border-t border-trait bg-transparent"
          [attr.name]="nom()"
          [open]="premier"
        >
          <summary
            class="flex min-h-16 cursor-pointer list-none items-center justify-between gap-4 py-5 font-display text-[1.05rem] font-bold tracking-[-.01em] text-nuit transition-colors hover:text-sapin nav:text-lg [&::-webkit-details-marker]:hidden"
          >
            {{ item.question }}
            <span
              class="flex size-10 flex-none items-center justify-center border-[1.5px] border-nuit text-nuit transition-[rotate,background-color,border-color,color] duration-500 ease-doux group-open:rotate-45 group-open:border-sapin group-open:bg-sapin group-open:text-white"
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
          <p class="faq-answer m-0 max-w-[760px] pb-6 text-base leading-[1.65] text-ardoise">
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
