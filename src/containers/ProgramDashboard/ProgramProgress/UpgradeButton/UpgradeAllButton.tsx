import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '@openedx/paragon';
import { FormattedNumber, useIntl, camelCaseObject } from '@openedx/frontend-base';

import { useProgramProgressData } from '@src/data/hooks/queryHooks';
import './index.scss';
import messages from './messages';

const UpgradeAllButton: FC = () => {
  const { uuid } = useParams() as { uuid: string };

  const { data } = useProgramProgressData(uuid);
  const programProgressData = camelCaseObject(data);

  const { formatMessage } = useIntl();
  const { urls } = programProgressData;

  const getAllRemainingCoursesPrice = () => {
    if (!programProgressData.programData) {
      return null;
    }
    const { discountData } = programProgressData.programData;

    const {
      currency,
      totalInclTaxExclDiscounts,
      totalInclTax,
    } = discountData;

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
