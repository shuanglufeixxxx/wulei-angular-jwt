import { Component, OnInit, AfterContentInit, OnDestroy, Input, ContentChildren, QueryList} from '@angular/core';
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
  styleUrls: ['./slide.component.scss']
})
export class SlideComponent implements OnInit, AfterContentInit, OnDestroy {

  @Input() showIndicator: boolean = false;
  @Input() autoPlay: boolean = false;
  
  @ContentChildren(SlideShowComponent) _slideShows: QueryList<SlideShowComponent>;
  slideShows: SlideShowComponent[];

  currentIndex: number = 0;

  animationName: string[];

  autoSwipeSubscription: Subscription;

  afterClickedSubject: Subject<any> = new Subject<any>();
  
  constructor() {
  }

  ngOnInit() {
  }

  ngAfterContentInit() {
    this.slideShows = this._slideShows.toArray();
    
    this.animationName = new Array<string>(this.slideShows.length);

    if(this.slideShows.length > 0 && this.autoPlay) {
      this.autoSwipeSubscription = this.autoSwipe();
    }
  }

  ngOnDestroy() {
    if(this.autoSwipeSubscription) {
      this.autoSwipeSubscription.unsubscribe();
    }
  }

  swipeTo(index: number, forceDirection?: string) {
    if(index === this.currentIndex || index < 0 || index >= this.animationName.length) return;

    var direction: string = '';

    if(forceDirection) {
      direction = forceDirection;
    } else {
      direction = index > this.currentIndex ? 'left' : 'right';
    }

    if(direction === 'left') {
      this.animationName[this.currentIndex] = 'swipeLeftDisappear';
      this.animationName[index] = 'swipeLeftAppear';
      this.currentIndex = index;
    }
    else if(direction === 'right') {
      this.animationName[this.currentIndex] = 'swipeRightDisappear';
      this.animationName[index] = 'swipeRightAppear';
      this.currentIndex = index;
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
