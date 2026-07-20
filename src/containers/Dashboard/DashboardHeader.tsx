import { FC } from 'react';
import { useIntl } from '@openedx/frontend-base';

import messages from './messages';
import type { DashboardHeaderProps } from './data/types';

export const DashboardHeader: FC<DashboardHeaderProps> = ({ startDate }) => {
  const { formatMessage } = useIntl();

  return (
    <div className="my-4.5">
      <h2 className="font-weight-bold mb-3 dashboard-header-title" data-testid="dashboard-title">
        {formatMessage(messages.dashboardHeaderWelcomeTitle)}
      </h2>
      <p className="mb-0 text-body" data-testid="dashboard-subtitle">
        {formatMessage(messages.dashboardHeaderWelcomeMessage, { startDate })}
      </p>
    </div>
  );
};
