import { defineMessages } from '@openedx/frontend-base';

const messages = defineMessages({
  activeSubscriptionTitle: {
    id: 'learner-dash.courseCard.banners.activeSubscriptionTitle',
    description: 'Message to learners with an active subscription',
    defaultMessage: 'Your subscription is now active',
  },
  activeSubscriptionBody: {
    id: 'learner-dash.courseCard.banners.activeSubscriptionBody',
    description: 'Message to learners with an active subscription',
    defaultMessage: 'On {subscriptionStartDate} you subscribed to edX subscription product. Your subscription will renew on {subscriptionRenewalDate} for {subscriptionRenewalPrice}.',
  },
  activeTrialSubscriptionTitle: {
    id: 'learner-dash.courseCard.banners.activeTrialSubscriptionTitle',
    description: 'Message to learners with an active trial subscription',
    defaultMessage: 'Your subscription trial is active',
  },
  activeTrialSubscriptionBody: {
    id: 'learner-dash.courseCard.banners.activeTrialSubscriptionBody',
    description: 'Message to learners with an active trial subscription',
    defaultMessage: 'Your trial started on {subscriptionStartDate}. Your subscription will renew on {subscriptionRenewalDate} for {subscriptionRenewalPrice} unless you cancel your trial.',
  },
  cancelledSubscriptionTitle: {
    id: 'learner-dash.courseCard.banners.cancelledSubscriptionTitle',
    description: 'Message to learners with an cancelled subscription',
    defaultMessage: 'Your subscription is cancelled',
  },
  cancelledSubscriptionBody: {
    id: 'learner-dash.courseCard.banners.cancelledSubscriptionBody',
    description: 'Message to learners with an cancelled subscription',
    defaultMessage: 'Your subscription expired on {subscriptionEndDate}. Renew now to continue enjoying your courses without interruption.',
  },
});

export default messages;
