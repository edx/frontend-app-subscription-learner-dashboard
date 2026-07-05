import { FC } from 'react';
import { Row, Col } from '@openedx/paragon';
import DashboardTabs from './DashboardTabs';

export const DashboardContent: FC = () => (
  <Row>
    <Col xs={12} lg={8}>
      <DashboardTabs />
    </Col>

    <Col xs={12} lg={4} className="mt-4">
      <div className="dashboard-sidebar">
        {/* Temporary Content added, will be replaced with actual sidebar content */}
        <h2>Sidebar</h2>
        <p>This is the sidebar content.</p>
      </div>
    </Col>
  </Row>
);
