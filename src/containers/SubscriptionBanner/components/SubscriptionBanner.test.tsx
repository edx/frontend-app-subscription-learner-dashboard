import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SubscriptionBanner } from './SubscriptionBanner';

jest.mock('react-intl', () => ({
  ...jest.requireActual('react-intl'),
  useIntl: () => ({
    formatMessage: (msg: { defaultMessage: string }, values?: Record<string, string>) => {
      if (!values) {
        return msg.defaultMessage;
      }
      return msg.defaultMessage.replace(/\{(\w+)\}/g, (_: string, key: string) => values[key] ?? `{${key}}`);
    },
  }),
}));

jest.mock('@openedx/frontend-base', () => ({
  useIntl: () => ({
    formatMessage: (msg: { defaultMessage: string }, values?: Record<string, string>) => {
      if (!values) {
        return msg.defaultMessage;
      }
      return msg.defaultMessage.replace(/\{(\w+)\}/g, (_: string, key: string) => values[key] ?? `{${key}}`);
    },
  }),
  defineMessages: (msgs: Record<string, unknown>) => msgs,
}));

jest.mock('@src/hooks', () => ({
  utilHooks: {
    useFormatDate: () => (date: string) => date,
  },
}));

const mockBannerData = {
  isSubscribed: true,
  subscriptionStatus: 'active',
  subscriptionStartDate: '05/22/25',
  subscriptionEndDate: '05/22/26',
  subscriptionRenewalDate: '05/22/26',
  subscriptionRenewalPrice: '$36',
};

describe('SubscriptionBanner', () => {
  // --- Renew Button ---
  test('renders Renew button only for cancelled subscription', () => {
    const cancelledBannerData = { ...mockBannerData, subscriptionStatus: 'cancelled' };
    render(<SubscriptionBanner subscriptionBannerData={cancelledBannerData} />);
    expect(screen.getByTestId('renew-button')).toBeInTheDocument();
  });

  test('Renew button points to the correct URL', () => {
    const cancelledBannerData = { ...mockBannerData, subscriptionStatus: 'cancelled' };
    render(<SubscriptionBanner subscriptionBannerData={cancelledBannerData} />);
    expect(screen.getByTestId('renew-button')).toHaveAttribute('href', 'https://courses.edx.org/renew-subscription');
  });

  test('Renew button opens in a new tab with rel="noopener noreferrer"', () => {
    const cancelledBannerData = { ...mockBannerData, subscriptionStatus: 'cancelled' };
    render(<SubscriptionBanner subscriptionBannerData={cancelledBannerData} />);
    const renewBtn = screen.getByTestId('renew-button');
    expect(renewBtn).toHaveAttribute('target', '_blank');
    expect(renewBtn).toHaveAttribute('rel', 'noopener noreferrer');
  });

  test('Renew button has role="link"', () => {
    const cancelledBannerData = { ...mockBannerData, subscriptionStatus: 'cancelled' };
    render(<SubscriptionBanner subscriptionBannerData={cancelledBannerData} />);
    expect(screen.getByTestId('renew-button')).toHaveAttribute('role', 'link');
  });

  test('does not render Renew button for active subscription', () => {
    render(<SubscriptionBanner subscriptionBannerData={mockBannerData} />);
    expect(screen.queryByTestId('renew-button')).not.toBeInTheDocument();
  });

  test('does not render Renew button for trial subscription', () => {
    const trialBannerData = { ...mockBannerData, subscriptionStatus: 'trial' };
    render(<SubscriptionBanner subscriptionBannerData={trialBannerData} />);
    expect(screen.queryByTestId('renew-button')).not.toBeInTheDocument();
  });
  // --- Dismiss ---
  test('does not render banner when not subscribed', () => {
    const notSubscribedData = { ...mockBannerData, isSubscribed: false };
    render(<SubscriptionBanner subscriptionBannerData={notSubscribedData} />);
    expect(screen.queryByTestId('alert-banner')).not.toBeInTheDocument();
  });

  test('dismisses the banner when close button is clicked', async () => {
    render(<SubscriptionBanner subscriptionBannerData={mockBannerData} />);
    await userEvent.click(
      screen.getByRole('button', { name: /dismiss/i })
    );
    expect(
      screen.queryByRole('alert')
    ).not.toBeInTheDocument();
  });
});
