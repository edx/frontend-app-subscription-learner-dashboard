import { FC } from 'react';
import { useProgressData } from '@src/hooks';
import { useIntl } from '@openedx/frontend-base';

import { ProgressCard } from '../ProgressCard';
import messages from '../messages';
import { CompletedRecordBanner } from './CompletedRecordBanner';

export const CompletedTabData: FC = () => {
  const { programProgressData, isLoading } = useProgressData();
  const { formatMessage } = useIntl();

  const courseData = programProgressData?.courseData;
  const completedData = courseData?.completed || [];

  const buildProgressCard = () => (
    completedData.map((course) => {
      const courseRuns = course.courseRuns || [];
      const [{ pacingType = '', start = '', end = '', certificateUrl = '', courseUrl = '' } = {}] = Array.isArray(courseRuns) ? courseRuns : [];

      const progressCardData = {
        title: course.title,
        start: start,
        end: end || '',
        pacingType: pacingType,
        certificateUrl: certificateUrl || '',
        courseUrl: courseUrl || '',
      };

      return (
        <ProgressCard key={course.id} progressCardData={progressCardData} isLoading={isLoading} tabType={formatMessage(messages.programProgressCompletedTab).toLowerCase()} />
      );
    })
  );

  return (
    <div>
      <h5>{formatMessage(messages.programProgressCompletedCourse)}</h5>
      {completedData.length > 0 ? (
        buildProgressCard()
      ) : (
        <p>{formatMessage(messages.programProgressCompletedTabNoCourse)}</p>
      )}

      <CompletedRecordBanner />
    </div>
  );
};
