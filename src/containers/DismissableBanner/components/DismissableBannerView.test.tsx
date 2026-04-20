import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { DismissableBannerView } from './DismissableBannerView';

jest.mock('@openedx/paragon', () => {
  const actual = jest.requireActual('@openedx/paragon');
  return {
    ...actual,
    PageBanner: ({ children, show, onDismiss }: {
      children: React.ReactNode,
      show: boolean,
      onDismiss: () => void,
    }) => (show ? (
      <div>
        {children}
        <button data-testid="paragon-dismiss" onClick={onDismiss}>ParagonDismiss</button>
      </div>
    ) : null),
  };
});

const mockBannerData = {
  id: '1',
  title: 'Subscription Expired',
  body: 'Your subscription has expired. Please renew to continue accessing the course materials.',
  isLoading: false,
  isError: false,
};

describe('DismissableBannerView', () => {
  test('renders loading state', () => {
    render(<DismissableBannerView bannerData={mockBannerData} isLoading={true} isError={false} />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  test('renders error state', () => {
    render(<DismissableBannerView bannerData={mockBannerData} isLoading={false} isError={true} />);
    expect(screen.getByTestId('error-loading-banner')).toBeInTheDocument();
  });

  test('renders banner content', () => {
    render(<DismissableBannerView bannerData={mockBannerData} isLoading={false} isError={false} />);
    expect(screen.getByText(mockBannerData.title)).toBeInTheDocument();
    expect(screen.getByTestId('test-message-body')).toHaveTextContent(mockBannerData.body);
  });

  test('dismisses the banner when dismiss button is clicked', () => {
    render(<DismissableBannerView bannerData={mockBannerData} isLoading={false} isError={false} />);
    fireEvent.click(screen.getByText('Dismiss'));
    expect(screen.queryByText(mockBannerData.title)).not.toBeInTheDocument();
    expect(screen.queryByTestId('test-message-body')).not.toBeInTheDocument();
  });

  test('dismisses the banner via PageBanner onDismiss callback', () => {
    render(<DismissableBannerView bannerData={mockBannerData} isLoading={false} isError={false} />);
    fireEvent.click(screen.getByTestId('paragon-dismiss'));
    expect(screen.queryByText(mockBannerData.title)).not.toBeInTheDocument();
    expect(screen.queryByTestId('test-message-body')).not.toBeInTheDocument();
  });

  test('opens the renewal link in a new tab', () => {
    render(<DismissableBannerView bannerData={mockBannerData} isLoading={false} isError={false} />);
    const renewButton = screen.getByText('Renew Subscription');
    expect(renewButton.closest('a')).toHaveAttribute('href', 'https://courses.edx.org/renew-subscription');
    expect(renewButton.closest('a')).toHaveAttribute('target', '_blank');
    expect(renewButton.closest('a')).toHaveAttribute('rel', 'noopener noreferrer');
  });
});
