import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Restangular } from 'ngx-restangular';
import { Post } from '../shared/Post';

@Injectable()
export class FeaturedPostService {

  constructor(private restangular: Restangular) { }

  getList(classify: string): Observable<Post[]> {
    return this.restangular.all('featuredPost').getList({classify: classify});
  }

}
