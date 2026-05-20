import { FC, useState } from 'react';
import { useIntl } from '@openedx/frontend-base';
import messages from './messages';
import NoProgramsView from './NoProgramsView';

export const ProgramsPanel: FC = () => {
  const { formatMessage } = useIntl();
  const [hasProgramsEnrollment] = useState(false);

  return (
    <>
      <div className="programs-list-container mb-5" data-testid="programs-list">
        <div className="d-flex flex-row justify-content-between text-center">
          <h3 className="programs-list-title mb-3">{formatMessage(messages.myPrograms)}</h3>
        </div>
        {!hasProgramsEnrollment && <NoProgramsView />}
      </div>
    </>
  );
};

export default ProgramsPanel;
