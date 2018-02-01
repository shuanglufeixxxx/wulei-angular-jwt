import { Component, OnInit, HostListener, HostBinding } from '@angular/core';
import { Post } from '../shared/Post';
import { FeaturedPostService } from '../services/featured-post.service';
import { PostService } from '../services/post.service';
import { Observable } from 'rxjs/Observable';
import { ConcurrencyService } from '../services/concurrency.service';
import { isMobileDevice } from '../shared/isMobileDevice';
import { appearDisappear } from '../animation/appear-disapear';

@Component({
  selector: 'app-activity',
  providers: [ FeaturedPostService, PostService, ConcurrencyService ],
  animations: [ appearDisappear(true) ],
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss']
})
export class ActivityComponent implements OnInit {

  @HostBinding('@routeAppearDisappear') routeAnimationState = true;

  featuredPosts: Post[];

  isMobileDevice: boolean;

  constructor(private featuredPostService: FeaturedPostService
    , private postService: PostService
    , private conccurencyService: ConcurrencyService) { }

  ngOnInit() {
    this.isMobileDevice = isMobileDevice();
    this.featuredPostService.getList("activity").subscribe(featuredPosts => {
      this.featuredPosts = featuredPosts;
      console.log(featuredPosts);
    });
  }

  @HostListener('window:resize') changeSlideDimensionRate() {
    this.isMobileDevice = isMobileDevice();
  }
}
