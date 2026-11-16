/**
 * Textes des pages des 5 pôles et des 2 services.
 *
 * Source : documents officiels 2026 du client (`docs_wassia/doc_pols`, reçus le 2026-11-15), mis en
 * page d'après la maquette Design « Wassia — Site vitrine » (pages `Site-Pole-*`, 2026-11-16).
 * On suit les fiches « Pôle … » (version prudente), pas les « Fiches commerciales ». Règles de
 * Cédric : aucune promesse « garanti », aucun pourcentage de répartition, pas de grille tarifaire.
 * Branche `fusion-v2-conformite` : la page Finance est celle de style-v2 (épargne, crédit),
 * complétée par les sections d'accompagnement de dossiers de l'entrée `finance` ci-dessous ; l'épargne
 * WASSIA est donc citée sur les pages Flottes, Import-Export et Voyage, comme dans la maquette.
 */
import { ContactSujet } from '../shared/data/contact.model';
import { ActiviteId } from './poles';

export interface BlocActivite {
  titre: string;
  texte: string;
  /** Petit libellé au-dessus du titre (ex. Amont, Milieu, Aval). */
  etiquette?: string;
  /** Carte bordée d'or (sur fond sombre) ou fond doré léger (sur fond clair). */
  misEnAvant?: boolean;
}

export interface SectionActivite {
  id: string;
  /** Surtitre ; la page le numérote (« 01 — … »). */
  eyebrow: string;
  titre: string;
  intro?: string;
  /** Blocs (services, étapes, domaines). */
  blocs?: readonly BlocActivite[];
  /** Courte liste d'étiquettes (véhicules, filières, produits…). */
  etiquettes?: readonly string[];
  /** Phrase placée avant les étiquettes (« Aussi en développement : »). */
  etiquettesTitre?: string;
  /** Petite phrase de prudence sous les blocs. */
  note?: string;
  /** Encadré or, sous l'intro (agrément, réserve importante). */
  encadre?: string;
  /** Lien vers une autre page. */
  lien?: { label: string; route: string };
  /** `clair` : fond blanc ; `gris` : fond gris clair ; `sombre` : fond nuit. */
  fond: 'clair' | 'gris' | 'sombre';
}

export interface PageActivite {
  titre: string;
  /** Fin du titre, soulignée d'une barre or. */
  souligne?: string;
  intro: string;
  /** Phrase d'accroche affichée en grand sous le bandeau (page Finance). */
  accroche?: string;
  sections: readonly SectionActivite[];
  image?: { src: string; alt: string };
  /** Liste affichée à droite de la bannière quand il n'y a pas d'image. */
  points?: readonly { titre: string; texte: string }[];
  formulaire: ContactSujet;
  titreFormulaire: string;
  introFormulaire: string;
  boutonHero: string;
  boutonSecondaire?: { label: string; fragment: string };
}

/** Mention reprise sur toutes les pages où un financement est évoqué. */
const VIA_PARTENAIRES =
  'Tout financement passe par nos partenaires financiers agréés, selon le dossier et après étude.';

