import { FC, useMemo } from 'react';
import { Alert } from '@openedx/paragon';
import { useIntl } from '@openedx/frontend-base';

import { usePopularCoursesData } from '@src/hooks/usePopularCourses';
import { useAlgoliaSearch } from '@src/utils/algoliaUtils';
import messages from './messages';
import NoPopularCourseItems from './NoPopularCourseItems';
import PopularCourses from './PopularCourses';

export const PopularCoursePanel: FC = () => {
  const { formatMessage } = useIntl();
  const [searchClient] = useAlgoliaSearch();
  const {
    data: popularCoursesData = [],
    isError,
    isLoading,
  } = usePopularCoursesData(searchClient, true);
  const hasPopularCoursesData = useMemo(
    () => popularCoursesData.length > 0,
    [popularCoursesData]
  );

  if (isError) {
    return (
      <div className="popular-courses-container mt-5 mb-3" data-testid="popular-courses-panel">
        <Alert variant="danger" data-testid="popular-courses-error">
          {formatMessage(messages.popularCoursesErrorText)}
        </Alert>
      </div>
    );
  }

  return (
    <div className="popular-courses-container mt-5 mb-3" data-testid="popular-courses-panel">
      <div className="popular-courses-heading-container mb-4">
        <h2>{formatMessage(messages.popularCoursesHeader)}</h2>
      </div>
      {(isLoading || hasPopularCoursesData) ? (
        <PopularCourses
          items={popularCoursesData}
          isLoading={isLoading}
        />
      ) : (
        <NoPopularCourseItems />
      )}
    </div>
  );
};

export default PopularCoursePanel;
