import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isHighlight: boolean[];

  signedIn: boolean = false;

  constructor() { }

  ngOnInit() {
    var isHighlight = new Array<boolean>(6);
    for(var i = 0; i < isHighlight.length; i++) {
      isHighlight[i] = false;
    }
    this.isHighlight = isHighlight
  }

  highlight(index: number) {
    this.isHighlight[index] = true;
  }

  removeHighlight(index: number) {
    this.isHighlight[index] = false;
  }
}
