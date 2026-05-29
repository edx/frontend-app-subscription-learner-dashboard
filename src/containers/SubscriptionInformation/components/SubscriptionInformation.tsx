import { FC } from 'react';
import { Alert, Button, Image } from '@openedx/paragon';
import { useIntl } from '@openedx/frontend-base';
import { utilHooks } from '@src/hooks';
import messages from '../messages';
import { manageSubscriptionURL } from '@src/data/constants/app';

// TODO: We can replace the below hardcoded subscriptionInformationData with the actual data from the API once we have the API ready.
// For now, we can use this hardcoded data to test the SubscriptionInformation component.
const subscriptionInformationData = {
  isSubscribed: true,
  subscriptionStatus: 'cancelled', // can be 'active', 'cancelled', 'expired'
  subscriptionStartDate: '05/22/25',
  subscriptionEndDate: '05/22/26',
  subscriptionRenewalDate: '05/22/26',
  subscriptionRenewalPrice: '$36',
  numberOfCoursesEnrolled: 5,
  totalSavings: '$120',
};

export const SubscriptionInformation: FC = () => {
  const { formatMessage } = useIntl();
  const formatDate = utilHooks.useFormatDate();

  const subscriptionActions = [
    <Button
      key="manage-subscription"
      variant="outline-brand"
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
    <div className="container subscription-information p-3\.5">
      <Image
        className="mr-2"
        src="https://www.edx.org/trademark-logos/edx-logo-elm.svg"
        rounded
        alt="edX Logo"
        width={40}
        height={60}
      />
      {subscriptionInformationData.subscriptionStatus === 'cancelled' && (
        <h3>{formatMessage(messages.cancelledMessage, { totalSavings: subscriptionInformationData.totalSavings })}</h3>
      )}
      <p>
        {formatMessage(messages.coursesEnrollmentMessage, {
          numberOfCoursesEnrolled: subscriptionInformationData.numberOfCoursesEnrolled,
          totalSavings: subscriptionInformationData.totalSavings,
        })}
      </p>
      <Alert
        dismissible={false}
        show={true}
        actions={subscriptionActions}
        className="subscription-status-alert bg-light-200"
      >
        <Alert.Heading>{formatMessage(messages.statusMessage)}</Alert.Heading>
        <p>
          {formatMessage(messages.renewalMessage, {
            subscriptionRenewalDate: formatDate(subscriptionInformationData.subscriptionRenewalDate),
          })}
        </p>
      </Alert>
    </div>
  );
};
