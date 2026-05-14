import { defineMessages } from '@openedx/frontend-base';

const messages = defineMessages({
  statusMessage: {
    id: 'learner-dash.subscriptionBaner.banners.activeSubscriptionTitle',
    description: 'Status Message',
    defaultMessage: 'Subscription Status',
  },
  cancelledMessage: {
    id: 'learner-dash.subscriptionBaner.banners.activeSubscriptionBody',
    description: 'Information of courses enrolled and savings',
    defaultMessage: `You have saved {totalSavings} with your subscription so far!`,
  },
  coursesEnrollmentMessage: {
    id: 'learner-dash.subscriptionBaner.banners.activeSubscriptionBody',
    description: 'Information of courses enrolled and savings',
    defaultMessage: `As a subscriber, you've enrolled in {numberOfCoursesEnrolled} courses and saved {totalSavings}.`,
  },
  renewalMessage: {
    id: 'learner-dash.subscriptionBaner.banners.renewSubscriptionButton',
    description: 'Subscription Schedule',
    defaultMessage: 'Subscription payment scheduled for {subscriptionRenewalDate}.',
  },
  manageSubscriptionMessage: {
    id: 'learner-dash.subscriptionBaner.banners.renewSubscriptionButton',
    description: 'Manage Subscription',
    defaultMessage: 'Manage my subscription',
  },
});

export default messages;
