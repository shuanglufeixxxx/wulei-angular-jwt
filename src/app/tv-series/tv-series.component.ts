import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Post } from '../shared/Post';
import { PostPreview } from '../shared/PostPreview';
import { PostService } from '../services/post.service';
import { PostPreviewService } from '../services/post-preview.service';
import { Observable } from 'rxjs/Observable';

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
    this.postService.getList("tv-series").subscribe(posts => {
      this.posts = posts;

      this.route.paramMap.subscribe(params => {
        var currentPost = this.posts[0];
        
        var id: string = params.get('post');
        for(let post of posts) {
          if(post.id === id) {
            currentPost = post;
            break;
          }
        }

        this.currentPost = currentPost;
        
        this.postPreviewService.get(this.currentPost.id)
          .subscribe( preview => this.currentPreview = preview );
      });
    });
  }

  changeCurrentPost(id: string) {
    this.router.navigate(['/tv-series', { post: id }]);
  }
}
