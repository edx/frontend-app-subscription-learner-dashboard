import { defineMessages } from '@openedx/frontend-base';

const messages = defineMessages({
  bannerAlt: {
    id: 'learner-dash.courseCard.bannerAlt',
    description: 'Course card banner alt-text',
    defaultMessage: 'Course thumbnail',
  },
  verifiedBanner: {
    id: 'learner-dash.courseCard.verifiedBanner',
    description: 'Course card verified banner',
    defaultMessage: 'Verified',
  },
  verifiedHoverDescription: {
    id: 'learner-dash.courseCard.verifiedHoverDescription',
    description: 'Course card verified hover description',
    defaultMessage: 'You\'re enrolled as a verified student',
  },
  verifiedBannerRibbonAlt: {
    id: 'learner-dash.courseCard.verifiedBannerRibbonAlt',
    description: 'Course card verified banner ribbon alt-text',
    defaultMessage: 'ID Verified Ribbon/Badge',
  },
  subsCourse: {
    id: 'subs.courses',
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
