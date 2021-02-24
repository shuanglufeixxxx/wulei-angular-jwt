import { Component, OnInit, OnDestroy, Inject, HostBinding } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from '../../models/post';
import { PostService } from '../../services/post.service';
import { PictureService } from '../../services/picture.service';
import { appearDisappear } from '../../animations/appear-disapear';
import { PostLikeService } from '../../services/post-like.service';
import { AccountService } from '../../services/account.service';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/observable/empty';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/merge';
import 'rxjs/add/operator/concat';
import 'rxjs/add/operator/pairwise';
import 'rxjs/add/operator/reduce';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-post',
  animations: [ appearDisappear(true) ],
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit, OnDestroy {

  @HostBinding('@routeAppearDisappear') routeAnimationState = true;

  post: Post;

  pictureIds: string[];

  likedPost: boolean = false;

  likedPostNumber: number;

  retrieveContentSubscription: Subscription;

  constructor(private titleService: Title
    , private postService: PostService
    , private pictureService: PictureService
    , private postLikeService: PostLikeService
    , private accountService: AccountService
    , @Inject('imageUrl') private imageUrl: string
    , private route: ActivatedRoute
    , private router: Router
  ) {
    titleService.setTitle("WULEI - POST");
  }

  ngOnInit() {
    this.retrieveContentSubscription = this.route.paramMap
      .switchMap(params => {
        const id = params.get("id");
        return this.postService.get(id);
      })
      .switchMap(post => {
        this.post = post;

        const likedPostObservable = this.accountService
          .getAccountSignedIn()
          .switchMap( _ => {
            return this.postLikeService
              .getLiked(this.post.id)
          })
          .map(likedPost => this.likedPost = Boolean(likedPost.exist));

        const likedPostNumberObservable = this.postLikeService
          .getPostLikeCount(this.post.id)
          .map(count => this.likedPostNumber = count.count);
        
        return this.pictureService
          .getList( this.post.pictureCollectionId )
          .map(pictures => {
            var t = [];
            pictures.map(p => t.push(p.id));
            this.pictureIds = t;
            return t;
          })
          .merge(likedPostObservable)
          .merge(likedPostNumberObservable);
      })
      .subscribe();
  }

  ngOnDestroy() {
    this.retrieveContentSubscription.unsubscribe();
  }

  likePost() {
    this.accountService
      .getSignedInOnce()
      .switchMap(signedIn => {
        if(signedIn) {
          return this.postLikeService
            .likePost(this.post.id)
            .map( _ => this.likedPost = true );
        }
        else {
          this.router.navigate( [{outlets: { action: "sign-in" } }]);
          return Observable.empty<boolean>();
        }
      })
      .subscribe();
  }

  dislikePost() {
    this.accountService
      .getSignedInOnce()
      .switchMap(signedIn => {
        if(signedIn) {
          return this.postLikeService
            .dislikePost(this.post.id)
            .map( _ => this.likedPost = false );
        }
        else {
          this.router.navigate( [{outlets: { action: "sign-in" } }]);
          return Observable.empty<boolean>()
        }
      })
      .subscribe();
  }
}
