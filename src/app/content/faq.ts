/**
 * Questions fréquentes de la page Services financiers.
 * Réponses reprises des textes du site et du dossier officiel 2026 (chiffres à faire valider
 * par le client, voir `content/credit.ts`).
 */
export const FAQ_FINANCE: readonly { question: string; reponse: string }[] = [
  {
    question: 'Comment obtenir ma carte membre ?',
    reponse:
      'Un agent WASSIA vient à votre étal ou à votre boutique. Il enregistre votre commerce avec votre pièce d’identité. Vous versez 1 000 F en espèces à l’inscription et recevez votre carte PVC à QR code, activée par un SMS de bienvenue. Les 4 000 F restants de l’ouverture de compte sont prélevés sur vos versements des 8 premières semaines.',
  },
  {
    question: 'Faut-il avoir un compte bancaire ?',
    reponse:
      'Non. Pas besoin de compte bancaire ni de savoir écrire : l’agent et la carte font le travail. Il suffit d’un téléphone pour recevoir les confirmations par SMS.',
  },
  {
    question: 'Comment verser mon épargne ?',
    reponse:
      'À votre rythme, en espèces auprès de votre agent ou par Wave. Votre agent scanne votre carte et enregistre le versement.',
  },
  {
    question: 'Comment savoir que mon versement est bien enregistré ?',
    reponse:
      'Après chaque versement, vous recevez un reçu et un SMS qui indiquent le montant versé et votre nouveau solde.',
  },
  {
    question: 'Que faire si je perds ma carte ?',
    reponse:
      'Prévenez votre agent tout de suite : la carte est bloquée puis remplacée, et votre compte est conservé.',
  },
  {
    question: 'Puis-je obtenir un crédit ?',
    reponse:
      'Oui, après au moins 8 semaines d’épargne régulière (2 000 F par semaine minimum). Les prêts vont de 250 000 à 10 millions de F, sur 6, 12 ou 18 mois, à 1 % par mois. La réponse est donnée sous 48 heures, sans bulletin de salaire ni garantie immobilière.',
  },
  {
    question: 'Quels sont les frais ?',
    reponse:
      'Le taux est de 1 % par mois (6 % sur 6 mois, 12 % sur 12 mois, 18 % sur 18 mois). Vous réglez en plus des frais de dossier fixes, en espèces, au moment du décaissement. Aucune assurance cachée, aucune commission annexe.',
  },
];
