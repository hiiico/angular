import {Directive, HostBinding, Input, OnChanges} from '@angular/core';

@Directive({
  selector: '[appStatusStyle]',
})
export class StructuralDirective implements OnChanges {
  @Input() appStatusStyle: 'planed' | 'active' | 'completed' | '' = '';
  @HostBinding('style.background-color')
  backgroundColor: string = 'transparent';

  ngOnChanges() {
    this.updateStyle();
  }
  private updateStyle(): void {
    switch (this.appStatusStyle) {
      case "planed": this.backgroundColor = '#1e3a5f';
      break;
      case "active": this.backgroundColor = '#14532d';
      break;
      case "completed": this.backgroundColor = '#3f3f46';
      break;
      default: this.backgroundColor = 'red';
    }
  }
}
