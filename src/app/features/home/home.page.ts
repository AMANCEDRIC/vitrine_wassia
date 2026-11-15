import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Hero } from './sections/hero/hero';
import { HomeContact } from './sections/home-contact/home-contact';
import { KeyFigures } from './sections/key-figures/key-figures';
import { News } from './sections/news/news';
import { PolesGrid } from './sections/poles-grid/poles-grid';
import { Presentation } from './sections/presentation/presentation';
import { Why } from './sections/why/why';

/** Accueil : mise en page d'origine, remplie avec les textes du client. */
@Component({
  selector: 'app-home-page',
  imports: [Hero, KeyFigures, Presentation, PolesGrid, Why, News, HomeContact],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-hero />
    <app-key-figures />
    <app-presentation />
    <app-poles-grid />
    <app-why />
    <app-news />
    <app-home-contact />
  `,
})
export class HomePage {}
