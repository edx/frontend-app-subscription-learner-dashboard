import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import DashboardTabs from './DashboardTabs';

jest.mock('@openedx/paragon', () => {
  const React = require('react');
  return {
    Tabs: ({ children, onSelect }) => <>{React.Children.map(children, child => React.cloneElement(child, { onSelect }))}</>,
    Tab: ({ title, children, eventKey, onSelect }) => <span onClick={() => onSelect && onSelect(eventKey, {})}>{title}{children}</span>,
  };
});

describe('DashboardTabs', () => {
  it('renders tabs and handles click', () => {
    const onSelect = jest.fn();

    render(
      <DashboardTabs
        activeTab="tab1"
        onSelect={onSelect}
        tabs={[
          { key: 'tab1', title: 'Tab 1', panel: <div>Tab 1 Content</div> },
          { key: 'tab2', title: 'Tab 2', panel: <div>Tab 2 Content</div> },
        ]}
      />
    );
    expect(screen.getByText('Tab 1')).toBeInTheDocument();
    expect(screen.getByText('Tab 1 Content')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Tab 2'));
    expect(onSelect).toHaveBeenCalledWith('tab2', expect.anything());
  });
});
