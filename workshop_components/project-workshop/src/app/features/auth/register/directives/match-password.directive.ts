// src/app/features/auth/register/match-password.directive.ts
import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

@Directive({
  selector: '[appMatchPassword]',
  standalone: true,
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: MatchPasswordDirective,
      multi: true,
    },
  ],
})
export class MatchPasswordDirective implements Validator {
  @Input('appMatchPassword') controlToMatch: string = '';

  validate(control: AbstractControl): ValidationErrors | null {
    const formGroup = control as AbstractControl;
    if (!formGroup || !this.controlToMatch) return null;

    const password = formGroup.get('password');
    const rePassword = formGroup.get(this.controlToMatch);

    if (!password || !rePassword) return null;

    return password.value === rePassword.value ? null : { mismatch: true };
  }
}
