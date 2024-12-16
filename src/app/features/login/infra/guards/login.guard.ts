import { inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { ROUTE_CONFIG } from '../../../../core/infra/config/routes.config';

@Injectable({
  providedIn: 'root',
})
export class LoginGuard {
  readonly #authService = inject(AuthService);
  readonly #router = inject(Router);
  /**
   * Checks if the user is already logged in before accessing the login
   * page.
   */
  canActivate(): Observable<boolean> {
    if (!this.#authService.isLoggedIn()) {
      this.#router.navigate([ROUTE_CONFIG.login]);
    }

    return of(this.#authService.isLoggedIn());
  }
}
