/**
 * Informations générales du groupe, affichées dans l'en-tête, le pied de page et les formulaires.
 *
 * À CONFIRMER PAR LE CLIENT avant la mise en ligne :
 * - l'adresse de l'application des agents ;
 * - le siège : le dossier client indique Akoupé, le site garde Yopougon (consigne du 2026-11-09).
 */
export const SITE = {
  nom: 'GROUPE WASSIA SARL HOLDING',
  nomLogo: 'Groupe Wassia SARL',
  accroche: 'Holding multisectorielle · Côte d’Ivoire',
  baseline: 'Inclusion financière, immobilier, flottes GPS, import-export.',
  /** Nom de domaine officiel retenu par le client (2026-11-07). */
  domaine: 'wassia-holding.com',
  siege: 'Yopougon, Abidjan — Côte d’Ivoire',
  siegeCourt: 'Yopougon, Abidjan',
  telephone: '+225 07 98 01 25 91',
  email: 'contact@wassia-holding.com',
  /** Numéro WhatsApp au format international, sans « + » ni espaces. */
  whatsapp: '2250798012591',
  annee: 2026,
  mentionIob:
    'WASSIA intervient comme intermédiaire en opérations de banque (IOB). Elle ne se substitue pas à un établissement de crédit agréé.',
} as const;

/**
 * Partenaire bancaire de l'activité d'IOB.
 *
 * Consigne du client (2026-11-07) : AUCUN nom de banque tant que les accords ne sont pas signés
 * (le partenariat envisagé n'est pas finalisé). Tant que `nom` vaut `null`, le site affiche la phrase
 * générique et laisse l'emplacement du partenaire vide. Après signature : renseigner `nom` et
 * `convention` ici, rien d'autre à modifier.
 */
export const PARTENAIRE_BANCAIRE: { nom: string | null; convention: string | null } = {
  nom: null,
  convention: null,
};

/** Slogan officiel (dossier 2026). Défini dans `content/credit.ts`. */
export { SLOGAN } from './credit';

export const CONVENTIONNEMENT_EN_COURS =
  'En cours de conventionnement avec des établissements bancaires agréés APBEF-CI.';

/** Phrase sur le partenariat bancaire : générique tant qu'aucune convention n'est signée. */
export function textePartenariat(): string {
  const { nom, convention } = PARTENAIRE_BANCAIRE;
  if (!nom) {
    return CONVENTIONNEMENT_EN_COURS;
  }
  return convention
    ? `En partenariat avec ${nom} (convention n° ${convention}).`
    : `En partenariat avec ${nom}.`;
}

/**
 * Bouton « Espace agents » : renvoie vers l'application de la plateforme (projet séparé).
 * Tant que son adresse n'est pas connue, le bouton est masqué.
 */
export const ESPACE_AGENTS: { url: string | null } = { url: null };

export type ReseauSocial = 'facebook' | 'linkedin' | 'instagram' | 'tiktok';

/**
 * Pages des réseaux sociaux du groupe, affichées dans le pied de page.
 * À renseigner par le client : une icône n'apparaît que si son adresse est connue.
 */
export const RESEAUX_SOCIAUX: readonly {
  reseau: ReseauSocial;
  label: string;
  url: string | null;
}[] = [
  { reseau: 'facebook', label: 'Facebook', url: null },
  { reseau: 'linkedin', label: 'LinkedIn', url: null },
  { reseau: 'instagram', label: 'Instagram', url: null },
  { reseau: 'tiktok', label: 'TikTok', url: null },
];

export const lienTelephone = (numero: string): string => `tel:${numero.replace(/\s/g, '')}`;
export const lienWhatsapp = (): string => `https://wa.me/${SITE.whatsapp}`;
