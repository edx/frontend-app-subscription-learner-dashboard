import { defineMessages } from '@openedx/frontend-base';

const messages = defineMessages({
  activeSubscriptionTitle: {
    id: 'learner-dash.subscriptionBaner.banners.activeSubscriptionTitle',
    description: 'Message to learners with an active subscription',
    defaultMessage: 'Your subscription is now active',
  },
  activeSubscriptionBody: {
    id: 'learner-dash.subscriptionBaner.banners.activeSubscriptionBody',
    description: 'Message to learners with an active subscription',
    defaultMessage: 'On {subscriptionStartDate} you subscribed to edX subscription product. Your subscription will renew on {subscriptionRenewalDate}.',
  },
  activeTrialSubscriptionTitle: {
    id: 'learner-dash.subscriptionBaner.banners.activeTrialSubscriptionTitle',
    description: 'Message to learners with an active trial subscription',
    defaultMessage: 'Your subscription free trial is active',
  },
  activeTrialSubscriptionBody: {
    id: 'learner-dash.subscriptionBaner.banners.activeTrialSubscriptionBody',
    description: 'Message to learners with an active trial subscription',
    defaultMessage: 'Your subscription will renew on {subscriptionRenewalDate}.',
  },
  cancelledSubscriptionTitle: {
    id: 'learner-dash.subscriptionBaner.banners.cancelledSubscriptionTitle',
    description: 'Message to learners with an cancelled subscription',
    defaultMessage: 'Your subscription is cancelled',
  },
  cancelledSubscriptionBody: {
    id: 'learner-dash.subscriptionBaner.banners.cancelledSubscriptionBody',
    description: 'Message to learners with an cancelled subscription',
    defaultMessage: 'Your subscription expired on {subscriptionEndDate}. Renew now to continue enjoying your courses without interruption.',
  },
  renewSubscriptionButton: {
    id: 'learner-dash.subscriptionBaner.banners.renewSubscriptionButton',
    description: 'Renew Subscription',
    defaultMessage: 'Renew Subscription',
  },
});

export default messages;
