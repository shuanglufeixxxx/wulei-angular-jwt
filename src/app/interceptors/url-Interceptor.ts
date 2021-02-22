import { Injectable } from "@angular/core";
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from "@angular/common/http";

import { Observable } from "rxjs";
import { baseUrl } from "../configs/baseUrl";

const tokenName = 'access-token';

@Injectable()
export class UrlInterceptor implements HttpInterceptor {

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const r = req.clone({ url: baseUrl + req.url });
    return next.handle(r);
  }
}
