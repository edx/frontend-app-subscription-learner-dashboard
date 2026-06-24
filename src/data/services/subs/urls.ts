import { getSiteConfig } from '@openedx/frontend-base';

export const getApiUrl = () => (`${getSiteConfig().lmsBaseUrl}/api`);

export const programProgressUrl = (uuid: string) => `${getApiUrl()}/dashboard/v0/programs/${encodeURIComponent(uuid)}/progress_details/`;
export const programsApiUrl = () => `${getApiUrl()}/subscription/programs/dashboard/`;
