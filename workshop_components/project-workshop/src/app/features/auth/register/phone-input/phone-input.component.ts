// src/app/features/auth/register/phone-input.component.ts
import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-phone-input',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './phone-input.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PhoneInputComponent),
      multi: true,
    },
  ],
})
export class PhoneInputComponent implements ControlValueAccessor {
  @Input() name: string = 'tel';
  @Input() id: string = 'tel';
  @Input() label: string = 'Telephone';
  @Input() placeholder: string = '885 888 888';
  @Input() required: boolean = false;
  @Input() minlength: number | null = null;
  @Input() maxlength: number | null = null;
  @Input() type: string = 'text';
  @Input() prefixes: string[] = ['+359', '+1', '+44', '+49']; // customizable list
  @Input() defaultPrefix: string = '+49';

  selectedPrefix: string = this.defaultPrefix;
  numberValue: string = '';
  value: string = ''; // combined value (prefix + number)

  disabled: boolean = false;
  touched: boolean = false;
  dirty: boolean = false;
  errors: any = null;

  onChange: any = () => {};
  onTouched: any = () => {};

  writeValue(obj: any): void {
    if (obj) {
      // Try to match a known prefix from the string
      let matchedPrefix = this.prefixes.find(p => obj.startsWith(p));
      if (matchedPrefix) {
        this.selectedPrefix = matchedPrefix;
        this.numberValue = obj.slice(matchedPrefix.length);
      } else {
        this.selectedPrefix = this.defaultPrefix;
        this.numberValue = obj;
      }
    } else {
      this.selectedPrefix = this.defaultPrefix;
      this.numberValue = '';
    }
    this.value = this.selectedPrefix + this.numberValue;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  updateValue(): void {
    this.value = this.selectedPrefix + this.numberValue;
    this.dirty = true;
    this.onChange(this.value);
    this.validate();
  }

  onBlur(): void {
    this.touched = true;
    this.onTouched();
  }

  validate(): void {
    let errors: any = {};
    if (this.required && !this.numberValue) {
      errors['required'] = true;
    }
    if (this.minlength && this.numberValue.length < this.minlength) {
      errors['minlength'] = { requiredLength: this.minlength, actualLength: this.numberValue.length };
    }
    this.errors = Object.keys(errors).length ? errors : null;
  }

  get controlInvalid(): boolean {
    return this.errors !== null;
  }
}
