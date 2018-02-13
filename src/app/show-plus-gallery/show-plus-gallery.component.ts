import { Component, OnInit, OnDestroy, Input, HostBinding } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Post } from '../shared/Post';
import { PostService } from '../services/post.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/never';
import { appearDisappear } from '../animation/appear-disapear';
import { Subscription } from 'rxjs/Subscription';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-show-plus-gallery',
  animations: [ appearDisappear(true) ],
  templateUrl: './show-plus-gallery.component.html',
  styleUrls: ['./show-plus-gallery.component.scss']
})
export class ShowPlusGalleryComponent implements OnInit, OnDestroy {

  @HostBinding('@routeAppearDisappear') routeAnimationState = true;

  @Input() classify: string;

  posts: Post[];

  currentPost: Post;

  retrieveContentSubscription: Subscription;

  constructor(private titleService: Title
    , private postService: PostService
    , private router: Router
    , private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.titleService.setTitle( "WULEI - " + ( this.classify ? this.classify.toUpperCase() : "" ) );
    
    if(!this.classify) {
      return;
    }

    this.retrieveContentSubscription = this.postService
      .getList(this.classify)
      .switchMap(posts => {
        this.posts = posts;

        return this.route.paramMap;
      })
      .map(params => {
        var currentPost = this.posts[0];

        let id: string = params.get("post");
        for (let post of this.posts) {
          if (post.id === id) {
            currentPost = post;
            break;
          }
        }

        this.currentPost = currentPost;
        return null;
      })
      .subscribe();
  }

  ngOnDestroy() {
    this.retrieveContentSubscription.unsubscribe();
  }

  changeCurrentPost(id: string) {
    this.router.navigate(['./', { post: id }]);
  }
}
