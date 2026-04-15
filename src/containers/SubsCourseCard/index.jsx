import PropTypes from 'prop-types';

import { useIsCollapsed } from './hooks';

import './CourseCard.scss';
import SubsCourseCardView from './SubsCourseCardView';

const SubsCourseCard = ({
  cardId,
  dataList = [],
  numPages = 0,
  setPageNumber = 0
}) => {
    const isCollapsed = useIsCollapsed();

    return (
      <div>
          <div className="d-flex align-items-center gap-2 mt-4 mb-3">
              <h3 className="mb-0 fw-semibold" data-testid="card-header">
                  Courses
              </h3>
          </div>

          {visibleList.map(({ cardId }) => (
            <SubsCourseCardView cardId={cardId} badge = {true} />
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

          <div className="d-flex align-items-center gap-2 mt-4 mb-3">
              <h3 className="mb-0 fw-semibold" data-testid="card-header">
                  Limited access courses
              </h3>

              <Icon src={Info} className="text-muted m-2" style={{fontSize: "14px"}}  />
          </div>

          {visibleList.map(({ cardId }) => (
            <SubsCourseCardView cardId={cardId} badge = {false} isLimitedAccess = {true} />
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
    );
};
SubsCourseCard.propTypes = {
  cardId: PropTypes.string.isRequired,
  dataList: PropTypes.array.isRequired,
  numPages: PropTypes.number.isRequired,
  setPageNumber: PropTypes.number.isRequired
};

export default SubsCourseCard;
