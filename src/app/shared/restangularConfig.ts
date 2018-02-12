import { baseURL } from './baseURL';

export function restangularConfig(RestangularProvider) {
    RestangularProvider
        .setBaseUrl(baseURL)
        .setPlainByDefault(true);
}