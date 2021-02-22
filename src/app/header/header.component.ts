import { Component, OnInit, OnDestroy } from '@angular/core';
import { Account } from '../shared/account';
import { AccountService } from '../services/account.service';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  isHighlight: boolean[];

  account: Account;

  accountSubscription: Subscription;

  constructor(private accountService: AccountService
    , private router: Router) { }

  ngOnInit() {
    var isHighlight = new Array<boolean>(6);
    for(var i = 0; i < isHighlight.length; i++) {
      isHighlight[i] = false;
    }
    this.isHighlight = isHighlight;

    this.accountSubscription = this.accountService
      .getAccountSignedIn()
      .subscribe(account => this.account = account);
  }

  ngOnDestroy() {
    this.accountSubscription.unsubscribe();
  }

  highlight(index: number) {
    this.isHighlight[index] = true;
  }

  removeHighlight(index: number) {
    this.isHighlight[index] = false;
  }

  signOut() {
    this.accountService.signOut().subscribe();
  }

  navigateToPostLiked() {
    this.router.navigate( ['my', 'post-liked'] );
  }
}