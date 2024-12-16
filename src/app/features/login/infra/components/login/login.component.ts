import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AplazoButtonComponent } from '@apz/shared-ui/button';
import { AplazoLogoComponent } from '@apz/shared-ui/logo';
import { LoginUseCase } from '../../../application/login.usecase';
import { AplazoInputComponent } from '../../../../shared/components/input/src';
import { CommonModule } from '@angular/common';
import { AplzValidations } from '../../../../shared/utils/email-validation';
import { AplazoNoWhiteSpaceDirective } from '../../../../../../../projects/shared-ui/src/lib/directives/no-white-space.directive';
import { AplazoLowercaseDirective } from '../../../../../../../projects/shared-ui/src/lib/directives/lower-case-text.directive';

@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [
    CommonModule,
    AplazoInputComponent,
    ReactiveFormsModule,
    AplazoButtonComponent,
    AplazoLogoComponent,
    AplazoNoWhiteSpaceDirective,
    AplazoLowercaseDirective,
  ],
})
export class LoginComponent {
  readonly loginUseCase = inject(LoginUseCase);

  readonly username = new FormControl<string>('', {
    nonNullable: true,
    validators: [Validators.required, AplzValidations.emailValidation],
  });

  readonly password = new FormControl<string>('', {
    nonNullable: true,
    validators: [Validators.required],
  });

  readonly form = new FormGroup({
    username: this.username,
    password: this.password,
  });

  isPasswordVisible: boolean = false;

  togglePasswordVisibility(): void {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  login(): void {
    this.form.markAllAsTouched();
    if (!this.form.valid) {
      return;
    }
    this.loginUseCase
      .execute({
        username: this.username.value,
        password: this.password.value,
      })
      .subscribe();
  }
}
