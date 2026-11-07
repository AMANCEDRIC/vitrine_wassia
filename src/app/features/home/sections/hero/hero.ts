import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import { DIAPOSITIVES, Diapositive, LienAction } from '@content/accueil';

/** Bannière d'accueil : 3 diapositives qui défilent en CSS (pause au survol et au focus). */
@Component({
  selector: 'app-hero',
  imports: [RouterLink, NgOptimizedImage],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './hero.html',
})
export class Hero {
  protected readonly diapositives = DIAPOSITIVES;

  protected boutons(d: Diapositive): LienAction[] {
    return d.actions.filter((a) => a.style === 'or');
  }

  protected liens(d: Diapositive): LienAction[] {
    return d.actions.filter((a) => a.style === 'lien');
  }
}
