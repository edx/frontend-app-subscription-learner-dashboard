import React, { useEffect } from 'react';
import {
  Alert, CardGrid, Col, Container, Row, Spinner,
} from '@openedx/paragon';
import { useIntl, logError, getSiteConfig } from '@openedx/frontend-base';
import appMessages from '../../../messages';
import ProgramListCard from './ProgramListCard';
import messages from './messages';

import './index.scss';
import { useProgramsListData } from '@src/data/hooks';

const ProgramsList: React.FC = () => {
  const { formatMessage } = useIntl();

  const {
    data: programsData = [],
    isLoading,
    isError: errorState,
    error,
  } = useProgramsListData();

  useEffect(() => {
    if (error) {
      logError(error);
    }
  }, [error]);

  const renderPrograms = () => {
    if (isLoading) {
      return (
        <Col sm={12} className="d-flex justify-content-center py-4">
          <Spinner animation="border" screenReaderText={formatMessage(appMessages['subs-dash.loadingSR'])} />
        </Col>
      );
    }
    if (programsData.length > 0) {
      return (
        <>
          <Col sm={12} md={12}>
            <CardGrid columnSizes={{ xs: 12, lg: 6 }}>
              {programsData.map(program => (
                <ProgramListCard
                  key={program.uuid}
                  program={program}
                />
              ))}
            </CardGrid>
          </Col>
        </>
      );
    }
    return null;
  };

  const renderFailureAlert = () => {
    const contactUrl = `${getSiteConfig().lmsBaseUrl}/contact`;
    return (
      <Alert className="mx-auto container-mw-md" variant="danger">
        {formatMessage(messages.errorLoadingProgramEnrollments, {
          contactSupportUrl: (
            <Alert.Link href={contactUrl}>
              {contactUrl}
            </Alert.Link>
          ),
        })}
      </Alert>
    );
  };

  return (
    <Container size="lg">
      <h3>
        {formatMessage(messages.programsListHeaderText)}
      </h3>
      <p>
        {formatMessage(messages.programsListDescriptionText)}
      </p>
      <Row className="py-3">
        {errorState ? renderFailureAlert() : renderPrograms()}
      </Row>
    </Container>
  );
};

export default ProgramsList;
