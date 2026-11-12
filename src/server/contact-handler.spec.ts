import {
  Dependances,
  EnvContact,
  MessageMail,
  construireMessage,
  traiterDemande,
  uneLigne,
} from './contact-handler';

const ENV_COMPLET: EnvContact = {
  SMTP_HOST: 'mail.example.test',
  SMTP_PORT: '587',
  SMTP_USER: 'envoi@example.test',
  SMTP_PASS: 'secret',
  CONTACT_TO: 'contact@wassia-holding.com',
};

const DEMANDE_VALIDE = {
  sujet: 'general',
  champs: {
    profil: 'Bailleur immobilier',
    nom: 'Awa Koné',
    telephone: '+225 07 98 01 25 91',
    email: 'awa@example.test',
    message: 'Bonjour,\nje souhaite des informations.',
  },
};

function creerDeps(surcharge: Partial<Dependances> = {}) {
  const envoyes: MessageMail[] = [];
  const deps: Dependances = {
    env: ENV_COMPLET,
    envoyerMail: async (message) => {
      envoyes.push(message);
    },
    verifierTurnstile: async () => true,
    journal: () => undefined,
    ...surcharge,
  };
  return { deps, envoyes };
}

describe('traiterDemande', () => {
  it('envoie un e-mail à contact@ pour une demande valide', async () => {
    const { deps, envoyes } = creerDeps();
    const reponse = await traiterDemande(DEMANDE_VALIDE, deps);

    expect(reponse).toEqual({ statut: 200, corps: { ok: true } });
    expect(envoyes).toHaveLength(1);
    expect(envoyes[0].to).toBe('contact@wassia-holding.com');
    expect(envoyes[0].replyTo).toBe('awa@example.test');
    expect(envoyes[0].subject).toBe('[Site WASSIA] Demande générale — Awa Koné');
    expect(envoyes[0].text).toContain('Téléphone : +225 07 98 01 25 91');
    expect(envoyes[0].text).toContain('Message :\nBonjour,\nje souhaite des informations.');
  });

  it('adresse le mail à contact@wassia-holding.com quand CONTACT_TO est absent', async () => {
    const { deps, envoyes } = creerDeps({ env: { ...ENV_COMPLET, CONTACT_TO: undefined } });
    await traiterDemande(DEMANDE_VALIDE, deps);
    expect(envoyes[0].to).toBe('contact@wassia-holding.com');
  });

  it('ignore une demande dont le champ piège est rempli, sans envoyer de mail', async () => {
    const { deps, envoyes } = creerDeps();
    const reponse = await traiterDemande({ ...DEMANDE_VALIDE, website: 'http://spam.test' }, deps);
    expect(reponse.statut).toBe(200);
    expect(envoyes).toHaveLength(0);
  });

  it('refuse les données invalides avec le détail des erreurs', async () => {
    const { deps, envoyes } = creerDeps();
    const reponse = await traiterDemande(
      { sujet: 'general', champs: { nom: 'Awa', telephone: 'abc' } },
      deps,
    );
    expect(reponse.statut).toBe(400);
    expect(reponse.corps['ok']).toBe(false);
    expect(reponse.corps['erreurs']).toHaveProperty('telephone');
    expect(envoyes).toHaveLength(0);
  });

  it('répond 503 quand l’envoi n’est pas configuré', async () => {
    const { deps, envoyes } = creerDeps({ env: {} });
    const reponse = await traiterDemande(DEMANDE_VALIDE, deps);
    expect(reponse.statut).toBe(503);
    expect(envoyes).toHaveLength(0);
  });

  it('exige un jeton Turnstile valide quand la clé secrète est configurée', async () => {
    const env = { ...ENV_COMPLET, TURNSTILE_SECRET: 'cle-secrete' };

    const sansJeton = creerDeps({ env });
    expect((await traiterDemande(DEMANDE_VALIDE, sansJeton.deps)).statut).toBe(403);
    expect(sansJeton.envoyes).toHaveLength(0);

    const refuse = creerDeps({ env, verifierTurnstile: async () => false });
    const reponseRefusee = await traiterDemande(
      { ...DEMANDE_VALIDE, turnstileToken: 'mauvais' },
      refuse.deps,
    );
    expect(reponseRefusee.statut).toBe(403);
    expect(refuse.envoyes).toHaveLength(0);

    const verifier = vi.fn(async () => true);
    const accepte = creerDeps({ env, verifierTurnstile: verifier });
    const reponseAcceptee = await traiterDemande(
      { ...DEMANDE_VALIDE, turnstileToken: 'bon' },
      accepte.deps,
      '41.202.0.1',
    );
    expect(reponseAcceptee.statut).toBe(200);
    expect(verifier).toHaveBeenCalledWith('bon', 'cle-secrete', '41.202.0.1');
    expect(accepte.envoyes).toHaveLength(1);
  });

  it('répond 502 quand le serveur d’e-mail refuse le message, sans journaliser de données personnelles', async () => {
    const journal = vi.fn();
    const { deps } = creerDeps({
      envoyerMail: async () => {
        throw new Error('connexion refusée pour awa@example.test');
      },
      journal,
    });
    const reponse = await traiterDemande(DEMANDE_VALIDE, deps);
    expect(reponse.statut).toBe(502);
    expect(JSON.stringify(journal.mock.calls)).not.toContain('awa@example.test');
  });
});

describe('construireMessage', () => {
  it('retire les retours à la ligne de l’objet (injection d’en-têtes)', () => {
    const message = construireMessage(
      'general',
      { nom: 'Awa\r\nBcc: pirate@example.test', telephone: '0798012591' },
      ENV_COMPLET,
    );
    expect(message.subject).not.toMatch(/[\r\n]/);
    expect(uneLigne('a\nb\r\nc')).toBe('a b c');
  });

  it('n’ajoute pas de Reply-To sans e-mail du visiteur', () => {
    const message = construireMessage(
      'devenir-membre',
      { nom: 'Awa', telephone: '0798012591' },
      ENV_COMPLET,
    );
    expect(message.replyTo).toBeUndefined();
    expect(message.from).toContain('envoi@example.test');
  });
});
