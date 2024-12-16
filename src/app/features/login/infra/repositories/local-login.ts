import { inject, Injectable } from '@angular/core';
import { catchError, mapTo, Observable, of, tap } from 'rxjs';
import { Credentials } from '../../domain/entities/credentials';
import { LoginRepository } from '../../domain/repositories/login.repository';
import { BaseService } from '../../../../core/dominio/services/base.service';
import { ROUTE_API_CONFIG } from '../../../../core/infra/config/routes.config';
import {
  APLZ_AUTH_REFRESH_TOKEN,
  APLZ_AUTH_TOKEN,
  TokenResponse,
} from '../../domain/entities/tokens';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class LocalLogin implements LoginRepository {
  readonly #base = inject(BaseService);
  readonly #toastr = inject(ToastrService);
  readonly #authService = inject(AuthService);

  authenticate(credentials: Credentials): Observable<boolean> {
    return this.#base
      .post(ROUTE_API_CONFIG.login, {
        username: credentials.username,
        password: credentials.password,
      })
      .pipe(
        tap((tokens) => {
          this.#authService.storeTokens(tokens.data[0]);
          return of(true);
        }),
        catchError((e) => {
          this.#toastr.warning(e.error.message);
          return of(false);
        })
      );
  }
}
