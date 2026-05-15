import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { IntlProvider } from '@openedx/frontend-base';
import DashboardTabs from './DashboardTabs';

interface TabsProps {
  children?: React.ReactNode,
  className?: string,
};

interface TabProps {
  title?: React.ReactNode,
  children?: React.ReactNode,
  eventKey?: string | number,
  onSelect?: (key: string | number | undefined) => void,
};

jest.mock('@openedx/paragon', () => {
  const MockTabs = ({ children, className }: TabsProps) => (
    <div className={className}>{children}</div>
  );

  MockTabs.displayName = 'MockTabs';

  const MockTab = ({
    title,
    children,
    eventKey,
    onSelect,
  }: TabProps) => (
    <div>
      <button type="button" onClick={() => onSelect?.(eventKey)}>
        {title}
      </button>
      <div>{children}</div>
    </div>
  );

  MockTab.displayName = 'MockTab';

  return {
    Tabs: MockTabs,
    Tab: MockTab,
  };
});

const renderComponent = () => render(<IntlProvider locale="en"><DashboardTabs /></IntlProvider>);

jest.mock('../../containers/CoursesPanel', () => {
  const MockCoursesPanel = () => (
    <div data-testid="courses-panel">
      Courses Panel Content
    </div>
  );

  MockCoursesPanel.displayName = 'MockCoursesPanel';

  return MockCoursesPanel;
});

describe('DashboardTabs', () => {
  it('renders all tab titles', () => {
    renderComponent();

    expect(screen.getByText('Courses')).toBeInTheDocument();
    expect(screen.getAllByText('Programs')).toHaveLength(2);
    expect(screen.getByText('History')).toBeInTheDocument();
  });

  it('Courses tab is active by default and shows CoursesPanel', () => {
    renderComponent();

    expect(screen.getByTestId('courses-panel')).toBeInTheDocument();
  });

  it('switches to Programs tab on click', () => {
    renderComponent();

    fireEvent.click(screen.getAllByText('Programs')[0]);

    expect(
      screen.getByTestId('programs-list')
    ).toBeInTheDocument();
  });

  it('switches to History tab on click', () => {
    renderComponent();

    fireEvent.click(screen.getByText('History'));

    expect(
      screen.getByText('History tab will be available soon.')
    ).toBeInTheDocument();
  });
});
