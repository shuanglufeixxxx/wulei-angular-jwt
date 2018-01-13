import { Injectable } from '@angular/core';
import { Restangular } from 'ngx-restangular';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/empty';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/merge';
import 'rxjs/add/operator/concat';
import 'rxjs/add/operator/pairwise';
import 'rxjs/add/operator/reduce';
import { Gettable } from './gettable';

@Injectable()
export class ConcurrencyService {

  constructor(private restangular: Restangular) { }

  getMany<T>(gettable: Gettable<T>, ids: string[]): Observable<T[]> {
    if(ids === null || ids.length === 0) {
      return Observable.empty();
    }
    
    var mergedObservable: Observable<any[]> = Observable.empty();
    for(var i = 0; i < ids.length; i++) {
      mergedObservable = mergedObservable.merge(
        gettable.get( ids[i] ).concat( Observable.of(i) ).pairwise()
      );
    }

    return mergedObservable.reduce( (accumulator, pair) => {
      let value = pair[0] as T;
      let index = pair[1] as number;
      accumulator[index] = value;
      return accumulator;
    }, new Array<T>(ids.length));
  }
}