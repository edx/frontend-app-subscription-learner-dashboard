import React, { useContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';
import { Col, Container, Row } from '@openedx/paragon';
import { logError, camelCaseObject } from '@openedx/frontend-base';
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

  // Fetch UUID from route params
  const { uuid } = useParams() as { uuid: string };

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
          programTitle={programData?.title ?? ''}
          programType={programData?.type ?? ''}
          authoringOrganizations={programData?.authoringOrganizations}
        />
        <Row>
          <Col sm={12} md={8}>
            <ProgramProgressInfo
              allCoursesCompleted={allCoursesCompleted}
              totalCoursesInProgram={totalCoursesInProgram}
              programTitle={programData?.title ?? ''}
            />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ProgramProgress;
