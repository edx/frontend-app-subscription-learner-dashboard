import { defineMessages } from '@openedx/frontend-base';

const messages = defineMessages({
  statusMessage: {
    id: 'learner-dash.subscriptionInformation.information.subscriptionStatus',
    description: 'Status Message',
    defaultMessage: 'Subscription Status',
  },
  cancelledMessage: {
    id: 'learner-dash.subscriptionInformation.information.courseInformation',
    description: 'Information of courses enrolled and savings',
    defaultMessage: `You have saved {totalSavings} with your subscription so far!`,
  },
  coursesEnrollmentMessage: {
    id: 'learner-dash.subscriptionInformation.information.enrollmentInformation',
    description: 'Information of courses enrolled and savings',
    defaultMessage: `As a subscriber, you've enrolled in {numberOfCoursesEnrolled} courses and saved {totalSavings}.`,
  },
  renewalMessage: {
    id: 'learner-dash.subscriptionInformation.information.subscriptionSchedule',
    description: 'Subscription Schedule',
    defaultMessage: 'Subscription payment scheduled for {subscriptionRenewalDate}.',
  },
  manageSubscriptionMessage: {
    id: 'learner-dash.subscriptionInformation.information.manageSubscription',
    description: 'Manage Subscription',
    defaultMessage: 'Manage my subscription',
  },
});

export default messages;
