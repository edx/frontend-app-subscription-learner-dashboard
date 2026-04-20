import { FC, useState } from 'react';
import { Alert, Icon, Button } from '@openedx/paragon';
import { CheckCircle, OpenInNew } from '@openedx/paragon/icons';
import { BannerItem } from '../types';
import './DismissableBannerView.scss';

export const DismissableBannerView: FC<{
  bannerData: BannerItem,
  isLoading: boolean,
  isError: boolean,
}> = ({ bannerData, isLoading, isError }) => {
  const [showPageBanner, setShowPageBanner] = useState(true);
  // const [variant, setVariant] = useState<'info'>('success');

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div data-testid="error-loading-banner">Error loading banner</div>;
  }

  return (
    <div className="dismissable-banner-container">
      <Alert
        variant="success"
        icon={CheckCircle}
        dismissible
        closeLabel="Dismiss"
        show={showPageBanner}
        onClose={() => setShowPageBanner(false)}
        actions={[
          <Button key="renew-subscription-button">
            <Icon
              src={OpenInNew}
              className="mis-2 in-new-icon"
            />
            Renew Subscription
          </Button>,
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
