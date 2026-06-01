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

  return (
    <div>
      <h5>Remaining Courses</h5>
      {remainingData.length > 0 ? (
        remainingData.map((course) => (
          <ProgressCard key={course.id} progressCardData={course} isLoading={isLoading} tabType="remaining" />
        ))
      ) : (
        <p>{formatMessage(messages.programProgressRemainingTabNoCourse)}</p>
      )}
    </div>
  );
};
