import { FC, useMemo } from 'react';
import { camelCaseObject, useIntl } from '@openedx/frontend-base';
import messages from './messages';
import NoProgramsView from './NoProgramsView';
import { ProgramsList } from '../ProgramDashboard';
import { useProgramsListData } from '@src/data/hooks/queryHooks';

export const ProgramsPanel: FC = () => {
  const { formatMessage } = useIntl();
  const { data, isLoading, isError: errorState } = useProgramsListData();
  const programsData = useMemo(() => camelCaseObject(data?.programs) ?? [], [data?.programs]);
  const hasProgramsEnrollment = programsData.length > 0;
  const shouldRenderNoProgramsView = !isLoading && !errorState && !hasProgramsEnrollment;

  return (
    <>
      <div className="programs-list-container mb-5" data-testid="programs-list">
        <div className="d-flex flex-row justify-content-between text-center">
          <h3 className="programs-list-title mb-3">{formatMessage(messages.myPrograms)}</h3>
        </div>
        {shouldRenderNoProgramsView
          ? <NoProgramsView />
          : <ProgramsList programsData={programsData} isLoading={isLoading} errorState={errorState} />}
      </div>
    </>
  );
};

export default ProgramsPanel;
