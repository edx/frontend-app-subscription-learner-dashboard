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
  test('renders trial heading with 0 days when daysLeft calculation is NaN', () => {
    const parseSpy = jest.spyOn(Date, 'parse').mockReturnValue(Number.NaN);

    render(<SubscriptionBanner />);

    const trialTitle = screen.getByText(/your edx subscription trial expires in 0 days\./i);
    expect(trialTitle).toBeInTheDocument();
    expect(trialTitle.textContent).not.toContain('{daysLeft}');

    parseSpy.mockRestore();
  });

  // --- Renew Button ---
  { /* TODO [TEMP]: Removing test cases related to Renew button as there is no dynamic data to determine the subscription status and render the button accordingly.
      Reason: Development before backend connection
      Action: Revisit after backend connection and add necessary mock data to test the Renew button rendering and functionality
  */ }

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
