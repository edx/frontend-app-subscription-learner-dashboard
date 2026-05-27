import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '@openedx/paragon';
import { FormattedNumber, useIntl } from '@openedx/frontend-base';

import { useProgramProgressData } from '@src/data/hooks/queryHooks';
import './index.scss';
import messages from './messages';

const UpgradeAllButton: FC = () => {
  const { uuid } = useParams() as { uuid: string };

  const { data: programProgressData } = useProgramProgressData(uuid);
  const { formatMessage } = useIntl();
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
