import { FC, useState } from 'react';
import { Tabs, Tab } from '@openedx/paragon';
import { useIntl } from '@openedx/frontend-base';

import { ProgramProgressTabsProps, ProgramProgressTabItems } from '../../data/types';
import messages from '../messages';

export const ProgramProgressTabs: FC<ProgramProgressTabsProps> = ({ type, counts }) => {
  const { inProgress, remaining, completed, pathway } = counts;
  const { formatMessage } = useIntl();

  const tabsData: ProgramProgressTabItems[] = [
    {
      key: 'in-progress',
      title: formatMessage(messages.programProgressInProgressTab),
      count: inProgress,
      panel: <span>In Progress tab data will be available soon.</span>,
    },
    {
      key: 'remaining',
      title: formatMessage(messages.programProgressRemainingTab),
      count: remaining,
      panel: <span>Remaining tab data will be available soon.</span>,
    },
    {
      key: 'completed',
      title: formatMessage(messages.programProgressCompletedTab),
      count: completed,
      panel: <span>Completed tab data will be available soon.</span>,
    },
    ...(type === 'micromasters'
      ? [{
          key: 'pathway',
          title: formatMessage(messages.programProgressPathwayTab),
          count: pathway ?? 0,
          panel: <span>Pathway tab data will be available soon.</span>,
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
        <Tab eventKey={tab.key} key={tab.key} title={`${tab.title} (${tab.count})`}>
          {tab.panel}
        </Tab>
      ))}
    </Tabs>
  );
};
