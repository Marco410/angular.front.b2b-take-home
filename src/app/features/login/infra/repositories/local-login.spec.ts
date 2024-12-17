import { TestBed } from '@angular/core/testing';
import { LocalLogin } from './local-login';
import { BaseService } from '../../../../core/dominio/services/base.service';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { of, throwError } from 'rxjs';
import { Credentials } from '../../domain/entities/credentials';
import { ROUTE_API_CONFIG } from '../../../../core/infra/config/routes.config';

describe('LocalLogin', () => {
  let service: LocalLogin;
  let baseServiceSpy: jasmine.SpyObj<BaseService>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let toastrServiceSpy: jasmine.SpyObj<ToastrService>;

  beforeEach(() => {
    const baseServiceMock = jasmine.createSpyObj('BaseService', ['post']);
    const authServiceMock = jasmine.createSpyObj('AuthService', [
      'storeTokens',
    ]);
    const toastrServiceMock = jasmine.createSpyObj('ToastrService', [
      'warning',
    ]);

    TestBed.configureTestingModule({
      providers: [
        LocalLogin,
        { provide: BaseService, useValue: baseServiceMock },
        { provide: AuthService, useValue: authServiceMock },
        { provide: ToastrService, useValue: toastrServiceMock },
      ],
    });

    service = TestBed.inject(LocalLogin);
    baseServiceSpy = TestBed.inject(BaseService) as jasmine.SpyObj<BaseService>;
    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    toastrServiceSpy = TestBed.inject(
      ToastrService
    ) as jasmine.SpyObj<ToastrService>;
  });

  describe('authenticate', () => {
    it('deberia de guardar el token y retornar un login exitoso', (done) => {
      // this user must be created in back
      const credentials: Credentials = {
        username: 'marco@aplazo.com',
        password: '1234567890',
      };
      const mockResponse = {
        success: true,
        data: [{ access: 'fake-access-token', refresh: 'fake-refresh-token' }],
        status: 200,
      };

      baseServiceSpy.post.and.returnValue(of(mockResponse));

      service.authenticate(credentials).subscribe((result) => {
        expect(baseServiceSpy.post).toHaveBeenCalledWith(
          ROUTE_API_CONFIG.login,
          {
            username: credentials.username,
            password: credentials.password,
          }
        );

        expect(authServiceSpy.storeTokens).toHaveBeenCalledWith(
          mockResponse.data[0]
        );
        console.log('result');
        console.log(result);
        expect(result).toBeDefined();
        done();
      });
    });

    it('deberia de regresar una alarte y el login fallido', (done) => {
      const credentials: Credentials = {
        username: 'testuser',
        password: 'wrongpassword',
      };
      const errorResponse = { error: { message: 'Invalid credentials' } };

      baseServiceSpy.post.and.returnValue(throwError(() => errorResponse));

      service.authenticate(credentials).subscribe((result) => {
        expect(baseServiceSpy.post).toHaveBeenCalledWith(
          ROUTE_API_CONFIG.login,
          {
            username: credentials.username,
            password: credentials.password,
          }
        );

        expect(toastrServiceSpy.warning).toHaveBeenCalledWith(
          errorResponse.error.message
        );
        expect(result).toBeFalse();

        done();
      });
    });
  });
});
