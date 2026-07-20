import React, { useMemo, useState, useCallback } from 'react';
import { Tabs, Tab } from '@openedx/paragon';
import CoursesPanel from '../CoursesPanel';
import ProgramsPanel from '../ProgramsPanel';
import HistoryPanel from '../HistoryPanel';

interface IDashboardTabsProps {
  hasCourseHistory: boolean,
}

const DashboardTabs = ({ hasCourseHistory }: IDashboardTabsProps) => {
  // Defining the tabs here
  const dashboardTabs = useMemo(() => {
    const tabs = [
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
    ];

    if (hasCourseHistory) {
      tabs.push({
        key: 'history',
        title: 'Course history',
        panel: <HistoryPanel />,
      });
    }

    return tabs;
  }, [hasCourseHistory]);

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
