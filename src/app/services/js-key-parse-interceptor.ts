import { Injectable } from "@angular/core";
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse,
} from "@angular/common/http";
import { Observable } from "rxjs";


const underscoreToUppercase = (oj: any) => {
  if ( oj == null || typeof oj !== 'object') return oj;

  if ( Array.isArray(oj) ) return oj.map(underscoreToUppercase);

  const uppercaseKeyJs = Object.assign({}, oj);
  for (const [key, value] of Object.entries(oj)) {
    const newKey = key.replace(/_[a-z]{1}/g, (match) => {
      return match.charAt(1).toUpperCase();
    });
    Object.assign(uppercaseKeyJs, {
      [newKey]: underscoreToUppercase(value),
    });
  }
  return uppercaseKeyJs;
}


@Injectable()
export class JsKeyParseInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (req.responseType === "json") {
      return next.handle(req).map<any, any>((event) => {
        return (
          (event instanceof HttpResponse &&
            event.clone({
              body: underscoreToUppercase(event.body),
            })) ||
          event
        );
      });
    } else {
      return next.handle(req);
    }
  }
}