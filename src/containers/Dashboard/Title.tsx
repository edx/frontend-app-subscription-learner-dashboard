import { FC } from 'react';
import { Col } from '@openedx/paragon';
import { useIntl } from '@openedx/frontend-base';

import messages from './messages';

export const Title: FC = () => {
  const { formatMessage } = useIntl();

  return (
    <Col xs={12} className="my-4">
      <h2 className="font-weight-bold mb-2" data-testid="dashboard-title">
        {formatMessage(messages.dashboardTitle)}
      </h2>
      <p className="mb-0 text-body" data-testid="dashboard-subtitle">
        {formatMessage(messages.dashboardSubtitle)}
      </p>
    </Col>
  );
};
