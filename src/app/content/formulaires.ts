import { ContactSujet, FormConfig, FormField } from '../shared/data/contact.model';

const telephone: FormField = {
  name: 'telephone',
  label: 'Téléphone',
  type: 'tel',
  required: true,
  autocomplete: 'tel',
};

const nom: FormField = {
  name: 'nom',
  label: 'Nom et prénoms',
  type: 'text',
  required: true,
  autocomplete: 'name',
};

const message: FormField = { name: 'message', label: 'Message', type: 'textarea' };

/** Un formulaire par activité, plus le formulaire général. Ils servent aussi à la validation côté serveur. */
export const FORMULAIRES: Record<ContactSujet, FormConfig> = {
  general: {
    sujet: 'general',
    bouton: 'Envoyer ma demande',
    champs: [
      {
        name: 'profil',
        label: 'Je suis…',
        type: 'select',
        required: true,
        options: [
          'Commerçant ou entrepreneur',
          'Propriétaire d’un bien immobilier',
          'Propriétaire de véhicule',
          'Importateur ou revendeur',
          'Voyageur, pèlerin ou étudiant',
          'Investisseur ou partenaire',
        ],
      },
      { ...nom, label: 'Nom', half: true },
      { ...telephone, half: true },
      { name: 'email', label: 'E-mail', type: 'email', autocomplete: 'email', masqueMobile: true },
      message,
    ],
  },
  'dossier-financement': {
    sujet: 'dossier-financement',
    bouton: 'Être rappelé',
    champs: [
      nom,
      telephone,
      {
        name: 'profil',
        label: 'Je suis',
        type: 'select',
        required: true,
        options: [
          'Commerçant',
          'Entrepreneur ou artisan',
          'Chauffeur ou transporteur',
          'Producteur agricole',
          'Autre',
        ],
      },
      { name: 'projet', label: 'Mon projet en quelques mots', type: 'textarea' },
    ],
  },
  'estimation-bien': {
    sujet: 'estimation-bien',
    bouton: 'Présenter mon bien',
    champs: [
      {
        name: 'demande',
        label: 'Ma demande',
        type: 'select',
        required: true,
        options: [
          'Gestion locative',
          'Réhabilitation ou finition de chantier',
          'Achat ou vente de terrain ou de bien',
        ],
      },
      {
        name: 'typeBien',
        label: 'Type de bien',
        type: 'select',
        options: ['Appartement', 'Villa', 'Immeuble', 'Magasin', 'Terrain', 'Chantier inachevé'],
      },
      { name: 'commune', label: 'Commune', type: 'text' },
      telephone,
    ],
  },
  'gestion-vehicule': {
    sujet: 'gestion-vehicule',
    bouton: 'Être recontacté',
    champs: [
      {
        name: 'demande',
        label: 'Ma demande',
        type: 'select',
        required: true,
        options: ['Gestion de mes véhicules', 'Installation d’un GPS seulement'],
      },
      {
        name: 'typeVehicule',
        label: 'Type de véhicule',
        type: 'select',
        options: ['Taxi compteur', 'VTC', 'Véhicule utilitaire', 'Minicar', 'Moto-taxi'],
      },
      { name: 'nombre', label: 'Nombre de véhicules', type: 'number' },
      telephone,
    ],
  },
  sourcing: {
    sujet: 'sourcing',
    bouton: 'Envoyer ma demande',
    champs: [
      {
        name: 'demande',
        label: 'Ma demande',
        type: 'select',
        required: true,
        options: [
          'Importer des marchandises',
          'Acheter en gros ou demi-gros',
          'Approvisionner mon entreprise',
        ],
      },
      { name: 'produits', label: 'Produits recherchés', type: 'text' },
      nom,
      telephone,
    ],
  },
  agrobusiness: {
    sujet: 'agrobusiness',
    bouton: 'Être recontacté',
    champs: [
      {
        name: 'profil',
        label: 'Je suis',
        type: 'select',
        required: true,
        options: [
          'Producteur ou groupement',
          'Industriel ou équipementier',
          'Investisseur ou partenaire',
          'Acheteur',
        ],
      },
      { ...nom, label: 'Nom ou structure' },
      telephone,
    ],
  },
  voyage: {
    sujet: 'voyage',
    bouton: 'Envoyer ma demande',
    champs: [
      {
        name: 'demande',
        label: 'Ma demande',
        type: 'select',
        required: true,
        options: [
          'Billet d’avion ou hôtel',
          'Assistance visa',
          'Hadj ou Oumrah',
          'Études en Arabie saoudite',
          'Voyage d’affaires',
          'Tourisme ou location de véhicule',
        ],
      },
      { name: 'destination', label: 'Destination', type: 'text' },
      telephone,
    ],
  },
  'projet-energie': {
    sujet: 'projet-energie',
    bouton: 'Être recontacté',
    champs: [
      {
        name: 'demande',
        label: 'Mon besoin',
        type: 'select',
        required: true,
        options: [
          'Installation solaire',
          'Machines ou ligne de production',
          'Audit énergétique',
          'Partenariat industriel',
        ],
      },
      { ...nom, label: 'Nom ou structure' },
      telephone,
    ],
  },
};
