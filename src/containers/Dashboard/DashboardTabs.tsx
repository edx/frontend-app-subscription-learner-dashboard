import React, { useMemo, useState, useCallback } from 'react';
import { Tabs, Tab } from '@openedx/paragon';
import CoursesPanel from '../CoursesPanel';
import ProgramsPanel from '../ProgramsPanel';
import HistoryPanel from '../HistoryPanel';

const DashboardTabs = () => {
  // Defining the tabs here
  const dashboardTabs = useMemo(() => ([
    {
      key: 'courses',
      title: 'Courses',
      panel: <CoursesPanel />,
    },
    {
      key: 'programs',
      title: 'Programs',
      panel: <ProgramsPanel />,
    },
    {
      key: 'history',
      title: 'History',
      panel: <HistoryPanel />,
    },
  ]), []);

  const [activeTab, setActiveTab] = useState(dashboardTabs[0].key);
  const handleTabSelect = useCallback((tabKey) => {
    if (tabKey) {
      setActiveTab(tabKey);
    }
  }, []);

  return (
    <Tabs
      id="subscription-dashboard-tabs"
      defaultActiveKey={dashboardTabs[0]?.key}
      activeKey={activeTab}
      onSelect={handleTabSelect}
      className="mb-4"
      mountOnEnter
    >
      {dashboardTabs.map(tab => (
        <Tab eventKey={tab.key} title={tab.title} key={tab.key}>
          {tab.panel}
        </Tab>
      ))}
    </Tabs>
  );
};

export default DashboardTabs;
