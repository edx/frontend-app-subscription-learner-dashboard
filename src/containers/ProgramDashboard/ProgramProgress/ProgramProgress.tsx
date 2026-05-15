import React, { useContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Col, Container, Row } from '@openedx/paragon';
import { logError } from '@edx/frontend-platform/logging';
import { camelCaseObject } from '@edx/frontend-platform/utils';
import { getProgramProgressData } from '../data/api';
import { ProgramProgressContext, ProgramProgressContextValueType } from './ProgramProgressProvider';
import ProgramProgressHeader from './ProgramProgressHeader';
import ProgramProgressInfo from './ProgramProgressInfo';

import './index.scss';

const ProgramProgress: React.FC = () => {
  const {
    programProgressData,
    setProgramProgressData,
  } = useContext<ProgramProgressContextValueType>(ProgramProgressContext);

  const [programProgressEndpointError, setProgramProgressEndpointError] = useState<boolean>(false);
  const hasProgramProgressData = !!(
    programProgressData?.courseData
    && programProgressData.programData
    && programProgressData.urls
  );

  // Dummy UUID for testing; replace with the real UUID when API is implemented and fetch from route params.
  const uuid = '74196513-220f-4e7a-97a1-6036110ee0e0';

  useEffect(() => {
    if (!uuid) {
      return;
    }

    getProgramProgressData(uuid)
      .then(responseData => {
        setProgramProgressData(camelCaseObject(responseData.data));
      })
      .catch(err => {
        logError(err);
        setProgramProgressEndpointError(true);
      });
  }, [uuid, setProgramProgressData]);

  if (programProgressEndpointError) {
    return (
      <div>Not found page</div>
    );
  }

  if (!uuid) {
    return (
      <div>Program uuid is missing.</div>
    );
  }

  if (!hasProgramProgressData) {
    return (
      <div>Loading...</div>
    );
  }

  const programData = programProgressData?.programData;
  const courseData = programProgressData?.courseData;

  const totalCoursesInProgram = (courseData.notStarted?.length || 0)
    + (courseData.completed?.length || 0)
    + (courseData.inProgress?.length || 0);

  const allCoursesCompleted = !courseData.notStarted?.length
    && !courseData.inProgress?.length
    && courseData.completed?.length;

  return (
    <>
      <Helmet title={`${programData?.title}`} />
      <Container fluid={false} size="xl" className="p-4.5">
        <ProgramProgressHeader
          programTitle={programData?.title}
          programType={programData?.type}
          authoringOrganizations={programData?.authoringOrganizations}
        />
        <Row>
          <Col sm={12} md={8}>
            <ProgramProgressInfo
              allCoursesCompleted={allCoursesCompleted}
              totalCoursesInProgram={totalCoursesInProgram}
            />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ProgramProgress;
