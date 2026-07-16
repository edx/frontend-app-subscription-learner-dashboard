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
  programProgressCardCompletedCertificateText: {
    defaultMessage: 'You earned the certificate on {certificateDate}',
    id: 'program.progress.card.completed.certificate.text',
    description: 'text to display on the progress card completed tab related to the certificate status for the course',
  },
  programProgressCardCompletedCertificateButton: {
    defaultMessage: 'View certificate',
    id: 'program.progress.card.completed.certificate.button.text',
    description: 'text to display on the progress card on certificate button for completed courses',
  },
  programProgressCardViewCourseDetailButton: {
    defaultMessage: 'View course details',
    id: 'program.progress.card.view.course.detail.button.text',
    description: 'text to display on the progress card for the view course details button',
  },
  programProgressCardResumeCourseButton: {
    defaultMessage: 'Resume course',
    id: 'program.progress.card.resume.course.button.text',
    description: 'text to display on the progress card for the resume course button',
  },
  programProgressCardUpgradeButton: {
    defaultMessage: 'Upgrade with your subscription',
    id: 'program.progress.card.upgrade.button.text',
    description: 'text to display on the progress card for the upgrade button',
  },
  programProgressCardEnrollText: {
    defaultMessage: 'Enrolled:',
    id: 'program.progress.card.enroll.text',
    description: 'text to display on the progress card for the enrolled status of the course',
  },
  programProgressCardStartText: {
    defaultMessage: 'Started',
    id: 'program.progress.card.start.text',
    description: 'text to display on the progress card for the start date of the course',
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
  programProgressCompletedCourse: {
    defaultMessage: 'Completed courses',
    id: 'program.progress.completed.course',
    description: 'Header text to be displayed inside the Completed tab of the program progress page.',
  },
  programProgressCompletedTabNoCourse: {
    defaultMessage: 'As you complete courses, you will see them listed here.',
    id: 'program.progress.completed.tab.no.course',
    description: 'Text to display on the Completed tab of the program progress page when no course is completed for the user',
  },
  programProgressCompletedBannerTitle: {
    defaultMessage: 'Earning a program record',
    id: 'program.progress.completed.banner.title',
    description: 'Title text for the banner displayed on the Completed tab of the program progress page.',
  },
  programProgressCompletedBannerDescription: {
    defaultMessage: 'Once you meet all course and program requirements, you will receive a program record and your professional certificate.',
    id: 'program.progress.completed.banner.description',
    description: 'Description text for the banner displayed on the Completed tab of the program progress page.',
  },
  programProgressCompletedBannerHelpCenterButton: {
    defaultMessage: 'Help center',
    id: 'program.progress.completed.banner.help.center.button',
    description: 'Text for the Help Center button displayed on the banner in the Completed tab of the program progress page.',
  },
  programProgressCompletedBannerMyProgramRecordsButton: {
    defaultMessage: 'My program records',
    id: 'program.progress.completed.banner.my.program.records.button',
    description: 'Text for the My Program Records button displayed on the banner in the Completed tab of the program progress page.',
  },
  programProgressEarnedCertificates: {
    defaultMessage: 'Earned Certificates',
    id: 'program.progress.earned.certificates',
    description: 'Label shown in the program progress circle',
  },
  programProgressCertificateLabel: {
    defaultMessage: 'Program Certificate Progress',
    id: 'program.progress.certificate.program.progress',
    description: 'Label shown under the program progress circle',
  },
  programProgressCertificateContentOne: {
    defaultMessage: 'Earn a professional certificate when you meet requirements for all courses in the series.',
    id: 'program.progress.certificate.content.one',
    description: 'First content paragraph shown under the program progress circle',
  },
  programProgressCertificateContentTwo: {
    defaultMessage: "This program is valued at '{'{price}'}' for non-subscribers.",
    id: 'program.progress.certificate.content.two',
    description: 'Second content paragraph shown under the program progress circle',
  },
  programProgressInProgressCourse: {
    defaultMessage: 'Courses in progress',
    id: 'program.progress.in.progress.course',
    description: 'Header text to be displayed inside the In Progress tab of the program progress page.',
  },
  programProgressInProgressCourseMicromastersUpgrade: {
    defaultMessage: 'Upgrade to verified for {price}',
    id: 'program.progress.in.progress.course.micromasters.upgrade',
    description: 'Upgrade message for Micromasters courses in the In Progress tab.',
  },
  programProgressInProgressRemainingCourses: {
    defaultMessage: 'Enroll in the next course in the program. ',
    id: 'program.progress.in.progress.remaining.courses',
    description: 'Message for remaining courses in the In Progress tab.',
  },
  programProgressInProgressCompletedCourses: {
    defaultMessage: 'You have completed all the courses in the program. ',
    id: 'program.progress.in.progress.completed.courses',
    description: 'Message for completed courses in the In Progress tab.',
  },
  programProgressInProgressCourseProfessionalUpgradeModalTitle: {
    defaultMessage: 'You now have full access to the {title}',
    id: 'program.progress.in.progress.course.professional.upgrade.modal.title',
    description: 'Modal title for Professional Certificate courses in the In Progress tab.',
  },
  programProgressInProgressCourseProfessionalUpgradeModalContent: {
    defaultMessage: "You're saving as a subscriber. This course is valued at ${price}.",
    id: 'program.progress.in.progress.course.professional.upgrade.modal.content',
    description: 'Modal content for Professional Certificate courses in the In Progress tab.',
  },
  programProgressInProgressCertificateStatus: {
    defaultMessage: 'Certificate Status: {status}',
    id: 'program.progress.in.progress.certificate.status',
    description: 'Certificate status for courses in the In Progress tab.',
  },
  programProgressInProgressCertificateNeedsVerified: {
    defaultMessage: 'Needs verified certificate',
    id: 'program.progress.in.progress.certificate.needs.verified',
    description: 'Certificate status indicating that a verified certificate is needed for courses in the In Progress tab.',
  },
  programProgressInProgressCertificateNotEarned: {
    defaultMessage: 'Not earned yet',
    id: 'program.progress.in.progress.certificate.not.earned',
    description: 'Certificate status indicating that the certificate has not been earned yet for courses in the In Progress tab.',
  },
});

export default messages;
