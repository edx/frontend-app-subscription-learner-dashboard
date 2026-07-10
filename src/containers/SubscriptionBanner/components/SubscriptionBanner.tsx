import { FC, useEffect, useState, useMemo } from 'react';
import { Alert, Icon, Button, Variant } from '@openedx/paragon';
import { CheckCircle, Info, OpenInNew } from '@openedx/paragon/icons';
import { useIntl } from '@openedx/frontend-base';
import { utilHooks } from '@src/hooks';
import messages from '../messages';
import { subscriptionRenewalURL } from '@src/data/constants/app';
import { DAY_IN_MS } from '@src/containers/ProgramDashboard/data/constants';

// TODO: We can replace the below hardcoded subscriptionBannerData with the actual data from the API once we have the API ready.
// For now, we can use this hardcoded data to test the SubscriptionBanner component.
// Refer to https://2u-internal.atlassian.net/browse/SUBS-442 for more details on the API integration.
// And https://github.com/edx/frontend-app-subscription-learner-dashboard/pull/2#discussion_r3139442324 for the implementation details of the API integration.
const subscriptionBannerData = {
  isSubscribed: true,
  subscriptionStatus: 'trial', // can be 'active', 'cancelled', 'expired'
  subscriptionStartDate: '2026-05-22',
  subscriptionEndDate: '2026-07-22',
  subscriptionRenewalDate: '2026-07-22',
  subscriptionRenewalPrice: '$36',
};

// TODO: Also update as per new designs once we have the designs ready for the other subscription types than 'trial'.
export const SubscriptionBanner: FC = () => {
  const { formatMessage } = useIntl();
  const [showPageBanner, setShowPageBanner] = useState<boolean>(true);
  const [bannerBody, setBannerBody] = useState('');
  const [bannerTitle, setBannerTitle] = useState('');
  const [bannerVariant, setBannerVariant] = useState<Variant | undefined>(undefined);
  const formatDate = utilHooks.useFormatDate();

  useEffect(() => {
    // const trialDaysLeft = Math.max(0, Math.ceil((Date.parse(subscriptionBannerData.subscriptionEndDate) - Date.now()) / 86400000)) || 0;
    const trialEndMs = Date.parse(subscriptionBannerData.subscriptionEndDate);
    const trialDaysLeft = Number.isFinite(trialEndMs)
      ? Math.max(0, Math.ceil((trialEndMs - Date.now()) / DAY_IN_MS))
      : 0;

    switch (subscriptionBannerData.subscriptionStatus) {
      case 'active':
        setBannerVariant('success');
        setBannerTitle(formatMessage(messages.activeSubscriptionTitle));
        setBannerBody(formatMessage(messages.activeSubscriptionBody, {
          subscriptionStartDate: formatDate(subscriptionBannerData.subscriptionStartDate),
          subscriptionRenewalDate: formatDate(subscriptionBannerData.subscriptionRenewalDate),
          subscriptionRenewalPrice: subscriptionBannerData.subscriptionRenewalPrice,
        }));
        break;
      case 'trial':
        setBannerVariant('success');
        if (trialDaysLeft === 0) {
          setBannerTitle(formatMessage(messages.activeTrialSubscriptionTitleToday));
        } else if (trialDaysLeft === 1) {
          setBannerTitle(formatMessage(messages.activeTrialSubscriptionTitleTomorrow));
        } else {
          setBannerTitle(formatMessage(messages.activeTrialSubscriptionTitle, {
            daysLeft: trialDaysLeft,
          }));
        }
        setBannerBody(formatMessage(messages.activeTrialSubscriptionBody, {
          subscriptionStartDate: formatDate(subscriptionBannerData.subscriptionStartDate),
          subscriptionRenewalDate: formatDate(subscriptionBannerData.subscriptionRenewalDate),
          subscriptionRenewalPrice: subscriptionBannerData.subscriptionRenewalPrice,
        }));
        break;
      case 'cancelled':
        setBannerVariant('warning');
        setBannerTitle(formatMessage(messages.cancelledSubscriptionTitle));
        setBannerBody(formatMessage(messages.cancelledSubscriptionBody, {
          subscriptionEndDate: formatDate(subscriptionBannerData.subscriptionStartDate),
        }));
        break;
      default:
        setShowPageBanner(false);
        break;
    }
  }, [formatDate, formatMessage]);

  const getSubscriptionAction = useMemo(() => {
    if (subscriptionBannerData.subscriptionStatus === 'cancelled') {
      return (
        [
          <Button
            key="renew-subscription"
            data-testid="renew-button"
            className="renew-button"
            variant="primary"
            href={subscriptionRenewalURL}
            target="_blank"
            rel="noopener noreferrer"
            role="link"
          >
            {formatMessage(messages.renewSubscriptionButton)}
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
  }, [formatMessage]);

  const bannerIcon = subscriptionBannerData.subscriptionStatus === 'cancelled'
    ? Info
    : subscriptionBannerData.subscriptionStatus === 'trial'
      ? undefined
      : CheckCircle;

  return (
    <div className="mt-4.5 mb-4.5">
      <Alert
        variant={bannerVariant}
        icon={bannerIcon}
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
