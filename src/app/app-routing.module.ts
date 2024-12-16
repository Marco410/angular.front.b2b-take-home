import { RouterModule, Routes } from '@angular/router';
import { ROUTE_CONFIG } from './core/infra/config/routes.config';
import { HistorialComponent } from './features/historial/infra/components/historial.component';
import { HomeComponent } from './features/home/infra/components/home.component';
import { LayoutComponent } from './features/layout/layout.component';
import { LoginComponent } from './features/login/infra/components/login/login.component';
import { provideLogin } from './features/login/infra/config/providers';
import { NgModule } from '@angular/core';
import { AuthGuard } from './features/login/infra/guards/auth.guard';
import { LoginGuard } from './features/login/infra/guards/login.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: ROUTE_CONFIG.login,
  },
  {
    path: ROUTE_CONFIG.login,
    component: LoginComponent,
    canActivate: [AuthGuard],
    providers: [provideLogin()],
  },
  {
    path: ROUTE_CONFIG.app,
    component: LayoutComponent,
    canActivate: [LoginGuard],
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: ROUTE_CONFIG.home,
        data: { title: 'Inicio' },
      },
      {
        path: ROUTE_CONFIG.home,
        component: HomeComponent,
        data: { title: 'Inicio' },
      },
      {
        path: ROUTE_CONFIG.historial,
        component: HistorialComponent,
        data: { title: 'Historial' },
      },
    ],
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: ROUTE_CONFIG.login,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
