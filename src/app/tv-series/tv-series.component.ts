import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Post } from '../shared/Post';
import { PostPreview } from '../shared/PostPreview';
import { PostService } from '../services/post.service';
import { PostPreviewService } from '../services/post-preview.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/never';

@Component({
  selector: 'app-tv-series',
  providers: [ PostService, PostPreviewService ],
  templateUrl: './tv-series.component.html',
  styleUrls: ['./tv-series.component.scss']
})
export class TvSeriesComponent implements OnInit {

  posts: Post[];
  
  currentPreview: PostPreview;

  currentPost: Post;

  constructor(private postService: PostService
    , private router: Router
    , private postPreviewService: PostPreviewService
    , private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.postService
      .getList("tv-series")
      .switchMap(posts => {
        this.posts = posts;

        return this.route.paramMap;
      })
      .switchMap(params => {
        var currentPost = this.posts[0];

        var id: string = params.get("post");
        for (let post of this.posts) {
          if (post.id === id) {
            currentPost = post;
            break;
          }
        }

        this.currentPost = currentPost;

        return this.postPreviewService.get(this.currentPost.id)
          .catch( error => Observable.never<PostPreview>() );
      })
      .map(preview => this.currentPreview = preview)
      .subscribe();
  }

  changeCurrentPost(id: string) {
    this.router.navigate(['./', { post: id }]);
  }
}
