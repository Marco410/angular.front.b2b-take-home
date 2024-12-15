import { AbstractControl } from '@angular/forms';

export class AplzValidations {
  static emailValidation(control: AbstractControl) {
    if (!control.value || control.value.trim() === '') {
      return null;
    }
    const value = control.value.trim();
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const isValidEmail = emailPattern.test(value);
    if (!isValidEmail) {
      return { emailValidate: true };
    }
    return null;
  }
}
