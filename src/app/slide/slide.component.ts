import { Component, OnInit, AfterContentInit, OnDestroy, Input, ContentChildren, QueryList} from '@angular/core';
import { swipeLeftSwipeRight } from '../animation/swipe-left-swipe-right';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { async } from 'rxjs/scheduler/async';
import { SlideShowComponent } from './slide-show/slide-show.component';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/interval';

@Component({
  selector: 'app-slide',
  templateUrl: './slide.component.html',
  styleUrls: ['./slide.component.scss'],
  animations: [ swipeLeftSwipeRight() ]
})
export class SlideComponent implements OnInit, AfterContentInit, OnDestroy {

  @Input() showIndicator: boolean = false;
  @Input() autoPlay: boolean = false;
  
  @ContentChildren(SlideShowComponent) slideShows: QueryList<SlideShowComponent>;

  currentIndex: number = 0;

  positions: string[];

  autoSwipeSubscription: Subscription;

  afterClickedSubject: Subject<any> = new Subject<any>();
  
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

    if(this.autoPlay) {
      this.autoSwipeSubscription = this.autoSwipe();
    }
  }

  ngOnDestroy() {
    if(this.autoSwipeSubscription) {
      this.autoSwipeSubscription.unsubscribe();
    }
  }

  swipeTo(index: number, forceDirection?: string) {
    if(index === this.currentIndex || index < 0 || index >= this.positions.length) return;

    var direction: string = '';

    if(forceDirection) {
      direction = forceDirection;
    } else {
      direction = index > this.currentIndex ? 'left' : 'right';
    }

    if(direction === 'left') {
      this.positions[index] = 'right';

      Observable.of(null, async).map( value => {
        this.positions[this.currentIndex] = 'left';
        this.positions[index] = 'center';
        this.currentIndex = index;
        return value;
      }).subscribe();
    }
    else if(direction === 'right') {
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
    return Observable
      .of(null)
      .concat(this.afterClickedSubject)
      .switchMap( _ => Observable.interval(8000) )
      .map( _ => {
        this.swipeTo( (this.currentIndex + 1) % this.slideShows.length, 'left');
        return null;
      })
      .subscribe();
  }

  moveTo(index: number, forceDirection?: string) {
    this.afterClickedSubject.next("after clicked");
    this.swipeTo(index, forceDirection);
  }
}
