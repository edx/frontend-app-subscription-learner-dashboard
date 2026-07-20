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
  it('renders both main content and sidebar', () => {
    render(<DashboardContent hasCourseHistory={false} />);

    expect(screen.getByTestId('dashboard-tabs')).toBeInTheDocument();
    expect(screen.getByTestId('dashboard-sidebar')).toBeInTheDocument();
  });
});
