import { getAuthenticatedHttpClient, getSiteConfig } from '@openedx/frontend-base';

export async function getProgramProgressData(uuid: string) {
  const baseUrl = getSiteConfig().lmsBaseUrl;
  const url = `${baseUrl}/api/dashboard/v0/programs/${encodeURIComponent(uuid)}/progress_details/`;
  return getAuthenticatedHttpClient().get(url);
}
