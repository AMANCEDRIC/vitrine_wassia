/**
 * Fonction Vercel : POST /api/contact (envoi des formulaires par e-mail).
 * Même traitement que la route Express (`src/server/contact.ts`), via `traiterDemande`.
 * Réglages : variables d'environnement du projet Vercel (voir `.env.example`).
 */
import { EnvContact, traiterDemande } from '../src/server/contact-handler';
import { envoyerMail } from '../src/server/mailer';
import { verifierTurnstile } from '../src/server/turnstile';

interface Requete {
  method?: string;
  body?: unknown;
  headers: Record<string, string | string[] | undefined>;
}

interface Reponse {
  status(code: number): Reponse;
  json(corps: unknown): void;
  setHeader(nom: string, valeur: string): void;
}

function lireCorps(corps: unknown): unknown {
  if (typeof corps !== 'string') {
    return corps;
  }
  try {
    return JSON.parse(corps) as unknown;
  } catch {
    return undefined;
  }
}

export default async function handler(req: Requete, res: Reponse): Promise<void> {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    res.status(405).json({ ok: false });
    return;
  }

  const transmis = req.headers['x-forwarded-for'];
  const ip = (Array.isArray(transmis) ? transmis[0] : transmis)?.split(',')[0]?.trim();

  const reponse = await traiterDemande(
    lireCorps(req.body),
    {
      env: process.env as EnvContact,
      envoyerMail,
      verifierTurnstile,
      journal: (texte) => console.log(texte),
    },
    ip,
  );
  res.status(reponse.statut).json(reponse.corps);
}
