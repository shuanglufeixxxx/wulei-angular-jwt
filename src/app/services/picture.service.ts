import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Picture } from '../shared/picture';
import { Gettable } from './gettable';

@Injectable()
export class PictureService implements Gettable<Picture> {

  private url = '/picture'

  constructor(private http: HttpClient) { }

  get(id: string): Observable<Picture> {
    return this.http
      .get<Picture>(
        `${this.url}/${id}`,
      )
  }

  getList(pictureCollectionId: string): Observable<Picture[]> {
    return this.http
      .get<Picture[]>(
        this.url,
        {
          params: {
            pictureCollectionId: pictureCollectionId
          }
        }
      )
  }
}
