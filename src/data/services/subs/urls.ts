import { getSiteConfig } from '@openedx/frontend-base';

export const getApiUrl = () => (`${getSiteConfig().lmsBaseUrl}/api`);

export const programProgressUrl = (uuid: string) => `${getApiUrl()}/subscription/programs/${encodeURIComponent(uuid)}/`;
export const programsApiUrl = () => `${getApiUrl()}/subscription/programs/dashboard/`;
