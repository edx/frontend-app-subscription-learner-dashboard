import { ProductType } from './types/types';

export const appId = 'org.openedx.frontend.app.learnerDashboard';

export const HITS_PER_PAGE_PROGRAMS = 4;
export const HITS_PER_PAGE_COURSES = 4;

/** Facet attribute names in ALGOLIA_PRODUCT_INDEX_NAME — update if your index differs */
export const FACET_PRODUCT_TYPE = 'product';
export const FACET_SUBJECTS = 'subjects';

export const PRODUCT_TYPE_PROGRAM: ProductType = 'program';
export const PRODUCT_TYPE_COURSE: ProductType = 'course';

export const subscriptionDashboardRole = 'org.edx.frontend.subs.role.dashboard';

export const subscriptionSignoutRole = 'org.openedx.frontend.role.signOut';

export const subscriptionAccountRole = 'org.openedx.frontend.role.account';

export const subscriptionProfileRole = 'org.openedx.frontend.role.profile';

export const subscriptionProgramProgressRole = 'org.edx.frontend.subs.role.programProgress';

export const subscriptionDashboardUrlPath = '/subscription-learner-dashboard';
