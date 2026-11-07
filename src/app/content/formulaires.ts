import { ContactSujet, FormConfig, FormField } from '@shared/data/contact.model';

const telephone: FormField = {
  name: 'telephone',
  label: 'Téléphone',
  type: 'tel',
  required: true,
  autocomplete: 'tel',
};

/** Les 6 formulaires de la maquette. Ils servent aussi à la validation côté serveur. */
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
          'Commerçant ou épargnant',
          'Bailleur immobilier',
          'Propriétaire de véhicule',
          'Voyageur ou demandeur de visa',
          'Partenaire',
        ],
      },
      { name: 'nom', label: 'Nom', type: 'text', required: true, autocomplete: 'name', half: true },
      { ...telephone, half: true },
      { name: 'email', label: 'E-mail', type: 'email', autocomplete: 'email', masqueMobile: true },
      { name: 'message', label: 'Message', type: 'textarea' },
    ],
  },
  'devenir-membre': {
    sujet: 'devenir-membre',
    bouton: 'Être contacté par un agent',
    champs: [
      { name: 'nom', label: 'Nom et prénoms', type: 'text', required: true, autocomplete: 'name' },
      telephone,
      { name: 'lieu', label: 'Marché ou commune', type: 'text' },
    ],
  },
  'estimation-bien': {
    sujet: 'estimation-bien',
    bouton: 'Faire estimer mon bien',
    champs: [
      {
        name: 'typeBien',
        label: 'Type de bien',
        type: 'select',
        required: true,
        options: ['Appartement', 'Villa', 'Magasin', 'Terrain'],
      },
      { name: 'commune', label: 'Commune', type: 'text' },
      telephone,
    ],
  },
  'gestion-vehicule': {
    sujet: 'gestion-vehicule',
    bouton: 'Placer mon véhicule sous gestion',
    champs: [
      {
        name: 'typeVehicule',
        label: 'Type de véhicule',
        type: 'select',
        required: true,
        options: ['Voiture (taxi ou VTC)', 'Moto', 'Véhicule personnel'],
      },
      { name: 'nombre', label: 'Nombre de véhicules', type: 'number' },
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
          'Billet d’avion',
          'Visa ou e-visa',
          'Conseil en mobilité',
          'Séjour et conciergerie',
        ],
      },
      { name: 'destination', label: 'Destination', type: 'text' },
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
        options: ['Producteur', 'Acheteur ou importateur', 'Investisseur ou partenaire'],
      },
      { name: 'nom', label: 'Nom', type: 'text', required: true, autocomplete: 'name' },
      telephone,
    ],
  },
};
