import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Account } from '../models/account';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/timeout';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/catch';

import { HttpClient } from "@angular/common/http";
import { tokenName } from '../configs/tokenName';

export const token = {
  token: null as string | null
}


@Injectable()
export class AccountService {

  private url = '/account';

  private accountSignedInSubject: BehaviorSubject<Account> = new BehaviorSubject<Account>(null);

  constructor(
    private http: HttpClient,
    @Inject('timeOutMilliseconds') private timeOutMilliseconds) {
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

  signIn(username: string, password: string) {

    return this.getSignedInOnce().switchMap(signedIn => {
      if (signedIn) {
        return Observable.of(null);
      }
      
      return this.http
        .post<Account>(
          this.url + '/signIn',
          {
            username: username,
            password: password,
          },
          {
            observe: 'response',
          }
        )
        .catch((errorResponse) => {
          if (errorResponse.status === 401) {
            throw new Error(
              "Sign in failed. Username or password don't match."
            );
          } else {
            throw new Error("Sign in failed.");
          }
        })
        .timeout(this.timeOutMilliseconds)
        .catch((error) => {
          throw new Error("Signed in failed.");
        })
        .map<any, any>((res) => {
          token.token = res.headers.get(tokenName);
          const acc = res.body
          if (acc) {
            this.changeAuthorizationState(new Account(acc.id, acc.username));
            return acc;
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

      return this.http
        .post<Account>(
          this.url + '/signUp',
          {
            username: username,
            password: password,
          },
          {
            observe: 'response',
          }
        )
        .catch((errorResponse) => {
          if (errorResponse.status === 409) {
            throw new Error("Sign up failed. Username already registered.");
          } else {
            throw new Error("Sign up failed.");
          }
        })
        .timeout(this.timeOutMilliseconds)
        .catch((error) => {
          throw new Error("Sign up failed.");
        })
        .map<any, any>((res) => {
          token.token = res.headers.get(tokenName)
          const acc = res.body
          if (acc) {
            this.changeAuthorizationState(new Account(acc.id, acc.username));
            return acc;
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

        this.http.post(`${this.url}/signOut`, null)
          .timeout(this.timeOutMilliseconds)
          .subscribe(_ => {
            this.changeAuthorizationState(null);
          })

        observer.complete();
      })
    });
  }

  retrieveAccountSignedIn() {

    return this.http.get<Account>(`${this.url}/retrieveAccountSignedIn`)
      .timeout(this.timeOutMilliseconds)
      .map(acc => {
        if(acc) {
          this.changeAuthorizationState(acc);
        }

        return acc;
      });
  }

  exist(username: string): Observable<Account> {
    return this.http.get<Account>(
      `${this.url}/exist`,
      {
        params: {
          username: username
        }
      }
    )
  }
}