import { FC, useMemo } from 'react';
import { useIntl } from '@openedx/frontend-base';

import { useRecentlyViewedCoursesAndProgramsData } from '@src/hooks/useRecentlyViewedCoursesAndProgramsData';
import messages from './messages';
import NoRecentlyViewedCourse from './NoRecentlyViewedCourse';
import RecentlyViewedCourseProgram from './RecentlyViewedCourseProgram';

export const RecentlyViewedPanel: FC = () => {
  const { formatMessage } = useIntl();
  const {
    data: recentlyViewedCoursesAndProgramsData = [],
    isLoading,
  } = useRecentlyViewedCoursesAndProgramsData();
  const hasRecentlyViewedData = useMemo(
    () => recentlyViewedCoursesAndProgramsData.length > 0,
    [recentlyViewedCoursesAndProgramsData]
  );

  return (
    <div className="recently-viewed-container mt-5 mb-3" data-testid="recently-viewed-panel">
      <div className="recently-viewed-heading-container mb-4">
        <h2>{formatMessage(messages.recentlyViewedHeader)}</h2>
      </div>
      {hasRecentlyViewedData ? (
        <RecentlyViewedCourseProgram
          items={recentlyViewedCoursesAndProgramsData}
          isLoading={isLoading}
        />
      ) : (
        <NoRecentlyViewedCourse />
      )}
    </div>
  );
};

export default RecentlyViewedPanel;
