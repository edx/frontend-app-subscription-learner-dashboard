import { defineMessages } from '@openedx/frontend-base';

const messages = defineMessages({
  myCourses: {
    id: 'dashboard.mycourses',
    defaultMessage: 'Courses',
    description: 'Label for courses belonging to a user\'s active subscription',
  },
  limitedCourse: {
    id: 'subs.limitedCourses',
    defaultMessage: 'Limited access courses',
    description: 'Label for subscription courses with limited access',
  },
  lastSession: {
    id: 'subs.lastSession',
    defaultMessage: 'Last session was Thursday, May 20, 2026.', // This is a placeholder default message. The actual message should be dynamic based on the last session date received via api.
    description: 'Label for subscription courses to show last session information',
  }
});

export default messages;
