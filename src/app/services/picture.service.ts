import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { RestangularModule, Restangular } from 'ngx-restangular';
import { Picture } from '../shared/picture';
import { Gettable } from './gettable';

@Injectable()
export class PictureService implements Gettable<Picture> {

  constructor(private restangular: Restangular) { }

  get(id: string): Observable<Picture> {
    return this.restangular.one('picture', id).get();
  }
}
