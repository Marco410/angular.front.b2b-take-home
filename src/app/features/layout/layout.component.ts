import { Component, inject, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterLink,
  RouterOutlet,
} from '@angular/router';
import { AplazoButtonComponent } from '@apz/shared-ui/button';
import { AplazoDashboardComponents } from '@apz/shared-ui/dashboard';
import { AplazoSidenavLinkComponent } from '../../../../projects/shared-ui/sidenav/src';
import { ROUTE_CONFIG } from '../../core/infra/config/routes.config';
import { filter, map } from 'rxjs/operators';
import { AuthService } from '../login/infra/services/auth.service';
@Component({
  standalone: true,
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  imports: [
    AplazoDashboardComponents,
    AplazoButtonComponent,
    AplazoSidenavLinkComponent,
    RouterOutlet,
    RouterLink,
  ],
})
export class LayoutComponent implements OnInit {
  readonly #router = inject(Router);

  readonly appRoutes = ROUTE_CONFIG;
  readonly #authService = inject(AuthService);

  pageTitle: string = '';

  constructor(private activatedRoute: ActivatedRoute) {}
  ngOnInit(): void {
    this.updatePageTitle();

    this.#router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => this.getRouteData(this.activatedRoute))
      )
      .subscribe((data) => {
        this.pageTitle = data?.title || 'Inicio';
      });
  }

  private updatePageTitle(): void {
    const data = this.getRouteData(this.activatedRoute);
    this.pageTitle = data?.title || 'Inicio';
  }

  private getRouteData(route: ActivatedRoute): any {
    let data = route.snapshot.data;
    while (route.firstChild) {
      route = route.firstChild;
      data = { ...data, ...route.snapshot.data };
    }
    return data;
  }

  clickLogo(): void {
    this.#router.navigate([ROUTE_CONFIG.app, ROUTE_CONFIG.home]);
  }

  logOut(): void {
    this.#authService.removeTokens();
    this.#router.navigate([ROUTE_CONFIG.login]);
  }
}
