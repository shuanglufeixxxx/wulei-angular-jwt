import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Restangular } from 'ngx-restangular';
import { Picture } from '../shared/Picture';

@Injectable()
export class FeaturedPictureService {

  constructor(private restangular: Restangular) { }

  getList(place: string): Observable<Picture[]> {
    return this.restangular.all('featuredPicture').getList({place: place});
  }
}
