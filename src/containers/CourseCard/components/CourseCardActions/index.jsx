import React from 'react';
import PropTypes from 'prop-types';

import { ActionRow, Row, Col, Badge  } from '@openedx/paragon';
import { useIntl } from '@openedx/frontend-base';

import { useCourseData, useEntitlementInfo } from '@src/hooks';

import CourseCardActionSlot from '@src/slots/CourseCardActionSlot';
import SelectSessionButton from './SelectSessionButton';
import BeginCourseButton from './BeginCourseButton';
import ResumeButton from './ResumeButton';
import ViewCourseButton from './ViewCourseButton';
import messages from './messages';

export const CourseCardActions = ({ cardId, verifiedCourse }) => {
  const cardData = useCourseData(cardId);
  const { formatMessage } = useIntl();
  const hasStarted = cardData?.enrollment?.hasStarted || false;
  const { isEntitlement, isFulfilled } = useEntitlementInfo(cardData);
  const isArchived = cardData?.courseRun?.isArchived || false;

  return (
    <Row className="align-items-center mt-3">
        <Col xs={12} sm={6} className="mb-2 mb-lg-0">
            {/* TODO [TEMP]: Showing 2 types of badges for now. After backend connection, can anticipate 3rd type of badge as well
                Reason: Development before backend connection
                Action: Revisit after backend connection and finalize badge types and conditions for each type
            */}
            {verifiedCourse ? (
                <Badge variant="success" className="px-3 py-2">
                    {formatMessage(messages.subsVerifiedCourseText)}
                </Badge>
            ) : (
                <span className="small text-info">
                    {formatMessage(messages.subsIncludedCourseText)}
                </span>
            )}
        </Col>

        <Col xs={12} className="d-flex justify-content-end" sm={6}>
            <ActionRow data-test-id="CourseCardActions">
              <CourseCardActionSlot cardId={cardId} />
              {isEntitlement && (isFulfilled
                ? <ViewCourseButton cardId={cardId} />
                : <SelectSessionButton cardId={cardId} />
              )}
              {(isArchived && !isEntitlement) && (
                <ViewCourseButton cardId={cardId} />
              )}
              {!(isArchived || isEntitlement) && (hasStarted
                ? <ResumeButton cardId={cardId} />
                : <BeginCourseButton cardId={cardId} />
              )}
            </ActionRow>
        </Col>
    </Row>
    
  );
};
CourseCardActions.propTypes = {
  cardId: PropTypes.string.isRequired,
  verifiedCourse: PropTypes.bool,
};

export default CourseCardActions;
