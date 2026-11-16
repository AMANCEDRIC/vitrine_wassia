/**
 * Informations générales du groupe, affichées dans l'en-tête, le pied de page et les formulaires.
 * Siège et RCCM : dossier de présentation institutionnelle officiel 2026 (reçu le 2026-11-15).
 *
 * À CONFIRMER PAR LE CLIENT avant la mise en ligne : l'adresse de l'application des agents.
 */
export const SITE = {
  nom: 'GROUPE WASSIA SARL HOLDING',
  nomLogo: 'Groupe Wassia SARL',
  accroche: 'Holding multisectorielle · Côte d’Ivoire',
  baseline: 'Inclusion financière, immobilier, flottes GPS, import-export, agrobusiness.',
  /** Nom de domaine officiel retenu par le client (2026-11-07). */
  domaine: 'wassia-holding.com',
  siege: 'Treichville, Avenue 21 / Rue 22, Abidjan — Côte d’Ivoire',
  siegeCourt: 'Treichville, Abidjan',
  rccm: 'CI-ABJ-03-2026-B12-08942',
  telephone: '+225 07 98 01 25 91',
  email: 'contact@wassia-holding.com',
  /** Numéro WhatsApp au format international, sans « + » ni espaces. */
  whatsapp: '2250798012591',
  annee: 2026,
  /**
   * Statut de l'activité financière (version style-v2). Branche `fusion-v2-conformite` : la phrase du
   * dossier officiel « ne collecte pas l'épargne / n'octroie pas de prêts » est retirée, car le site
   * présente l'épargne et le crédit (choix de Cédric, 2026-11-15, à faire valider par le client).
   */
  mentionIob:
    'WASSIA intervient comme intermédiaire en opérations de banque (IOB). Elle ne se substitue pas à un établissement de crédit agréé.',
} as const;

/** Devise du groupe (texte de l'accueil validé par le client, 2026-11-15). */
export const SLOGAN = 'Votre Référence, Notre Engagement';

/**
 * Partenaire bancaire.
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

/**
 * Clé PUBLIQUE du widget Cloudflare Turnstile (anti-robots des formulaires).
 * `null` : aucun widget (GitHub Pages, développement). La clé secrète n'est jamais dans le dépôt :
 * elle se règle côté serveur (variable d'environnement TURNSTILE_SECRET).
 */
export const TURNSTILE_SITE_KEY: string | null = null;

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
