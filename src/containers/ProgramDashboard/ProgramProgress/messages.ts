import { defineMessages } from '@openedx/frontend-base';

const messages = defineMessages({
  programProgressInstitutions: {
    defaultMessage: 'Institutions',
    id: 'program.progress.institutions',
    description: 'Label text for organization image logos',
  },
  programTypeLabel: {
    defaultMessage: '{programType} program',
    id: 'program.progress.program.type.label',
    description: 'Label displaying the program type (e.g. "MicroMasters program", "Professional Certificate program")',
  },
  programProgressCompleteHeader: {
    defaultMessage: 'Congratulations!',
    id: 'program.progress.complete.header',
    description: 'header text for the program progress page when all courses are complete',
  },
  programProgressCompleteText: {
    defaultMessage: 'You have successfully completed all the requirements for {programTitle}.',
    id: 'program.progress.complete.text',
    description: 'text to display when a user has completed all of the courses for the program',
  },
  programProgressIncompleteHeader: {
    defaultMessage: 'Your Program Journey',
    id: 'program.progress.incomplete.header',
    description: 'header text to display when the user has remaining incomplete courses in the program',
  },
  programProgressIncompleteText: {
    defaultMessage: 'Track and plan your progress through the {totalCoursesInProgram} courses in this program. To complete the program, you must earn a verified certificate for each course.',
    id: 'program.progress.incomplete.text',
    description: 'text to display when a user has not completed all of the courses for a program',
  },
  programProgressCardCertificate: {
    defaultMessage: '<bold>Certificate Status:</bold> {certificateStatus}',
    id: 'program.progress.card.certificate.text',
    description: 'text to display on the progress card related to the certificate status for the course',
  },
  programProgressCardResumeButton: {
    defaultMessage: 'Resume course',
    id: 'program.progress.card.resume.button.text',
    description: 'text to display on the progress card for the resume course button',
  },
  programProgressCardViewCourseDetailButton: {
    defaultMessage: 'View course details',
    id: 'program.progress.card.view.course.detail.button.text',
    description: 'text to display on the progress card for the view course details button',
  },
  programProgressCardUpgradeButton: {
    defaultMessage: 'Upgrade with your subscription',
    id: 'program.progress.card.upgrade.button.text',
    description: 'text to display on the progress card for the upgrade button',
  },
  programProgressInProgressTab: {
    defaultMessage: 'In progress',
    id: 'program.progress.in.progress.tab',
    description: 'Label for the "In progress" tab on the program progress page, which lists courses that the user has started but not yet completed.',
  },
  programProgressRemainingTab: {
    defaultMessage: 'Remaining',
    id: 'program.progress.remaining.tab',
    description: 'Label for the "Remaining" tab on the program progress page, which lists courses that the user has not yet started.',
  },
  programProgressCompletedTab: {
    defaultMessage: 'Completed',
    id: 'program.progress.completed.tab',
    description: 'Label for the "Completed" tab on the program progress page, which lists courses that the user has completed.',
  },
  programProgressPathwaysTab: {
    defaultMessage: 'Pathways',
    id: 'program.progress.pathways.tab',
    description: 'Label for the "Pathways" tab on the program progress page, which gives details of how the program can be used to further the learners education. This tab is only shown for MicroMasters programs.',
  },
  programProgressRemainingCourse: {
    defaultMessage: 'Remaining Courses',
    id: 'program.progress.remaining.course',
    description: 'Header text to be displayed inside the Remaining tab of the program progress page.',
  },
  programProgressRemainingTabNoCourse: {
    defaultMessage: "You have enrolled in all of this program's courses.",
    id: 'program.progress.remaining.tab.no.course',
    description: 'Text to display on the Remaining tab of the program progress page when there is no course remaining for the user',
  },
});

export default messages;
