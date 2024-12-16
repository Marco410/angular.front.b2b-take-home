import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, take, tap } from 'rxjs';
import { ROUTE_CONFIG } from '../../../core/infra/config/routes.config';
import { Credentials } from '../domain/entities/credentials';
import { LoginRepository } from '../domain/repositories/login.repository';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class LoginUseCase {
  readonly #router = inject(Router);
  readonly #repository = inject(LoginRepository);
  readonly #toastr = inject(ToastrService);

  execute(credentials: Credentials): Observable<boolean> {
    try {
      if (!credentials.username) {
        throw new Error('El correo electrónico es requerido');
      }

      return this.#repository.authenticate(credentials).pipe(
        tap((loginSuccess) => {
          if (loginSuccess) {
            this.#router.navigate([ROUTE_CONFIG.app, ROUTE_CONFIG.home]);
          }
        }),

        take(1)
      );
    } catch (error) {
      this.#toastr.error(
        'Ocurrió un error inesperado, intente de nuevo más tarde.'
      );
      throw error;
    }
  }
}
