// src/app/features/auth/register/form-input.component.ts
import { Component, Input, forwardRef, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS, Validator, AbstractControl, ValidationErrors, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form-input',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './form-input.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FormInputComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => FormInputComponent),
      multi: true,
    },
  ],
})
export class FormInputComponent implements ControlValueAccessor, Validator, AfterViewInit {
  @Input() name: string = '';
  @Input() id: string = '';
  @Input() label: string = '';
  @Input() iconClass: string = '';
  @Input() type: string = 'text';
  @Input() placeholder: string = '';
  @Input() required: boolean = false;
  @Input() minlength: number | null = null;
  @Input() email: boolean = false;

  value: any = '';
  disabled: boolean = false;
  touched: boolean = false;
  dirty: boolean = false;
  errors: ValidationErrors | null = null;

  @ViewChild('input') inputElement!: ElementRef<HTMLInputElement>;

  // ControlValueAccessor methods
  onChange: any = () => {};
  onTouched: any = () => {};

  writeValue(obj: any): void {
    this.value = obj;
    if (this.inputElement) {
      this.inputElement.nativeElement.value = obj;
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  // Validator method
  validate(control: AbstractControl): ValidationErrors | null {
    if (!this.inputElement) return null;

    const input = this.inputElement.nativeElement;
    const validity = input.validity;

    const errors: ValidationErrors = {};
    if (validity.valueMissing) errors['required'] = true;
    if (validity.tooShort) errors['minlength'] = { requiredLength: this.minlength, actualLength: input.value.length };
    if (validity.typeMismatch && this.type === 'email') errors['email'] = true;

    this.errors = Object.keys(errors).length ? errors : null;
    return this.errors;
  }

  ngAfterViewInit(): void {
    this.validate(null as any);
  }

  onInputChange(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.value = value;
    this.dirty = true;
    this.onChange(value);
    this.validate(null as any);
  }

  get controlInvalid(): boolean {
    return this.errors !== null;
  }
}
