// src/app/shared/validators/email.validator.ts
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function emailValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (!value) {
      return { required: true };
    }
    // Regex for Gmail addresses ending with .bg or .com
    const emailRegex = /^[a-zA-Z0-9._%+-]{6,}@gmail\.(bg|com)$/;
    if (!emailRegex.test(value)) {
      return { invalidEmail: true };
    }
    return null;
  };
}
