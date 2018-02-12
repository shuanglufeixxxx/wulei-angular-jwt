import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Account } from '../shared/Account';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subscription } from 'rxjs/Subscription';
import { Restangular } from 'ngx-restangular';
import { REST_FUL_RESPONSE } from '../shared/restangularFullResponseConfig';
import 'rxjs/add/operator/timeout';
import 'rxjs/add/operator/take';

@Injectable()
export class AccountService {

  private accountSignedInSubject: BehaviorSubject<Account> = new BehaviorSubject<Account>(null);

  constructor(@Inject(REST_FUL_RESPONSE) private restangularFullResponse: Restangular,
    @Inject('timeOutMilliseconds') private timeOutMilliseconds) {
  }

  getByUsername(username: string): Observable<Account> {
    return this.restangularFullResponse
      .all("account")
      .customGET("exist", {username: username})
      .map(response => response.data)
  }

  getAccountSignedIn(): Observable<Account> {
    return new Observable<Account>(observer => {
      let subscription: Subscription = this.accountSignedInSubject.subscribe(account => {
        observer.next(account);
      })

      return () => subscription.unsubscribe();
    });
  }

  getSignedIn(): Observable<boolean> {
    return new Observable<boolean>(observer => {
      let subscription: Subscription = this.accountSignedInSubject.subscribe(account => {
        observer.next(account !== null);
      })

      return () => subscription.unsubscribe();
    });
  }

  getAccountSignedInOnce(): Observable<Account> {
    return this.getAccountSignedIn().take(1);
  }

  getSignedInOnce(): Observable<boolean> {
    return this.getSignedIn().take(1);
  }

  private changeAuthorizationState(accountSignedIn: Account) {
    this.accountSignedInSubject.next(accountSignedIn);
  }

  signIn(username: string, password: string): Observable<any> {
    return this.getSignedInOnce().switchMap(signedIn => {
      if (signedIn) {
        return Observable.of(null);
      }

      return this.restangularFullResponse
        .all("account")
        .customPOST( {username: username, password: password}, "signIn" )
        .catch(errorResponse => {
          if(errorResponse.status === 401) {
            throw new Error("Sign in failed. Username or password don't match.");
          }
          else {
            throw new Error("Sign in failed.");
          }
        })
        .timeout(this.timeOutMilliseconds)
        .catch(error => {
          throw new Error("Signed in failed.");
        })
        .map(response => {
          if(response.ok) {
            this.changeAuthorizationState( new Account(response.data.value.id, response.data.value.username) );
            return null;
          }

          throw new Error("Sign in failed.");
        });
    });
  }

  signUp(username: string, password: string): Observable<any> {
    return this.getSignedInOnce().switchMap(signedIn => {
      if (signedIn) {
        return Observable.of(null);
      }

      return this.restangularFullResponse
        .all("account")
        .customPOST( {username: username, password: password}, "signUp" )
        .catch(errorResponse => {
          if(errorResponse.status === 401) {
            throw new Error("Sign up failed. Username already registered.");
          }
          else {
            throw new Error("Sign up failed.");
          }
        })
        .timeout(this.timeOutMilliseconds)
        .catch(error => {
          throw new Error("Sign up failed.");
        })
        .map(response => {
          if(response.ok) {
            this.changeAuthorizationState( new Account(response.data.value.id, response.data.value.username) );
            return null;
          }

          throw new Error("Sign up failed.");
        });
    });
  }

  signOut(): Observable<any> {
    return this.getSignedInOnce().switchMap( signedIn => {
      if(!signedIn) {
        return Observable.empty<any>();
      }

      return new Observable(observer => {
        this.restangularFullResponse
          .all("account")
          .customPOST( {}, "signOut" )
          .timeout(this.timeOutMilliseconds)
          .subscribe(_ => {
            this.changeAuthorizationState(null);
          });

        observer.complete();
      })
    });
  }

  retrieveAccountSignedIn(): Observable<any> {
    return this.restangularFullResponse
      .all("account")
      .customGET("retrieveAccountSignedIn")
      .timeout(this.timeOutMilliseconds)
      .map(response => {
        if(response.data) {
          this.changeAuthorizationState(response.data.value);
        }
        return null;
      });
  }

  exist(username: String): Observable<boolean> {
    return this.restangularFullResponse
      .all("account")
      .customGET("exist", {username: username})
      .map(response => response.data.value);
  }
}