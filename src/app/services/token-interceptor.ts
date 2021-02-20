import { Injectable } from "@angular/core";
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from "@angular/common/http";

import { Observable } from "rxjs";
import { tokenName } from "../shared/tokenName";
import { token } from "./account.service";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    token && req.headers.set(tokenName, token);
    return next.handle(req);
  }
}
