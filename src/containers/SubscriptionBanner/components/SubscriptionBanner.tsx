import { FC, useEffect, useState, useMemo } from 'react';
import { Alert, Icon, Button, Variant } from '@openedx/paragon';
import { CheckCircle, Info, OpenInNew } from '@openedx/paragon/icons';
import { useIntl } from '@openedx/frontend-base';
import { BannerItem } from '../types';
import './SubscriptionBanner.scss';
import { utilHooks } from '@src/hooks';
import messages from '../messages';

export const SubscriptionBanner: FC<{
  subscriptionBannerData: BannerItem,
}> = ({ subscriptionBannerData }) => {
  const { formatMessage } = useIntl();
  const [showPageBanner, setShowPageBanner] = useState<boolean>(true);
  const [bannerBody, setBannerBody] = useState('');
  const [bannerTitle, setBannerTitle] = useState('');
  const [bannerVariant, setBannerVariant] = useState<Variant | undefined>(undefined);
  const formatDate = utilHooks.useFormatDate();

  useEffect(() => {
    if (!subscriptionBannerData.isSubscribed) {
      setShowPageBanner(false);
      return;
    }

    if (subscriptionBannerData.subscriptionStatus === 'active') {
      setBannerVariant('success');
      setBannerTitle(formatMessage(messages.activeSubscriptionTitle));
      // setBannerBody(`On ${formatDate(subscriptionBannerData.subscriptionStartDate)} you subscribed to edX subscription product. Your subscription will renew on ${formatDate(subscriptionBannerData.subscriptionRenewalDate)} for ${subscriptionBannerData.subscriptionRenewalPrice}.`);
      setBannerBody(formatMessage(messages.activeSubscriptionBody, {
        subscriptionStartDate: formatDate(subscriptionBannerData.subscriptionStartDate), subscriptionRenewalDate: formatDate(subscriptionBannerData.subscriptionRenewalDate), subscriptionRenewalPrice: subscriptionBannerData.subscriptionRenewalPrice
      }));
    } else if (subscriptionBannerData.subscriptionStatus === 'trial') {
      setBannerVariant('success');
      setBannerTitle(formatMessage(messages.activeTrialSubscriptionTitle));
      setBannerBody(formatMessage(messages.activeTrialSubscriptionBody, {
        subscriptionStartDate: formatDate(subscriptionBannerData.subscriptionStartDate), subscriptionRenewalDate: formatDate(subscriptionBannerData.subscriptionRenewalDate), subscriptionRenewalPrice: subscriptionBannerData.subscriptionRenewalPrice
      }));
    } else if (subscriptionBannerData.subscriptionStatus === 'cancelled') {
      setBannerVariant('warning');
      setBannerTitle(formatMessage(messages.cancelledSubscriptionTitle));
      setBannerBody(formatMessage(messages.cancelledSubscriptionBody, {
        subscriptionEndDate: formatDate(subscriptionBannerData.subscriptionStartDate),
      }));
    }
  }, [subscriptionBannerData, formatDate, formatMessage]);

  const getSubscriptionAction = useMemo(() => {
    if (subscriptionBannerData.subscriptionStatus === 'cancelled') {
      return (
        [
          <Button
            key="renew-subscription"
            className="renew-button"
            variant="primary"
            href="https://courses.edx.org/renew-subscription"
            target="_blank"
            rel="noopener noreferrer"
            role="link"
          >
            Renew Subscription
            <Icon
              src={OpenInNew}
              className="mr-2 in-new-icon"
            />
          </Button>,
        ]
      );
    } else {
      return [];
    }
  }, [subscriptionBannerData.subscriptionStatus]);

  return (
    <div className="subscription-banner-container">
      <Alert
        variant={bannerVariant}
        icon={subscriptionBannerData.subscriptionStatus === 'cancelled' ? Info : CheckCircle}
        dismissible
        closeLabel="Dismiss"
        show={showPageBanner}
        onClose={() => setShowPageBanner(false)}
        actions={getSubscriptionAction}
      >
        <Alert.Heading>{bannerTitle}</Alert.Heading>
        <p>
          {bannerBody}
        </p>
      </Alert>
    </div>
  );
};
