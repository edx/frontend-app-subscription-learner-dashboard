import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { IntlProvider } from '@openedx/frontend-base';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter } from 'react-router-dom';

import { ProgressCard } from './index';

// Mock ProgressCardActions
jest.mock('../ProgressCardActions', () => ({
  ProgressCardActions: () => <div>Actions</div>,
}));

// Mock dateFormatter for stable output
jest.mock('@src/utils/dateFormatter', () => ({
  dateFormatter: jest.fn(() => 'Feb 3, 2025'),
}));

// Mock data
const mockData = {
  title: 'Customer-Centric Innovation',
  pacingType: 'self_paced',
  start: '2025-02-03',
  end: '2025-03-03',
  certificateUrl: '/certificate',
  courseUrl: '/course',
};

// Render helper
const renderComponent = (props = {}) => {
  const queryClient = new QueryClient();

  return render(
    <MemoryRouter>
      <QueryClientProvider client={queryClient}>
        <IntlProvider locale="en">
          <ProgressCard
            progressCardData={mockData}
            isLoading={false}
            tabType="remaining"
            {...props}
          />
        </IntlProvider>
      </QueryClientProvider>
    </MemoryRouter>
  );
};

describe('ProgressCard', () => {
  test('renders title', () => {
    renderComponent();
    expect(screen.getByText(mockData.title)).toBeInTheDocument();
  });

  test('renders enrollment info correctly', () => {
    renderComponent();

    expect(
      screen.getByText(/\(Self Paced\) Started Feb 3, 2025/i)
    ).toBeInTheDocument();
  });

  test('renders ProgressCardActions', () => {
    renderComponent();
    expect(screen.getByText('Actions')).toBeInTheDocument();
  });

  test('renders loading state', () => {
    const { container } = renderComponent({ isLoading: true });

    const card = container.querySelector('[data-testid="progress-card"]');
    expect(card).toBeInTheDocument();
  });

  // Completed tab section
  test('renders certificate section in completed tab', () => {
    renderComponent({ tabType: 'completed' });

    expect(
      screen.getByText(/You earned the certificate on Feb 3, 2025/i)
    ).toBeInTheDocument();

    const certButton = screen.getByRole('link', {
      name: /view certificate/i,
    });

    expect(certButton).toBeInTheDocument();
    expect(certButton).toHaveAttribute('href', '/certificate');
  });

  // NOT visible in remaining tab
  test('does NOT render certificate section in remaining tab', () => {
    renderComponent({ tabType: 'remaining' });

    expect(
      screen.queryByText(/Completed on/i)
    ).not.toBeInTheDocument();
  });
});
