import { FC, useState } from 'react';
import { Alert, Icon } from '@openedx/paragon';
import { CheckCircle, OpenInNew } from '@openedx/paragon/icons';
import { BannerItem } from '../types';
import './DismissableBannerView.scss';

export const DismissableBannerView: FC<{
  bannerData: BannerItem,
  isLoading: boolean,
  isError: boolean,
}> = ({ bannerData, isLoading, isError }) => {
  const [showPageBanner, setShowPageBanner] = useState(true);
  // const [variant, setVariant] = useState<'info' | 'warning'>('success');

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div data-testid="error-loading-banner">Error loading banner</div>;
  }

  return (
    <div className="dismissable-banner-container">
      <Alert
        variant="warning"
        icon={CheckCircle}
        dismissible
        closeLabel="Dismiss"
        show={showPageBanner}
        onClose={() => setShowPageBanner(false)}
        actions={[
          <a
            key="renew-link"
            className="renew-button"
            href="https://courses.edx.org/renew-subscription"
            target="_blank"
            rel="noopener noreferrer"
          >
            Renew Subscription
            <Icon
              src={OpenInNew}
              className="mis-2 in-new-icon"
            />
          </a>,
        ]}
      >
        <Alert.Heading>{bannerData.title}</Alert.Heading>
        <p>
          {bannerData.body}
        </p>
      </Alert>
    </div>
  );
};
