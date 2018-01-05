import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';

  menubarMobileOpen: boolean = false;

  openMenubarMobile() {
    this.menubarMobileOpen = true;
  }

  closeMenubarMobile() {
    this.menubarMobileOpen = false;
  }
}
