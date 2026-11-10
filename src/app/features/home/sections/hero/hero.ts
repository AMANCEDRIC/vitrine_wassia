import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import { DIAPOSITIVES } from '@content/accueil';
import { Icon } from '@shared/ui/icon/icon';

/** Bannière d'accueil : 3 diapositives qui défilent en CSS (pause au survol et au focus). */
@Component({
  selector: 'app-hero',
  imports: [RouterLink, NgOptimizedImage, Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './hero.html',
})
export class Hero {
  protected readonly diapositives = DIAPOSITIVES;
}
