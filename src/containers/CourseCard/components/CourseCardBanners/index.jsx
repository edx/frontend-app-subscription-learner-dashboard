import PropTypes from 'prop-types';

import { useCourseData } from '@src/hooks';
import RedeemBanner from './RedeemBanner';
import UpgradeBanner from './UpgradeBanner';

export const CourseCardBanners = ({ cardId, verifiedCourse, isHistoryTab }) => {
  const courseData = useCourseData(cardId);
  if (!courseData) {
    return null;
  }

  const isAuditAccessExpired = courseData?.enrollment?.isAuditAccessExpired || false;
  const isFromNonUpgradeableCourses = courseData?.isFromNonUpgradeableCourses || false;
  const upgradeUrl = courseData?.courseRun?.marketingUrl ?? '';
  const showHistoryUpgradeBanner = isHistoryTab && isAuditAccessExpired && !isFromNonUpgradeableCourses;

  return (
    <div className="course-card-banners" data-testid="CourseCardBanners">
      {showHistoryUpgradeBanner && (
        <UpgradeBanner upgradeUrl={upgradeUrl} />
      )}
      {(!verifiedCourse && !isAuditAccessExpired) && <RedeemBanner />}
    </div>
  );
};
CourseCardBanners.propTypes = {
  cardId: PropTypes.string.isRequired,
  verifiedCourse: PropTypes.bool,
  isHistoryTab: PropTypes.bool,
};

export default CourseCardBanners;
