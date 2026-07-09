import PropTypes from 'prop-types';

import { Pagination } from '@openedx/paragon';
import CourseCard from '@src/containers/CourseCard';

import { useIsCollapsed } from './hooks';

export const CourseList = ({ courseListData }) => {
  const {
    setPageNumber, numPages, visibleList, verifiedCourse, isHistoryTab,
  } = courseListData;

  const isCollapsed = useIsCollapsed();
  return (
    <>
      <div className="d-flex flex-column flex-grow-1">
        {visibleList.map(({ cardId }) => (
          <CourseCard
            key={cardId}
            cardId={cardId}
            verifiedCourse={verifiedCourse}
            isHistoryTab={isHistoryTab}
          />
        ))}
        {numPages > 1 && (
          <Pagination
            variant={isCollapsed ? 'reduced' : 'secondary'}
            paginationLabel="Course List"
            className="mx-auto mb-2"
            pageCount={numPages}
            onPageSelect={setPageNumber}
          />
        )}
      </div>
    </>
  );
};

export const courseListDataShape = PropTypes.shape({
  showFilters: PropTypes.bool.isRequired,
  visibleList: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  numPages: PropTypes.number.isRequired,
  setPageNumber: PropTypes.func.isRequired,
  verifiedCourse: PropTypes.bool,
  isHistoryTab: PropTypes.bool,
});

CourseList.propTypes = {
  courseListData: courseListDataShape,
};

export default CourseList;
