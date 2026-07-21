import { defineMessages } from '@openedx/frontend-base';

const messages = defineMessages({
  dashboardTitle: {
    id: 'Dashboard.Title',
    defaultMessage: 'Subscriber Dashboard',
    description: 'Title for the subscriber dashboard',
  },
  dashboardSubtitle: {
    id: 'Dashboard.Subtitle',
    defaultMessage: 'Your home for all of your future learning with edX Unlimited.',
    description: 'Subtitle for the subscriber dashboard',
  },
  dashboardHeaderWelcomeTitle: {
    id: 'Dashboard.Header.Welcome.Title',
    defaultMessage: 'Welcome to your learning home.',
    description: 'Welcome message for the subscriber dashboard',
  },
  dashboardHeaderWelcomeMessage: {
    id: 'Dashboard.Header.Welcome.Message',
    defaultMessage: 'Subscriber since {startDate}.',
    description: 'Additional content for the subscriber dashboard',
  },
});

export default messages;
