import { Injectable } from "@angular/core";
import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpHeaders,
} from "@angular/common/http";
import { Observable } from "rxjs";
import debugModule from 'debug';

import { appName } from '../configs/appName'
import { tokenName } from "../configs/tokenName";
import { AccountService } from "../services/account.service";
import { environment } from "../../environments/environment";

environment.production && debugModule.disable()

const debug = debugModule(appName + ':/src/services/token-interceptor');

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private accountService: AccountService) { }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<any> {
    return this.accountService.getTokenOnce()
      .switchMap(tk => {
        if (tk == null ) return next.handle(req);

        debug(':29 intercept req.headers.get(tokenName)=', req.headers.get(tokenName))
        return next.handle(
          req.clone({
            headers: new HttpHeaders({
              [tokenName]: tk
            })
          }));
      })
  }
}
