import { TestBed } from '@angular/core/testing';
import { LoginUseCase } from './login.usecase';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginRepository } from '../domain/repositories/login.repository';
import { of, throwError } from 'rxjs';
import { Credentials } from '../domain/entities/credentials';
import { ROUTE_CONFIG } from '../../../core/infra/config/routes.config';

describe('LoginUseCase', () => {
  let service: LoginUseCase;
  let routerSpy: jasmine.SpyObj<Router>;
  let toastrSpy: jasmine.SpyObj<ToastrService>;
  let loginRepositorySpy: jasmine.SpyObj<LoginRepository>;

  beforeEach(() => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    toastrSpy = jasmine.createSpyObj('ToastrService', ['error']);
    loginRepositorySpy = jasmine.createSpyObj('LoginRepository', [
      'authenticate',
    ]);

    TestBed.configureTestingModule({
      providers: [
        LoginUseCase,
        { provide: Router, useValue: routerSpy },
        { provide: ToastrService, useValue: toastrSpy },
        { provide: LoginRepository, useValue: loginRepositorySpy },
      ],
    });

    service = TestBed.inject(LoginUseCase);
  });

  it('debería arrojar un error si el correo electrónico no está presente', () => {
    const credentials: Credentials = { username: '', password: 'password123' };

    expect(() => service.execute(credentials)).toThrowError(
      'El correo electrónico es requerido'
    );
  });

  it('debería navegar a la página principal si la autenticación es exitosa', (done) => {
    const credentials: Credentials = {
      username: 'marco@aplazo.com',
      password: 'password123',
    };
    loginRepositorySpy.authenticate.and.returnValue(of(true));

    service.execute(credentials).subscribe(() => {
      expect(routerSpy.navigate).toHaveBeenCalledWith([
        ROUTE_CONFIG.app,
        ROUTE_CONFIG.home,
      ]);
      done();
    });
  });

  it('debería mostrar un error y no navegar si la autenticación falla', (done) => {
    const credentials: Credentials = {
      username: 'marco@aplazo.com',
      password: 'password123',
    };
    loginRepositorySpy.authenticate.and.returnValue(of(false));

    service.execute(credentials).subscribe(
      () => {
        expect(routerSpy.navigate).not.toHaveBeenCalled();
        expect(toastrSpy.error).toHaveBeenCalledWith(
          'Ocurrió un error inesperado, intente de nuevo más tarde.'
        );
        done();
      },
      () => {
        done();
      }
    );
  });

  it('debería manejar errores inesperados', (done) => {
    const credentials: Credentials = {
      username: 'marco@aplazo.com',
      password: 'password123',
    };

    loginRepositorySpy.authenticate.and.returnValue(
      throwError(() => new Error('Error de servidor'))
    );

    service.execute(credentials).subscribe({
      next: () => {
        done.fail('Se esperaba un error');
      },
      error: (err) => {
        expect(toastrSpy.error).toHaveBeenCalledWith(
          'Ocurrió un error inesperado, intente de nuevo más tarde.'
        );
        expect(err.message).toBe('Error de servidor');
        done();
      },
    });
  });
});
