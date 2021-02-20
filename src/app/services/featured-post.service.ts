import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Post } from '../shared/Post';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class FeaturedPostService {

  private url = '/featuredPost'

  constructor(private http: HttpClient) { }

  getList(classify: string): Observable<Post[]> {
    return this.http
      .get<Post[]>(
        this.url,
        {
          params: {
            classify: classify
          }
        }
      )
  }

}
