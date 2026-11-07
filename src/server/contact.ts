import express, { Router } from 'express';
import { validerDemande } from '../app/shared/data/contact-validation';

/**
 * POST /api/contact : reçoit les demandes des formulaires du site.
 *
 * L'envoi par e-mail n'est pas encore branché (accès SMTP à fournir par le client).
 * En attendant, la demande est validée puis journalisée SANS données personnelles.
 */
export function contactRouter(): Router {
  const router = express.Router();

  router.post('/api/contact', express.json({ limit: '10kb' }), (req, res) => {
    const corps = req.body as { website?: unknown } | undefined;

    // Champ piège rempli : on répond comme si tout allait bien, sans rien traiter.
    if (typeof corps?.website === 'string' && corps.website.trim() !== '') {
      res.status(200).json({ ok: true });
      return;
    }

    const resultat = validerDemande(corps);
    if (!resultat.ok) {
      res.status(400).json({ ok: false, erreurs: resultat.erreurs });
      return;
    }

    // TODO(client) : transmettre la demande par e-mail au pôle concerné dès que l'accès SMTP est fourni.
    console.log(
      `[contact] demande reçue : sujet=${resultat.sujet}, champs=${Object.keys(resultat.champs).join(',')}`,
    );
    res.status(202).json({ ok: true });
  });

  return router;
}
