import { defineMessages } from '@openedx/frontend-base';

const messages = defineMessages({
  popularCoursesHeader: {
    id: 'subs-dash.popularCoursesPanel.header',
    defaultMessage: 'Popular courses',
    description: 'Label for the popular courses section',
  },
  popularCoursesErrorText: {
    id: 'subs-dash.popularCoursesPanel.errorText',
    defaultMessage: 'Failed to load popular courses. Please try again later.',
    description: 'Error text for failing to load popular courses',
  },
});

export default messages;
