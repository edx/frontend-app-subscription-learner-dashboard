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
  },
  explorePrograms: {
    id: 'subs.programsMessage',
    defaultMessage: 'Explore programs',
    description: 'Message shown in the explore programs button in the Programs tab of the learner dashboard',
  },
  exploreProgramsCTAMessage: {
    id: 'subs.programsMessage',
    defaultMessage: 'Advance your learning by exploring a program curriculum.',
    description: 'Message shown in the explore programs button in the Programs tab of the learner dashboard',
  }
});

export default messages;
