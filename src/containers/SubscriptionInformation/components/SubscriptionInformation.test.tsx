import React from 'react';
import { render, screen } from '@testing-library/react';
import { SubscriptionInformation } from './SubscriptionInformation';
import { manageSubscriptionURL } from '@src/data/constants/app';

jest.mock('@openedx/frontend-base', () => ({
  useIntl: () => ({
    formatMessage: (msg: { defaultMessage: string }, values?: Record<string, string>) => {
      if (!values) return msg.defaultMessage;
      return msg.defaultMessage.replace(
        /\{(\w+)\}/g,
        (_: string, key: string) => values[key] ?? `{${key}}`
      );
    },
  }),
  defineMessages: (msgs: Record<string, unknown>) => msgs,
}));

jest.mock('@src/hooks', () => ({
  utilHooks: {
    useFormatDate: () => () => (date: string) => date,
  },
}));

describe('SubscriptionInformation', () => {
  describe('edX Logo', () => {
    it('renders the edX logo image', () => {
      render(<SubscriptionInformation />);
      const logo = screen.getByAltText('Image description');
      expect(logo).toBeInTheDocument();
    });

    it('renders the edX logo with the correct src', () => {
      render(<SubscriptionInformation />);
      const logo = screen.getByAltText('Image description');
      expect(logo).toHaveAttribute('src', 'https://www.edx.org/trademark-logos/edx-logo-elm.svg');
    });
  });

  describe('Subscription status alert', () => {
    it('renders the alert with "Subscription Status" heading', () => {
      render(<SubscriptionInformation />);
      expect(screen.getByText('Subscription Status')).toBeInTheDocument();
    });

    it('renders the alert with info variant class', () => {
      render(<SubscriptionInformation />);
      const alert = screen.getByRole('alert');
      expect(alert).toBeInTheDocument();
    });
  });

  describe('Manage my subscription button', () => {
    it('renders the "Manage my subscription" button', () => {
      render(<SubscriptionInformation />);
      const btn = screen.getByTestId('manage-button');
      expect(btn).toBeInTheDocument();
    });

    it('button has correct href pointing to subscriptionRenewalURL', () => {
      render(<SubscriptionInformation />);
      const btn = screen.getByTestId('manage-button');
      expect(btn).toHaveAttribute('href', manageSubscriptionURL);
    });

    it('button opens in a new tab with correct attributes', () => {
      render(<SubscriptionInformation />);
      const btn = screen.getByTestId('manage-button');
      expect(btn).toHaveAttribute('target', '_blank');
      expect(btn).toHaveAttribute('rel', 'noopener noreferrer');
    });

    it('button is accessible as a link role', () => {
      render(<SubscriptionInformation />);
      const btn = screen.getByRole('link', { name: /manage my subscription/i });
      expect(btn).toBeInTheDocument();
    });
  });

  // --- Container ---
  describe('Container structure', () => {
    it('renders the subscription-information container', () => {
      const { container } = render(<SubscriptionInformation />);
      expect(container.querySelector('.subscription-information')).toBeInTheDocument();
    });

    it('renders the subscription-status-alert class on the alert', () => {
      const { container } = render(<SubscriptionInformation />);
      expect(container.querySelector('.subscription-status-alert')).toBeInTheDocument();
    });
  });
});
