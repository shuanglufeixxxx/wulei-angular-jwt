import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Restangular } from 'ngx-restangular';
import { Post } from '../shared/Post';
import { Gettable } from './gettable';

@Injectable()
export class PostService implements Gettable<Post> {

  constructor(private restangular: Restangular) { }

  get(id: string): Observable<Post> {
    return this.restangular.one('post', id).get();
  }

  getList(classify: string): Observable<Post[]> {
    return this.restangular.all('post').getList({classify: classify});
  }
}
