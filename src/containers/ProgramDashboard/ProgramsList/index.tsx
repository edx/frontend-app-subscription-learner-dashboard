import React from 'react';
import {
  Alert, CardGrid, Col, Row, Spinner,
} from '@openedx/paragon';
import { useIntl, getSiteConfig } from '@openedx/frontend-base';
import appMessages from '../../../messages';
import ProgramListCard from './ProgramListCard';
import messages from './messages';
import { ProgramList } from '../data/types';

import './index.scss';

const ProgramsList: React.FC<ProgramList> = ({ programsData, isLoading, errorState }) => {
  const { formatMessage } = useIntl();

  const renderPrograms = () => {
    if (isLoading) {
      return (
        <Col sm={12} className="d-flex justify-content-center py-4 hello">
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
    <div>
      <p>
        {formatMessage(messages.programsListDescriptionText)}
      </p>
      <Row className="py-3">
        {errorState ? renderFailureAlert() : renderPrograms()}
      </Row>
    </div>
  );
};

export default ProgramsList;
