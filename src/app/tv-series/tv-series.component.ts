import { Component, OnInit } from '@angular/core';
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

  constructor(private postService: PostService, private postPreviewService: PostPreviewService) {
  }

  ngOnInit() {
    this.postService.getList("tv-series").subscribe(posts => {
      this.posts = posts;
      this.currentPost = this.posts[0];
      this.postPreviewService.get(this.currentPost.id).subscribe(preview => this.currentPreview = preview);
    });
  }

}
