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
    description: 'text to diplay when a user has not completed all of the courses for a program',
  },
  programProgressInProgressTab: {
    defaultMessage: 'In Progress',
    id: 'program.progress.in.progress.tab',
    description: 'Label for the "In Progress" tab on the program progress page, which lists courses that the user has started but not yet completed.',
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
  programProgressPathwayTab: {
    defaultMessage: 'Pathway',
    id: 'program.progress.pathway.tab',
    description: 'Label for the "Pathway" tab on the program progress page, which lists courses that are part of the program pathway. This tab is only shown for MicroMasters programs.',
  },
});

export default messages;
