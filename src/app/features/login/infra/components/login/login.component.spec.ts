import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginUseCase } from '../../../application/login.usecase';
import { of } from 'rxjs';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let mockLoginUseCase: jasmine.SpyObj<LoginUseCase>;

  beforeEach(() => {
    mockLoginUseCase = jasmine.createSpyObj('LoginUseCase', ['execute']);

    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, LoginComponent],
      declarations: [],
      providers: [{ provide: LoginUseCase, useValue: mockLoginUseCase }],
    });

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deberia de crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('deberia de invalidar el form si los campos estan vacios', () => {
    expect(component.form.valid).toBeFalse();
  });

  it('deberia de marcar los controls como touched cuando hace submit', () => {
    const spy = spyOn(component.form, 'markAllAsTouched').and.callThrough();
    console.log('spy');
    console.log(spy);
    component.login();
    expect(spy).toHaveBeenCalled();
  });

  it('deberia de no llamar a loginUseCase si el form es invalido', () => {
    component.form.controls['username'].setValue('');
    component.form.controls['password'].setValue('');
    component.login();
    expect(mockLoginUseCase.execute).not.toHaveBeenCalled();
  });

  it('deberia de llamar a loginUseCase si el form es valido', () => {
    //must be a user with this credentials
    component.form.controls['username'].setValue('test@test.com');
    component.form.controls['password'].setValue('password123');

    mockLoginUseCase.execute.and.returnValue(of(true));
    component.login();
    expect(mockLoginUseCase.execute).toHaveBeenCalledWith({
      username: 'test@test.com',
      password: 'password123',
    });
  });

  it('deberia de mostrar la contraseña', () => {
    expect(component.isPasswordVisible).toBeFalse();
    component.togglePasswordVisibility();
    expect(component.isPasswordVisible).toBeTrue();
  });

  it('debería ser inválido si el correo es incorrecto', () => {
    component.username.setValue('incorrect@email');
    expect(component.username.hasError('emailValidate')).toBeTrue();
    expect(component.username.valid).toBeFalse();
  });

  it('debería ser válido si el correo es correcto', () => {
    component.username.setValue('marco@aplazo.com');

    expect(component.username.valid).toBeTrue();
  });

  it('debería ser inválido si el campo de correo está vacío', () => {
    component.username.setValue('');
    expect(component.username.valid).toBeFalse();
  });

  it('debería ser inválido si el campo de contraseña está vacío', () => {
    component.password.setValue('');
    expect(component.password.valid).toBeFalse();
  });
});
