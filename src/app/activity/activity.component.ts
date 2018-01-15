import { Component, OnInit, HostListener, HostBinding } from '@angular/core';
import { Post } from '../shared/Post';
import { ActivityTopPostService } from '../services/activity-top-post.service';
import { PostService } from '../services/post.service';
import { ActivityTopPost } from '../shared/activityTopPost';
import { Observable } from 'rxjs/Observable';
import { ConcurrencyService } from '../services/concurrency.service';
import { isMobileDevice } from '../shared/isMobileDevice';
import { appearDisappear } from '../animation/appear-disapear';

@Component({
  selector: 'app-activity',
  providers: [ ActivityTopPostService, PostService, ConcurrencyService ],
  animations: [ appearDisappear(true) ],
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss']
})
export class ActivityComponent implements OnInit {

  @HostBinding('@routeAppearDisappear') routeAnimationState = true;

  activityTopPosts: Post[];

  isMobileDevice: boolean;

  constructor(private activityTopPostService: ActivityTopPostService
    , private postService: PostService
    , private conccurencyService: ConcurrencyService) { }

  ngOnInit() {
    this.isMobileDevice = isMobileDevice();
    this.activityTopPostService.getList().subscribe(atps => {
    
      var ids: string[] = [];
      for(let atp of atps) {
        ids.push(atp.postID);
      }
      
      this.conccurencyService.getMany( this.postService, ids )
        .subscribe( posts => this.activityTopPosts = posts );
    });
  }

  @HostListener('window:resize') changeSlideDimensionRate() {
    this.isMobileDevice = isMobileDevice();
  }
}
