import { defineMessages } from '@openedx/frontend-base';

// TODO: Update the messages as per new designs once we have the designs ready for subscription types other than 'trial'.
const messages = defineMessages({
  activeSubscriptionTitle: {
    id: 'learner-dash.subscriptionBanner.banners.activeSubscriptionTitle',
    description: 'Message to learners with an active subscription',
    defaultMessage: 'Your subscription is now active',
  },
  activeSubscriptionBody: {
    id: 'learner-dash.subscriptionBanner.banners.activeSubscriptionBody',
    description: 'Message to learners with an active subscription',
    defaultMessage: 'On {subscriptionStartDate} you subscribed to edX subscription product. Your subscription will renew on {subscriptionRenewalDate}.',
  },
  activeTrialSubscriptionTitle: {
    id: 'learner-dash.subscriptionBanner.banners.activeTrialSubscriptionTitle',
    description: 'Message to learners with an active trial subscription',
    defaultMessage: 'Your edX subscription trial expires in {daysLeft} days.',
  },
  activeTrialSubscriptionTitleToday: {
    id: 'learner-dash.subscriptionBanner.banners.activeTrialSubscriptionTitleToday',
    description: 'Message to learners with a trial subscription expiring today',
    defaultMessage: 'Your edX subscription trial expires today.',
  },
  activeTrialSubscriptionTitleTomorrow: {
    id: 'learner-dash.subscriptionBanner.banners.activeTrialSubscriptionTitleTomorrow',
    description: 'Message to learners with a trial subscription expiring tomorrow',
    defaultMessage: 'Your edX subscription trial expires tomorrow.',
  },
  activeTrialSubscriptionBody: {
    id: 'learner-dash.subscriptionBanner.banners.activeTrialSubscriptionBody',
    description: 'Message to learners with an active trial subscription',
    defaultMessage: 'Your subscription will renew on {subscriptionEndDate}.',
  },
  cancelledSubscriptionTitle: {
    id: 'learner-dash.subscriptionBanner.banners.cancelledSubscriptionTitle',
    description: 'Message to learners with a cancelled subscription',
    defaultMessage: 'Your subscription is cancelled',
  },
  cancelledSubscriptionBody: {
    id: 'learner-dash.subscriptionBanner.banners.cancelledSubscriptionBody',
    description: 'Message to learners with a cancelled subscription',
    defaultMessage: 'Your subscription expired on {subscriptionEndDate}. Renew now to continue enjoying your courses without interruption.',
  },
  renewSubscriptionButton: {
    id: 'learner-dash.subscriptionBanner.banners.renewSubscriptionButton',
    description: 'Renew Subscription',
    defaultMessage: 'Renew Subscription',
  },
});

export default messages;
