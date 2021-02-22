import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Post } from '../models/post';
import { Gettable } from './gettable';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class PostService implements Gettable<Post> {

  private url = '/post'

  constructor(private http: HttpClient) { }

  get(id: string): Observable<Post> {
    return this.http
      .get<Post>(
        `${this.url}/${id}`
      )
  }

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
