import PropTypes from 'prop-types';

import { Card, Button } from '@openedx/paragon';

import { useIsCollapsed } from './hooks';
import CourseCardMenu from './components/CourseCardMenu';
import CourseCardActions from './components/CourseCardActions';
import CourseCardDetails from './components/CourseCardDetails';
import CourseCardTitle from './components/CourseCardTitle';


const SubsCourseCardView = ({
  cardId,
  badge = false,
  isLimitedAccess = false,
}) => {
  const isCollapsed = useIsCollapsed();
  const orientation = !isCollapsed ? 'vertical' : 'horizontal';
  

    return (
        <div id={cardId} data-testid="CourseCard">
            <Card className="mb-3 position-relative" orientation={orientation}>
                <Card.Section className="w-100">
                    <div className="d-flex justify-content-between align-items-start mb-2">
                        <div>
                            <CourseCardTitle cardId={cardId} />
                            <CourseCardDetails cardId={cardId} />
                        </div>

                        <div className="d-flex gap-2">
                            <CourseCardMenu cardId={cardId} />
                        </div>
                    </div>

                    <div className="d-flex justify-content-between align-items-center mt-3">
                        <div className="d-flex align-items-center gap-2">
                            {badge ? (
                                <span className="badge bg-success text-white px-2 py-1">
                                    Verified with edx Unlimited
                                </span>
                            ) : 
                                <span className="small text-primary">
                                    Included in edx Unlimited
                                </span>
                            }
                        </div>
                        
                        <CourseCardActions cardId={cardId} />
                    </div>
                </Card.Section>

                {isLimitedAccess && (
                    <Card.Status
                        variant="warning"
                        className="bg-light"
                    >
                        <div className="d-flex align-items-center mt-1">
                            <div style={{ flex: "0 0 70%" }} className="pe-3">
                                <p className="mb-0 font-weight-semi-bold">
                                    This is limited courses. The details may follow up soon.
                                </p>
                            </div>

                            <div style={{ flex: "0 0 30%" }} className="d-flex justify-content-end">
                                <Button variant="outline-dark" data-testid="view-redeem-button" size="md">
                                    Redeem
                                </Button>
                            </div>
                        </div>
                    </Card.Status>
                )}
            </Card>
        </div>
    );
};
SubsCourseCardView.propTypes = {
  cardId: PropTypes.string.isRequired,
  badge: PropTypes.bool,
  isLimitedAccess: PropTypes.bool
};

export default SubsCourseCardView;
