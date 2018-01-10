import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { RestangularModule, Restangular } from 'ngx-restangular';
import { User } from '../shared/User';
import { Gettable } from './gettable';

@Injectable()
export class UserService implements Gettable<User> {

  constructor(private restangular: Restangular) { }

  get(id: string): Observable<User> {
    return this.restangular.one("user", id).get();
  }

  signIn(username: string, password: string): Observable<any> {
    return this.restangular.all("user").getList({username: username, password: password});
  }

  signUp(username: string, password: string): Observable<any> {
    return this.restangular.all("user").post({username: username, password: password});
  }
}
