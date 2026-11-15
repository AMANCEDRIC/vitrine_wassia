/**
 * Textes des pages des 5 pôles et des 2 services.
 *
 * Source : documents officiels 2026 du client (`docs_wassia/doc_pols`, reçus le 2026-11-15).
 * On suit les fiches « Pôle … » (version prudente), pas les « Fiches commerciales » (loyer garanti,
 * travaux pris en charge à 100 %…). Décisions de Cédric : aucune promesse « garanti », aucun
 * pourcentage de répartition, aucune mention de compte d'épargne WASSIA (le dossier officiel précise
 * que WASSIA ne collecte pas l'épargne du public et n'octroie pas de prêts).
 */
import { ContactSujet } from '../shared/data/contact.model';
import { ActiviteId } from './poles';

export interface BlocActivite {
  titre: string;
  texte: string;
}

export interface SectionActivite {
  id: string;
  eyebrow: string;
  titre: string;
  intro?: string;
  /** Blocs numérotés (services, étapes, domaines). */
  blocs?: readonly BlocActivite[];
  /** Courte liste d'étiquettes (pays, véhicules, filières…). */
  etiquettes?: readonly string[];
  /** `clair` : fond blanc ; `gris` : fond gris clair ; `sombre` : fond nuit. */
  fond: 'clair' | 'gris' | 'sombre';
}

export interface PageActivite {
  titre: string;
  intro: string;
  /** Phrase d'accroche affichée en grand sous le bandeau. */
  accroche: string;
  sections: readonly SectionActivite[];
  /** Mentions de prudence (« sous réserve… », « aucun rendement garanti… »). */
  avertissements: readonly string[];
  image?: { src: string; alt: string };
  formulaire: ContactSujet;
  titreFormulaire: string;
  boutonHero: string;
}

/** Mention reprise sur toutes les pages où un financement est évoqué. */
const VIA_PARTENAIRES =
  'Tout financement passe par nos partenaires financiers agréés, selon le dossier et après étude.';

