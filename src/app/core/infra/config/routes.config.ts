export const ROUTE_CONFIG = {
  login: 'auth',
  app: 'apz',
  home: 'home',
  historial: 'historial',
} as const;

export type RouteKey = keyof typeof ROUTE_CONFIG;
export type Route = (typeof ROUTE_CONFIG)[RouteKey];

export const ROUTE_API_CONFIG = {
  login: 'auth_module/login/',
  orders_home: 'orders_module/home/',
  branches: 'orders_module/branches/',
  history: 'orders_module/history/',
} as const;
