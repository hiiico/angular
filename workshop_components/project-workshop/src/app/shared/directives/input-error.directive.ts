
// src/app/shared/directives/input-error.directive.ts
import { Directive, ElementRef, HostBinding, inject, OnInit } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appInputErrorDirective]',
  standalone: true
})
export class InputErrorDirective implements OnInit {
  private el = inject(ElementRef);
  private control = inject(NgControl, { optional: true });

  @HostBinding('class.input-error') get hasError(): boolean {
    return (this.control?.invalid && this.control?.touched) || false;
  }

  ngOnInit() {
    // Remove initial class if present
    this.el.nativeElement.classList.remove('input-error');
  }
}
