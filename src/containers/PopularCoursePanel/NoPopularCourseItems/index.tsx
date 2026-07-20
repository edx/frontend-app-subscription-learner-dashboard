import { FC } from 'react';
import { useIntl } from '@openedx/frontend-base';

import messages from './messages';

const NoPopularCourseItems: FC = () => {
  const { formatMessage } = useIntl();

  return (
    <div data-testid="no-popular-course-items">
      <p className="mb-0">{formatMessage(messages.popularCourseEmptyState)}</p>
    </div>
  );
};

export default NoPopularCourseItems;
