import React from 'react';
import { useIntl } from '@openedx/frontend-base';
import { Row, Col, Image } from '@openedx/paragon';
import { ProgramProgressHeaderProps } from '../data/types';
import { getProgramIcon } from '../data/util';
import rwthAachenUniversityLogo from '../assets/rwth-aachen-university.svg';

import messages from './messages';

const ProgramProgressHeader: React.FC<ProgramProgressHeaderProps> = ({
  programTitle, programType, authoringOrganizations,
}) => {
  const { formatMessage } = useIntl();
  const programIcon = getProgramIcon(programType);

  return (
    <Row className="justify-content-between pb-4.5">
      <Col sm={8} xs={12} className="d-flex flex-column align-items-start">
        <div className="d-flex align-items-center">
          <Image src={programIcon} alt={`${programType} icon`} className="program-icon mr-1" />
          <h4 className="program-type-label font-weight-bold">
            {formatMessage(messages.programTypeLabel, { programType })}
          </h4>
        </div>
        <h2 className="program-title font-weight-normal">
          {programTitle}
        </h2>
      </Col>
      {authoringOrganizations && authoringOrganizations?.length > 0 && (
        <Col sm={4} className="text-center">
          <div className="x-small">
            {formatMessage(messages.programProgressInstitutions)}
          </div>
          <div>
            {authoringOrganizations.map(org => (
              <Image
                key={org.uuid}
                id="org-image"
                src={org.certificateLogoImageUrl || org.logoImageUrl || rwthAachenUniversityLogo}
                className="container-mw-md"
                alt={`${org.name}'s logo`}
              />
            ))}
          </div>
        </Col>
      )}
    </Row>
  );
};

export default ProgramProgressHeader;
