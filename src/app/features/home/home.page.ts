import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CardSteps } from './sections/card-steps/card-steps';
import { Hero } from './sections/hero/hero';
import { HomeContact } from './sections/home-contact/home-contact';
import { KeyFigures } from './sections/key-figures/key-figures';
import { News } from './sections/news/news';
import { PolesGrid } from './sections/poles-grid/poles-grid';
import { Simulator } from './sections/simulator/simulator';
import { Why } from './sections/why/why';

@Component({
  selector: 'app-home-page',
  imports: [Hero, KeyFigures, PolesGrid, Why, CardSteps, Simulator, News, HomeContact],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-hero />
    <app-key-figures />
    <app-poles-grid />
    <app-why />
    <app-card-steps />
    <app-simulator />
    <app-news />
    <app-home-contact />
  `,
})
export class HomePage {}
