import { FC, useState } from 'react';
import { Tabs, Tab } from '@openedx/paragon';
import { useIntl } from '@openedx/frontend-base';

import { ProgramProgressTabsProps, ProgramProgressTabItems } from '../../data/types';
import messages from '../messages';
import { RemainingTabData } from '../RemainingTabData';

export const ProgramProgressTabs: FC<ProgramProgressTabsProps> = ({ type, counts }) => {
  const { inProgress, remaining, completed } = counts;
  const { formatMessage } = useIntl();

  const tabsData: ProgramProgressTabItems[] = [
    {
      key: 'in-progress',
      title: formatMessage(messages.programProgressInProgressTab),
      count: inProgress,
      panel: <span>In progress tab data will be available soon.</span>,
    },
    {
      key: 'remaining',
      title: formatMessage(messages.programProgressRemainingTab),
      count: remaining,
      panel: <RemainingTabData />,
    },
    {
      key: 'completed',
      title: formatMessage(messages.programProgressCompletedTab),
      count: completed,
      panel: <span>Completed tab data will be available soon.</span>,
    },
    ...(type?.toLowerCase() === 'micromasters'
      ? [{
          key: 'pathways',
          title: formatMessage(messages.programProgressPathwaysTab),
          panel: <span>Pathways tab data will be available soon.</span>,
        }]
      : []),
  ];

  const [activeTab, setActiveTab] = useState<string>(tabsData[0].key);

  const handleTabSelect = (tabKey: string | null) => {
    if (tabKey) setActiveTab(tabKey);
  };

  return (
    <Tabs
      id="program-progress-tabs"
      activeKey={activeTab}
      onSelect={handleTabSelect}
      className="mb-4"
      mountOnEnter
    >
      {tabsData.map(tab => (
        <Tab eventKey={tab.key} key={tab.key} title={tab.count !== undefined ? `${tab.title} (${tab.count})` : tab.title}>
          {tab.panel}
        </Tab>
      ))}
    </Tabs>
  );
};
