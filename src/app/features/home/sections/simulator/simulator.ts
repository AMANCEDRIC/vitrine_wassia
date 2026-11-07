import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  afterNextRender,
  computed,
  inject,
  signal,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { Curseur, ModeSimulation, SIMULATEUR } from '@content/simulateur';
import { MemberCard } from '@shared/ui/member-card/member-card';
import { borner, formaterDuree, formaterFrancs, simuler } from './simulation';

type Parametre = 'montant' | 'taux' | 'duree';

const INTERVALLE_RETOURNEMENT_MS = 4500;
/** Après un clic sur « Voir le recto/verso », on laisse la carte telle quelle un moment. */
const DELAI_APRES_MANUEL_MS = 9000;

interface Saisie {
  montant: string;
  taux: string;
  duree: string;
}

const saisieParDefaut = (mode: ModeSimulation): Saisie => ({
  montant: String(SIMULATEUR[mode].montant.defaut),
  taux: String(SIMULATEUR[mode].taux.defaut),
  duree: String(SIMULATEUR[mode].duree.defaut),
});

@Component({
  selector: 'app-simulator',
  imports: [RouterLink, MemberCard],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './simulator.html',
})
export class Simulator {
  protected readonly mode = signal<ModeSimulation>('pret');
  protected readonly verso = signal(false);
  /** Survol de la carte : le retournement automatique attend. */
  protected readonly carteSurvolee = signal(false);
  private dernierRetournementManuel = 0;

  constructor() {
    const destroyRef = inject(DestroyRef);
    // La carte se retourne seule toutes les 4,5 s (sauf survol, onglet caché ou animations réduites).
    afterNextRender(() => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return;
      }
      const minuteur = window.setInterval(() => {
        const manuelRecent = Date.now() - this.dernierRetournementManuel < DELAI_APRES_MANUEL_MS;
        if (!this.carteSurvolee() && !document.hidden && !manuelRecent) {
          this.verso.update((v) => !v);
        }
      }, INTERVALLE_RETOURNEMENT_MS);
      destroyRef.onDestroy(() => window.clearInterval(minuteur));
    });
  }

  protected retourner(): void {
    this.dernierRetournementManuel = Date.now();
    this.verso.update((v) => !v);
  }

  /** Saisie de chaque mode, conservée quand on change d'onglet. */
  private readonly saisies = signal<Record<ModeSimulation, Saisie>>({
    pret: saisieParDefaut('pret'),
    epargne: saisieParDefaut('epargne'),
  });

  protected readonly config = computed(() => SIMULATEUR[this.mode()]);
  protected readonly saisie = computed(() => this.saisies()[this.mode()]);

  /** Valeurs bornées utilisées pour le calcul et les curseurs. */
  protected readonly valeurs = computed(() => {
    const config = this.config();
    const saisie = this.saisie();
    const lire = (p: Parametre): number => {
      const curseur: Curseur = config[p];
      const n = parseFloat(saisie[p].replace(',', '.'));
      return Number.isNaN(n) ? curseur.defaut : borner(n, curseur.min, curseur.max);
    };
    return { montant: lire('montant'), taux: lire('taux'), duree: Math.round(lire('duree')) };
  });

  protected readonly resultat = computed(() => {
    const v = this.valeurs();
    return simuler(this.mode(), v.montant, v.taux, v.duree);
  });

  protected readonly libelles = computed(() => {
    const pret = this.mode() === 'pret';
    const v = this.valeurs();
    const r = this.resultat();
    return {
      montant: pret ? 'Montant souhaité' : 'Versement mensuel',
      taux: pret ? 'Taux d’intérêt annuel' : 'Taux d’épargne annuel',
      duree: 'Durée',
      principal: pret ? 'Votre mensualité' : 'Capital à terme',
      suffixe: pret
        ? `par mois pendant ${formaterDuree(v.duree)}`
        : `après ${formaterDuree(v.duree)}`,
      total: pret ? 'Total à rembourser' : 'Total versé',
      interets: pret ? 'Coût du crédit (intérêts)' : 'Intérêts gagnés',
      legendeBase: `${pret ? 'Capital emprunté' : 'Versements'} ${formaterFrancs(pret ? v.montant : r.total)}`,
      legendeInterets: `Intérêts ${formaterFrancs(r.interets)}`,
      action: pret ? 'Faire une demande de crédit' : 'Devenir membre',
    };
  });

  protected readonly francs = formaterFrancs;

  protected readonly onglets: readonly { mode: ModeSimulation; label: string }[] = [
    { mode: 'pret', label: 'Simuler un prêt' },
    { mode: 'epargne', label: 'Simuler une épargne' },
  ];

  protected readonly parametres: readonly { cle: Parametre; unite: string }[] = [
    { cle: 'montant', unite: 'F' },
    { cle: 'taux', unite: '%' },
    { cle: 'duree', unite: 'mois' },
  ];

  /** Texte sous les extrémités du curseur. */
  protected borne(parametre: Parametre, cote: 'min' | 'max'): string {
    const n = this.config()[parametre][cote];
    if (parametre === 'montant') return formaterFrancs(n);
    return parametre === 'taux' ? `${n} %` : `${n} mois`;
  }

  /** Texte au centre, sous le curseur. */
  protected indication(parametre: Parametre): string {
    if (parametre === 'taux') return 'exemple';
    return parametre === 'duree' ? formaterDuree(this.valeurs().duree) : '';
  }

  protected changerMode(mode: ModeSimulation): void {
    this.mode.set(mode);
  }

  protected saisir(parametre: Parametre, valeur: string): void {
    this.saisies.update((s) => ({
      ...s,
      [this.mode()]: { ...s[this.mode()], [parametre]: valeur },
    }));
  }
}
