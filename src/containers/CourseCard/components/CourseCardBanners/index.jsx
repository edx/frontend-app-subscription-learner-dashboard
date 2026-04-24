import React from 'react';
import PropTypes from 'prop-types';

import { useCourseData } from '@src/hooks';
import RedeemBanner from './RedeemBanner';


export const CourseCardBanners = ({ cardId, vefifiedCourse }) => {
  const courseData = useCourseData(cardId);
  if (!courseData) {
    return null;
  }
  const { isEnrolled = false } = courseData.enrollment;
  return (
    <div className="course-card-banners" data-testid="CourseCardBanners">
        { !vefifiedCourse && <RedeemBanner /> }
    </div>
  );
};
CourseCardBanners.propTypes = {
  cardId: PropTypes.string.isRequired,
  vefifiedCourse: PropTypes.bool,
};

export default CourseCardBanners;
