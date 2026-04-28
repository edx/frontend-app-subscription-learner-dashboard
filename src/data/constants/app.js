import { StrictDict } from '../../utils';
export const locationId = window.location.pathname.slice(1);

export const SortKeys = StrictDict({
  enrolled: 'enrolled',
  title: 'title',
});

export const FilterKeys = StrictDict({
  inProgress: 'inProgress',
  notStarted: 'notStarted',
  done: 'done',
  notEnrolled: 'notEnrolled',
  upgraded: 'upgraded',
});

export const ListPageSize = 25;

export const subscriptionRenewalURL = 'https://courses.edx.org/renew-subscription';
