import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CardSteps } from './sections/card-steps/card-steps';
import { Hero } from './sections/hero/hero';
import { HomeContact } from './sections/home-contact/home-contact';
import { News } from './sections/news/news';
import { PolesGrid } from './sections/poles-grid/poles-grid';
import { Simulator } from './sections/simulator/simulator';

@Component({
  selector: 'app-home-page',
  imports: [Hero, PolesGrid, CardSteps, Simulator, News, HomeContact],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-hero />
    <app-poles-grid />
    <app-card-steps />
    <app-simulator />
    <app-news />
    <app-home-contact />
  `,
})
export class HomePage {}
