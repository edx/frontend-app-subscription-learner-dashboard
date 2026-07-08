import PropTypes from 'prop-types';
import { useIntl } from '@openedx/frontend-base';
import { Button, Card, Col, Row } from '@openedx/paragon';

import messages from './messages';

const UpgradeBanner = ({ upgradeUrl }) => {
  const { formatMessage } = useIntl();

  return (
    <Card.Status variant="warning" className="bg-light-200" data-testid="subscription-upgrade-banner">
      <Row className="align-items-center mt-1">
        <Col xs={12} lg={8} className="pe-lg-3">
          <p className="mb-0 font-weight-semi-bold">
            {formatMessage(messages.subscriptionUpgradeBannerText)}
          </p>
        </Col>
        <Col xs={12} sm={4} className="d-flex justify-content-end mt-2 mt-lg-0">
          <Button
            variant="outline-dark"
            size="md"
            href={upgradeUrl || undefined}
            data-testid="subscription-upgrade-button"
          >
            {formatMessage(messages.upgradeAction)}
          </Button>
        </Col>
      </Row>
    </Card.Status>
  );
};

UpgradeBanner.propTypes = {
  upgradeUrl: PropTypes.string,
};

export default UpgradeBanner;
