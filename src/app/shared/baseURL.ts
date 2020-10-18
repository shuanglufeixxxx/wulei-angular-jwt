import { deploymentUrl, developUrl, production } from "./environment";

export const baseURL = production ? deploymentUrl : developUrl;