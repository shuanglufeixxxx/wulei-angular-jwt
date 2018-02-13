import { Component, OnInit, Input, HostListener, HostBinding } from '@angular/core';
import { Post } from '../shared/Post';
import { FeaturedPostService } from '../services/featured-post.service';
import { PostService } from '../services/post.service';
import { Observable } from 'rxjs/Observable';
import { ConcurrencyService } from '../services/concurrency.service';
import { isMobileDevice } from '../shared/isMobileDevice';
import { appearDisappear } from '../animation/appear-disapear';

@Component({
  selector: 'app-post-show-canvas',
  animations: [ appearDisappear(true) ],
  templateUrl: './post-show-canvas.component.html',
  styleUrls: ['./post-show-canvas.component.scss']
})
export class PostShowCanvasComponent implements OnInit {

  @Input() classify: string;

  @HostBinding('@routeAppearDisappear') routeAnimationState = true;

  topPosts: Post[];
  featuredPosts: Post[];

  isMobileDevice: boolean;

  constructor(private featuredPostService: FeaturedPostService
    , private postService: PostService
    , private conccurencyService: ConcurrencyService) { }

  ngOnInit() {
    if(this.classify) {
      this.isMobileDevice = isMobileDevice();
      this.featuredPostService.getList(this.classify).subscribe(featuredPosts => {
        this.prepareContent(featuredPosts);
      });
    }
  }

  prepareContent(sourcePost: Post[]) {
    if(sourcePost.length <= 4) {
      this.topPosts = sourcePost;
      this.featuredPosts = null;
      return;
    }
    
    this.topPosts = sourcePost.slice(0, 4);
    this.featuredPosts = sourcePost.slice(4);
  }

  @HostListener('window:resize') changeSlideDimensionRate() {
    this.isMobileDevice = isMobileDevice();
  }
}
