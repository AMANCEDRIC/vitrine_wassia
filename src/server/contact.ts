import express, { Router } from 'express';
import { EnvContact, traiterDemande } from './contact-handler';
import { envoyerMail } from './mailer';
import { verifierTurnstile } from './turnstile';

/**
 * POST /api/contact : reçoit les demandes des formulaires du site et les envoie par e-mail.
 *
 * Réglages par variables d'environnement (voir `.env.example`). Sans eux, la route répond 503
 * et le formulaire affiche « envoi indisponible ». Sur Vercel, c'est `api/contact.ts` qui sert la route.
 */
export function contactRouter(): Router {
  const router = express.Router();

  router.post('/api/contact', express.json({ limit: '10kb' }), async (req, res) => {
    const reponse = await traiterDemande(
      req.body,
      {
        env: process.env as EnvContact,
        envoyerMail,
        verifierTurnstile,
        journal: (texte) => console.log(texte),
      },
      req.ip,
    );
    res.status(reponse.statut).json(reponse.corps);
  });

  return router;
}
