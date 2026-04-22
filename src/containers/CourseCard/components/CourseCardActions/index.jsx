import React from 'react';
import PropTypes from 'prop-types';

import { ActionRow, Row, Col, Badge  } from '@openedx/paragon';

import { useCourseData, useEntitlementInfo } from '@src/hooks';

import CourseCardActionSlot from '@src/slots/CourseCardActionSlot';
import SelectSessionButton from './SelectSessionButton';
import BeginCourseButton from './BeginCourseButton';
import ResumeButton from './ResumeButton';
import ViewCourseButton from './ViewCourseButton';

export const CourseCardActions = ({ cardId, badge }) => {
  const cardData = useCourseData(cardId);
  const hasStarted = cardData.enrollment.hasStarted || false;
  const { isEntitlement, isFulfilled } = useEntitlementInfo(cardData);
  const isArchived = cardData.courseRun.isArchived || false;

  return (
    <Row className="align-items-center mt-3">
        <Col xs={12} lg="auto" className="mb-2 mb-lg-0">
            {badge ? (
                <Badge variant="success" className="px-3 py-2">
                    Verified with edx Unlimited
                </Badge>
            ) : (
                <span className="small text-primary">
                    Included in edx Unlimited
                </span>
            )}
        </Col>

        <Col xs={12} lg className="d-flex justify-content-lg-end">
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
  badge: PropTypes.bool,
};

export default CourseCardActions;
