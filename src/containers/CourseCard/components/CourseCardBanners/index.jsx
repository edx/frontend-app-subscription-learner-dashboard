import PropTypes from 'prop-types';

import { useCourseData } from '@src/hooks';
import RedeemBanner from './RedeemBanner';

export const CourseCardBanners = ({ cardId, verifiedCourse }) => {
  const courseData = useCourseData(cardId);
  if (!courseData) {
    return null;
  }

  return (
    <div className="course-card-banners" data-testid="CourseCardBanners">
        { !verifiedCourse && <RedeemBanner /> }
    </div>
  );
};
CourseCardBanners.propTypes = {
  cardId: PropTypes.string.isRequired,
  verifiedCourse: PropTypes.bool,
};

export default CourseCardBanners;
