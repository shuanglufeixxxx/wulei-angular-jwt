import { Component, OnInit, HostListener } from '@angular/core';
import { PostPreview } from '../shared/PostPreview';
import { ActivityTopPostService } from '../services/activity-top-post.service';
import { PostPreviewService } from '../services/post-preview.service';
import { ActivityTopPost } from '../shared/activityTopPost';
import { Observable } from 'rxjs/Observable';
import { ConcurrencyService } from '../services/concurrency.service';
import { isMobileDevice } from '../shared/isMobileDevice';
import { ShowElement } from '../slide/show/show-element';
import { PostPreviewComponent } from '../post-preview/post-preview.component';

@Component({
  selector: 'app-activity',
  providers: [ ActivityTopPostService, PostPreviewService, ConcurrencyService ],
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss']
})
export class ActivityComponent implements OnInit {

  activityTopPostPreviews: PostPreview[];

  showElements: ShowElement[];

  isMobileDevice: boolean;

  constructor(private activityTopPostService: ActivityTopPostService
    , private postPreviewService: PostPreviewService
    , private conccurencyService: ConcurrencyService) { }

  ngOnInit() {
    this.isMobileDevice = isMobileDevice();
    this.activityTopPostService.getList().subscribe(atps => {
    
      var ids: string[] = [];
      for(let atp of atps) {
        ids.push(atp.postID);
      }
      
      this.conccurencyService.getMany( this.postPreviewService, ids )
        .subscribe( previews => {
          this.activityTopPostPreviews = previews;
          var elements: ShowElement[] = [];
          for(let el of this.activityTopPostPreviews) {
            elements.push( new ShowElement(PostPreviewComponent, el) );
          }
          this.showElements = elements;
        });
    });
  }

  @HostListener('window:resize') changeSlideDimensionRate() {
    this.isMobileDevice = isMobileDevice();
  }
}
