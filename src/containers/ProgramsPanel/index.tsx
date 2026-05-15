import { FC } from 'react';
import { useIntl } from '@openedx/frontend-base';
import messages from './messages';

import './index.scss';

export const ProgramsPanel: FC = () => {
  const { formatMessage } = useIntl();

  return (
    <div className="programs-list-container" data-testid="programs-list">
      <div className="programs-list-heading-container">
        <h2 className="programs-list-title">{formatMessage(messages.myPrograms)}</h2>
      </div>
      <span>{formatMessage(messages.programsMessage)}</span>
    </div>
  );
};

export default ProgramsPanel;
