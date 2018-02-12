import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Restangular } from 'ngx-restangular';
import { AccountService } from './account.service';

@Injectable()
export class PostLikeService {

  constructor(private restangular: Restangular,
    private accountService: AccountService) { }

  likePost(postId: string): Observable<any> {
    return this.accountService
      .getAccountSignedInOnce()
      .filter(account => account !== null)
      .switchMap(account => {
        return this.restangular
          .all("postLike")
          .post( {postId: postId} );
      });
  }

  dislikePost(postId: string): Observable<any> {
    return this.accountService
      .getAccountSignedInOnce()
      .filter(account => account !== null)
      .switchMap(account => {
        return this.restangular
          .all("postLike")
          .remove( {postId: postId} );
      });
  }

  getLiked(postId: string): Observable<boolean> {
    return this.accountService
      .getAccountSignedInOnce()
      .switchMap(account => {
        if(account === null) {
          return Observable.of(false);
        }
        
        return this.restangular
          .all("postLike")
          .customGET("exist", {postId: postId})
          .map(likedPost => likedPost.value);
      });
  }

  getPostLikeCount(postId: string): Observable<number> {
    return this.restangular
      .all("postLike")
      .customGET("count", {postId: postId})
      .map(count => count.value);
  }
}