export const PAGES_ACTIVITES: Record<ActiviteId, PageActivite> = {
  finance: {
    titre: 'Préparer et présenter votre dossier de financement',
    intro:
      'Nous aidons les commerçants, entrepreneurs, chauffeurs et producteurs à monter un dossier solide et à le présenter à nos partenaires financiers agréés.',
    accroche:
      'Un bon dossier ouvre des portes : nous vous aidons à le construire, puis à le présenter aux bons partenaires.',
    sections: [
      {
        id: 'pour-qui',
        eyebrow: 'Pour qui',
        titre: 'Ceux qui font tourner l’économie au quotidien',
        etiquettes: [
          'Commerçants',
          'Entrepreneurs et artisans',
          'Chauffeurs et transporteurs',
          'Producteurs agricoles',
          'PME',
        ],
        fond: 'clair',
      },
      {
        id: 'etapes',
        eyebrow: 'Comment ça se passe',
        titre: 'Trois étapes, un seul interlocuteur',
        blocs: [
          {
            titre: 'Nous écoutons votre projet',
            texte:
              'Achat de stock, outil de travail, équipement, campagne agricole : nous faisons le point sur votre besoin et votre activité.',
          },
          {
            titre: 'Nous constituons le dossier',
            texte:
              'Nous vous aidons à rassembler les pièces et à présenter clairement votre activité et votre projet.',
          },
          {
            titre: 'Nous le présentons à nos partenaires',
            texte:
              'Le dossier est transmis à nos partenaires financiers agréés. La décision leur appartient, après étude.',
          },
        ],
        fond: 'gris',
      },
      {
        id: 'synergie',
        eyebrow: 'Avec les autres pôles',
        titre: 'Un accompagnement relié à votre activité',
        blocs: [
          {
            titre: 'Commerce',
            texte:
              'Les commerçants peuvent être accompagnés pour financer le renouvellement de leur stock, en lien avec notre pôle Import-export.',
          },
          {
            titre: 'Transport',
            texte:
              'Les chauffeurs réguliers suivis par notre pôle Flottes peuvent être orientés pour l’achat de pièces ou de leur propre véhicule.',
          },
          {
            titre: 'Agriculture et énergie',
            texte:
              'Campagnes agricoles, petits équipements, installations solaires : nous orientons les producteurs, artisans et ménages.',
          },
        ],
        fond: 'sombre',
      },
    ],
    avertissements: [
      'WASSIA ne collecte pas l’épargne du public et n’octroie pas de prêts. Les conditions de financement (montant, durée, taux, frais, garanties) sont fixées uniquement par l’établissement partenaire agréé, après étude de votre dossier, et vous sont communiquées par écrit avant tout engagement.',
      VIA_PARTENAIRES,
    ],
    formulaire: 'dossier-financement',
    titreFormulaire: 'Parlez-nous de votre projet',
    boutonHero: 'Monter mon dossier',
  },

  immobilier: {
    titre: 'Valoriser votre patrimoine immobilier, en toute sécurité',
    intro:
      'Gestion locative, réhabilitation de chantiers et transactions foncières pour les propriétaires, bailleurs et investisseurs en Côte d’Ivoire.',
    accroche:
      'Notre mission : valoriser votre patrimoine tout en réduisant les risques d’impayés et de chantiers bloqués.',
    sections: [
      {
        id: 'gestion-locative',
        eyebrow: 'Gestion locative sécurisée',
        titre: 'Confiez-nous vos immeubles, villas ou appartements',
        blocs: [
          {
            titre: 'Reversement mensuel',
            texte:
              'Vos loyers perçus vous sont reversés chaque mois, selon les conditions du contrat de gestion signé.',
          },
          {
            titre: 'Sélection rigoureuse des locataires',
            texte:
              'Chaque candidat est étudié (dossier, solvabilité, garanties) avant toute signature de bail. Suivi et relance des loyers.',
          },
          {
            titre: 'Entretien courant',
            texte:
              'Les petits travaux entre deux locataires sont pris en charge selon le contrat de gestion et dans la limite du fonds d’entretien prévu.',
          },
        ],
        fond: 'clair',
      },
      {
        id: 'rehabilitation',
        eyebrow: 'Bail à réhabilitation',
        titre: 'Un chantier inachevé ? Un bâtiment à rénover ?',
        intro:
          'Nous étudions, organisons le financement et réalisons les travaux pour transformer votre bien inactif en source de revenus.',
        blocs: [
          {
            titre: 'Apport selon l’étude du chantier',
            texte:
              'Après audit technique et chiffrage par nos ingénieurs, le montage s’adapte au dossier : apport du propriétaire sur certains chantiers, financement des travaux possible sur d’autres, sous réserve d’étude et de validation.',
          },
          {
            titre: 'Fournisseurs et suivi technique',
            texte:
              'Approvisionnement auprès de nos quincailleries partenaires et exécution contrôlée par notre conducteur de travaux.',
          },
          {
            titre: 'Encadrement notarié',
            texte:
              'Une convention tripartite et un acte notarié fixent le budget des travaux, la durée d’amortissement et les droits de chacun.',
          },
        ],
        fond: 'gris',
      },
      {
        id: 'foncier',
        eyebrow: 'Transactions foncières',
        titre: 'Acheter ou vendre un terrain ou un bien bâti, en sécurité',
        intro:
          'Vérification préalable des titres fonciers, accompagnement technique et sécurisation notariale de chaque transaction.',
        etiquettes: ['ACD', 'Arrêtés', 'Certificats', 'Actes notariés'],
        fond: 'sombre',
      },
    ],
    avertissements: [
      'Les conditions (reversement, entretien, travaux) sont celles du contrat signé avec chaque propriétaire. Aucune promesse de résultat garanti.',
    ],
    image: {
      src: 'images/illustrations/immobilier-mobilite.svg',
      alt: 'Illustration : immeubles et maisons gérés par WASSIA',
    },
    formulaire: 'estimation-bien',
    titreFormulaire: 'Présentez-nous votre bien',
    boutonHero: 'Présenter mon bien',
  },

  flottes: {
    titre: 'Des véhicules mieux gérés, suivis 24 h/24',
    intro:
      'Gestion déléguée et géolocalisation en temps réel pour les propriétaires de taxis, VTC, utilitaires, minicars et motos-taxis.',
    accroche:
      'La rigueur de la gestion déléguée, alliée à la géolocalisation en temps réel, pour protéger vos véhicules et suivre vos recettes.',
    sections: [
      {
        id: 'gestion',
        eyebrow: 'Gestion de flotte sécurisée',
        titre: 'Confiez l’exploitation quotidienne de vos véhicules',
        etiquettes: ['Taxis compteurs', 'VTC', 'Utilitaires', 'Minicars', 'Motos-taxis'],
        blocs: [
          {
            titre: 'Reversement des recettes perçues',
            texte:
              'Les recettes perçues vous sont reversées selon les conditions et le calendrier du contrat de gestion signé.',
          },
          {
            titre: 'Chauffeurs sélectionnés et encadrés',
            texte:
              'Vérification d’identité, permis valide, enquête de moralité, référent familial et contrat d’engagement pour chaque conducteur.',
          },
          {
            titre: 'Maintenance préventive',
            texte:
              'Vidanges, pneumatiques, visites techniques : un contrôle régulier pour préserver vos véhicules et éviter les immobilisations.',
          },
        ],
        fond: 'clair',
      },
      {
        id: 'gps',
        eyebrow: 'Supervision GPS',
        titre: 'Votre véhicule, visible à tout moment',
        blocs: [
          {
            titre: 'Localisation en temps réel',
            texte: 'Position, itinéraires, temps d’arrêt et zones d’activité, 24 h/24.',
          },
          {
            titre: 'Coupure moteur à distance',
            texte:
              'En cas de vol ou d’usage non autorisé : immobilisation uniquement à l’arrêt et avec l’accord du propriétaire, selon le contrat.',
          },
          {
            titre: 'Alertes de zone',
            texte:
              'Notification en cas de sortie de la zone autorisée, d’excès de vitesse ou de débranchement de la batterie.',
          },
          {
            titre: 'Rapports d’activité',
            texte:
              'Historique des parcours et du kilométrage pour anticiper l’entretien et vérifier les recettes déclarées.',
          },
        ],
        fond: 'sombre',
      },
      {
        id: 'gps-seul',
        eyebrow: 'Propriétaires indépendants',
        titre: 'Vous gérez vous-même ? Le GPS seul suffit',
        intro:
          'Souscrivez uniquement à l’installation et à l’abonnement de notre solution GPS, avec un accès mobile dédié.',
        fond: 'gris',
      },
    ],
    avertissements: [
      'Les conditions de reversement et de gestion sont celles du contrat signé. Les chauffeurs réguliers peuvent être orientés vers nos partenaires financiers agréés, selon leur dossier et après étude.',
    ],
    image: {
      src: 'images/illustrations/transport.svg',
      alt: 'Illustration : véhicules de transport suivis par GPS',
    },
    formulaire: 'gestion-vehicule',
    titreFormulaire: 'Parlez-nous de vos véhicules',
    boutonHero: 'Confier mes véhicules',
  },

  commerce: {
    titre: 'Importer, s’approvisionner et vendre, dans tous les secteurs',
    intro:
      'Un réseau de fabricants et de fournisseurs sur tous les continents, puis la distribution sur l’ensemble du territoire ivoirien.',
    accroche:
      'Nous connectons les commerçants, grossistes, artisans et entreprises de Côte d’Ivoire aux grandes plateformes industrielles mondiales.',
    sections: [
      {
        id: 'reseau',
        eyebrow: 'Un réseau mondial',
        titre: 'Des fournisseurs sur quatre zones',
        blocs: [
          {
            titre: 'Asie',
            texte:
              'Chine, Inde, Japon, Corée du Sud : équipements, pièces détachées, électronique, textiles, quincaillerie, matériaux.',
          },
          {
            titre: 'Golfe',
            texte:
              'Dubaï et Émirats : négoce multi-produits, parfumerie, électronique, accessoires automobiles, électroménager.',
          },
          {
            titre: 'Afrique',
            texte:
              'Égypte et CEDEAO : agroalimentaire, produits manufacturés, textiles et coton, matériaux de finition.',
          },
          {
            titre: 'Europe et Amérique',
            texte:
              'Machines professionnelles, véhicules et engins, équipements techniques, produits certifiés aux normes internationales.',
          },
        ],
        fond: 'clair',
      },
      {
        id: 'solutions',
        eyebrow: 'De la commande à la livraison',
        titre: 'Nous nous occupons de toute la chaîne',
        blocs: [
          {
            titre: 'Sourcing et achat sur mesure',
            texte:
              'Recherche d’usines fiables selon votre cahier des charges, négociation des prix et contrôle qualité avant embarquement.',
          },
          {
            titre: 'Groupage maritime et fret aérien',
            texte:
              'Des conteneurs partagés pour importer à moindre coût, sans payer un conteneur complet.',
          },
          {
            titre: 'Dédouanement et livraison',
            texte:
              'Suivi des formalités avec nos transitaires agréés, au port d’Abidjan et à l’aéroport, jusqu’à votre magasin, sous réserve des contrôles des autorités douanières.',
          },
        ],
        fond: 'gris',
      },
      {
        id: 'vente',
        eyebrow: 'Commerce général',
        titre: 'Gros, demi-gros et détail',
        intro:
          'Vente aux commerçants des grands marchés d’Abidjan et de l’intérieur, accueil des particuliers dans notre espace de Treichville, approvisionnement régulier des PME, ateliers, restaurants et chantiers.',
        etiquettes: [
          'Textiles et habillement',
          'Cosmétique et hygiène',
          'Électronique et électroménager',
          'Quincaillerie et pièces',
          'Agroalimentaire',
        ],
        fond: 'sombre',
      },
    ],
    avertissements: [
      'Livraison suivie par nos véhicules équipés de GPS. Les commerçants peuvent être orientés vers nos partenaires financiers agréés pour financer leur stock, selon leur dossier et après étude.',
    ],
    formulaire: 'sourcing',
    titreFormulaire: 'Dites-nous ce que vous cherchez',
    boutonHero: 'Faire une demande',
  },

  agrobusiness: {
    titre: 'Produire local, transformer local',
    intro:
      'Filières agricoles, animales et halieutiques, et transformation en Côte d’Ivoire, avec nos partenaires techniques et investisseurs.',
    accroche:
      'Produire local, transformer local, et créer des emplois et de la valeur en Côte d’Ivoire, dans le respect des normes et des études techniques.',
    sections: [
      {
        id: 'filieres',
        eyebrow: 'Quatre filières',
        titre: 'Des projets en cours de développement',
        blocs: [
          {
            titre: 'Agriculture et transformation',
            texte: 'Cultures et unités de transformation de produits agricoles locaux.',
          },
          {
            titre: 'Élevage',
            texte:
              'Unités d’élevage pour soutenir la production locale, dans le respect des normes sanitaires et vétérinaires.',
          },
          {
            titre: 'Aquaculture',
            texte:
              'Production de poissons, avec un accompagnement sur la qualité de l’eau, l’alimentation et le suivi des bassins.',
          },
          {
            titre: 'Barrages hydro-agricoles',
            texte:
              'Projets d’irrigation, sous réserve des études techniques et des autorisations administratives.',
          },
        ],
        fond: 'clair',
      },
      {
        id: 'chaine',
        eyebrow: 'De la terre au consommateur',
        titre: 'Toute la chaîne de valeur',
        blocs: [
          {
            titre: 'Amont',
            texte:
              'Structuration des groupements de producteurs, accès aux semences et engrais, orientation vers un financement.',
          },
          {
            titre: 'Collecte et transport',
            texte: 'Acheminement des récoltes par nos véhicules suivis par GPS.',
          },
          {
            titre: 'Transformation et vente',
            texte:
              'Produits finis (jus, dérivés alimentaires) vendus en Côte d’Ivoire ou à l’export par nos pôles Commerce et Import-export.',
          },
        ],
        fond: 'gris',
      },
      {
        id: 'partenaires',
        eyebrow: 'Appel aux partenaires',
        titre: 'Industriels, équipementiers, investisseurs : rejoignez-nous',
        intro:
          'Nous recherchons des partenaires pour implanter des unités de transformation : jus et nectars de fruits locaux, anacarde, cacao, manioc. Nous apportons un cadre rigoureux, des bassins de production et une logistique intégrée.',
        etiquettes: ['Jus et nectars', 'Anacarde', 'Cacao', 'Manioc', 'Vivriers'],
        fond: 'sombre',
      },
    ],
    avertissements: [
      'Nous ne promettons aucun rendement garanti. Chaque projet fait l’objet d’une étude technique et financière, et les conditions sont communiquées par écrit avant tout engagement.',
      'WASSIA ne délivre pas les autorisations administratives, qui relèvent des autorités compétentes. ' +
        VIA_PARTENAIRES,
    ],
    image: {
      src: 'images/illustrations/agrobusiness.svg',
      alt: 'Illustration : champs cultivés et panneaux solaires',
    },
    formulaire: 'agrobusiness',
    titreFormulaire: 'Producteur, industriel ou investisseur ?',
    boutonHero: 'Proposer un partenariat',
  },

  voyage: {
    titre: 'Voyager, accomplir le Hadj, étudier à l’étranger',
    intro:
      'Billetterie, assistance visa, voyages d’affaires, tourisme, Hadj, Oumrah et études en Arabie saoudite, avec nos partenaires.',
    accroche:
      'De votre première démarche à notre agence de Treichville jusqu’à votre arrivée, nous simplifions chaque étape de votre voyage.',
    sections: [
      {
        id: 'services',
        eyebrow: 'Voyage et tourisme',
        titre: 'Nos prestations',
        blocs: [
          {
            titre: 'Billets d’avion et hébergement',
            texte:
              'Billets toutes destinations à tarifs négociés, hôtels et résidences meublées vérifiés.',
          },
          {
            titre: 'Assistance visa',
            texte:
              'Aide au montage du dossier, lettres d’invitation, assurance voyage et rendez-vous consulaires.',
          },
          {
            titre: 'Voyages d’affaires',
            texte:
              'Missions commerciales et visites d’usines ou de foires (Canton, Dubaï, New Delhi, Istanbul), avec accueil et interprètes.',
          },
          {
            titre: 'Tourisme et location de véhicules',
            texte:
              'Accueil à Abidjan, circuits en Côte d’Ivoire (Grand-Bassam, Assinie, Yamoussoukro, Man), véhicules avec ou sans chauffeur suivis par GPS.',
          },
        ],
        fond: 'clair',
      },
      {
        id: 'hadj',
        eyebrow: 'Hadj, Oumrah et études',
        titre: 'Accompagnés jusqu’en Arabie saoudite',
        intro:
          'En partenariat avec une agence agréée par le Commissariat du Hadj en Côte d’Ivoire, et avec nos partenaires basés à Djeddah.',
        blocs: [
          {
            titre: 'Hadj et Oumrah',
            texte:
              'Séjours spirituels clés en main, hébergement près des Lieux saints et transferts climatisés.',
          },
          {
            titre: 'Études',
            texte:
              'Orientation et inscription dans des instituts de langue arabe, écoles et universités partenaires, selon les places disponibles.',
          },
          {
            titre: 'Accueil à Djeddah',
            texte:
              'Guides francophones et arabophones sur place, aide au logement étudiant et lien avec les familles en Côte d’Ivoire.',
          },
        ],
        fond: 'sombre',
      },
      {
        id: 'transparence',
        eyebrow: 'Transparence',
        titre: 'Tous les frais, par écrit, avant l’inscription',
        intro:
          'Billets, visa, hébergement, encadrement et frais de service WASSIA sont détaillés par écrit dès l’inscription en agence.',
        fond: 'gris',
      },
    ],
    avertissements: [
      'Les visas sont délivrés uniquement par l’ambassade ou le consulat compétent. WASSIA ne délivre pas les visas. Hadj et Oumrah sous réserve de l’agrément officiel et des quotas attribués par les autorités saoudiennes.',
    ],
    image: {
      src: 'images/illustrations/voyage.svg',
      alt: 'Illustration : avion, valises et passeport',
    },
    formulaire: 'voyage',
    titreFormulaire: 'Parlez-nous de votre voyage',
    boutonHero: 'Demander un devis',
  },

  energie: {
    titre: 'L’énergie propre au service de la production locale',
    intro:
      'Solutions solaires, équipements industriels et unités de production pour les entreprises, les exploitations agricoles et les ménages.',
    accroche:
      'Conjuguer énergie propre et production industrielle locale pour bâtir une économie compétitive, autonome et respectueuse de l’environnement.',
    sections: [
      {
        id: 'domaines',
        eyebrow: 'Quatre domaines',
        titre: 'De l’installation solaire à la ligne de production',
        blocs: [
          {
            titre: 'Solaire et énergies renouvelables',
            texte:
              'Kits résidentiels, centrales autonomes pour PME, pompage solaire pour l’agriculture, éclairage public solaire : fourniture, installation et maintenance.',
          },
          {
            titre: 'Unités industrielles',
            texte:
              'Unités locales de transformation et de fabrication, en cours de développement avec nos partenaires industriels et investisseurs.',
          },
          {
            titre: 'Machines et lignes de production',
            texte:
              'Groupes électrogènes hybrides, lignes d’embouteillage, machines-outils, importés de Chine, d’Inde, d’Europe et du Moyen-Orient.',
          },
          {
            titre: 'Efficacité énergétique',
            texte:
              'Audit de vos besoins et stockage sur batterie pour réduire durablement les coûts des usines, fermes, ateliers et commerces.',
          },
        ],
        fond: 'clair',
      },
      {
        id: 'partenariats',
        eyebrow: 'Partenariats',
        titre: 'Fabricants, développeurs, investisseurs',
        intro:
          'Co-investissement et coentreprises, terrains avec titre foncier vérifié, cadre juridique à Abidjan et accès aux marchés de la sous-région.',
        fond: 'sombre',
      },
    ],
    avertissements: [
      'Les unités industrielles sont en cours de développement avec nos partenaires. ' +
        VIA_PARTENAIRES,
    ],
    image: {
      src: 'images/illustrations/agrobusiness.svg',
      alt: 'Illustration : panneaux solaires et champs cultivés',
    },
    formulaire: 'projet-energie',
    titreFormulaire: 'Parlez-nous de votre projet',
    boutonHero: 'Être recontacté',
  },
};
