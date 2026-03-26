// src/app/shared/validators/password-match.validator.ts
import { AbstractControl, ValidationErrors } from '@angular/forms';

export function passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
  const password = control.get('password');
  const rePassword = control.get('rePassword');

  if (password?.value !== rePassword?.value) {
    return { passwordsMismatch: true };
  }
  return null;
}
