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

describe('SubscriptionBanner', () => {
  // --- Renew Button ---
  /**
   * commenting below 2 test cases as right now there is no dynamic data
  */

  // test('renders Renew button for cancelled subscription with correct URL', () => {
  //   render(<SubscriptionBanner />);
  //   const renewBtn = screen.getByTestId('renew-button');
  //   expect(renewBtn).toBeInTheDocument();
  //   expect(renewBtn).toHaveAttribute('href', subscriptionRenewalURL);
  // });

  // test('Renew button opens in a new tab with rel="noopener noreferrer"', () => {
  //   render(<SubscriptionBanner />);
  //   const renewBtn = screen.getByTestId('renew-button');
  //   expect(renewBtn).toHaveAttribute('target', '_blank');
  //   expect(renewBtn).toHaveAttribute('rel', 'noopener noreferrer');
  // });

  test('does not render Renew button for active subscription', () => {
    render(<SubscriptionBanner />);
    expect(screen.queryByTestId('renew-button')).not.toBeInTheDocument();
  });

  test('does not render Renew button for trial subscription', () => {
    render(<SubscriptionBanner />);
    expect(screen.queryByTestId('renew-button')).not.toBeInTheDocument();
  });
  // --- Dismiss ---
  test('does not render banner when not subscribed', () => {
    render(<SubscriptionBanner />);
    expect(screen.queryByTestId('alert-banner')).not.toBeInTheDocument();
  });

  test('dismisses the banner when close button is clicked', async () => {
    render(<SubscriptionBanner />);
    await userEvent.click(
      screen.getByRole('button', { name: /dismiss/i })
    );
    expect(
      screen.queryByRole('alert')
    ).not.toBeInTheDocument();
  });
});
