import { CookieService } from "ngx-cookie-service";
import { baseURL } from "./baseURL";
import { InjectorWrapper } from "./InjectorWrapper";

const idempotentRequestMethods = ['get', 'head', 'options', 'trace'];

export function restangularConfig(RestangularProvider) {
  RestangularProvider
    .setBaseUrl(baseURL)
    .setPlainByDefault(true)
    .addFullRequestInterceptor(
      (element, operation: string, path, url, headers, params) => {
        if ( idempotentRequestMethods.some(method => operation.includes(method)) ) {
          return {}
        }
        const cookieService = InjectorWrapper.injector.get(CookieService);
        const token = cookieService.get("XSRF-TOKEN");
        return {
          headers: Object.assign({}, headers, { "X-XSRF-TOKEN": token })
        };
      }
    );
}