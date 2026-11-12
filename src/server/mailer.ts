import nodemailer from 'nodemailer';
import type { EnvContact, MessageMail } from './contact-handler';

/**
 * Envoi par SMTP (Infomaniak : mail.infomaniak.com, identifiants de la boîte d'envoi).
 * Port 587 = STARTTLS, port 465 = SSL/TLS. Isolé ici pour pouvoir être remplacé par un service
 * d'e-mail HTTP si le site est hébergé sur une plateforme qui n'autorise pas le SMTP.
 */
export async function envoyerMail(message: MessageMail, env: EnvContact): Promise<void> {
  const port = Number(env.SMTP_PORT) || 587;
  const transport = nodemailer.createTransport({
    host: env.SMTP_HOST,
    port,
    secure: port === 465,
    requireTLS: port !== 465,
    auth: { user: env.SMTP_USER, pass: env.SMTP_PASS },
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 15_000,
  });
  await transport.sendMail(message);
}
