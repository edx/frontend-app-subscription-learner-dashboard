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
  }
});

export default messages;
