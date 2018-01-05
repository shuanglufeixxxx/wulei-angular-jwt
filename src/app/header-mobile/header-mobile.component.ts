import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header-mobile',
  templateUrl: './header-mobile.component.html',
  styleUrls: ['./header-mobile.component.scss']
})
export class HeaderMobileComponent implements OnInit {

  @Output() openMenubarMobileRequest = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  emitOpenMenubarMobileRequest() {
    this.openMenubarMobileRequest.emit(null);
  }
}
