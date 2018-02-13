import { Component, OnInit } from '@angular/core';
import { AccountService } from './services/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app';

  menubarMobileOpen: boolean = false;

  constructor(private accountService: AccountService) {
  }

  ngOnInit() {
    this.accountService.retrieveAccountSignedIn().subscribe();
  }

  openMenubarMobile() {
    this.menubarMobileOpen = true;
  }

  closeMenubarMobile() {
    this.menubarMobileOpen = false;
  }
}
