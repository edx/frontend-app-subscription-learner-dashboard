import { defineMessages } from '@openedx/frontend-base';

const messages = defineMessages({
  recentlyViewedHeader: {
    id: 'subs-dash.recentlyViewedPanel.header',
    defaultMessage: 'Recently viewed courses and programs',
    description: 'Label for the recently viewed courses and programs section',
  },
  recentlyViewedErrorText: {
    id: 'subs-dash.recentlyViewedPanel.errorText',
    defaultMessage: 'Failed to load recently viewed courses and programs. Please try again later.',
    description: 'Error text for failing to load recently viewed courses and programs',
  },
});

export default messages;
