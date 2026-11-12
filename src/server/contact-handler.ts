/**
 * Traitement d'une demande de formulaire, indépendant de l'hébergeur.
 *
 * Utilisé par la route Express (`contact.ts`) et par la fonction Vercel (`api/contact.ts`).
 * Les imports sont relatifs (pas d'alias `@content/*`) pour que Vercel puisse compiler ce fichier tel quel.
 * Les dépendances (envoi du mail, vérification Turnstile) sont injectées : les tests n'ont pas besoin du réseau.
 */
import { FORMULAIRES } from '../app/content/formulaires';
import { SITE } from '../app/content/site';
import type { ContactSujet } from '../app/shared/data/contact.model';
import { validerDemande } from '../app/shared/data/contact-validation';

/** Réglages lus dans les variables d'environnement (jamais dans le dépôt). */
export interface EnvContact {
  SMTP_HOST?: string;
  SMTP_PORT?: string;
  SMTP_USER?: string;
  SMTP_PASS?: string;
  /** Adresse qui reçoit les demandes ; `contact@wassia-holding.com` par défaut. */
  CONTACT_TO?: string;
  /** Clé secrète Cloudflare Turnstile ; sans elle, la vérification anti-robots est ignorée. */
  TURNSTILE_SECRET?: string;
}

export interface MessageMail {
  from: string;
  to: string;
  replyTo?: string;
  subject: string;
  text: string;
}

export interface Dependances {
  env: EnvContact;
  envoyerMail: (message: MessageMail, env: EnvContact) => Promise<void>;
  verifierTurnstile: (jeton: string, secret: string, ip?: string) => Promise<boolean>;
  /** Journal sans donnée personnelle. */
  journal?: (texte: string) => void;
}

export interface ReponseContact {
  statut: number;
  corps: Record<string, unknown>;
}

/** Sujet du formulaire tel qu'il apparaît dans l'objet du mail. */
export const LIBELLE_SUJET: Record<ContactSujet, string> = {
  general: 'Demande générale',
  'devenir-membre': 'Devenir membre',
  'estimation-bien': 'Estimation d’un bien immobilier',
  'gestion-vehicule': 'Gestion d’un véhicule',
  voyage: 'Voyage',
  agrobusiness: 'Agrobusiness',
};

/** Une seule ligne, sans retour à la ligne (protège contre l'injection d'en-têtes de mail). */
export function uneLigne(texte: string, max = 120): string {
  return texte
    .replace(/[\r\n\p{Zl}\p{Zp}]+/gu, ' ')
    .trim()
    .slice(0, max);
}

/** Construit le mail envoyé à l'équipe, en texte simple. */
export function construireMessage(
  sujet: ContactSujet,
  champs: Record<string, string>,
  env: EnvContact,
): MessageMail {
  const config = FORMULAIRES[sujet];
  const lignes: string[] = [];
  for (const champ of config.champs) {
    const valeur = champs[champ.name];
    if (!valeur) {
      continue;
    }
    lignes.push(
      champ.type === 'textarea' ? `${champ.label} :\n${valeur}` : `${champ.label} : ${valeur}`,
    );
  }
  lignes.push(
    '',
    `Demande envoyée depuis le site ${SITE.domaine} (formulaire : ${LIBELLE_SUJET[sujet]}).`,
  );

  const nom = uneLigne(champs['nom'] ?? '');
  const message: MessageMail = {
    from: `Site WASSIA <${env.SMTP_USER ?? SITE.email}>`,
    to: env.CONTACT_TO?.trim() || SITE.email,
    subject: uneLigne(`[Site WASSIA] ${LIBELLE_SUJET[sujet]}${nom ? ` — ${nom}` : ''}`, 200),
    text: lignes.join('\n'),
  };
  // L'e-mail du visiteur a déjà été validé (aucun espace ni retour à la ligne possible).
  if (champs['email']) {
    message.replyTo = champs['email'];
  }
  return message;
}

/**
 * Valide la demande, contrôle l'anti-robots puis envoie le mail.
 * Codes : 200 envoyé · 400 données invalides · 403 vérification anti-robots refusée
 * · 502 envoi échoué · 503 envoi non configuré.
 */
export async function traiterDemande(
  corps: unknown,
  deps: Dependances,
  ip?: string,
): Promise<ReponseContact> {
  const journal = deps.journal ?? (() => undefined);
  const brut = (corps && typeof corps === 'object' ? corps : {}) as {
    website?: unknown;
    turnstileToken?: unknown;
  };

  // Champ piège rempli : on répond comme si tout allait bien, sans rien traiter.
  if (typeof brut.website === 'string' && brut.website.trim() !== '') {
    return { statut: 200, corps: { ok: true } };
  }

  const resultat = validerDemande(corps);
  if (!resultat.ok) {
    return { statut: 400, corps: { ok: false, erreurs: resultat.erreurs } };
  }

  const { env } = deps;
  if (!env.SMTP_HOST || !env.SMTP_USER || !env.SMTP_PASS) {
    journal('[contact] envoi non configuré (variables SMTP_* manquantes)');
    return { statut: 503, corps: { ok: false, code: 'indisponible' } };
  }

  if (env.TURNSTILE_SECRET) {
    const jeton = typeof brut.turnstileToken === 'string' ? brut.turnstileToken : '';
    const valide = jeton !== '' && (await deps.verifierTurnstile(jeton, env.TURNSTILE_SECRET, ip));
    if (!valide) {
      journal('[contact] vérification anti-robots refusée');
      return { statut: 403, corps: { ok: false, code: 'verification' } };
    }
  } else {
    journal('[contact] TURNSTILE_SECRET absent : vérification anti-robots ignorée');
  }

  try {
    await deps.envoyerMail(construireMessage(resultat.sujet, resultat.champs, env), env);
  } catch (erreur) {
    // Pas de donnée personnelle dans le journal : seulement le type d'erreur.
    journal(
      `[contact] envoi échoué : ${erreur instanceof Error ? erreur.name : 'erreur inconnue'}`,
    );
    return { statut: 502, corps: { ok: false, code: 'envoi' } };
  }

  journal(`[contact] demande envoyée : sujet=${resultat.sujet}`);
  return { statut: 200, corps: { ok: true } };
}
