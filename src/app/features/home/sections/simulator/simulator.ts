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
import {
  DUREES_CREDIT,
  DureeCredit,
  GRILLE_CREDIT,
  TAUX_MENSUEL,
  fraisDuMontant,
} from '@content/credit';
import {
  Curseur,
  ModeSimulation,
  PRET_PAR_DEFAUT,
  SIMULATEUR_EPARGNE,
} from '@content/simulateur';
import { MemberCard } from '@shared/ui/member-card/member-card';
import { borner, formaterDuree, formaterFrancs, simulerEpargne, simulerPret } from './simulation';

type Parametre = 'montant' | 'taux' | 'duree';

const INTERVALLE_RETOURNEMENT_MS = 4500;
/** Après un clic sur « Voir le recto/verso », on laisse la carte telle quelle un moment. */
const DELAI_APRES_MANUEL_MS = 9000;

interface Saisie {
  montant: string;
  taux: string;
  duree: string;
}

const saisieParDefaut = (): Saisie => ({
  montant: String(SIMULATEUR_EPARGNE.montant.defaut),
  taux: String(SIMULATEUR_EPARGNE.taux.defaut),
  duree: String(SIMULATEUR_EPARGNE.duree.defaut),
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

  /** Saisie du simulateur d'épargne, conservée quand on change d'onglet. */
  private readonly saisieEpargne = signal<Saisie>(saisieParDefaut());

  /** Choix du prêt : un montant et une durée de la grille. */
  protected readonly montantPret = signal<number>(PRET_PAR_DEFAUT.montant);
  protected readonly dureePret = signal<DureeCredit>(PRET_PAR_DEFAUT.duree);
  protected readonly montantsPret = GRILLE_CREDIT.map((l) => l.montant);
  protected readonly dureesPret = DUREES_CREDIT;
  protected readonly tauxPret = TAUX_MENSUEL;
  protected readonly fraisPret = computed(() => fraisDuMontant(this.montantPret()));

  protected readonly config = SIMULATEUR_EPARGNE;
  protected readonly saisie = this.saisieEpargne.asReadonly();

  /** Valeurs bornées de l'épargne, utilisées pour le calcul et les curseurs. */
  protected readonly valeurs = computed(() => {
    const saisie = this.saisie();
    const lire = (p: Parametre): number => {
      const curseur: Curseur = this.config[p];
      const n = parseFloat(saisie[p].replace(',', '.'));
      return Number.isNaN(n) ? curseur.defaut : borner(n, curseur.min, curseur.max);
    };
    return { montant: lire('montant'), taux: lire('taux'), duree: Math.round(lire('duree')) };
  });

  protected readonly pret = computed(() => simulerPret(this.montantPret(), this.dureePret()));

  protected readonly epargne = computed(() => {
    const v = this.valeurs();
    return simulerEpargne(v.montant, v.taux, v.duree);
  });

  /** Résultat affiché, selon l'onglet. */
  protected readonly resultat = computed(() =>
    this.mode() === 'pret' ? this.pret() : this.epargne(),
  );

  protected readonly libelles = computed(() => {
    const pret = this.mode() === 'pret';
    const v = this.valeurs();
    const r = this.resultat();
    return {
      montant: 'Versement mensuel',
      taux: 'Taux d’épargne annuel',
      duree: 'Durée',
      principal: pret ? 'Votre mensualité' : 'Capital à terme',
      suffixe: pret
        ? `par mois pendant ${formaterDuree(this.dureePret())}`
        : `après ${formaterDuree(v.duree)}`,
      total: pret ? 'Total à rembourser' : 'Total versé',
      interets: pret ? 'Intérêts (1 % par mois)' : 'Intérêts gagnés',
      legendeBase: `${pret ? 'Capital emprunté' : 'Versements'} ${formaterFrancs(pret ? this.montantPret() : r.total)}`,
      legendeInterets: `Intérêts ${formaterFrancs(r.interets)}`,
      action: pret ? 'Faire une demande de crédit' : 'Devenir membre',
    };
  });

  protected readonly francs = formaterFrancs;
  protected readonly duree = formaterDuree;

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
    const n = this.config[parametre][cote];
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

  protected readonly indexMontant = computed(() => this.montantsPret.indexOf(this.montantPret()));
  protected readonly indexDuree = computed(() => this.dureesPret.indexOf(this.dureePret()));

  /** Les curseurs du prêt avancent d'un cran de la grille à la fois. */
  protected choisirMontant(index: number): void {
    this.montantPret.set(this.montantsPret[borner(index, 0, this.montantsPret.length - 1)]);
  }

  protected choisirDuree(index: number): void {
    this.dureePret.set(this.dureesPret[borner(index, 0, this.dureesPret.length - 1)]);
  }

  protected saisir(parametre: Parametre, valeur: string): void {
    this.saisieEpargne.update((s) => ({ ...s, [parametre]: valeur }));
  }
}
