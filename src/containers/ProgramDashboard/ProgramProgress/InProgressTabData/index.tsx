import { FC } from 'react';
import { useProgressData } from '@src/hooks';
import { useIntl } from '@openedx/frontend-base';

import { ProgressCard } from '../ProgressCard';
import messages from '../messages';

export const InProgressTabData: FC = () => {
  const { programProgressData, isLoading } = useProgressData();

  const { formatMessage } = useIntl();
  const courseData = programProgressData?.courseData;
  const remainingCount = courseData?.notStarted?.length || 0;
  const inProgressData = courseData?.inProgress || [];
  const completedCount = courseData?.completed?.length || 0;
  const inProgressCount = inProgressData.length;
  const programType = programProgressData?.programData?.type || '';
  const checkoutUrl = programProgressData?.urls?.buyButtonUrl || '';
  const inProgressTabType = formatMessage(messages.programProgressInProgressTab).toLowerCase();

  const shouldShowRemainingMessage = !inProgressCount && remainingCount > 0;
  const shouldShowCompletedMessage = !inProgressCount && !remainingCount && completedCount > 0;

  const progressCards = inProgressData.map((course) => {
    const courseRuns = course.courseRuns || [];
    const [{ pacingType = '', start = '', end = '', courseUrl = '', upgradeUrl = '', seats = [] } = {}] = Array.isArray(courseRuns) ? courseRuns : [];

    const progressCardData = {
      title: course.title,
      start: start,
      end: end || '',
      pacingType: pacingType,
      courseUrl: courseUrl || '',
      upgradeUrl: upgradeUrl || '',
      programType: programType || '',
      checkoutUrl: checkoutUrl || '',
      seats: seats || [],
      expired: course.expired || false, // using expired from course object to determine if the course is expired as per condition on confluence and learners dashboard code.
    };

    return (
      <ProgressCard
        key={course.key}
        progressCardData={progressCardData}
        isLoading={isLoading}
        tabType={inProgressTabType}
      />
    );
  });

  return (
    <div>
      <h5>{formatMessage(messages.programProgressInProgressCourse)}</h5>
      {inProgressCount > 0 ? (
        progressCards
      ) : shouldShowRemainingMessage ? (
        <p>{formatMessage(messages.programProgressInProgressRemainingCourses)}</p>
      ) : shouldShowCompletedMessage ? (
        <p>{formatMessage(messages.programProgressInProgressCompletedCourses)}</p>
      ) : null}
    </div>
  );
};
