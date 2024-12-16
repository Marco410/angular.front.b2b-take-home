import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {
  APLZ_AUTH_REFRESH_TOKEN,
  APLZ_AUTH_TOKEN,
  TokenResponse,
} from '../../domain/entities/tokens';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  storeTokens(tokens: TokenResponse): void {
    localStorage.setItem(APLZ_AUTH_TOKEN, tokens.access);
    localStorage.setItem(APLZ_AUTH_REFRESH_TOKEN, tokens.refresh ?? '');
  }

  isLoggedIn(): boolean {
    return !!this.getAccessToken();
  }

  getAccessToken(): string | null {
    return localStorage.getItem(APLZ_AUTH_TOKEN);
  }

  removeTokens(): void {
    localStorage.removeItem(APLZ_AUTH_TOKEN);
    localStorage.removeItem(APLZ_AUTH_REFRESH_TOKEN);
  }
}
