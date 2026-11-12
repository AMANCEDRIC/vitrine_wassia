import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  afterNextRender,
  computed,
  inject,
  input,
  signal,
  viewChild,
} from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
} from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { ContactApiService } from '@shared/data/contact-api.service';
import { validerChamp } from '@shared/data/contact-validation';
import { FormConfig, FormField } from '@shared/data/contact.model';
import { SITE, TURNSTILE_SITE_KEY } from '@content/site';

/** Partie de l'API Cloudflare Turnstile utilisée par le formulaire. */
interface TurnstileApi {
  render(
    conteneur: HTMLElement,
    options: {
      sitekey: string;
      language: string;
      callback: (jeton: string) => void;
      'expired-callback': () => void;
      'error-callback': () => void;
    },
  ): string;
  reset(id: string): void;
  remove(id: string): void;
}

let chargementTurnstile: Promise<TurnstileApi> | undefined;

/** Charge le script Turnstile une seule fois pour toute la page (plusieurs formulaires possibles). */
function chargerTurnstile(): Promise<TurnstileApi> {
  chargementTurnstile ??= new Promise<TurnstileApi>((resolve, reject) => {
    const script = document.createElement('script');
    script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
    script.async = true;
    script.onload = () => {
      const api = (window as unknown as { turnstile?: TurnstileApi }).turnstile;
      if (api) {
        resolve(api);
      } else {
        chargementTurnstile = undefined;
        reject(new Error('Turnstile indisponible'));
      }
    };
    script.onerror = () => {
      chargementTurnstile = undefined;
      reject(new Error('Turnstile bloqué'));
    };
    document.head.appendChild(script);
  });
  return chargementTurnstile;
}

/**
 * `indisponible` : aucun serveur ou envoi non configuré (version de démonstration, hébergement statique).
 * `verification` : la vérification anti-robots n'a pas été faite ; `robot` : le serveur l'a refusée.
 */
type Statut = 'saisie' | 'envoi' | 'erreur' | 'indisponible' | 'verification' | 'robot';

/**
 * Formulaire de demande générique : les 6 formulaires de la maquette ne diffèrent que par leurs champs.
 * Validation identique au serveur (`validerChamp`), envoi vers POST /api/contact, puis page /merci.
 */
@Component({
  selector: 'app-contact-form',
  imports: [ReactiveFormsModule, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './contact-form.html',
})
export class ContactForm {
  readonly config = input.required<FormConfig>();
  /** Préfixe des identifiants, pour plusieurs formulaires sur une même page. */
  readonly idPrefix = input.required<string>();
  /** Titre affiché en haut du formulaire (page Immobilier et mobilité). */
  readonly titre = input<string>();

  private readonly contactApi = inject(ContactApiService);
  private readonly router = inject(Router);
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);

  protected readonly statut = signal<Statut>('saisie');
  protected readonly site = SITE;
  /** Clé publique Turnstile ; `null` = pas de vérification anti-robots. */
  protected readonly cleTurnstile = TURNSTILE_SITE_KEY;

  private readonly widget = viewChild<ElementRef<HTMLElement>>('widget');
  private readonly jeton = signal('');
  private api?: TurnstileApi;
  private idWidget?: string;

  constructor() {
    const destroyRef = inject(DestroyRef);
    afterNextRender(() => {
      const cle = this.cleTurnstile;
      const conteneur = this.widget()?.nativeElement;
      if (!cle || !conteneur) {
        return;
      }
      chargerTurnstile()
        .then((api) => {
          this.api = api;
          this.idWidget = api.render(conteneur, {
            sitekey: cle,
            language: 'fr',
            callback: (jeton) => this.jeton.set(jeton),
            'expired-callback': () => this.jeton.set(''),
            'error-callback': () => this.jeton.set(''),
          });
        })
        // Script bloqué (bloqueur de publicités, réseau) : l'envoi sera refusé, le message l'explique.
        .catch(() => undefined);
      destroyRef.onDestroy(() => {
        if (this.idWidget) {
          this.api?.remove(this.idWidget);
        }
      });
    });
  }

  protected readonly form = computed(() => {
    const controls: Record<string, FormControl<string>> = {};
    for (const champ of this.config().champs) {
      const initial = champ.type === 'select' ? (champ.options?.[0] ?? '') : '';
      controls[champ.name] = new FormControl(initial, {
        nonNullable: true,
        validators: (control: AbstractControl): ValidationErrors | null => {
          const message = validerChamp(champ, control.value as string);
          return message ? { champ: message } : null;
        },
      });
    }
    return new FormGroup(controls);
  });

  /** Champ piège, hors du groupe validé. */
  protected readonly website = new FormControl('', { nonNullable: true });

  protected id(champ: FormField): string {
    return `${this.idPrefix()}-${champ.name}`;
  }

  protected erreur(champ: FormField): string | null {
    const control = this.form().controls[champ.name];
    return control.touched && control.errors ? (control.errors['champ'] as string) : null;
  }

  protected envoyer(): void {
    const form = this.form();
    if (form.invalid) {
      form.markAllAsTouched();
      const premier = this.config().champs.find((c) => form.controls[c.name].invalid);
      if (premier) {
        this.host.nativeElement.querySelector<HTMLElement>(`#${this.id(premier)}`)?.focus();
      }
      return;
    }
    if (this.cleTurnstile && !this.jeton()) {
      this.statut.set('verification');
      return;
    }
    this.statut.set('envoi');
    this.contactApi
      .envoyer({
        sujet: this.config().sujet,
        champs: form.getRawValue(),
        website: this.website.value,
        turnstileToken: this.jeton() || undefined,
      })
      .subscribe({
        next: () => void this.router.navigate(['/merci']),
        error: (erreur: HttpErrorResponse) => {
          // Un jeton Turnstile ne sert qu'une fois : on en demande un nouveau.
          this.jeton.set('');
          if (this.idWidget) {
            this.api?.reset(this.idWidget);
          }
          if ([404, 405, 503].includes(erreur.status)) {
            this.statut.set('indisponible');
          } else {
            this.statut.set(erreur.status === 403 ? 'robot' : 'erreur');
          }
        },
      });
  }
}
