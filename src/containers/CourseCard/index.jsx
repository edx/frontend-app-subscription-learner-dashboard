import React from 'react';
import PropTypes from 'prop-types';

import { Card } from '@openedx/paragon';

import { useIsCollapsed } from './hooks';
import CourseCardMenu from './components/CourseCardMenu';
import CourseCardActions from './components/CourseCardActions';
import CourseCardDetails from './components/CourseCardDetails';
import CourseCardTitle from './components/CourseCardTitle';

import './CourseCard.scss';
import CourseCardBanners from './components/CourseCardBanners';

export const CourseCard = ({
  cardId,
  badge,
  isLimitedAccess
}) => {
  const isCollapsed = useIsCollapsed();
  const orientation = isCollapsed ? 'vertical' : 'horizontal';
  return (
    <div className="mb-4.5 course-card" id={cardId} data-testid="CourseCard">
      <Card orientation={orientation}>
        <div className="d-flex flex-column w-100">
          <div {...(!isCollapsed && { className: 'd-flex' })}>
            <Card.Body>
              <Card.Header
                title={<CourseCardTitle cardId={cardId} />}
                actions={<CourseCardMenu cardId={cardId} />}
              />
              <Card.Section className="pt-0">
                <CourseCardDetails cardId={cardId} />
                <CourseCardActions cardId={cardId} badge={badge} />
              </Card.Section>
            </Card.Body>
          </div>
          <CourseCardBanners cardId={cardId} isLimitedAccess={isLimitedAccess} />
        </div>
      </Card>
    </div>
  );
};
CourseCard.propTypes = {
  cardId: PropTypes.string.isRequired,
  badge: PropTypes.bool,
  isLimitedAccess: PropTypes.bool,
};

export default CourseCard;
