import { FC, useMemo } from 'react';
import { useIntl } from '@openedx/frontend-base';
import messages from './messages';
import NoProgramsView from './NoProgramsView';
import { ProgramsList } from './ProgramDashboard';
import { useProgramsListData } from '@src/data/hooks';


export const ProgramsPanel: FC = () => {
  const { formatMessage } = useIntl();
  const {
    data: programsData = [],
  } = useProgramsListData();
  const hasProgramsEnrollment = useMemo(() => programsData?.length > 0, [programsData]);

  return (
    <>
      <div className="programs-list-container mb-5" data-testid="programs-list">
        <div className="d-flex flex-row justify-content-between text-center">
          <h3 className="programs-list-title mb-3">{formatMessage(messages.myPrograms)}</h3>
        </div>
        {!hasProgramsEnrollment ? <NoProgramsView /> : <ProgramsList />}
      </div>
    </>
  );
};

export default ProgramsPanel;