export const PAGES_ACTIVITES: Record<ActiviteId, PageActivite> = {
  /** Sections reprises dans la page Finance de style-v2 (« Accompagnement de dossiers »). */
  finance: {
    titre: 'Préparer et présenter votre dossier de financement',
    intro:
      'Nous aidons les commerçants, entrepreneurs, chauffeurs et producteurs à monter un dossier solide et à le présenter à nos partenaires financiers agréés.',
    accroche:
      'Un bon dossier ouvre des portes : nous vous aidons à le construire, puis à le présenter aux bons partenaires.',
    sections: [
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
        note: 'Les conditions de financement (montant, durée, taux, frais, garanties) sont communiquées par écrit avant tout engagement, après étude de votre dossier.',
        fond: 'clair',
      },
      {
        id: 'synergie',
        eyebrow: 'Avec les autres pôles',
        titre: 'Un accompagnement relié à votre activité',
        blocs: [
          {
            titre: 'Commerce',
            texte:
              'Les commerçants peuvent être accompagnés pour financer le renouvellement de leur stock, en lien avec notre pôle Import-Export.',
          },
          {
            titre: 'Transport',
            texte:
              'Les chauffeurs réguliers suivis par notre pôle Flottes & GPS peuvent être orientés pour l’achat de pièces ou de leur propre véhicule.',
          },
          {
            titre: 'Agriculture et énergie',
            texte:
              'Campagnes agricoles, petits équipements, installations solaires : nous orientons les producteurs, artisans et ménages.',
          },
        ],
        note: VIA_PARTENAIRES,
        fond: 'sombre',
      },
    ],
    formulaire: 'dossier-financement',
    titreFormulaire: 'Parlez-nous de votre projet',
    introFormulaire: 'Un conseiller vous rappelle pour faire le point sur votre besoin.',
    boutonHero: 'Monter mon dossier',
  },

  immobilier: {
    titre: 'Immobilier, construction et gestion',
    souligne: 'patrimoniale',
    intro:
      'Nous accompagnons propriétaires, bailleurs et investisseurs pour valoriser leur patrimoine tout en réduisant les risques d’impayés et de chantiers bloqués.',
    sections: [
      {
        id: 'gestion-locative',
        eyebrow: 'Gestion locative sécurisée',
        titre: 'Confiez-nous vos biens, percevez vos loyers sereinement',
        intro:
          'Immeubles, villas ou appartements : nous gérons au quotidien selon le contrat de gestion signé avec vous.',
        blocs: [
          {
            titre: 'Reversement mensuel',
            texte:
              'Vos loyers perçus vous sont reversés chaque mois, selon les conditions du contrat de gestion.',
          },
          {
            titre: 'Locataires sélectionnés',
            texte:
              'Étude du dossier, de la solvabilité et des garanties de chaque candidat, puis suivi et relance des loyers.',
          },
          {
            titre: 'Entretien courant',
            texte:
              'Petits travaux entre deux locataires pris en charge, dans la limite du fonds d’entretien prévu au contrat.',
          },
        ],
        fond: 'clair',
      },
      {
        id: 'rehabilitation',
        eyebrow: 'Réhabilitation et finition de chantiers',
        titre: 'Transformer un bien inactif en source de revenus',
        intro:
          'Chantier inachevé ou bâtiment à rénover : WASSIA étudie, organise le financement et réalise les travaux pour le mettre en location.',
        blocs: [
          {
            titre: 'Apport adapté au chantier',
            texte:
              'Après audit technique et devis, apport du propriétaire sur certains chantiers ou financement des travaux pour les dossiers éligibles, sous réserve d’étude technique et de validation.',
          },
          {
            titre: 'Suivi technique',
            texte:
              'Approvisionnement auprès de quincailleries partenaires et exécution contrôlée par notre conducteur de travaux.',
          },
          {
            titre: 'Encadrement notarié',
            texte:
              'Convention tripartite et acte notarié : budget des travaux, durée d’amortissement et droits de chaque partie.',
          },
        ],
        fond: 'gris',
      },
      {
        id: 'transactions',
        eyebrow: 'Transactions foncières',
        titre: 'Acheter ou vendre un terrain en toute sécurité',
        intro:
          'Vérification préalable des titres fonciers (ACD, arrêtés, certificats), accompagnement technique et sécurisation notariale des transactions.',
        etiquettes: ['ACD', 'Arrêtés', 'Certificats', 'Actes notariés'],
        note: 'Gestion locative ou réhabilitation : notre priorité est de protéger la valeur de votre patrimoine. Les conditions sont celles du contrat signé, sans promesse de résultat garanti.',
        fond: 'sombre',
      },
    ],
    image: {
      src: 'images/illustrations/immobilier-mobilite.svg',
      alt: 'Illustration : immeubles gérés par WASSIA',
    },
    formulaire: 'estimation-bien',
    titreFormulaire: 'Confiez-nous la gestion de votre bien',
    introFormulaire:
      'Gestion locative, réhabilitation ou transaction : présentez-nous votre bien, nous vous recontactons.',
    boutonHero: 'Faire estimer mon bien',
    boutonSecondaire: { label: 'Réhabiliter un chantier', fragment: 'rehabilitation' },
  },

  agrobusiness: {
    titre: 'Produire local, transformer',
    souligne: 'local',
    intro:
      'Agrobusiness et transformation industrielle : nous structurons la chaîne de valeur agricole en Côte d’Ivoire, de la production rurale jusqu’à la vente.',
    sections: [
      {
        id: 'transformation',
        eyebrow: 'Transformation locale',
        titre: 'Valoriser les matières premières sur place',
        intro:
          'Unités en cours de développement avec nos partenaires industriels et investisseurs.',
        blocs: [
          {
            titre: 'Jus et nectars',
            texte:
              'Ananas, mangues, agrumes et papayes transformés en jus naturels et concentrés aux standards internationaux.',
          },
          {
            titre: 'Filières stratégiques',
            texte:
              'Anacarde, cacao, manioc (amidon, attiéké industriel) et productions vivrières de grande consommation.',
          },
          {
            titre: 'Technologie et co-investissement',
            texte:
              'Savoir-faire industriel partagé, lignes de production modernes et marchés d’exportation sécurisés.',
          },
        ],
        etiquettesTitre: 'Aussi en développement :',
        etiquettes: ['Élevage', 'Aquaculture', 'Barrages hydro-agricoles'],
        fond: 'clair',
      },
      {
        id: 'chaine',
        eyebrow: 'De la terre au consommateur',
        titre: 'Une chaîne de valeur intégrée',
        blocs: [
          {
            etiquette: 'Amont',
            titre: 'Financement et intrants',
            texte:
              'Structuration des groupements de producteurs, accès aux semences et engrais, financement via nos partenaires agréés, après étude.',
          },
          {
            etiquette: 'Milieu',
            titre: 'Collecte et transport GPS',
            texte:
              'Acheminement sécurisé des récoltes vers les centres de stockage et usines, avec nos véhicules suivis en temps réel.',
          },
          {
            etiquette: 'Aval',
            titre: 'Transformation et vente',
            texte:
              'Produits finis distribués sur le marché national (commerce général) ou à l’international (import-export).',
          },
        ],
        fond: 'gris',
      },
      {
        id: 'groupe',
        eyebrow: 'La force du groupe',
        titre: 'Sécuriser la chaîne, réduire les risques',
        blocs: [
          {
            titre: 'Finance et trésorerie',
            texte:
              'Accompagnement vers le financement des campagnes agricoles et des petits équipements, via nos partenaires financiers agréés, selon le dossier et après étude.',
          },
          {
            titre: 'Sécurité foncière',
            texte:
              'Acquisition et sécurisation de terres agricoles et de sites industriels avec titre foncier définitif ou ACD vérifié.',
          },
          {
            titre: 'Notre engagement',
            texte:
              'Nous ne promettons aucun rendement garanti. Chaque projet fait l’objet d’une étude technique et financière avec nos partenaires, et les conditions sont communiquées par écrit avant tout engagement.',
            misEnAvant: true,
          },
        ],
        note: 'Les autorisations administratives relèvent uniquement des autorités compétentes.',
        fond: 'sombre',
      },
    ],
    image: {
      src: 'images/illustrations/agrobusiness.svg',
      alt: 'Illustration : champs cultivés et panneaux solaires',
    },
    formulaire: 'agrobusiness',
    titreFormulaire: 'Implantez-vous durablement en Côte d’Ivoire',
    introFormulaire:
      'Industriel, équipementier, investisseur ou producteur : un cadre institutionnel rigoureux, des bassins de production riches et une logistique intégrée.',
    boutonHero: 'Proposer un partenariat',
    boutonSecondaire: { label: 'De la terre au consommateur', fragment: 'chaine' },
  },

  commerce: {
    titre: 'Import-export, sourcing direct et',
    souligne: 'commerce général',
    intro:
      'Nous relions commerçants, grossistes, artisans et entreprises de Côte d’Ivoire aux grandes plateformes industrielles mondiales, puis distribuons sur tout le territoire.',
    points: [
      { titre: 'Asie', texte: 'Chine, Inde, Japon, Corée du Sud' },
      { titre: 'Golfe', texte: 'Dubaï, Émirats arabes unis' },
      { titre: 'Afrique', texte: 'Égypte, CEDEAO' },
      { titre: 'Europe et Amérique', texte: 'Machines, engins, normes internationales' },
    ],
    sections: [
      {
        id: 'solutions',
        eyebrow: 'De la commande à la livraison',
        titre: 'Acheter au bon prix, recevoir en toute sécurité',
        blocs: [
          {
            titre: 'Sourcing sur mesure',
            texte:
              'Recherche d’usines fiables selon votre cahier des charges, négociation des tarifs, contrôle qualité avant embarquement.',
          },
          {
            titre: 'Groupage maritime et aérien',
            texte:
              'Conteneurs partagés : importez à moindre coût, sans payer un conteneur complet.',
          },
          {
            titre: 'Dédouanement et livraison',
            texte:
              'Transit au Port autonome et à l’aéroport d’Abidjan avec des transitaires agréés, livraison jusqu’à votre magasin.',
          },
        ],
        note: 'Sous réserve des contrôles et décisions des autorités douanières.',
        fond: 'clair',
      },
      {
        id: 'distribution',
        eyebrow: 'Commerce général en Côte d’Ivoire',
        titre: 'Ce que nous distribuons',
        etiquettes: [
          'Textiles et habillement',
          'Cosmétique et hygiène',
          'Électronique et électroménager',
          'Quincaillerie et pièces détachées',
          'Agroalimentaire et grande consommation',
        ],
        blocs: [
          {
            titre: 'Gros et demi-gros',
            texte:
              'Commerçantes et revendeurs des marchés d’Abidjan (Treichville, Adjamé, Marcory, Yopougon, Cocody) et grossistes de l’intérieur.',
          },
          {
            titre: 'Détail',
            texte: 'Espace commercial de Treichville (Avenue 21 / Rue 22) et commande en ligne.',
          },
          {
            titre: 'Entreprises',
            texte:
              'Approvisionnement régulier des PME, ateliers, restaurants, chantiers et collectivités.',
          },
        ],
        fond: 'gris',
      },
      {
        id: 'avantages',
        eyebrow: 'Avantages commerçants',
        titre: 'La force du groupe pour votre stock',
        blocs: [
          {
            titre: 'Approvisionnement accompagné',
            texte:
              'Avec un compte d’épargne WASSIA, vous pouvez être accompagné vers un financement de votre stock, via nos partenaires financiers agréés, selon votre dossier et après étude.',
            misEnAvant: true,
          },
          {
            titre: 'Livraison suivie par GPS',
            texte:
              'Vos colis et marchandises acheminés jusqu’à votre boutique par nos véhicules suivis en temps réel.',
          },
        ],
        lien: { label: 'Découvrir l’épargne WASSIA', route: '/services-financiers' },
        fond: 'sombre',
      },
    ],
    formulaire: 'sourcing',
    titreFormulaire: 'Dites-nous ce que vous cherchez',
    introFormulaire:
      'Quel que soit votre secteur, nous vous proposons un approvisionnement direct, avec contrôle qualité avant expédition.',
    boutonHero: 'Demander un approvisionnement',
  },

  flottes: {
    titre: 'Gestion de flottes et traçabilité',
    souligne: 'GPS',
    intro:
      'Taxis compteurs, VTC, utilitaires, minicars et motos-taxis : nous transformons vos véhicules en actifs suivis, sécurisés et documentés.',
    sections: [
      {
        id: 'gestion',
        eyebrow: 'Gestion de flotte sécurisée',
        titre: 'Confiez l’exploitation, suivez vos recettes en toute transparence',
        intro:
          'Une gestion rigoureuse des recettes, un suivi quotidien et un contrôle régulier sur le terrain.',
        blocs: [
          {
            titre: 'Reversement des recettes',
            texte:
              'Les recettes perçues vous sont reversées selon les conditions et le calendrier du contrat de gestion signé.',
          },
          {
            titre: 'Chauffeurs encadrés',
            texte:
              'Identité vérifiée, permis valide, enquête de moralité, référent familial et contrat d’engagement.',
          },
          {
            titre: 'Maintenance préventive',
            texte:
              'Vidanges, pneumatiques, visites techniques : un suivi régulier pour éviter les immobilisations imprévues.',
          },
        ],
        fond: 'clair',
      },
      {
        id: 'gps',
        eyebrow: 'Supervision GPS 24 h/24',
        titre: 'Chaque véhicule relié à notre centre de contrôle',
        blocs: [
          {
            titre: 'Localisation en temps réel',
            texte: 'Position, itinéraires, temps d’arrêt et zones d’activité.',
          },
          {
            titre: 'Coupure moteur à distance',
            texte:
              'Uniquement à l’arrêt et avec l’accord du propriétaire, selon le contrat : vol, usage non autorisé.',
          },
          {
            titre: 'Alertes et périmètre',
            texte:
              'Sortie de zone autorisée, excès de vitesse ou batterie débranchée : notification immédiate.',
          },
          {
            titre: 'Rapports d’activité',
            texte:
              'Historique des parcours et kilométrage pour anticiper les révisions et vérifier les recettes déclarées.',
          },
        ],
        fond: 'sombre',
      },
      {
        id: 'formules',
        eyebrow: 'Chauffeurs et propriétaires',
        titre: 'Deux formules selon votre situation',
        blocs: [
          {
            titre: 'Chauffeurs réguliers',
            texte:
              'Avec un compte d’épargne WASSIA, les chauffeurs disciplinés peuvent être accompagnés vers un financement, via nos partenaires financiers agréés, pour des pièces, une réparation ou l’achat progressif de leur véhicule, selon le dossier et après étude.',
            misEnAvant: true,
          },
          {
            titre: 'Propriétaires indépendants',
            texte:
              'Vous gérez vous-même vos véhicules ? Souscrivez uniquement l’installation et l’abonnement GPS, avec un accès mobile dédié.',
          },
        ],
        note: 'Les conditions de reversement et de gestion sont celles du contrat signé, avec des rapports de gestion réguliers. Aucune promesse de résultat garanti.',
        fond: 'gris',
      },
    ],
    image: {
      src: 'images/illustrations/transport.svg',
      alt: 'Illustration : véhicule de transport suivi par GPS',
    },
    formulaire: 'gestion-vehicule',
    titreFormulaire: 'Protégez votre capital roulant',
    introFormulaire:
      'Particulier investisseur ou professionnel du transport : des revenus suivis, traçables et documentés par des rapports de gestion réguliers.',
    boutonHero: 'Confier mon véhicule',
    boutonSecondaire: { label: 'Voir le suivi GPS', fragment: 'gps' },
  },

  voyage: {
    titre: 'Voyage, tourisme, Hadj, Oumrah et',
    souligne: 'mobilité',
    intro:
      'Un accompagnement complet et sécurisé pour les commerçants, entrepreneurs, étudiants, pèlerins et particuliers, grâce à nos partenaires en Afrique, Asie, Moyen-Orient, Europe et Amérique.',
    sections: [
      {
        id: 'prestations',
        eyebrow: 'Nos prestations',
        titre: 'Chaque étape de vos déplacements',
        blocs: [
          {
            titre: 'Billets et hébergement',
            texte: 'Toutes destinations à tarifs négociés, hôtels et résidences meublées vérifiés.',
          },
          {
            titre: 'Visas et formalités',
            texte:
              'Montage du dossier, lettres d’invitation, assurance voyage et rendez-vous consulaires.',
          },
          {
            titre: 'Voyages d’affaires',
            texte:
              'Missions d’achat et foires (Canton, Dubaï, New Delhi, Istanbul) avec accueil, interprètes et transport des marchandises.',
          },
          {
            titre: 'Tourisme en Côte d’Ivoire',
            texte:
              'Accueil de la diaspora et circuits à Grand-Bassam, Assinie, Yamoussoukro et Man.',
          },
          {
            titre: 'Location de véhicules',
            texte:
              'Tourisme, utilitaires et navettes aéroport, avec ou sans chauffeur, suivis par GPS.',
          },
        ],
        note: 'Les visas sont délivrés uniquement par l’ambassade ou le consulat compétent. WASSIA ne délivre pas les visas.',
        fond: 'clair',
      },
      {
        id: 'hadj',
        eyebrow: 'Hadj, Oumrah et études en Arabie saoudite',
        titre: 'De Treichville jusqu’à Djeddah',
        intro:
          'Pèlerins, étudiants et familles accompagnés avec nos partenaires et nos guides installés à Djeddah.',
        encadre:
          'En partenariat avec une agence agréée par le Commissariat du Hadj en Côte d’Ivoire, sous réserve de l’agrément officiel et des quotas attribués par les autorités saoudiennes.',
        blocs: [
          {
            titre: 'Hadj et Oumrah',
            texte:
              'Séjours clés en main toute l’année, hébergement proche des Lieux saints et transferts climatisés.',
          },
          {
            titre: 'Études et instituts',
            texte:
              'Orientation et inscription dans des écoles et universités partenaires, aide au logement et à l’installation.',
          },
          {
            titre: 'Visas et démarches',
            texte:
              'Visa Oumrah, Hadj ou étudiant : montage et suivi du dossier, sous réserve du quota et du visa accordés.',
          },
          {
            titre: 'Accueil à Djeddah',
            texte:
              'Guides francophones et arabophones à l’aéroport, accompagnement rituel et suivi quotidien.',
          },
        ],
        note: 'Tous les frais (service, billet, visa, hébergement, encadrement) sont détaillés par écrit avant toute inscription.',
        fond: 'sombre',
      },
      {
        id: 'epargne-voyage',
        eyebrow: 'Préparer son projet sereinement',
        titre: 'Épargne-Voyage, Hadj, Oumrah ou Études',
        intro:
          'Un compte d’épargne dédié pour cotiser à votre rythme, par jour, par semaine ou par mois, jusqu’à réunir le budget du voyage ou de la scolarité.',
        blocs: [
          {
            titre: 'Facilitation complémentaire',
            texte:
              'Les épargnants réguliers peuvent être accompagnés vers un financement, via nos partenaires financiers agréés, pour le billet, le visa ou l’installation, selon le dossier et après étude.',
            misEnAvant: true,
          },
        ],
        lien: { label: 'Découvrir l’épargne WASSIA', route: '/services-financiers' },
        fond: 'gris',
      },
    ],
    image: {
      src: 'images/illustrations/voyage.svg',
      alt: 'Illustration : avion, valises et passeport',
    },
    formulaire: 'voyage',
    titreFormulaire: 'Parlez-nous de votre voyage',
    introFormulaire: 'Ou écrivez-nous sur WhatsApp : +225 07 98 01 25 91.',
    boutonHero: 'Demander un devis',
    boutonSecondaire: { label: 'Hadj, Oumrah et études', fragment: 'hadj' },
  },

  energie: {
    titre: 'Énergie verte et développement',
    souligne: 'industriel',
    intro:
      'Transition solaire et industrialisation durable en Côte d’Ivoire, au service des entreprises, des exploitations agricoles et des ménages.',
    sections: [
      {
        id: 'piliers',
        eyebrow: 'Nos piliers',
        titre: 'Énergie propre et industrialisation',
        blocs: [
          {
            titre: 'Solaire et renouvelables',
            texte:
              'Kits résidentiels, centrales autonomes pour PME, pompage solaire et éclairage public : fourniture, installation et maintenance.',
          },
          {
            titre: 'Unités industrielles',
            texte:
              'Co-investissement dans des unités locales de production et de transformation, en cours de développement avec nos partenaires.',
          },
          {
            titre: 'Machines et lignes de production',
            texte:
              'Sourcing, importation et mise en service : groupes électrogènes hybrides, lignes d’embouteillage, machines-outils.',
          },
          {
            titre: 'Efficacité énergétique',
            texte:
              'Audit des besoins et stockage sur batterie pour réduire durablement les coûts des usines, fermes et commerces.',
          },
        ],
        fond: 'clair',
      },
      {
        id: 'partenariats',
        eyebrow: 'Partenariats et synergies',
        titre: 'Avec les fabricants, les investisseurs et le groupe',
        blocs: [
          {
            titre: 'Joint-ventures industrielles',
            texte:
              'Terrains avec titre foncier définitif ou ACD vérifié, accompagnement juridique et accès aux marchés locaux et sous-régionaux.',
          },
          {
            titre: 'Distribution d’équipements',
            texte:
              'Technologies solaires et industrielles adaptées au climat et à l’économie ouest-africaine.',
          },
          {
            titre: 'Appui aux fermes',
            texte:
              'Énergie solaire pour l’irrigation, l’aquaculture, l’élevage et la transformation agroalimentaire du groupe.',
          },
          {
            titre: 'Facilitation financière',
            texte:
              'PME, artisans et ménages accompagnés pour s’équiper, via nos partenaires financiers agréés, selon le dossier et après étude.',
            misEnAvant: true,
          },
        ],
        note: 'Les unités industrielles sont en cours de développement avec nos partenaires.',
        fond: 'sombre',
      },
    ],
    image: {
      src: 'images/illustrations/agrobusiness.svg',
      alt: 'Illustration : panneaux solaires et champs cultivés',
    },
    formulaire: 'projet-energie',
    titreFormulaire: 'De l’étude technique à la mise en service',
    introFormulaire:
      'Particulier, entreprise, exploitation agricole ou investisseur : parlons de votre projet.',
    boutonHero: 'Étudier mon projet',
  },
};
