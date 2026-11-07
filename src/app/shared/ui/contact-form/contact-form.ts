import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  computed,
  inject,
  input,
  signal,
} from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ContactApiService } from '@shared/data/contact-api.service';
import { validerChamp } from '@shared/data/contact-validation';
import { FormConfig, FormField } from '@shared/data/contact.model';

type Statut = 'saisie' | 'envoi' | 'erreur';

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

  private readonly api = inject(ContactApiService);
  private readonly router = inject(Router);
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);

  protected readonly statut = signal<Statut>('saisie');

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
    this.statut.set('envoi');
    this.api
      .envoyer({
        sujet: this.config().sujet,
        champs: form.getRawValue(),
        website: this.website.value,
      })
      .subscribe({
        next: () => void this.router.navigate(['/merci']),
        error: () => this.statut.set('erreur'),
      });
  }
}
