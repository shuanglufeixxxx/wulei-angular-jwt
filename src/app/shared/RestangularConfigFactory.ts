import { baseURL } from './baseURL';

export function restangularConfigFactory(RestangularProvider) {
    RestangularProvider.setBaseUrl(baseURL);
}