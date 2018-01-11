import { Component, OnInit, AfterContentInit, OnDestroy, Input, ContentChildren, QueryList} from '@angular/core';
import { swipeLeftSwipeRight } from '../animation/swipe-left-swipe-right';
import { PostPreview } from '../shared/PostPreview';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { async } from 'rxjs/scheduler/async';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import { SlideShowComponent } from './slide-show/slide-show.component';

@Component({
  selector: 'app-slide',
  templateUrl: './slide.component.html',
  styleUrls: ['./slide.component.scss'],
  animations: [ swipeLeftSwipeRight() ]
})
export class SlideComponent implements OnInit, AfterContentInit, OnDestroy {

  @Input() showIndicator: boolean = false;
  @ContentChildren(SlideShowComponent) slideShows: QueryList<SlideShowComponent>;

  currentIndex: number = 0;

  positions: string[];

  autoSwipeSubscription: Subscription;

  lastClickedTime: number;
  
  constructor() {
  }

  ngOnInit() {
  }

  ngAfterContentInit() {
    if(this.slideShows.length === 0) {
      this.positions = [];
      return;
    }

    var positions: string[] = [];
    let length = this.slideShows.length;
    for(var i = 0; i < length; i++) {
      positions.push('right');
    }
    positions[0] = 'center';

    this.positions = positions;
    
    this.lastClickedTime = Date.now();

    this.autoSwipeSubscription = this.autoSwipe();
  }

  ngOnDestroy() {
    this.autoSwipeSubscription.unsubscribe();
  }

  swipeTo(index: number, forceDirection?: string) {
    if(index === this.currentIndex) return;

    index = index % this.slideShows.length;

    if(forceDirection === 'left' || index > this.currentIndex) {
      this.positions[index] = 'right';

      Observable.of(null, async).map( value => {
        this.positions[this.currentIndex] = 'left';
        this.positions[index] = 'center';
        this.currentIndex = index;
        return value;
      }).subscribe();
    }
    else if(forceDirection === 'right' || index < this.currentIndex) {
      this.positions[index] = 'left';

      Observable.of(null, async).map( value => {
        this.positions[this.currentIndex] = 'right';
        this.positions[index] = 'center';
        this.currentIndex = index;
        return value;
      }).subscribe();
    }
  }

  autoSwipe(): Subscription {
    return Observable.interval(8000).filter( (_, _2) => {
      return Date.now() - this.lastClickedTime >= 8000;
    }).subscribe( _ => {
      this.swipeTo( (this.currentIndex + 1) % this.slideShows.length, 'left');
    });
  }

  moveTo(index: number) {
    this.lastClickedTime = Date.now();
    this.swipeTo(index);
  }
}
