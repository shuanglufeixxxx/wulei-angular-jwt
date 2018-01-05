import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-menubar-mobile',
  templateUrl: './menubar-mobile.component.html',
  styleUrls: ['./menubar-mobile.component.scss']
})
export class MenubarMobileComponent implements OnInit {

  @Output() closeMenubarMobileRequest = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  emitCloseMenubarMobileRequest() {
    this.closeMenubarMobileRequest.emit(null);
  }
}
