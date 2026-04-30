import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import DashboardTabs from './DashboardTabs';

jest.mock('@openedx/paragon', () => ({
  Tabs: ({ children, className }) => <div className={className}>{children}</div>,
  Tab: ({ title, children, eventKey, onSelect }) => (
    <div>
      <button type="button" onClick={() => onSelect && onSelect(eventKey)}>
        {title}
      </button>
      <div>{children}</div>
    </div>
  ),
}));

jest.mock('../../containers/CoursesPanel', () => () => (
  <div data-testid="courses-panel">Courses Panel Content</div>
));

describe('DashboardTabs', () => {
  it('renders all tab titles', () => {
    render(<DashboardTabs />);

    expect(screen.getByText('Courses')).toBeInTheDocument();
    expect(screen.getByText('Programs')).toBeInTheDocument();
    expect(screen.getByText('History')).toBeInTheDocument();
  });

  it('Courses tab is active by default and shows CoursesPanel', () => {
    render(<DashboardTabs />);

    expect(screen.getByTestId('courses-panel')).toBeInTheDocument();
  });

  it('switches to Programs tab on click', () => {
    render(<DashboardTabs />);

    fireEvent.click(screen.getByText('Programs'));

    expect(
      screen.getByText('Programs tab will be available soon.')
    ).toBeInTheDocument();
  });

  it('switches to History tab on click', () => {
    render(<DashboardTabs />);

    fireEvent.click(screen.getByText('History'));

    expect(
      screen.getByText('History tab will be available soon.')
    ).toBeInTheDocument();
  });
});

