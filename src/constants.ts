import { ProductType } from './types/types';

export const appId = 'org.openedx.frontend.app.learnerDashboard';

export const HITS_PER_PAGE_PROGRAMS = 4;
export const HITS_PER_PAGE_COURSES = 4;

/** Facet attribute names in ALGOLIA_PRODUCT_INDEX_NAME — update if your index differs */
export const FACET_PRODUCT_TYPE = 'product';
export const FACET_SUBJECTS = 'subjects';

export const PRODUCT_TYPE_PROGRAM: ProductType = 'program';
export const PRODUCT_TYPE_COURSE: ProductType = 'course';
