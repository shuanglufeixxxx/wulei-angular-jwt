import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { RestangularModule, Restangular } from 'ngx-restangular';
import { ActivityTopPost } from '../shared/activityTopPost';

@Injectable()
export class ActivityTopPostService {

  constructor(private restangular: Restangular) { }

  getList(): Observable<ActivityTopPost[]> {
    return this.restangular.all('activityTopPost').getList();
  }

}
