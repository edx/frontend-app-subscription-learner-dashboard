import { Row, Col } from '@openedx/paragon';
import DashboardTabs from './DashboardTabs';

interface IDashboardContentProps {
  hasCourseHistory: boolean,
}

export const DashboardContent = ({ hasCourseHistory }: IDashboardContentProps) => (
  <Row>
    <Col xs={12} lg={8}>
      <DashboardTabs hasCourseHistory={hasCourseHistory} />
    </Col>
    <Col xs={12} lg={4} className="mt-4" data-testid="dashboard-sidebar">
      <div className="dashboard-sidebar">
        {/* Temporary Content added, will be replaced with actual sidebar content */}
        <h2>Sidebar</h2>
        <p>This is the sidebar content.</p>
      </div>
    </Col>
  </Row>
);
