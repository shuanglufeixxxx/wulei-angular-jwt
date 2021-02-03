import { CookieService } from "ngx-cookie-service";
import { baseUrl } from "./baseUrl";
import { InjectorWrapper } from "./InjectorWrapper";

const idempotentRequestMethods = ['get', 'head', 'options', 'trace'];

export function restangularConfig(RestangularProvider) {
  RestangularProvider
    .setBaseUrl(baseUrl)
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