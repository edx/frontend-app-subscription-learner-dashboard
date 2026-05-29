import { defineMessages } from '@openedx/frontend-base';

const messages = defineMessages({
  programsListHeaderText: {
    defaultMessage: 'Programs',
    id: 'programs.list.header.text',
    description: 'Header text for the programs list',
  },
  programsListDescriptionText: {
    defaultMessage: 'When you enroll in a course associated with a program — professional certificate or MicroMasters — the program will be displayed here',
    id: 'programs.list.description.text',
    description: 'Description text for the programs list',
  },
  progressCategoryBubblesRemaining: {
    id: 'dashboard.programs.program.listing.card.remaining.courses.count',
    defaultMessage: 'Remaining',
    description: 'Label for remaining courses count on program card',
  },
  progressCategoryBubblesInProgress: {
    id: 'dashboard.programs.program.listing.card.inProgress.courses.count',
    defaultMessage: 'In Progress',
    description: 'Label for in progress courses count on program card',
  },
  progressCategoryBubblesSuccess: {
    id: 'dashboard.programs.program.listing.card.completed.courses.count',
    defaultMessage: 'Completed',
    description: 'Label for completed courses count on program card',
  },
  errorLoadingProgramEnrollments: {
    id: 'alert.error.loading.program.enrollments',
    defaultMessage: 'An error occurred while attempting to retrieve program enrollments. Try refreshing the page. If that doesn\'t solve the issue, contact support at {contactSupportUrl}.',
    description: 'Alert message for failure to load program enrollments',
  },
});

export default messages;
