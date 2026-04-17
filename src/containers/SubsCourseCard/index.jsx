import PropTypes from 'prop-types';


import { useIntl } from '@openedx/frontend-base';
import { Icon } from '@openedx/paragon';
import { Info } from '@openedx/paragon/icons';
import { Pagination } from '@openedx/paragon';

import { useIsCollapsed } from './hooks';
import SubsCourseCardView from './SubsCourseCardView';
import messages from './messages';

const SubsCourseCard = ({
  cardId,
  dataList = [],
  numPages = 0,
  setPageNumber
}) => {
    const isCollapsed = useIsCollapsed();
    const { formatMessage } = useIntl();

    return (
      <div>
          <div className="d-flex align-items-center gap-2 mt-4 mb-3">
              <h3 className="mb-0 fw-semibold" data-testid="card-header">
                  {formatMessage(messages.subsCourse)}
              </h3>
          </div>

          {dataList.map(({ cardId }) => (
            <SubsCourseCardView key={cardId} cardId={cardId} badge={true} />
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
                  {formatMessage(messages.limitedCourse)}
              </h3>

              <Icon src={Info} className="text-muted m-2" style={{fontSize: "14px"}}  />
          </div>

          {dataList.map(({ cardId }) => (
            <SubsCourseCardView key={cardId} cardId={cardId} badge={false} isLimitedAccess={true} />
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
  dataList: PropTypes.array,
  numPages: PropTypes.number,
  setPageNumber: PropTypes.func
};

export default SubsCourseCard;
