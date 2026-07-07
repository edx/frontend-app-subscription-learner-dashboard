import { FC } from 'react';
import { useProgressData } from '@src/hooks';
import { useIntl } from '@openedx/frontend-base';

import { ProgressCard } from '../ProgressCard';
import messages from '../messages';

export const RemainingTabData: FC = () => {
  const { programProgressData, isLoading } = useProgressData();
  const { formatMessage } = useIntl();

  const courseData = programProgressData?.courseData;
  const remainingData = courseData?.notStarted || [];

  const buildProgressCard = () => (
    remainingData.map((course) => {
      const courseRuns = course.courseRuns || [];
      const [{ pacingType = '', start = '', end = '', courseUrl = '' } = {}] = Array.isArray(courseRuns) ? courseRuns : [];

      const progressCardData = {
        title: course.title,
        start: start,
        end: end || '',
        pacingType: pacingType,
        courseUrl: courseUrl || '',
      };

      return (
        <ProgressCard key={course.id} progressCardData={progressCardData} isLoading={isLoading} tabType={formatMessage(messages.programProgressRemainingTab).toLowerCase()} />
      );
    })
  );

  return (
    <div>
      <h5>{formatMessage(messages.programProgressRemainingCourse)}</h5>
      {remainingData.length > 0 ? (
        buildProgressCard()
      ) : (
        <p>{formatMessage(messages.programProgressRemainingTabNoCourse)}</p>
      )}
    </div>
  );
};
