import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Footer } from '@core/layout/footer/footer';
import { Header } from '@core/layout/header/header';
import { PageLoader } from '@core/layout/page-loader/page-loader';
import { ScrollButton } from '@core/layout/scroll-button/scroll-button';
import { UtilityBar } from '@core/layout/utility-bar/utility-bar';
import { RevealService } from '@core/services/reveal.service';
import { SeoService } from '@core/services/seo.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, UtilityBar, Header, Footer, PageLoader, ScrollButton],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './app.html',
})
export class App {
  constructor() {
    inject(SeoService).init();
    inject(RevealService).init();
  }
}
