import React from 'react';
import PropTypes from 'prop-types';

import { Button } from '@openedx/paragon';

import useCardDetailsData from './hooks';
import './index.scss';

export const CourseCardDetails = ({ cardId }) => {
  const {
    providerName,
    accessMessage,
    isEntitlement,
    isFulfilled,
    canChange,
    openSessionModal,
    courseNumber,
    changeOrLeaveSessionMessage,
  } = useCardDetailsData({ cardId });


  return (
    // <span className="small" data-testid="CourseCardDetails">
    //   {providerName} • {courseNumber}
    //   {!(isEntitlement && !isFulfilled) && accessMessage && (
    //     ` • ${accessMessage}`
    //   )}
    //   {isEntitlement && isFulfilled && canChange ? (
    //     <>
    //       {' • '}
    //       <Button variant="link" size="inline" className="m-0 p-0" onClick={openSessionModal}>
    //         {changeOrLeaveSessionMessage}
    //       </Button>
    //     </>
    //   ) : null}
    // </span>

    <div data-testid="CourseCardDetails">
          {providerName && (
            <div className="small text-muted mb-2" data-testid="course-provider">
                {providerName}
            </div>
          )}
    
          {!(isEntitlement && !isFulfilled) && accessMessage && (
            <div className="small text-muted mt-2" data-testid="course-end-date">
                {accessMessage}
            </div>
          )}
    
          {isEntitlement && isFulfilled && canChange ? (
            <Button variant="link" size="inline" className="m-0 p-0" onClick={openSessionModal}>
              {changeOrLeaveSessionMessage}
            </Button>
          ) : null}
        </div>
  );
};

CourseCardDetails.propTypes = {
  cardId: PropTypes.string.isRequired,
};

CourseCardDetails.defaultProps = {};

export default CourseCardDetails;
