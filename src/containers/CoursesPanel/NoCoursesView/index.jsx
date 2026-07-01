import React from 'react';
import { useIntl } from '@openedx/frontend-base';
import messages from './messages';
import { Button } from '@openedx/paragon';
import { Search } from '@openedx/paragon/icons';
import { baseAppUrl } from '@src/data/services/lms/urls';

import { useInitializeSubsDashboard } from '@src/data/hooks';

export const NoCoursesView = () => {
  const { formatMessage } = useIntl();
  const { data: learnerData } = useInitializeSubsDashboard();
  const courseSearchUrl = learnerData?.platformSettings?.courseSearchUrl || '';

  return (
    <div className="no-courses-content-view">
      <p>{formatMessage(messages.inProgressCoursesPrompt)}</p>
      <Button
        variant="brand"
        as="a"
        href={baseAppUrl(courseSearchUrl)}
        iconBefore={Search}
      >
        {formatMessage(messages.findCoursesButton)}
      </Button>
    </div>
  );
};

export default NoCoursesView;
