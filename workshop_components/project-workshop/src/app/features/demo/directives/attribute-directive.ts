import {Directive, ElementRef, Input, Renderer2, HostListener, inject, OnInit} from '@angular/core';
@Directive({
  selector: '[appHighlight]',
})
export class AttributeDirective implements OnInit{
  @Input() appHighlight: string = '';
  @Input() defaultColor: string = '#999';

  private el = inject(ElementRef);
  private renderer = inject((Renderer2));

  ngOnInit(): void {
    this.setBackgroundColor(this.defaultColor);
  }

  @HostListener('mouseenter')
  onMouseEnter(): void {
    const  color = this.appHighlight || '#999'
    this.setBackgroundColor(color);
  }
  @HostListener('mouseleave')
  onMouseLeave(): void {
    this.setBackgroundColor(this.defaultColor);
  }

  private setBackgroundColor(color: string): void {
    this.renderer.setStyle(
      this.el.nativeElement,
      'background-color',
      color
    )
    this.renderer.setStyle(
      this.el.nativeElement,
      'transition',
      'background-color 0.3s ease'
    )
  }
}
