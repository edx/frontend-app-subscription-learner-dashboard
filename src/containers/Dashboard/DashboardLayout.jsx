import React from 'react';
import PropTypes from 'prop-types';

import { Container, Col, Row } from '@openedx/paragon';

export const DashboardLayout = ({ children }) => {
  return (
    <Container fluid size="xl">
      <Row>
        <Col className="course-list-column">
          {children}
        </Col>
      </Row>
    </Container>
  );
};
DashboardLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DashboardLayout;
