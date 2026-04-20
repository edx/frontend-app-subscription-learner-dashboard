import { FC, useState } from 'react';
import { PageBanner, Icon } from '@openedx/paragon';
import { CheckCircle, OpenInNew } from '@openedx/paragon/icons';
import { BannerItem } from '../types';
import './DismissableBannerView.scss';

export const DismissableBannerView: FC<{
  bannerData: BannerItem,
  isLoading: boolean,
  isError: boolean,
}> = ({ bannerData, isLoading, isError }) => {
  const [showPageBanner, setShowPageBanner] = useState(true);
  // const [variant, setVariant] = useState<'light' | 'dark' | 'warning' | 'accentA' | 'accentB'>('light');

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div data-testid="error-loading-banner">Error loading banner</div>;
  }

  return (
    <div className="dismissable-banner-container">
      <PageBanner
        show={showPageBanner}
        dismissible={false}
        dismissAltText="Dismiss"
        // variant={variant}
        variant="light"
        onDismiss={() => setShowPageBanner(false)}
      >
        <div className="banner-content-container">
          <div className="banner-title-container">
            <Icon
              src={CheckCircle}
              className="mie-2 correct-icon"
            />
            <h3 className="message-title">{bannerData.title}</h3>
          </div>
          <span className="message-body" data-testid="test-message-body">{bannerData.body}</span>
        </div>
        <div className="action-container">
          <button
            className="dismiss-button"
            onClick={() => setShowPageBanner(false)}
          >
            Dismiss
          </button>
          <a
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
          </a>
        </div>
      </PageBanner>
    </div>
  );
};
