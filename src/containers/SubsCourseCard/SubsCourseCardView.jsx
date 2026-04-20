import PropTypes from 'prop-types';

import { Card, Button, Badge, Row, Col } from '@openedx/paragon';

import CourseCardMenu from './components/CourseCardMenu';
import CourseCardActions from './components/CourseCardActions';
import CourseCardDetails from './components/CourseCardDetails';
import CourseCardTitle from './components/CourseCardTitle';


const SubsCourseCardView = ({
  cardId,
  badge = false,
  isLimitedAccess = false,
  orientation
}) => {

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
                            <CourseCardActions cardId={cardId} />
                        </Col>
                    </Row>
                </Card.Section>

                {isLimitedAccess && (
                    <Card.Status
                        variant="warning"
                        className="bg-light"
                    >
                        <Row className="align-items-center mt-1">
                            <Col xs={12} lg={8} className="pe-lg-3">
                                <p className="mb-0 font-weight-semi-bold">
                                    This is a limited set of courses. More details will follow soon.
                                </p>
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
                    </Card.Status>
                )}
            </Card>
        </div>
    );
};
SubsCourseCardView.propTypes = {
  cardId: PropTypes.string.isRequired,
  badge: PropTypes.bool,
  isLimitedAccess: PropTypes.bool,
  orientation: PropTypes.oneOf(['horizontal', 'vertical'])
};

export default SubsCourseCardView;
