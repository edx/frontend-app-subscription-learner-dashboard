import React, { useContext } from 'react';
import { Button } from '@openedx/paragon';
import { FormattedNumber, useIntl } from '@openedx/frontend-base';
import messages from './messages';
import './index.scss';
import { ProgramProgressContext, ProgramProgressContextValueType } from '../ProgramProgressProvider';

const UpgradeAllButton: React.FC = () => {
  const { formatMessage } = useIntl();
  const { programProgressData } = useContext<ProgramProgressContextValueType>(ProgramProgressContext);
  const { urls } = programProgressData;

  const getAllRemainingCoursesPrice = () => {
    if (!programProgressData.programData) {
      return null;
    }
    const { discountData } = programProgressData.programData;

    if (discountData) {
      const {
        currency,
        isDiscounted,
        totalInclTaxExclDiscounts,
        totalInclTax,
      } = discountData;

      if (isDiscounted) {
        return (
          <>
            <span className="list-price">
              <FormattedNumber
                value={totalInclTaxExclDiscounts}
                style="currency"
                currency={currency}
                maximumFractionDigits={2}
                minimumFractionDigits={2}
              />
            </span>
            <span>
              <FormattedNumber
                value={totalInclTax}
                style="currency"
                currency={currency}
                maximumFractionDigits={2}
                minimumFractionDigits={2}
              />
            </span>
          </>
        );
      }
      return (
        <span>
          <FormattedNumber
            value={totalInclTax}
            style="currency"
            currency={currency}
            maximumFractionDigits={2}
            minimumFractionDigits={2}
          />
        </span>
      );
    }
    return null;
  };

  return (
    <Button
      as="a"
      className="upgrade-all-button"
      href={urls && urls.buyButtonUrl}
      data-testid="upgrade-all-button"
      variant="brand"
    >
      <span>
        {formatMessage(messages.upgradeAllRemainingCoursesButtonText)}
      </span>
      {getAllRemainingCoursesPrice() && (
        <span className="all-remaining-courses-price">
          {getAllRemainingCoursesPrice()}
        </span>
      )}
    </Button>
  );
};

export default UpgradeAllButton;
