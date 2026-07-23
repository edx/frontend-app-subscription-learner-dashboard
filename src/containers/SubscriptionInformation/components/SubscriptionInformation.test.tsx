import React from 'react';
import { render, screen } from '@testing-library/react';
import { IntlProvider } from '@openedx/frontend-base';
import { SubscriptionInformation } from './SubscriptionInformation';
import { manageSubscriptionURL } from '@src/data/constants/app';
import messages from '../messages';
import { formatMessage } from '@src/testUtils';

jest.mock('@src/hooks', () => ({
  useCourseData: jest.fn(),
  utilHooks: {
    useFormatDate: () => date => date,
  },
}));

const renderComponent = () => {
  return render(
    <IntlProvider locale="en">
      <SubscriptionInformation />
    </IntlProvider>,
  );
};

describe('SubscriptionInformation', () => {
  describe('Subscription heading', () => {
    it('renders the My Subscription heading', () => {
      renderComponent();

      expect(
        screen.getByRole('heading', {
          name: formatMessage(messages.mySubscriptionHeading),
        }),
      ).toBeInTheDocument();
    });
  });

  describe('Subscription status alert', () => {
    it('renders the alert', () => {
      renderComponent();

      const alert = screen.getByRole('alert');
      expect(alert).toBeInTheDocument();
    });

    it('renders the subscription status and plan name', () => {
      renderComponent();

      expect(
        screen.getByText(/Active, Monthly plan/i),
      ).toBeInTheDocument();
    });

    it('renders the renewal message', () => {
      renderComponent();

      expect(
        screen.getByText(/Your next payment is/i),
      ).toBeInTheDocument();
    });

    it('renders the cached status icon', () => {
      renderComponent();

      expect(screen.getByTestId('subscription-status-icon')).toBeInTheDocument();
    });
  });

  describe('Manage my subscription button', () => {
    it('renders the "Manage my subscription" button', () => {
      renderComponent();

      const btn = screen.getByTestId('manage-button');
      expect(btn).toBeInTheDocument();
    });

    it('button has correct href pointing to manageSubscriptionURL', () => {
      renderComponent();

      const btn = screen.getByTestId('manage-button');
      expect(btn).toHaveAttribute('href', manageSubscriptionURL);
    });

    it('button opens in a new tab with correct attributes', () => {
      renderComponent();

      const btn = screen.getByTestId('manage-button');
      expect(btn).toHaveAttribute('target', '_blank');
      expect(btn).toHaveAttribute('rel', 'noopener noreferrer');
    });

    it('button is accessible as a link role', () => {
      renderComponent();

      const btn = screen.getByRole('link', {
        name: /manage my subscription/i,
      });

      expect(btn).toBeInTheDocument();
    });
  });

  describe('Container structure', () => {
    it('renders the subscription-information container', () => {
      const { container } = renderComponent();

      expect(
        container.querySelector('.subscription-information'),
      ).toBeInTheDocument();
    });

    it('renders the subscription-status-alert class on the alert', () => {
      const { container } = renderComponent();

      expect(
        container.querySelector('.subscription-status-alert'),
      ).toBeInTheDocument();
    });

    it('renders the my-subscription-heading class', () => {
      const { container } = renderComponent();

      expect(
        container.querySelector('.my-subscription-heading'),
      ).toBeInTheDocument();
    });

    it('renders the alert heading as h6', () => {
      renderComponent();

      expect(
        screen.getByRole('heading', { level: 6 }),
      ).toBeInTheDocument();
    });
  });
});
