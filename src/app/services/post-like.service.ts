import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AccountService } from './account.service';
import { Post } from '../shared/Post';

@Injectable()
export class PostLikeService {

  private url = '/postLike'

  constructor(private http: HttpClient, private accountService: AccountService) { }

  likePost(postId: string): Observable<any> {
    return this.accountService
      .getAccountSignedInOnce()
      .filter(account => account !== null)
      .switchMap(account => {
        return this.http
          .post(
            this.url,
            {
              postId: postId
            }
          )
      });
  }

  dislikePost(postId: string): Observable<any> {
    return this.accountService
      .getAccountSignedInOnce()
      .filter(account => account !== null)
      .switchMap(account => {
        return this.http
          .delete(
            this.url,
            {
              params: {
                postId: postId
              }
            }
          )
      });
  }

  getLiked(postId: string): Observable<{exist: 1 | 0}> {
    return this.accountService
      .getSignedInOnce()
      .filter(signedIn => signedIn)
      .switchMap(account => {
        return this.http
          .get<any>(
            `${this.url}/exist`,
            {
              params: {
                postId: postId
              }
            }
          )
      });
  }

  getPostLikeCount(postId: string): Observable<number> {
    return this.http
      .get<number>(
        `${this.url}/count`,
        {
          params: {
            postId: postId
          }
        }
      )
  }

  getPostLikedList(): Observable<Post[]> {
    return this.accountService
      .getSignedInOnce()
      .filter(signedIn => signedIn)
      .switchMap( _ => {
        return this.http
          .get<Post[]>(
            `${this.url}/my`
          )
      });
  }
}