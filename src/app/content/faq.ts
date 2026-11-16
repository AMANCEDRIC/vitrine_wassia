/**
 * Questions fréquentes de la page Services financiers.
 * Réponses reprises des textes du site et du dossier officiel 2026 (chiffres à faire valider
 * par le client, voir `content/credit.ts`).
 */
export const FAQ_FINANCE: readonly { question: string; reponse: string }[] = [
  {
    question: 'Comment obtenir ma carte membre ?',
    reponse:
      'Un agent WASSIA vient à votre étal ou à votre boutique. Il enregistre votre commerce avec votre pièce d’identité. Vous versez 1\u00a0000\u00a0F en espèces à l’inscription et recevez votre carte PVC à QR code, activée par un SMS de bienvenue. Les 4\u00a0000\u00a0F restants de l’ouverture de compte sont prélevés sur vos versements des 8 premières semaines.',
  },
  {
    question: 'Faut-il avoir un compte bancaire ?',
    reponse:
      'Non. Pas besoin de compte bancaire ni de savoir écrire : l’agent et la carte font le travail. Il suffit d’un téléphone pour recevoir les confirmations par SMS.',
  },
  {
    question: 'Mon compte WASSIA est-il un compte bancaire ?',
    reponse:
      'Non. Votre compte est un compte d’épargne de préparation au crédit. WASSIA n’est pas une banque commerciale et n’ouvre aucun compte courant.',
  },
  {
    question: 'Quels documents faut-il fournir ?',
    reponse:
      'Une pièce d’identité (CNI, carte CMU ou passeport), une photo prise lors de l’ouverture et une personne de confiance (famille ou voisin de marché). Les mineurs viennent avec un parent ou tuteur ; sans CNI, la carte CMU et l’extrait de naissance original suffisent ; les vendeurs ambulants, livreurs et chauffeurs fournissent l’identité d’un proche disposant d’un emplacement fixe.',
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
      'Oui, après au moins 8 semaines d’épargne régulière (2\u00a0000\u00a0F par semaine minimum). Les prêts vont de 250\u00a0000 à 10 millions de F, sur 6, 12 ou 18 mois, à 1\u00a0% par mois. La réponse est donnée sous 48 heures, sans bulletin de salaire ni garantie immobilière.',
  },
  {
    question: 'Vais-je récupérer mon épargne ?',
    reponse:
      'Oui. Votre épargne sert de garantie pendant le prêt. Une fois le prêt totalement remboursé, 100\u00a0% de votre épargne vous est restituée sur demande. Dès que vous recevez votre prêt, vous cessez d’épargner pour vous consacrer au remboursement.',
  },
  {
    question: 'Que se passe-t-il si je suis en retard sur une échéance ?',
    reponse:
      'Vous avez 5 jours de délai de grâce pour chaque échéance. Au-delà, une pénalité de 400\u00a0F par jour de retard est appliquée. Si l’impayé atteint 30 jours, vous venez en agence convenir d’un rééchelonnement amiable. Le recours à la justice est l’ultime recours que WASSIA s’efforce d’éviter.',
  },
  {
    question: 'Quels sont les frais ?',
    reponse:
      'Le taux est de 1\u00a0% par mois (6\u00a0% sur 6 mois, 12\u00a0% sur 12 mois, 18\u00a0% sur 18 mois). Vous réglez en plus des frais de dossier fixes, en espèces, au moment du décaissement. L’ouverture du compte coûte 5\u00a0000\u00a0F : 1\u00a0000\u00a0F en espèces à l’inscription, puis 4\u00a0000\u00a0F prélevés sur vos versements des 8 premières semaines. Aucune assurance cachée, aucune commission annexe ; seul un retard de plus de 5 jours sur une échéance entraîne une pénalité de 400\u00a0F par jour.',
  },
];
