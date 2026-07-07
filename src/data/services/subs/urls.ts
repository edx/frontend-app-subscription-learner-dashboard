import { getSiteConfig } from '@openedx/frontend-base';
import StrictDict from '@src/utils/StrictDict';

export const getApiUrl = () => (`${getSiteConfig().lmsBaseUrl}/api`);

const getSubsInitApiUrl = () => (`${getApiUrl()}/subscription/init/`);

export const programProgressUrl = (uuid: string) => `${getApiUrl()}/subscription/programs/${encodeURIComponent(uuid)}/`;

export const programsApiUrl = () => `${getApiUrl()}/subscription/programs/dashboard/`;

export const getSubsCoursesApiUrl = () => (`${getApiUrl()}/subscription/courses/dashboard/`);

export default StrictDict({
  getApiUrl,
  programProgressUrl,
  programsApiUrl,
  getSubsCoursesApiUrl,
  getSubsInitApiUrl,
});
