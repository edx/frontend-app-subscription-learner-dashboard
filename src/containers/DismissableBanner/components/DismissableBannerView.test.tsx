import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { DismissableBannerView } from './DismissableBannerView';

jest.mock('@openedx/paragon', () => {
  const actual = jest.requireActual('@openedx/paragon');
  return {
    ...actual,
    Alert: Object.assign(
      ({
        children,
        show,
        onClose,
        closeLabel,
        actions,
      }: {
        children: React.ReactNode,
        show: boolean,
        onClose: () => void,
        closeLabel?: string,
        actions?: React.ReactNode[],
      }) =>
        show ? (
          <div>
            {children}
            {actions}
            <button data-testid="alert-close" onClick={onClose}>
              {closeLabel ?? 'Close'}
            </button>
          </div>
        ) : null,
      {
        Heading: ({ children }: { children: React.ReactNode }) => (
          <h4>{children}</h4>
        ),
      },
    ),
    Button: ({ children, onClick }: { children: React.ReactNode, onClick?: () => void }) => (
      <button onClick={onClick}>{children}</button>
    ),
    Icon: () => null,
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

  test('renders banner title and body', () => {
    render(<DismissableBannerView bannerData={mockBannerData} isLoading={false} isError={false} />);
    expect(screen.getByText(mockBannerData.title)).toBeInTheDocument();
    expect(screen.getByText(mockBannerData.body)).toBeInTheDocument();
  });

  test('renders the Renew Subscription button', () => {
    render(<DismissableBannerView bannerData={mockBannerData} isLoading={false} isError={false} />);
    expect(screen.getByText('Renew Subscription')).toBeInTheDocument();
  });

  test('dismisses the banner when close button is clicked', () => {
    render(<DismissableBannerView bannerData={mockBannerData} isLoading={false} isError={false} />);
    fireEvent.click(screen.getByTestId('alert-close'));
    expect(screen.queryByText(mockBannerData.title)).not.toBeInTheDocument();
    expect(screen.queryByText(mockBannerData.body)).not.toBeInTheDocument();
  });

  test('close button has the correct label "Dismiss"', () => {
    render(<DismissableBannerView bannerData={mockBannerData} isLoading={false} isError={false} />);
    expect(screen.getByTestId('alert-close')).toHaveTextContent('Dismiss');
  });
});
