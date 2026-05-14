import React from 'react';
import { useIntl } from '@edx/frontend-platform/i18n';
import { ProgramProgressInfoProps } from '../data/types';
import messages from './messages';

import { UpgradeAllButton } from './UpgradeButton';

const ProgramProgressInfo: React.FC<ProgramProgressInfoProps> = ({
  allCoursesCompleted, totalCoursesInProgram,
}) => {
  const { formatMessage } = useIntl();
  return (
    <div className="pb-4.5">
      {allCoursesCompleted
        ? (
            <>
              <h3>{formatMessage(messages.programProgressCompleteHeader)}</h3>
              <p>{formatMessage(messages.programProgressCompleteText)}</p>
            </>
          )
        : (
            <>
              <h3 className="programJourneyHeader font-weight-bold">{formatMessage(messages.programProgressIncompleteHeader)}</h3>
              <p className="programJourneyText" data-testid="program-incomplete-info-text">
                {formatMessage(messages.programProgressIncompleteText, { totalCoursesInProgram })}
              </p>
              <UpgradeAllButton />
            </>
          )}
    </div>
  );
};

export default ProgramProgressInfo;
