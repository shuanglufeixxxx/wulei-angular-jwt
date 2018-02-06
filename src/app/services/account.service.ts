import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { RestangularModule, Restangular } from 'ngx-restangular';
import { Account } from '../shared/Account';
import { Gettable } from './gettable';
import { SignInInfo } from '../shared/signInInfo';
import { SignUpInfo } from '../shared/signUpInfo';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subscription } from 'rxjs/Subscription';

@Injectable()
export class AccountService implements Gettable<Account> {

  constructor(private restangular: Restangular) {
  }

  get(id: string): Observable<Account> {
    return this.restangular.one("account", id).get();
  }

  private accountSignedInSubject: BehaviorSubject<Account> = new BehaviorSubject<Account>(null);

  getAccountSignedIn(): Observable<Account> {
    return new Observable<Account>(observer => {
      let subscription: Subscription = this.accountSignedInSubject.subscribe(account => {
        observer.next(account);
      })

      return () => subscription.unsubscribe();
    });
  }

  signedIn(): Observable<boolean> {
    return new Observable<boolean>(observer => {
      let subscription: Subscription = this.accountSignedInSubject.subscribe(account => {
        observer.next(account !== null);
      })

      return () => subscription.unsubscribe();
    });
  }

  private changeAuthorizationState(accountSignedIn: Account) {
    this.accountSignedInSubject.next(accountSignedIn);
  }

  signIn(signInInfo: SignInInfo): void {
    this.signedIn().subscribe( signedIn => {
      if (!signedIn) {
        this.restangular
          .all("account")
          .post( signInInfo, {}, {action: "sign-in"})
          .subscribe( account => {
            this.changeAuthorizationState(account);
          });
      }
    });
  }

  signUp(signUpInfo: SignUpInfo): void {
    this.signedIn().subscribe( signedIn => {
      if (!signedIn) {
        this.restangular
          .all("account")
          .post( signUpInfo, {}, {action: "sign-up"})
          .subscribe( account => {
            this.changeAuthorizationState(account);
          });
      }
    });
  }

  signOut(): void {
    this.getAccountSignedIn().subscribe( account => {
      if(account !== null) {
        this.restangular
          .all("account")
          .post( {}, {}, {action: "sign-out"} )
          .subscribe( _ => {
            this.changeAuthorizationState(null);
          });
      }
    });
  }
}
