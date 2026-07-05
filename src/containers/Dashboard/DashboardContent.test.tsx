import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import { DashboardContent } from './DashboardContent';

// Mock DashboardTabs

jest.mock('./DashboardTabs', () => {
  const MockDashboardTabs = () => (
    <div data-testid="dashboard-tabs">
      Dashboard Tabs Mock
    </div>
  );

  MockDashboardTabs.displayName = 'MockDashboardTabs';

  return MockDashboardTabs;
});

describe('DashboardContent', () => {
  it('renders DashboardTabs component', () => {
    render(<DashboardContent />);

    expect(screen.getByTestId('dashboard-tabs')).toBeInTheDocument();
  });

  it('renders sidebar heading', () => {
    render(<DashboardContent />);

    expect(screen.getByRole('heading', { name: /sidebar/i })).toBeInTheDocument();
  });

  it('renders sidebar content', () => {
    render(<DashboardContent />);

    expect(screen.getByText('This is the sidebar content.')).toBeInTheDocument();
  });

  it('renders both main content and sidebar', () => {
    render(<DashboardContent />);

    expect(screen.getByTestId('dashboard-tabs')).toBeInTheDocument();
    expect(screen.getByText('This is the sidebar content.')).toBeInTheDocument();
  });
});
