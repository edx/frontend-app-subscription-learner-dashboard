import { FC, useMemo } from 'react';
import { Alert } from '@openedx/paragon';
import { useIntl } from '@openedx/frontend-base';

import { useRecentlyViewedCoursesAndProgramsData } from '@src/hooks/useRecentlyViewedCoursesAndProgramsData';
import { useAlgoliaSearch } from '@src/utils/algoliaUtils';
import messages from './messages';
import NoRecentlyViewedItems from './NoRecentlyViewedItems';
import RecentlyViewedCourseProgram from './RecentlyViewedCourseProgram';

export const RecentlyViewedPanel: FC = () => {
  const { formatMessage } = useIntl();
  const [searchClient] = useAlgoliaSearch();
  const {
    data: recentlyViewedCoursesAndProgramsData = [],
    isError,
    isLoading,
  } = useRecentlyViewedCoursesAndProgramsData(searchClient, true);
  const hasRecentlyViewedData = useMemo(
    () => recentlyViewedCoursesAndProgramsData.length > 0,
    [recentlyViewedCoursesAndProgramsData]
  );

  if (isError) {
    return (
      <div className="recently-viewed-container mt-5 mb-3" data-testid="recently-viewed-panel">
        <Alert variant="danger" data-testid="recently-viewed-error">
          {formatMessage(messages.recentlyViewedErrorText)}
        </Alert>
      </div>
    );
  }

  return (
    <div className="recently-viewed-container mt-5 mb-3" data-testid="recently-viewed-panel">
      <div className="recently-viewed-heading-container mb-4">
        <h2>{formatMessage(messages.recentlyViewedHeader)}</h2>
      </div>
      {(isLoading || hasRecentlyViewedData) ? (
        <RecentlyViewedCourseProgram
          items={recentlyViewedCoursesAndProgramsData}
          isLoading={isLoading}
        />
      ) : (
        <NoRecentlyViewedItems />
      )}
    </div>
  );
};

export default RecentlyViewedPanel;
