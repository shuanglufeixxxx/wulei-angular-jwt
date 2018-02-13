import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { AccountService } from '../services/account.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-header-mobile',
  templateUrl: './header-mobile.component.html',
  styleUrls: ['./header-mobile.component.scss']
})
export class HeaderMobileComponent implements OnInit, OnDestroy {

  @Output() openMenubarMobileRequest = new EventEmitter<any>();

  signedIn: boolean = false;

  signedInSubscription: Subscription;

  constructor(private accountService: AccountService) { }

  ngOnInit() {
    this.signedInSubscription = this.accountService
      .getSignedIn()
      .subscribe(signedIn => this.signedIn = signedIn);
  }

  ngOnDestroy() {
    this.signedInSubscription.unsubscribe();
  }

  emitOpenMenubarMobileRequest() {
    this.openMenubarMobileRequest.emit(null);
  }
}
