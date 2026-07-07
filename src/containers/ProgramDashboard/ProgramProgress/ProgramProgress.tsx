import { FC } from 'react';
import { Helmet } from 'react-helmet';
import { Col, Container, Row } from '@openedx/paragon';

import './index.scss';
import { useProgressData } from '@src/hooks';
import ProgramProgressHeader from './ProgramProgressHeader';
import ProgramProgressInfo from './ProgramProgressInfo';
import { ProgramProgressTabs } from './ProgramProgressTabs';
import { ProgramProgressSidebar } from './ProgramProgressSidebar';

const ProgramProgress: FC = () => {
  const { programProgressData, isLoading, error } = useProgressData();

  if (programProgressData === null) {
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
  const inProgressCourseCount = courseData?.inProgress?.length || 0;
  const remainingCourseCount = courseData?.notStarted?.length || 0;
  const completedCourseCount = courseData?.completed?.length || 0;
  const discountData = programData?.discountData;

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
              discountData={discountData}
            />
            <ProgramProgressTabs counts={{ inProgress: inProgressCourseCount, remaining: remainingCourseCount, completed: completedCourseCount }} type={programType} />
          </Col>

          <Col sm={12} md={4}>
            <ProgramProgressSidebar
              inProgress={inProgressCourseCount}
              remaining={remainingCourseCount}
              completed={completedCourseCount}
            />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ProgramProgress;
