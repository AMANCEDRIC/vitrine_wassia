/** Vérifie auprès de Cloudflare qu'un jeton Turnstile est valide (usage unique). */
export async function verifierTurnstile(
  jeton: string,
  secret: string,
  ip?: string,
): Promise<boolean> {
  const formulaire = new URLSearchParams({ secret, response: jeton });
  if (ip) {
    formulaire.set('remoteip', ip);
  }
  try {
    const reponse = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      body: formulaire,
      signal: AbortSignal.timeout(8000),
    });
    if (!reponse.ok) {
      return false;
    }
    const donnees = (await reponse.json()) as { success?: boolean };
    return donnees.success === true;
  } catch {
    // Cloudflare injoignable : on refuse plutôt que de laisser passer les robots.
    return false;
  }
}
