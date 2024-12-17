import { AuthService } from './auth.service';
import { TestBed } from '@angular/core/testing';
import {
  APLZ_AUTH_REFRESH_TOKEN,
  APLZ_AUTH_TOKEN,
  TokenResponse,
} from '../../domain/entities/tokens';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthService],
    });
    service = TestBed.inject(AuthService);
  });

  afterEach(() => {
    localStorage.clear();
    spyOn(localStorage, 'clear').and.callThrough();
  });

  describe('storeTokens', () => {
    it('deberia de acceder a los tokens en el localStorage', () => {
      const tokens: TokenResponse = {
        access: 'fake-access-token',
        refresh: 'fake-refresh-token',
      };

      spyOn(localStorage, 'setItem');

      service.storeTokens(tokens);

      expect(localStorage.setItem).toHaveBeenCalledWith(
        APLZ_AUTH_TOKEN,
        tokens.access
      );
      expect(localStorage.setItem).toHaveBeenCalledWith(
        APLZ_AUTH_REFRESH_TOKEN,
        tokens.refresh ?? ''
      );
    });

    it('deberia de guardar los tokens', () => {
      const tokens: TokenResponse = {
        access: 'fake-access-token',
        refresh: undefined,
      };

      spyOn(localStorage, 'setItem');

      service.storeTokens(tokens);

      expect(localStorage.setItem).toHaveBeenCalledWith(
        APLZ_AUTH_TOKEN,
        tokens.access
      );
      expect(localStorage.setItem).toHaveBeenCalledWith(
        APLZ_AUTH_REFRESH_TOKEN,
        ''
      );
    });
  });

  describe('isLoggedIn', () => {
    it('deberia de retornar true si el token existe', () => {
      spyOn(localStorage, 'getItem').and.returnValue('fake-access-token');

      const result = service.isLoggedIn();

      expect(localStorage.getItem).toHaveBeenCalledWith(APLZ_AUTH_TOKEN);
      expect(result).toBeTrue();
    });

    it('deberia de retornar false si el token no existe', () => {
      spyOn(localStorage, 'getItem').and.returnValue(null);

      const result = service.isLoggedIn();

      expect(localStorage.getItem).toHaveBeenCalledWith(APLZ_AUTH_TOKEN);
      expect(result).toBeFalse();
    });
  });

  describe('getAccessToken', () => {
    it('deberia de regresar el token desde localStorage', () => {
      const accessToken = 'fake-access-token';
      spyOn(localStorage, 'getItem').and.returnValue(accessToken);

      const result = service.getAccessToken();

      expect(localStorage.getItem).toHaveBeenCalledWith(APLZ_AUTH_TOKEN);
      expect(result).toBe(accessToken);
    });

    it('deberia de returnor null si no hay token', () => {
      spyOn(localStorage, 'getItem').and.returnValue(null);

      const result = service.getAccessToken();

      expect(localStorage.getItem).toHaveBeenCalledWith(APLZ_AUTH_TOKEN);
      expect(result).toBeNull();
    });
  });

  describe('removeTokens', () => {
    it('deberia de remover los tokens del localStorage', () => {
      spyOn(localStorage, 'removeItem');

      service.removeTokens();

      expect(localStorage.removeItem).toHaveBeenCalledWith(APLZ_AUTH_TOKEN);
      expect(localStorage.removeItem).toHaveBeenCalledWith(
        APLZ_AUTH_REFRESH_TOKEN
      );
    });
  });
});
