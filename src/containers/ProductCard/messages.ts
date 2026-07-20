import { defineMessages } from '@openedx/frontend-base';

const messages = defineMessages({
  weeksToComplete: {
    id: 'subs-dash.weeksToComplete.label',
    defaultMessage: '{count, plural, one {# week to complete} other {# weeks to complete}}',
    description: 'Label for the weeks to complete field',
  },
  level: {
    id: 'subs-dash.level.label',
    defaultMessage: '{level} level',
    description: 'Label for the level field',
  }
});

export default messages;
