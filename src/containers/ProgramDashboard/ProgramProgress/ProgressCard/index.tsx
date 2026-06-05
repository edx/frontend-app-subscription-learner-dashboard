import { FC } from 'react';
import { Card, Button, Row, Col } from '@openedx/paragon';
import { useIntl } from '@openedx/frontend-base';

import { ProgressCardProps } from '../../data/types';
import messages from '../messages';
import './index.scss';
import { ProgressCardActions } from '../ProgressCardActions';

export const ProgressCard: FC<ProgressCardProps> = ({ progressCardData, isLoading, tabType }) => {
  const { formatMessage } = useIntl();
  const { title, certificateStatus, courseRuns } = progressCardData;

  const [{ pacingType = '', start = '' } = {}] = Array.isArray(courseRuns) ? courseRuns : [];

  /*
    - Formatting pacing type safely
    - replace underscores with spaces
    - capitalize first letter of each word
    - example: 'self_paced' -> 'Self Paced'
  */
  const formattedPacing = pacingType
    ? pacingType.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
    : '';

  // base string
  let enrollmentInfo = tabType !== 'remaining' ? formatMessage(messages.programProgressCardEnrollText) : '';

  if (formattedPacing) {
    enrollmentInfo += `${enrollmentInfo ? ' ' : ''}(${formattedPacing})`;
  }

  // add start date if exists
  if (start) {
    const startDate = new Date(start).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });

    enrollmentInfo = enrollmentInfo
      ? `${enrollmentInfo} ${formatMessage(messages.programProgressCardStartText)} ${startDate}`
      : `${formatMessage(messages.programProgressCardStartText)} ${startDate}`;
  }

  return (
    <Card className="progress-card mb-3" data-testid="progress-card" isLoading={isLoading}>
      <Card.Section className="pt-3 pb-2 px-4">
        <Row>
          <Col xs={12}>
            <h4 className="mb-1 font-weight-bold">{title}</h4>
            <div className="text-muted">
              {enrollmentInfo}
            </div>
          </Col>
          <ProgressCardActions />
        </Row>
      </Card.Section>

      { tabType !== 'remaining' && (
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
      )}
    </Card>
  );
};
