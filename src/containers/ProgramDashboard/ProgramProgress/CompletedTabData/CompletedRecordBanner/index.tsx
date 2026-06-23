import { FC } from 'react';
import { useIntl } from '@openedx/frontend-base';
import { Card, Button, Row, Col, Icon } from '@openedx/paragon';
import { OpenInNew } from '@openedx/paragon/icons';

import messages from '../../messages';
import './index.scss';

export const CompletedRecordBanner: FC = () => {
  const { formatMessage } = useIntl();

  return (
    <Card className="mb-3 mt-4 completed-banner-card" data-testid="completed-banner-card">
      <Card.Section className="pt-3 pb-3 px-4 border-top">
        <Row>
          <Col xs={12}>
            <h5 className="mb-1 font-weight-bold">{formatMessage(messages.programProgressCompletedBannerTitle)}</h5>
            <div className="text-muted">
              {formatMessage(messages.programProgressCompletedBannerDescription)}
            </div>
          </Col>
        </Row>

        <Row className="mt-3">
          <Col xs={12} className="d-flex justify-content-end">
            {/**
             * TODO: The buttons shown here do not do anything at the moment but are meant to link to the help center and the program records page respectively.
             * ACTION ITEM: Wire these buttons to the Help Center and Program Records URLs once they are available.
            */}
            <Button variant="outline-primary" className="mr-2 d-flex align-items-center">
              {formatMessage(messages.programProgressCompletedBannerHelpCenterButton)}
              <Icon src={OpenInNew} className="ml-1" />
            </Button>
            <Button variant="primary">{formatMessage(messages.programProgressCompletedBannerMyProgramRecordsButton)}</Button>
          </Col>
        </Row>
      </Card.Section>
    </Card>
  );
};
