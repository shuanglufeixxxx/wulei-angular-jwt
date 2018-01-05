import { baseURL } from './baseURL';

export function RestangularConfigFactory(RestangularProvider) {
    RestangularProvider.setBaseUrl(baseURL);
}