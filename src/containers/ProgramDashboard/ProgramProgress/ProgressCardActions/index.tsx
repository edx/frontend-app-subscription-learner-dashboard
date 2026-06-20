import { FC } from 'react';
import { Col } from '@openedx/paragon';
import { useIntl } from '@openedx/frontend-base';

import { useProgressData } from '@src/hooks';
import { ProgressCardActionsProps } from '../../data/types';
import { ProgressCardButton } from './ProgressCardButton';
import messages from '../messages';

export const ProgressCardActions: FC<ProgressCardActionsProps> = ({ tabType, redirectUrl }) => {
  const { programProgressData } = useProgressData();
  const { formatMessage } = useIntl();

  const courseData = programProgressData?.courseData || {};
  const remainingCourseCount = courseData?.notStarted?.length || 0;
  const completedCourseCount = courseData?.completed?.length || 0;

  return (
    <Col xs={12} className="d-flex justify-content-md-end align-items-start mb-2">
      {/** View course details button */}
      { tabType === formatMessage(messages.programProgressRemainingTab).toLowerCase() && remainingCourseCount > 0 && (
        <ProgressCardButton variant="outline-primary" to={redirectUrl || '#'} buttonText={formatMessage(messages.programProgressCardViewCourseDetailButton)} />
      )}

      {/** Resume course button */}
      { tabType === formatMessage(messages.programProgressCompletedTab).toLowerCase() && completedCourseCount > 0 && (
        <ProgressCardButton variant="primary" to={redirectUrl || '#'} buttonText={formatMessage(messages.programProgressCardResumeCourseButton)} />
      )}
    </Col>
  );
};
