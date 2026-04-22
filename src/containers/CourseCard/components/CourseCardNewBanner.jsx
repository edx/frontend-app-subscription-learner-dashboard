import PropTypes from 'prop-types';

import { Card, Button, Row, Col } from '@openedx/paragon';

const CourseCardNewBanner = ({ isLimitedAccess }) => {
    return (
        isLimitedAccess && (
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
        )
    );
};

CourseCardNewBanner.propTypes = {
  isLimitedAccess: PropTypes.bool,
};

export default CourseCardNewBanner;
