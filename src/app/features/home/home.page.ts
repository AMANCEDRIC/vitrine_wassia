import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CardSteps } from './sections/card-steps/card-steps';
import { Hero } from './sections/hero/hero';
import { HomeContact } from './sections/home-contact/home-contact';
import { KeyFigures } from './sections/key-figures/key-figures';
import { News } from './sections/news/news';
import { PolesGrid } from './sections/poles-grid/poles-grid';
import { Presentation } from './sections/presentation/presentation';
import { Simulator } from './sections/simulator/simulator';
import { Why } from './sections/why/why';

/**
 * Accueil (branche `fusion-v2-conformite`) : textes du client dans la mise en page d'origine,
 * plus les sections d'inclusion financière de style-v2 (étapes de la carte, simulateur).
 */
@Component({
  selector: 'app-home-page',
  imports: [
    Hero,
    KeyFigures,
    Presentation,
    PolesGrid,
    Why,
    CardSteps,
    Simulator,
    News,
    HomeContact,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-hero />
    <app-key-figures />
    <app-presentation />
    <app-poles-grid />
    <app-why />
    <app-card-steps />
    <app-simulator />
    <app-news />
    <app-home-contact />
  `,
})
export class HomePage {}
