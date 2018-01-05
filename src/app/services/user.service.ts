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
}
