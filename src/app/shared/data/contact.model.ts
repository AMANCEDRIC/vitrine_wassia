/** Modèle partagé entre les formulaires (navigateur) et la route POST /api/contact (serveur). */

export const CONTACT_SUJETS = [
  'general',
  'devenir-membre',
  'estimation-bien',
  'gestion-vehicule',
  'voyage',
  'agrobusiness',
] as const;

export type ContactSujet = (typeof CONTACT_SUJETS)[number];

export type FieldType = 'text' | 'tel' | 'email' | 'number' | 'select' | 'textarea';

export interface FormField {
  name: string;
  label: string;
  type: FieldType;
  required?: boolean;
  options?: readonly string[];
  autocomplete?: string;
  /** Champ affiché sur la moitié de la largeur (ordinateur). */
  half?: boolean;
  /** Champ masqué sur mobile (version allégée de la maquette). */
  masqueMobile?: boolean;
}

export interface FormConfig {
  sujet: ContactSujet;
  champs: readonly FormField[];
  bouton: string;
}

export interface ContactRequest {
  sujet: ContactSujet;
  champs: Record<string, string>;
  /** Champ piège invisible : rempli uniquement par les robots. */
  website?: string;
}
