import { FC } from 'react';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';
import { Col, Container, Row } from '@openedx/paragon';

import './index.scss';
import { useProgramProgressData } from '@src/data/hooks/queryHooks';
import ProgramProgressHeader from './ProgramProgressHeader';
import ProgramProgressInfo from './ProgramProgressInfo';

const ProgramProgress: FC = () => {
  // Fetch UUID from route params
  const { uuid } = useParams() as { uuid: string };

  const { data: programProgressData, isLoading, error } = useProgramProgressData(uuid);

  if (!uuid) {
    return <div>Invalid URL</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error occurred</div>;
  }

  const programData = programProgressData?.program_data;
  const courseData = programProgressData?.course_data;

  const totalCoursesInProgram = (courseData.not_started?.length || 0)
    + (courseData.completed?.length || 0)
    + (courseData.in_progress?.length || 0);

  const allCoursesCompleted = !courseData.not_started?.length
    && !courseData.in_progress?.length
    && courseData.completed?.length;

  return (
    <>
      <Helmet title={`${programData?.title}`} />
      <Container fluid={false} size="xl" className="p-4.5">
        <ProgramProgressHeader
          programTitle={programData?.title ?? ''}
          programType={programData?.type ?? ''}
          authoringOrganizations={programData?.authoring_organizations}
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
