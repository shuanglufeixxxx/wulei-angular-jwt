import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { RestangularModule, Restangular } from 'ngx-restangular';
import { PostPreview } from '../shared/PostPreview';
import { Gettable } from './gettable';
import 'rxjs/add/observable/empty';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/merge';
import 'rxjs/add/operator/concat';
import 'rxjs/add/operator/pairwise';
import 'rxjs/add/operator/last';
import 'rxjs/add/operator/map';

@Injectable()
export class PostPreviewService implements Gettable<PostPreview> {

  constructor(private restangular: Restangular) { }

  get(id: string): Observable<PostPreview> {
    return this.restangular.one('postPreview', id).get();
  }
}
