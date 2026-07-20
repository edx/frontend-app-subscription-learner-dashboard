import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { IntlProvider } from '@openedx/frontend-base';
import DashboardTabs from './DashboardTabs';

interface TabProps {
  title?: React.ReactNode,
  children?: React.ReactNode,
  eventKey?: string | number,
  onSelect?: (key: string | number | undefined) => void,
};

jest.mock('@openedx/paragon', () => {
  const React = jest.requireActual('react');
  const MockTabs = ({ children, className, onSelect }: any) => (
    <div className={className}>
      {React.Children.map(children, child =>
        React.cloneElement(child, { onSelect })
      )}
    </div>
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

const renderComponent = (props = {}) =>
  render(
    <IntlProvider locale="en">
      <DashboardTabs hasCourseHistory={false} {...props} />
    </IntlProvider>
  );

jest.mock('../ProgramsPanel', () => {
  const MockProgramsPanel = () => (
    <div data-testid="programs-list">
      Programs Panel Content
    </div>
  );

  MockProgramsPanel.displayName = 'MockProgramsPanel';

  return MockProgramsPanel;
});

jest.mock('../../containers/CoursesPanel', () => {
  const MockCoursesPanel = () => (
    <div data-testid="courses-panel">
      Courses Panel Content
    </div>
  );

  MockCoursesPanel.displayName = 'MockCoursesPanel';

  return MockCoursesPanel;
});

jest.mock('../HistoryPanel', () => {
  const MockHistoryPanel = () => (
    <div data-testid="history-panel">
      History Panel Content
    </div>
  );

  MockHistoryPanel.displayName = 'MockHistoryPanel';

  return MockHistoryPanel;
});

describe('DashboardTabs', () => {
  it('renders all tab titles', () => {
    renderComponent();

    expect(screen.getByText('Courses')).toBeInTheDocument();
    expect(screen.getAllByText('Programs')).toHaveLength(1);
    expect(screen.queryByText('Course history')).not.toBeInTheDocument();
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
    renderComponent({ hasCourseHistory: true });

    fireEvent.click(screen.getByText('Course history'));

    expect(
      screen.getByTestId('history-panel')
    ).toBeInTheDocument();
  });
});
