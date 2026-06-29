import React from 'react';
import { useIntl } from '@openedx/frontend-base';
import { ProgramProgressInfoProps } from '../data/types';
import messages from './messages';

import { UpgradeAllButton } from './UpgradeButton';

const ProgramProgressInfo: React.FC<ProgramProgressInfoProps> = ({
  allCoursesCompleted, totalCoursesInProgram, programTitle, discountData
}) => {
  const { formatMessage } = useIntl();
  return (
    <div className="pb-4.5">
      {allCoursesCompleted
        ? (
            <>
              <h3>{formatMessage(messages.programProgressCompleteHeader)}</h3>
              <p>{formatMessage(messages.programProgressCompleteText, { programTitle })}</p>
            </>
          )
        : (
            <>
              <h3 className="program-journey-header font-weight-bold">{formatMessage(messages.programProgressIncompleteHeader)}</h3>
              <p className="program-journey-text" data-testid="program-incomplete-info-text">
                {formatMessage(messages.programProgressIncompleteText, { totalCoursesInProgram })}
              </p>
              {discountData?.currency && typeof discountData?.totalInclTax === 'number' && typeof discountData?.totalInclTaxExclDiscounts === 'number' && (
                <UpgradeAllButton />
              )}
            </>
          )}
    </div>
  );
};

export default ProgramProgressInfo;
