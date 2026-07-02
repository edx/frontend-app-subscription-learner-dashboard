import { FC } from 'react';
import { useIntl } from '@openedx/frontend-base';
import messages from '../messages';
import { ProgramProgressSidebarProps } from '../../data/types';
import ProgramProgressCircle from './ProgramProgressCircle';
import './index.scss';

export const ProgramProgressSidebar: FC<ProgramProgressSidebarProps> = ({
  inProgress, remaining, completed
}) => {
  const { formatMessage } = useIntl();
  // TODO: Replace hard-coded price with API value when integrated
  const formattedPrice = '$896.10';

  return (
    <div
      className="program-certificate-widget"
      data-testid="program-certificate-progress"
    >
      <ProgramProgressCircle inProgress={inProgress} remaining={remaining} completed={completed} />
      <h6 className="progress-heading-circle font-weight-bold mb-4 mt-4">
        {formatMessage(messages.programProgressCertificateLabel)}
      </h6>
      <div className="progress-certificate-content pt-3 px-3">
        <p>
          {formatMessage(messages.programProgressCertificateContentOne)}
        </p>
        <p>
          {formatMessage(messages.programProgressCertificateContentTwo, { price: `{${formattedPrice}}` })}
        </p>
      </div>
    </div>
  );
};
