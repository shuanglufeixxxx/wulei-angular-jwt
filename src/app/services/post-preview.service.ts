import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { RestangularModule, Restangular } from 'ngx-restangular';
import { PostPreview } from '../shared/PostPreview';
import { Gettable } from './gettable';

@Injectable()
export class PostPreviewService implements Gettable<PostPreview> {

  constructor(private restangular: Restangular) { }

  get(id: string): Observable<PostPreview> {
    return this.restangular.one('postPreview', id).get();
  }
}
