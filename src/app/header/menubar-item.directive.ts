import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appMenubarItem]'
})
export class MenubarItemDirective {

  constructor(private el: ElementRef) { }

  @HostListener('mouseenter') onMouseEneter() {
    this.el.nativeElement.style.color = "#000000";
    this.el.nativeElement.style.top = "1px";
    this.el.nativeElement.style.fontWeight = "900";
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.el.nativeElement.style.color = null;
    this.el.nativeElement.style.top = null;
    this.el.nativeElement.style.fontWeight = null;
  }
}
