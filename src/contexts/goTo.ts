import { environment } from "../environments/environment";


export const goTo = (url: string) => {
    switch (environment.platform) {
        case 'web':
            window.location.assign(url);
            break;
        default:
    }
}