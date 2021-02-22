import { Component, OnInit, OnDestroy } from '@angular/core';
import { PostLikeService } from '../../services/post-like.service';
import { Post } from '../../models/post';
import { AccountService } from '../../services/account.service';
import { Subscription } from 'rxjs/Subscription';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-post-liked',
  templateUrl: './post-liked.component.html',
  styleUrls: ['./post-liked.component.scss']
})
export class PostLikedComponent implements OnInit, OnDestroy {

  postLiked: Post[];

  retrieveContentSubscription: Subscription;

  constructor(private titleService: Title
    , private postLikeService: PostLikeService
    , private accountService: AccountService
  ) {
    titleService.setTitle("WULEI - LIKED")
  }

  ngOnInit() {
    this.retrieveContentSubscription = this.accountService
      .getAccountSignedIn()
      .switchMap( _ => {
        return this.postLikeService
          .getPostLikedList()
          .map(postLiked => this.postLiked = postLiked);
      })
      .subscribe();
  }

  ngOnDestroy() {
    this.retrieveContentSubscription.unsubscribe();
  }
}
