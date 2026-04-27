import React from 'react';
import type { ReactNode } from 'react';

import { Tabs, Tab } from '@openedx/paragon';

export interface DashboardTab {
  key: string,
  title: ReactNode,
  panel: ReactNode,
}

interface DashboardTabsProps {
  activeTab: string,
  onSelect: (tabKey: string | null) => void,
  tabs: DashboardTab[],
}

export const DashboardTabs = ({
  activeTab,
  onSelect,
  tabs,
}: DashboardTabsProps) => (
  <Tabs
    id="subscription-dashboard-tabs"
    defaultActiveKey={tabs[0]?.key}
    activeKey={activeTab}
    onSelect={onSelect}
    className="mb-4"
    mountOnEnter
  >
    {tabs.map(tab => (
      <Tab eventKey={tab.key} title={tab.title} key={tab.key}>
        {tab.panel}
      </Tab>
    ))}
  </Tabs>
);

export default DashboardTabs;
