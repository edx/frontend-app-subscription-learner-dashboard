import { FC } from 'react';
import { useIntl } from '@openedx/frontend-base';
import messages from './messages';
import { Button } from '@openedx/paragon';
import { Search } from '@openedx/paragon/icons';
import { baseAppUrl } from '@src/data/services/lms/urls';
import { exploreProgramsUrl } from '@src/data/constants/app';

export const NoProgramsView: FC = () => {
  const { formatMessage } = useIntl();

  return (
    <div className="no-programs-content-view">
      <p>{formatMessage(messages.inProgressProgramsPrompt)}</p>
      <Button
        variant="brand"
        as="a"
        href={baseAppUrl(exploreProgramsUrl)}
        iconBefore={Search}
      >
        {formatMessage(messages.findProgramsButton)}
      </Button>
    </div>
  );
};

export default NoProgramsView;
