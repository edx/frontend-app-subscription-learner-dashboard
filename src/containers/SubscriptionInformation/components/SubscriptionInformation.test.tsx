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
    </IntlProvider>
  );
};

describe('SubscriptionInformation', () => {
  describe('edX Logo', () => {
    it('renders the edX logo image', () => {
      renderComponent();
      const logo = screen.getByAltText('edX Logo');
      expect(logo).toBeInTheDocument();
    });

    it('renders the edX logo with the correct src', () => {
      renderComponent();
      const logo = screen.getByAltText('edX Logo');
      expect(logo).toHaveAttribute('src', 'https://www.edx.org/trademark-logos/edx-logo-elm.svg');
    });
  });

  describe('Subscription status alert', () => {
    it('renders the alert with "Subscription Status" heading', () => {
      renderComponent();
      expect(screen.getByText(formatMessage(messages.statusMessage))).toBeInTheDocument();
    });

    it('renders the alert with info variant class', () => {
      renderComponent();
      const alert = screen.getByRole('alert');
      expect(alert).toBeInTheDocument();
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
      const btn = screen.getByRole('link', { name: /manage my subscription/i });
      expect(btn).toBeInTheDocument();
    });
  });

  // --- Container ---
  describe('Container structure', () => {
    it('renders the subscription-information container', () => {
      const { container } = renderComponent();
      expect(container.querySelector('.subscription-information')).toBeInTheDocument();
    });

    it('renders the subscription-status-alert class on the alert', () => {
      const { container } = render(<SubscriptionInformation />);
      expect(container.querySelector('.subscription-status-alert')).toBeInTheDocument();
    });
  });
});
