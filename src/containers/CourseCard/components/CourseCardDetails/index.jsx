import React from 'react';
import PropTypes from 'prop-types';
import { useIntl } from '@openedx/frontend-base';
import messages from './messages';
import { Button } from '@openedx/paragon';
import { Badge } from '@openedx/paragon';
import useCardDetailsData from './hooks';
import './index.scss';

export const CourseCardDetails = ({ cardId, isHistoryTab = false }) => {
  const { formatMessage } = useIntl();

  const {
    providerName,
    accessMessage,
    isEntitlement,
    isFulfilled,
    canChange,
    openSessionModal,
    changeOrLeaveSessionMessage,
    isAuditAccessExpired,
    isFromNonUpgradeableCourses,
  } = useCardDetailsData({ cardId });

  const showAuditTrackBadge = isHistoryTab && isAuditAccessExpired;
  const showDefaultAccessMessage = !(isEntitlement && !isFulfilled) && accessMessage;

  let renderedAccessMessage = null;

  if (isHistoryTab && isAuditAccessExpired) {
    renderedAccessMessage = isFromNonUpgradeableCourses
      ? formatMessage(messages.auditAccessExpiredNotIncluded)
      : formatMessage(messages.auditAccessExpired);
  }

  return (
    <div data-testid="CourseCardDetails">
          {providerName && (
            <span className="small text-muted mr-2" data-testid="course-provider">
              {providerName}
            </span>
          )}

          {showDefaultAccessMessage && (
            <span className="small text-gray-700" data-testid="course-end-date">
              {accessMessage}
            </span>
          )}

          {showAuditTrackBadge && (
            <div>
              <Badge className="mr-2 mt-2 bg-light-200 text-dark-700" data-testid="audit-track-badge">
                {formatMessage(messages.auditTrackBadge)}
              </Badge>
              {renderedAccessMessage && (
                <span className="small text-gray-700" data-testid="course-audit-access-expired">
                  {renderedAccessMessage}
                </span>
              )}
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
  isHistoryTab: PropTypes.bool,
};

export default CourseCardDetails;
