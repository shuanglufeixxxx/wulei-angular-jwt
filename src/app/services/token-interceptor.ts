import { Injectable } from "@angular/core";
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpHeaders,
} from "@angular/common/http";
import { Observable } from "rxjs";
import debugModule from 'debug';

import { appName } from '../shared/appName'
import { tokenName } from "../shared/tokenName";
import { token } from "./account.service";


const debug = debugModule(appName + ':/src/services/token-interceptor');

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    debug()
    if( token.token == null ) return next.handle(req);

    debug(':29 intercept req.headers.get(tokenName)=', req.headers.get(tokenName))
    return next.handle(
      req.clone({
        headers: new HttpHeaders({
          [tokenName]: token.token
        })
      }));
  }
}
