export const APLZ_AUTH_TOKEN = 'aplz-auth-token';
export const APLZ_AUTH_REFRESH_TOKEN = 'aplz-auth-refresh-token';

export interface TokenResponse {
  access: string;
  refresh?: string;
}
