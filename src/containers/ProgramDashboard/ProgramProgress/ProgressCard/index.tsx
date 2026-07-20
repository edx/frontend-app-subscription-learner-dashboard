import { FC } from 'react';
import { Card, Row, Col } from '@openedx/paragon';
import { useIntl } from '@openedx/frontend-base';

import { ProgressCardProps } from '../../data/types';
import messages from '../messages';
import './index.scss';
import { ProgressCardActions } from '../ProgressCardActions';
import { dateFormatter } from '@src/utils/dateFormatter';
import { ProgressCardButton } from '../ProgressCardActions/ProgressCardButton';
import { PROGRAM_TYPE_MAP } from '../../data/constants';
import { getCertificatePriceString } from '../../data/util';

export const ProgressCard: FC<ProgressCardProps> = ({ progressCardData, isLoading, tabType }) => {
  const { formatMessage, formatDate } = useIntl();

  const { title, pacingType, start, end, certificateUrl, courseUrl, upgradeUrl, programType, checkoutUrl, expired, seats } = progressCardData;

  const inProgressTabKey = formatMessage(messages.programProgressInProgressTab).toLowerCase();
  const isInProgressTab = tabType === inProgressTabKey;
  const isProfessionalProgram = programType === PROGRAM_TYPE_MAP.PROFESSIONAL_CERTIFICATE;
  const isMicroMastersProgram = programType === PROGRAM_TYPE_MAP.MICROMASTERS;
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

  // using expired key from course object to determine if the course is expired as per condition on confluence and learners dashboard code.
  const canUpgrade = Boolean(upgradeUrl) && !expired;
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

        {tabType === (formatMessage(messages.programProgressCompletedTab).toLowerCase()) && (
          <Row className="pt-3 pb-2 px-2 border-top border-2 border-muted mb-2 align-items-center">
            <Col xs={12} className="d-flex justify-content-between align-items-center px-0">
              <span className="text-start">
                {end && (
                  formatMessage(messages.programProgressCardCompletedCertificateText, {
                    certificateDate: (end ? dateFormatter(formatDate, end, 'short') : ''),
                  })
                )}
              </span>

              <ProgressCardButton variant="brand" redirectUrl={certificateUrl || ''} buttonText={formatMessage(messages.programProgressCardCompletedCertificateButton)} />
            </Col>
          </Row>
        )}

        {isInProgressTab && (
          <Row className="pt-3 pb-2 px-2 border-top border-2 border-muted mb-2 align-items-center">
            <Col xs={12} className="d-flex justify-content-between align-items-center px-0">
              {/* TODO : Certificate status will change after Upgrade is successful through api */}
              <span className="text-start">
                {formatMessage(messages.programProgressInProgressCertificateStatus, {
                  status: canUpgrade ? formatMessage(messages.programProgressInProgressCertificateNeedsVerified) : formatMessage(messages.programProgressInProgressCertificateNotEarned), // TODO : Certificate status will change after Upgrade is successful through api
                })}
              </span>

              {isProfessionalProgram
              && canUpgrade
              && getCertificatePriceString(seats)
              && (
                <ProgressCardButton
                  variant="brand"
                  redirectUrl=""
                  buttonText={formatMessage(messages.programProgressCardUpgradeButton)}
                  type="upgrade"
                  title={title}
                  price={getCertificatePriceString(seats)}
                  courseUrl={courseUrl}
                />
              )}
              {isMicroMastersProgram
              && checkoutUrl
              && canUpgrade
              && (
                <ProgressCardButton
                  variant="brand"
                  redirectUrl={checkoutUrl}
                  buttonText={formatMessage(messages.programProgressInProgressCourseMicromastersUpgrade, {
                    price: getCertificatePriceString(seats, true),
                  })}
                />
              )}
            </Col>
          </Row>
        )}

      </Card.Section>
    </Card>
  );
};
