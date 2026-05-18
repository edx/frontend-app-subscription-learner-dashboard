import { defineMessages } from '@openedx/frontend-base';

const messages = defineMessages({
  beginCourse: {
    id: 'learner-dash.courseCard.actions.beginCourse',
    description: 'Course card begin-course button text',
    defaultMessage: 'Begin Course',
  },
  resume: {
    id: 'learner-dash.courseCard.actions.resume',
    description: 'Course card resume button text',
    defaultMessage: 'Resume',
  },
  viewCourse: {
    id: 'learner-dash.courseCard.actions.viewCourse',
    description: 'Course card view-course button text',
    defaultMessage: 'View Course',
  },
  selectSession: {
    id: 'learner-dash.courseCard.actions.selectSession',
    description: 'Course card select-session button text',
    defaultMessage: 'Select Session',
  },
  subsVerifiedCourseText: {
    id: 'subs.learner-dash.courseCard.actions.verifiedText',
    description: 'Text for verified courses included in edx Unlimited',
    defaultMessage: 'Verified with edX Unlimited',
  },
  subsIncludedCourseText: {
    id: 'subs.learner-dash.courseCard.actions.includedText',
    description: 'Text for unverified (audited) courses included in edx Unlimited',
    defaultMessage: 'Included in edX Unlimited',
  },
});

export default messages;
