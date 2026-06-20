import { FC } from 'react';
import { Card, Row, Col } from '@openedx/paragon';
import { useIntl } from '@openedx/frontend-base';

import { ProgressCardProps } from '../../data/types';
import messages from '../messages';
import './index.scss';
import { ProgressCardActions } from '../ProgressCardActions';
import { dateFormatter } from '@src/utils/dateFormatter';
import { ProgressCardButton } from '../ProgressCardActions/ProgressCardButton';

export const ProgressCard: FC<ProgressCardProps> = ({ progressCardData, isLoading, tabType }) => {
  const { formatMessage, formatDate } = useIntl();

  const { title, pacingType, start, end, certificateUrl, courseUrl } = progressCardData;

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
    const startDate = dateFormatter(formatDate, start, 'short');

    enrollmentInfo = enrollmentInfo
      ? `${enrollmentInfo} ${formatMessage(messages.programProgressCardStartText)} ${startDate}`
      : `${formatMessage(messages.programProgressCardStartText)} ${startDate}`;
  }

  return (
    <Card className="progress-card mb-3" data-testid="progress-card" isLoading={isLoading}>
      <Card.Section className="pt-3 pb-2 px-4">
        <Row className="mb-2">
          <Col xs={12}>
            <h4 className="mb-1 font-weight-bold">{title}</h4>
            <div className="text-muted">
              {enrollmentInfo}
            </div>
          </Col>
          <ProgressCardActions tabType={tabType} redirectUrl={courseUrl} />
        </Row>

        { tabType === (formatMessage(messages.programProgressCompletedTab).toLowerCase()) && (
          <Row className="pt-3 pb-2 px-2 border-top border-2 border-muted mb-2 align-items-center">
            <Col xs={12} className="d-flex justify-content-between align-items-center px-0">
              <span className="text-start">
                {formatMessage(messages.programProgressCardCompletedCertificateText, {
                  certificateDate: (end ? dateFormatter(formatDate, end, 'short') : ''),
                })}
              </span>

              <ProgressCardButton variant="brand" to={certificateUrl || '#'} buttonText={formatMessage(messages.programProgressCardCompletedCertificateButton)} />
            </Col>
          </Row>
        )}
      </Card.Section>
    </Card>
  );
};
