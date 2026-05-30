import { FC } from 'react';
import { Button } from '@openedx/paragon';
import { useIntl } from '@openedx/frontend-base';

import messages from '../messages';

export const ViewCourseDetailButton: FC = () => {
  const { formatMessage } = useIntl();

  return (
    <Button variant="outline-primary">
      {formatMessage(messages.programProgressCardViewCourseDetailButton)}
    </Button>
  );
};
