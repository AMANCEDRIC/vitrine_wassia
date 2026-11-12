import { FORMULAIRES } from '../../content/formulaires';
import { CONTACT_SUJETS, ContactRequest, ContactSujet, FormField } from './contact.model';

export const LONGUEUR_MAX = { court: 120, message: 2000 } as const;

/** Numéro de téléphone : chiffres, espaces, +, points, tirets, parenthèses ; 8 à 15 chiffres. */
export const TELEPHONE_PATTERN = /^\+?[\d\s().-]+$/;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function compterChiffres(valeur: string): number {
  return valeur.replace(/\D/g, '').length;
}

/** Message d'erreur d'un champ, ou `null` si la valeur est valide. */
export function validerChamp(champ: FormField, brut: string | undefined): string | null {
  const valeur = (brut ?? '').trim();
  if (!valeur) {
    return champ.required ? 'Ce champ est obligatoire.' : null;
  }
  const max = champ.type === 'textarea' ? LONGUEUR_MAX.message : LONGUEUR_MAX.court;
  if (valeur.length > max) {
    return `${max} caractères au maximum.`;
  }
  switch (champ.type) {
    case 'tel': {
      const chiffres = compterChiffres(valeur);
      return TELEPHONE_PATTERN.test(valeur) && chiffres >= 8 && chiffres <= 15
        ? null
        : 'Numéro de téléphone invalide.';
    }
    case 'email':
      return EMAIL_PATTERN.test(valeur) ? null : 'Adresse e-mail invalide.';
    case 'number': {
      const n = Number(valeur);
      return Number.isInteger(n) && n >= 1 && n <= 999 ? null : 'Nombre entre 1 et 999.';
    }
    case 'select':
      return champ.options?.includes(valeur) ? null : 'Choix invalide.';
    default:
      return null;
  }
}

export type ResultatValidation =
  | { ok: true; sujet: ContactSujet; champs: Record<string, string> }
  | { ok: false; erreurs: Record<string, string> };

/** Validation complète d'une demande (utilisée par le serveur). */
export function validerDemande(corps: unknown): ResultatValidation {
  if (!corps || typeof corps !== 'object') {
    return { ok: false, erreurs: { _: 'Requête invalide.' } };
  }
  const demande = corps as Partial<ContactRequest>;
  const sujet = demande.sujet;
  if (!sujet || !(CONTACT_SUJETS as readonly string[]).includes(sujet)) {
    return { ok: false, erreurs: { sujet: 'Sujet inconnu.' } };
  }
  const recus = demande.champs && typeof demande.champs === 'object' ? demande.champs : {};
  const config = FORMULAIRES[sujet];
  const erreurs: Record<string, string> = {};
  const champs: Record<string, string> = {};

  for (const nom of Object.keys(recus)) {
    if (!config.champs.some((c) => c.name === nom)) {
      erreurs[nom] = 'Champ inattendu.';
    }
  }
  for (const champ of config.champs) {
    const brut = recus[champ.name];
    if (brut !== undefined && typeof brut !== 'string') {
      erreurs[champ.name] = 'Valeur invalide.';
      continue;
    }
    const erreur = validerChamp(champ, brut);
    if (erreur) {
      erreurs[champ.name] = erreur;
    } else if (brut?.trim()) {
      champs[champ.name] = brut.trim();
    }
  }
  return Object.keys(erreurs).length ? { ok: false, erreurs } : { ok: true, sujet, champs };
}
