import { Card, Button, Row, Col } from '@openedx/paragon';
import { useIntl } from '@openedx/frontend-base';
import messages from './messages';

const RedeemBanner = () => {
    const { formatMessage } = useIntl();

    return (
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

                <Col xs={12} sm={4}
                    className="d-flex justify-content-end mt-2 mt-lg-0"
                >
                    <Button variant="outline-dark" data-testid="view-redeem-button"
                            size="md"
                    >
                        {formatMessage(messages.redeem)}
                    </Button>
                </Col>
            </Row>
        </Card.Status>
    );
};

export default RedeemBanner;
