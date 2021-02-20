import { Injectable } from "@angular/core";
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from "@angular/common/http";

import { Observable } from "rxjs";
import { baseUrl } from "../shared/baseUrl";

const tokenName = 'access-token';

@Injectable()
export class JsonContentTypeInterceptor implements HttpInterceptor {

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    req.clone({ url: `${baseUrl}/${req.url}` });
    return next.handle(req);
  }
}
