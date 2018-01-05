import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { RestangularModule, Restangular } from 'ngx-restangular';

@Injectable()
export class LikeService {

  constructor(private restangular: Restangular) { }

  liked(userID: string, postID: string): Observable<boolean> {
    return this.restangular.getList('like').getList( {postID: postID} ).get( {userID: userID} )
      .map( userID => userID !== null );
  }

}
