import { FC } from 'react';
import { Card, Button, Row, Col } from '@openedx/paragon';
import { useIntl } from '@openedx/frontend-base';

import { ProgressCardProps } from '../../data/types';
import messages from '../messages';
import './index.scss';

export const ProgressCard: FC<ProgressCardProps> = ({ progressCardData, isLoading }) => {
  const { formatMessage } = useIntl();
  const { title, enrollmentInfo, certificateStatus } = progressCardData;

  return (
    <Card className="progress-card" data-testid="progress-card" isLoading={isLoading}>
      <Card.Section className="pt-3 pb-2 px-4">
        <Row>
          <Col xs={12}>
            <h4 className="mb-1 font-weight-bold">{title}</h4>
            <div className="text-muted">
              {formatMessage(messages.programProgressCardEnrollment, { enrollmentInfo })}
            </div>
          </Col>
          <Col
            xs={12}
            className="d-flex justify-content-md-end align-items-start"
          >
            <Button variant="primary">
              {formatMessage(messages.programProgressCardResumeButton)}
            </Button>
          </Col>
        </Row>
      </Card.Section>

      <Card.Section className="pt-3 pb-2 px-4">
        <Row>
          <Col xs={12} md={9}>
            <span>
              {formatMessage(messages.programProgressCardCertificate, {
                certificateStatus,
                bold: (chunks: React.ReactNode) => (
                  <span className="font-weight-bold">{chunks}</span>
                ),
              })}
            </span>
          </Col>

          <Col xs={12} md={3} className="d-flex justify-content-md-end">
            <Button variant="outline-brand">
              {formatMessage(messages.programProgressCardUpgradeButton)}
            </Button>
          </Col>
        </Row>
      </Card.Section>
    </Card>
  );
};
