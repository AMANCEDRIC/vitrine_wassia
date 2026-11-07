import { validerDemande } from './contact-validation';

describe('validerDemande', () => {
  it('accepte une demande complète', () => {
    const r = validerDemande({
      sujet: 'voyage',
      champs: {
        demande: 'Visa ou e-visa',
        destination: 'Canada',
        telephone: '+225 07 07 07 07 07',
      },
    });
    expect(r).toEqual({
      ok: true,
      sujet: 'voyage',
      champs: {
        demande: 'Visa ou e-visa',
        destination: 'Canada',
        telephone: '+225 07 07 07 07 07',
      },
    });
  });

  it('refuse un sujet inconnu', () => {
    expect(validerDemande({ sujet: 'autre', champs: {} }).ok).toBe(false);
  });

  it('signale le téléphone manquant et le choix hors liste', () => {
    const r = validerDemande({ sujet: 'agrobusiness', champs: { profil: 'Pirate', nom: 'Koua' } });
    expect(r.ok).toBe(false);
    if (!r.ok) {
      expect(Object.keys(r.erreurs).sort()).toEqual(['profil', 'telephone']);
    }
  });

  it('refuse un numéro trop court, un e-mail invalide et un champ inattendu', () => {
    const r = validerDemande({
      sujet: 'general',
      champs: {
        profil: 'Partenaire',
        nom: 'Koua',
        telephone: '0707',
        email: 'pas-un-email',
        admin: 'oui',
      },
    });
    expect(r.ok).toBe(false);
    if (!r.ok) {
      expect(Object.keys(r.erreurs).sort()).toEqual(['admin', 'email', 'telephone']);
    }
  });

  it('borne le nombre de véhicules', () => {
    const base = { typeVehicule: 'Moto', telephone: '0707070707' };
    expect(validerDemande({ sujet: 'gestion-vehicule', champs: { ...base, nombre: '3' } }).ok).toBe(
      true,
    );
    expect(validerDemande({ sujet: 'gestion-vehicule', champs: { ...base, nombre: '0' } }).ok).toBe(
      false,
    );
  });
});
