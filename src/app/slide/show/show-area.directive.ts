import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[showArea]'
})
export class ShowAreaDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}