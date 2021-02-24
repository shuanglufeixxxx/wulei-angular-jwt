import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/observable/fromEvent';

export const deviceWidthThreshold: number = 600;

@Injectable()
export class DimensionService {

  private windowDimensionSubject: BehaviorSubject<any>;

  constructor() {
    this.windowDimensionSubject = new BehaviorSubject({
      width: window.innerWidth,
      height: window.innerHeight,
      isMobileDevice: window.innerWidth < deviceWidthThreshold
    });

    Observable
      .fromEvent<any>(window, 'resize')
      .map(ev => {
        return {
          width: ev.target.innerWidth,
          height: ev.target.innerHeight,
          isMobileDevice: ev.target.innerWidth < deviceWidthThreshold
        };
      })
      .subscribe(this.windowDimensionSubject);
  }

  windowDimension(): Observable<any> {
    return new Observable(observer => {
      const subscription = this.windowDimensionSubject
        .subscribe(observer);

      return () => subscription.unsubscribe();
    })
  }
}