import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Account } from '../shared/Account';
import { AccountService } from '../services/account.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-menubar-mobile',
  templateUrl: './menubar-mobile.component.html',
  styleUrls: ['./menubar-mobile.component.scss']
})
export class MenubarMobileComponent implements OnInit, OnDestroy {

  @Output() closeMenubarMobileRequest = new EventEmitter<any>();

  accountSignedIn: Account;

  accountSignedInSubscription: Subscription;

  constructor(private accountService: AccountService
    , private router: Router) { }

  ngOnInit() {
    this.accountSignedInSubscription = this.accountService
      .getAccountSignedIn()
      .subscribe(account => this.accountSignedIn = account);
  }

  ngOnDestroy() {
    this.accountSignedInSubscription.unsubscribe();
  }

  emitCloseMenubarMobileRequest() {
    this.closeMenubarMobileRequest.emit(null);
  }

  signOut() {
    this.accountService
      .signOut()
      .subscribe();
    
    this.emitCloseMenubarMobileRequest();
  }
}
