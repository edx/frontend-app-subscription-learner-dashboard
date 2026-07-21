import { FC } from 'react';
import { useIntl } from '@openedx/frontend-base';
import messages from './messages';
import type { DashboardHeaderProps } from './data/types';
import { dateFormatter } from '@src/utils/dateFormatter';

export const DashboardHeader: FC<DashboardHeaderProps> = ({ startDate }) => {
  const { formatMessage, formatDate } = useIntl();
  const formattedDate = startDate ? dateFormatter(formatDate, startDate, 'long') : '';

  return (
    <div className="my-4.5">
      <h2 className="font-weight-bold mb-3 dashboard-header-title" data-testid="dashboard-header-title">
        {formatMessage(messages.dashboardHeaderWelcomeTitle)}
      </h2>
      {startDate ? (
        <p className="mb-0 text-body dashboard-header-subtitle" data-testid="dashboard-header-subtitle">
          {formatMessage(messages.dashboardHeaderWelcomeMessage, { startDate: formattedDate || '' })}
        </p>
      ) : null}
    </div>
  );
};
