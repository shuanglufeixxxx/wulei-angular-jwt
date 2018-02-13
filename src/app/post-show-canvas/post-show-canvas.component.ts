import { Component, OnInit, OnDestroy, Input, HostListener, HostBinding } from '@angular/core';
import { Post } from '../shared/Post';
import { FeaturedPostService } from '../services/featured-post.service';
import { PostService } from '../services/post.service';
import { Observable } from 'rxjs/Observable';
import { ConcurrencyService } from '../services/concurrency.service';
import { appearDisappear } from '../animation/appear-disapear';
import { DimensionService } from '../services/dimension.service';
import { Subscription } from 'rxjs/Subscription';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-post-show-canvas',
  animations: [ appearDisappear(true) ],
  templateUrl: './post-show-canvas.component.html',
  styleUrls: ['./post-show-canvas.component.scss']
})
export class PostShowCanvasComponent implements OnInit, OnDestroy {

  @HostBinding('@routeAppearDisappear') routeAnimationState = true;

  @Input() classify: string;

  topPosts: Post[];
  featuredPosts: Post[];

  topPostContainerHeight: number;

  setHeightSubscription: Subscription;

  constructor(private titleService: Title
    , private featuredPostService: FeaturedPostService
    , private postService: PostService
    , private dimensionService: DimensionService
  ) {
  }

  ngOnInit() {
    this.titleService.setTitle( "WULEI - " + ( this.classify ? this.classify.toUpperCase() : "" ) );

    this.setHeightSubscription = this.getTopPostContainerHeight()
      .subscribe(height => this.topPostContainerHeight = height);
    
    if(this.classify) {
      this.featuredPostService
        .getList(this.classify)
        .subscribe(featuredPosts => {
          this.prepareContent(featuredPosts);
        });
    }
  }

  ngOnDestroy() {
    this.setHeightSubscription.unsubscribe();
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

  getTopPostContainerHeight(): Observable<number> {
    return this.dimensionService
      .windowDimension()
      .map(dimension => {
        var topPostContainerHeight: number;

        if(dimension.isMobileDevice) {
          topPostContainerHeight = dimension.width;
        }
        else if( (dimension.height - 120) / dimension.width < 1 / 3 ) {
          topPostContainerHeight = dimension.width / 3;
        }
        else if( (dimension.height - 120) / dimension.width > 1 ) {
          topPostContainerHeight = dimension.width
        }
        else {
          topPostContainerHeight = dimension.height - 120;
        }

        return topPostContainerHeight;
      });
  }
}
