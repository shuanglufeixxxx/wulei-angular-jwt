import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Picture } from '../models/picture';

import { HttpClient } from "@angular/common/http";

@Injectable()
export class FeaturedPictureService {

  private url = '/featuredPicture'

  constructor(private http: HttpClient) { }
  
  getList(place: string): Observable<Picture[]> {
    return this.http
      .get<Picture[]>(
        this.url,
        {
          params: {
            place: place
          }
        }
      )
  }
}
