import { baseURL } from './baseURL';
import { InjectionToken } from '@angular/core';
import { Restangular } from 'ngx-restangular';

export const REST_FUL_RESPONSE = new InjectionToken<any>('RestFulResponse');

export function restangularFullResponseConfig(restangular: Restangular) {
    return restangular.withConfig( restangularConfigurer => {
      restangularConfigurer.setFullResponse(true);
    });
}