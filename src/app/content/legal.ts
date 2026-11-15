/**
 * Pages légales. Textes repris du document « CGU et Politique de Confidentialité » du client,
 * PROVISOIRES tant que le document n'est pas signé (« Approuvé & Bon pour publication »).
 *
 * Les mentions entre crochets [À COMPLÉTER] doivent être fournies par le client :
 * capital social, directeur de la publication, hébergeur. Siège et RCCM : dossier officiel 2026.
 */
import { SITE } from './site';

export type LegalPageId = 'cgu' | 'confidentialite' | 'mentions-legales';

export interface LegalBloc {
  titre: string;
  paragraphes?: readonly string[];
  liste?: readonly string[];
  tableau?: { entetes: readonly string[]; lignes: readonly (readonly string[])[] };
}

export interface LegalPage {
  titre: string;
  intro: string;
  blocs: readonly LegalBloc[];
}

const NOM = 'GROUPE WASSIA SARL HOLDING';

export const LEGAL: Record<LegalPageId, LegalPage> = {
  cgu: {
    titre: 'Conditions générales d’utilisation',
    intro: `Les présentes conditions définissent les modalités de mise à disposition des services et contenus du site du ${NOM}.`,
    blocs: [
      {
        titre: '1. Dispositions générales et objet',
        paragraphes: [
          `Les présentes Conditions Générales d’Utilisation ont pour objet de définir les modalités de mise à disposition des services et contenus du portail web du ${NOM}. Tout accès, navigation ou interaction sur la plateforme implique l’acceptation intégrale, expresse et sans réserve des présentes dispositions par l’utilisateur.`,
        ],
      },
      {
        titre: '2. Périmètre du groupe',
        paragraphes: [
          `Le ${NOM} intervient en tant que holding animatrice assurant le contrôle, la gestion stratégique et le développement de ses pôles d’activités :`,
        ],
        liste: [
          'Accompagnement Finance : assistance à la constitution et à la présentation de dossiers de financement auprès de partenaires financiers agréés. WASSIA ne collecte pas l’épargne du public et n’octroie pas de prêts.',
          'Immobilier, construction et gestion patrimoniale : gestion locative, réhabilitation de biens, transactions foncières.',
          'Gestion de flottes et traçabilité GPS : gestion déléguée de véhicules, supervision et géolocalisation.',
          'Import-export et commerce général : sourcing international, dédouanement avec des transitaires agréés, distribution.',
          'Agrobusiness et transformation : filières agricoles, animales et halieutiques, unités de transformation.',
          'Autres services : voyage, Hadj, Oumrah et études (avec une agence agréée) ; énergie verte et développement industriel.',
        ],
      },
      {
        titre: '3. Engagements et responsabilité',
        paragraphes: [
          'Le GROUPE WASSIA met en œuvre des protocoles rigoureux pour garantir la continuité des services présentés sur la plateforme. La holding décline toute responsabilité en cas d’interruption technique indépendante de sa volonté ou de mauvaise manipulation de la part de l’utilisateur.',
          'Les informations présentées sur le site sont indicatives et ne constituent aucune promesse de résultat garanti. Les conditions applicables à chaque service sont précisées par écrit avant tout engagement.',
        ],
      },
      {
        titre: '4. Propriété intellectuelle',
        paragraphes: [
          `L’ensemble des visuels, logos, textes, marques, identités graphiques et bases de données figurant sur la plateforme sont la propriété exclusive du ${NOM}. Toute reproduction ou exploitation non autorisée fera l’objet de poursuites conformément au code de la propriété intellectuelle.`,
        ],
      },
    ],
  },
  confidentialite: {
    titre: 'Politique de confidentialité',
    intro:
      'Comment le GROUPE WASSIA traite les données personnelles que vous lui confiez, conformément aux normes en vigueur en Côte d’Ivoire et dans la zone UEMOA.',
    blocs: [
      {
        titre: 'Données collectées et finalités',
        paragraphes: [
          'Les données collectées via nos formulaires (nom, téléphone, e-mail, projet) sont strictement confidentielles et réservées au traitement administratif et commercial interne des filiales du GROUPE WASSIA.',
        ],
        tableau: {
          entetes: ['Type de données', 'Finalité du traitement', 'Durée de conservation'],
          lignes: [
            [
              'Identité et contact (formulaires)',
              'Traitement des demandes de rendez-vous et de devis',
              '3 ans à compter du dernier contact',
            ],
            [
              'Données de géolocalisation (GPS)',
              'Sécurisation et suivi des flottes gérées',
              'Durée du contrat de gestion de flotte',
            ],
            [
              'Documents consulaires et visas',
              'Audit et vérification de la conformité du dossier',
              'Strictement limitée à la durée de la procédure',
            ],
          ],
        },
      },
      {
        titre: 'Données collectées par ce site',
        paragraphes: [
          'Ce site ne collecte que les informations saisies dans les formulaires de demande. Il n’utilise ni cookie publicitaire ni outil de mesure d’audience.',
          'Vos demandes sont transmises par e-mail à contact@wassia-holding.com. Pour écarter les robots, les formulaires utilisent le service Cloudflare Turnstile, qui analyse votre navigateur afin de distinguer un visiteur d’un robot : son affichage transmet votre adresse IP à Cloudflare.',
          'La carte du siège affichée sur la page d’accueil est fournie par OpenStreetMap : son affichage transmet votre adresse IP à ce service, qui ne dépose pas de cookie publicitaire.',
        ],
      },
      {
        titre: 'Vos droits',
        paragraphes: [
          'Vous pouvez demander l’accès, la rectification ou la suppression de vos données en écrivant à contact@wassia-holding.com. [À COMPLÉTER : référence de la déclaration auprès de l’ARTCI.]',
        ],
      },
    ],
  },
  'mentions-legales': {
    titre: 'Mentions légales',
    intro: `Informations relatives à l’éditeur du site et à son hébergement.`,
    blocs: [
      {
        titre: 'Éditeur',
        liste: [
          `Raison sociale : ${NOM}`,
          `Siège social : ${SITE.siege}`,
          `RCCM : ${SITE.rccm}`,
          'Capital social : [À COMPLÉTER]',
          `Téléphone : ${SITE.telephone}`,
          'E-mail : contact@wassia-holding.com',
          'Directeur de la publication : [À COMPLÉTER]',
        ],
      },
      {
        titre: 'Activité financière',
        paragraphes: [
          SITE.mentionFinance,
          'En cours de conventionnement avec des établissements bancaires agréés APBEF-CI. Le nom du partenaire et le numéro de convention seront indiqués ici après signature.',
        ],
      },
      {
        titre: 'Hébergement',
        liste: ['Hébergeur : [À COMPLÉTER]', 'Adresse : [À COMPLÉTER]'],
      },
    ],
  },
};
