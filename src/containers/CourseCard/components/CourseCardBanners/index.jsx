import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Button } from '@openedx/paragon';

import { useCourseData } from '@src/hooks';

import CourseBannerSlot from '@src/slots/CourseBannerSlot';
import CertificateBanner from './CertificateBanner';
import CreditBanner from './CreditBanner';
import EntitlementBanner from './EntitlementBanner';
import RelatedProgramsBanner from './RelatedProgramsBanner';

export const CourseCardBanners = ({ cardId }) => {
  const courseData = useCourseData(cardId);
  if (!courseData) {
    return null;
  }
  const { isEnrolled = false } = courseData.enrollment;
  return (
    <div className="course-card-banners" data-testid="CourseCardBanners">
      <Row className="align-items-center mt-1">
        <Col xs={12} lg={8} className="pe-lg-3">
            <RelatedProgramsBanner cardId={cardId} />
            <CourseBannerSlot cardId={cardId} />
            <EntitlementBanner cardId={cardId} />
            {isEnrolled && <CertificateBanner cardId={cardId} />}
            {isEnrolled && <CreditBanner cardId={cardId} />}
        </Col>

        <Col xs={12} lg={4}
            className="d-flex justify-content-lg-end mt-2 mt-lg-0"
        >
            <Button variant="outline-dark" data-testid="view-redeem-button"
                    size="md" className="w-100 w-lg-auto"
            >
                Redeem
            </Button>
        </Col>
      </Row>
    </div>
  );
};
CourseCardBanners.propTypes = {
  cardId: PropTypes.string.isRequired,
};

export default CourseCardBanners;
