import { Type } from '@angular/core';

export class ShowElement {
  constructor(public component: Type<any>, public data: any) {}
}