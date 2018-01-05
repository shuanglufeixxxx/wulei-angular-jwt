import { Observable } from "rxjs/Observable";

export interface Gettable<T> {
  get(id: string): Observable<T>;
}