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
  programProgressCardEnrollment: {
    defaultMessage: 'Enrolled: {enrollmentInfo}',
    id: 'program.progress.card.enrollment.text',
    description: 'text to display on the progress card related to the enrollment date for the course',
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
  programProgressCardUpgradeButton: {
    defaultMessage: 'Upgrade with your subscription',
    id: 'program.progress.card.upgrade.button.text',
    description: 'text to display on the progress card for the upgrade button',
  },
});

export default messages;
