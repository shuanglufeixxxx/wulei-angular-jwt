import { Component, OnInit, HostBinding } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Post } from '../shared/Post';
import { PostService } from '../services/post.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/never';
import { appearDisappear } from '../animation/appear-disapear';

@Component({
  selector: 'app-tv-series',
  providers: [ PostService ],
  animations: [ appearDisappear(true) ],
  templateUrl: './tv-series.component.html',
  styleUrls: ['./tv-series.component.scss']
})
export class TvSeriesComponent implements OnInit {

  @HostBinding('@routeAppearDisappear') routeAnimationState = true;

  posts: Post[];

  currentPost: Post;

  constructor(private postService: PostService
    , private router: Router
    , private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.postService
      .getList("tv-series")
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

  changeCurrentPost(id: string) {
    this.router.navigate(['./', { post: id }]);
  }
}
