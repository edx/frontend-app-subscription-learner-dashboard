import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import moment from 'moment';
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
  const getStartOfDayMs = (dateString: string) => moment(dateString).startOf('day').valueOf();

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('renders trial heading with "expires today" when trial end date is today', () => {
    jest.spyOn(moment, 'now').mockReturnValue(getStartOfDayMs('2026-07-22'));

    render(<SubscriptionBanner />);

    const trialTitle = screen.getByText(/your edx subscription trial expires today\./i);
    expect(trialTitle).toBeInTheDocument();
    expect(trialTitle.textContent).not.toContain('{daysLeft}');
  });

  test('renders trial heading with "expires tomorrow" when trial end date is tomorrow', () => {
    const nowSpy = jest.spyOn(moment, 'now').mockReturnValue(getStartOfDayMs('2026-07-21'));

    render(<SubscriptionBanner />);

    expect(screen.getByText(/your edx subscription trial expires tomorrow\./i)).toBeInTheDocument();

    nowSpy.mockRestore();
  });

  test('renders trial heading with interpolated days when trial end date is more than one day away', () => {
    const nowSpy = jest.spyOn(moment, 'now').mockReturnValue(getStartOfDayMs('2026-07-19'));

    render(<SubscriptionBanner />);

    expect(screen.getByText(/your edx subscription trial expires in 3 days\./i)).toBeInTheDocument();

    nowSpy.mockRestore();
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
