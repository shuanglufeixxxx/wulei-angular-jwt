import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { RestangularModule, Restangular } from 'ngx-restangular';
import { AccountService } from './account.service';

@Injectable()
export class PostLikeService {

  constructor(private restangular: Restangular,
    private userService: AccountService) { }

  // likePost(postId: string): Observable<any> {
  //   if( !this.userService.signedIn() ) return Observable.empty();

  //   return this.restangular.all('likePost')
  //     .post( {postId: postId, userId: this.userService.getAccountSignedIn().id} );
  // }

  // dislikePost(postId: string): Observable<any> {
  //   if( !this.userService.signedIn() ) return Observable.empty();

  //   return this.restangular.all('likePost')
  //     .remove( {postId: postId, userId: this.userService.getAccountSignedIn().id} );
  // }

  // likePostd(postId: string): Observable<boolean> {
  //   if( !this.userService.signedIn() ) return Observable.empty();

  //   return this.restangular.all('likePost')
  //     .getList( {postId: postId, userId: this.userService.getAccountSignedIn().id} );
  // }

}
