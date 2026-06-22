import { FC } from 'react';
import { useIntl } from '@openedx/frontend-base';

import messages from './messages';

const NoRecentlyViewedCourse: FC = () => {
  const { formatMessage } = useIntl();

  return (
    <div data-testid="no-recently-viewed-course">
      <p className="mb-0">{formatMessage(messages.recentlyViewedEmptyState)}</p>
    </div>
  );
};

export default NoRecentlyViewedCourse;
