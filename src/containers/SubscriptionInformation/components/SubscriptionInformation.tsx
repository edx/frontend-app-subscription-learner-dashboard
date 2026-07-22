import { FC } from 'react';
import { Alert, Button, Icon } from '@openedx/paragon';
import { useIntl } from '@openedx/frontend-base';
import { utilHooks } from '@src/hooks';
import messages from '../messages';
import { manageSubscriptionURL } from '@src/data/constants/app';
import '../index.scss';
import { Cached } from '@openedx/paragon/icons';

// TODO: We can replace the below hardcoded subscriptionInformationData with the actual data from the API once we have the API ready.
// For now, we can use this hardcoded data to test the SubscriptionInformation component.
const subscriptionInformationData = {
  isSubscribed: true,
  subscriptionStatus: 'Active', // can be 'active', 'cancelled', 'expired'
  subscriptionStartDate: '05/22/25',
  subscriptionEndDate: '05/22/26',
  subscriptionRenewalDate: '05/22/26',
  subscriptionRenewalPrice: '$36',
  numberOfCoursesEnrolled: 5,
  totalSavings: '$120',
  planName: 'Monthly plan',
};

export const SubscriptionInformation: FC = () => {
  const { formatMessage } = useIntl();
  const formatDate = utilHooks.useFormatDate();

  const subscriptionActions = [
    <Button
      key="manage-subscription"
      variant="tertiary"
      data-testid="manage-button"
      href={manageSubscriptionURL}
      target="_blank"
      rel="noopener noreferrer"
      role="link"
    >
      {formatMessage(messages.manageSubscriptionMessage)}
    </Button>,
  ];

  return (
    <div className="container subscription-information py-5 px-4">
      <h2 className="mb-4 my-subscription-heading">{formatMessage(messages.mySubscriptionHeading)}</h2>
      <Alert
        dismissible={false}
        show={true}
        actions={subscriptionActions}
        className="subscription-status-alert bg-white"
      >
        <Alert.Heading
          as="h6"
        >
          <Icon src={Cached} className="icon mr-1" />
          {/* TODO : To be updated from API response once correct response is received */}
          {subscriptionInformationData.subscriptionStatus}, {subscriptionInformationData.planName}
        </Alert.Heading>
        <p>
          {formatMessage(messages.renewalMessage, {
            subscriptionRenewalDate: formatDate(subscriptionInformationData.subscriptionRenewalDate),
          })}
        </p>
      </Alert>
    </div>
  );
};
