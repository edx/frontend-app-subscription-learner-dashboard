import { FC } from 'react';
import { Col } from '@openedx/paragon';

import { useProgressData } from '@src/hooks';
import { ViewCourseDetailButton } from './ViewCourseDetailButton';

export const ProgressCardActions: FC = () => {
  const { programProgressData } = useProgressData();

  const courseData = programProgressData?.courseData || {};
  const remainingCourseCount = courseData?.notStarted?.length || 0;

  return (
    <Col xs={12} className="d-flex justify-content-md-end align-items-start mb-2">
      {/**
       * TODO: The button shown here does not do anything at the moment but is meant to link to the walled garden page.
       * ACTION ITEM: Add the correct link to the ViewCourseDetailButton component once the URL is available.
      */}
      {remainingCourseCount > 0 && <ViewCourseDetailButton /> }
    </Col>
  );
};
