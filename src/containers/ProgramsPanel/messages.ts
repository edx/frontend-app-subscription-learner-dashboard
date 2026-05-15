import { defineMessages } from '@openedx/frontend-base';

const messages = defineMessages({
  myPrograms: {
    id: 'dashboard.myPrograms',
    defaultMessage: 'Programs',
    description: 'Label for Programs belonging to a user\'s active subscription',
  },
  programsMessage: {
    id: 'subs.programsMessage',
    defaultMessage: 'In-progress professional certificate programs will be found here.',
    description: 'Message shown in the Programs tab of the learner dashboard',
  }
});

export default messages;
