import { FC } from 'react';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';
import { Col, Container, Row } from '@openedx/paragon';
import { camelCaseObject } from '@openedx/frontend-base';

import './index.scss';
import { useProgramProgressData } from '@src/data/hooks';
import ProgramProgressHeader from './ProgramProgressHeader';
import ProgramProgressInfo from './ProgramProgressInfo';
import { ProgramProgressTabs } from './ProgramProgressTabs';

const ProgramProgress: FC = () => {
  // Fetch UUID from route params
  const { uuid } = useParams() as { uuid: string };

  const { data, isLoading, error } = useProgramProgressData(uuid);
  const programProgressData = camelCaseObject(data);

  if (!uuid) {
    return <div>Invalid URL</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error occurred</div>;
  }

  const programData = programProgressData?.programData;
  const courseData = programProgressData?.courseData;

  const totalCoursesInProgram = (courseData.notStarted?.length || 0)
    + (courseData.completed?.length || 0)
    + (courseData.inProgress?.length || 0);

  const allCoursesCompleted = !courseData.notStarted?.length
    && !courseData.inProgress?.length
    && courseData.completed?.length;

  const programType = programData?.type ?? '';

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

        {/* TODO [TEMP]: Replace the below course count with actual count. For now, returning hardcoded data.
          Action: Revisit when data is being made dynamic.
        */}
        <ProgramProgressTabs counts={{ inProgress: 1, remaining: 2, completed: 0 }} type={programType} />
      </Container>
    </>
  );
};

export default ProgramProgress;
