import { CookieService } from "ngx-cookie-service";
import { baseURL } from "./baseURL";
import { InjectorWrapper } from "./InjectorWrapper";

export function restangularConfig(RestangularProvider) {
  RestangularProvider
    .setBaseUrl(baseURL)
    .setPlainByDefault(true)
    .addFullRequestInterceptor(
      (element, operation, path, url, headers, params) => {
        const cookieService = InjectorWrapper.injector.get(CookieService);
        const token = cookieService.get("XSRF-TOKEN");
        return {
          headers: Object.assign({}, headers, { "X-XSRF-TOKEN": token }),
        };
      }
    );
}