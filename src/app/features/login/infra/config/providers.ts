import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { LoginUseCase } from '../../application/login.usecase';
import { LoginRepository } from '../../domain/repositories/login.repository';
import { LocalLogin } from '../repositories/local-login';
import { AuthGuard } from '../guards/auth.guard';
import { LayoutComponent } from '../../../layout/layout.component';

export function provideLogin(): EnvironmentProviders {
  return makeEnvironmentProviders([
    {
      provide: LoginRepository,
      useClass: LocalLogin,
    },
    LoginUseCase,
    AuthGuard,
    LayoutComponent,
  ]);
}
