import React from 'react';
import { Link } from 'react-router-dom';
import {
  breakpoints,
  useWindowSize,
  Card,
  Row,
} from '@openedx/paragon';
import programCardFallbackImage from '../assets/program-card-fallback.svg';
import { ProgramCardProps } from '../data/types';
import ProgressCategoryBubbles from './ProgressCategoryBubbles';

const ProgramListCard: React.FC<ProgramCardProps> = ({
  program,
}) => {
  const { width: windowWidth } = useWindowSize();

  const getBannerImageURL = (): string => {
    let imageURL = '';
    // We need to check that the breakpoint value exists before using it
    // Otherwise TypeScript will flag it as it can potentially be undefined in Paragon
    if (program.bannerImage && Object.keys(program.bannerImage).length > 0) {
      if (!windowWidth) {
        return program.bannerImage.medium.url;
      }

      if (typeof breakpoints.large.minWidth === 'number' && windowWidth >= breakpoints.large.minWidth) {
        imageURL = program.bannerImage.large.url;
      } else if (typeof breakpoints.medium.minWidth === 'number' && windowWidth >= breakpoints.medium.minWidth) {
        imageURL = program.bannerImage.medium.url;
      } else if (typeof breakpoints.small.minWidth === 'number' && windowWidth >= breakpoints.small.minWidth) {
        imageURL = program.bannerImage.small.url;
      } else {
        imageURL = program.bannerImage.xSmall.url;
      }
    }
    return imageURL;
  };

  const getOrgImageUrl = (): string => {
    if (program.authoringOrganizations?.length === 1 && program.authoringOrganizations[0].logoImageUrl) {
      return program.authoringOrganizations[0].logoImageUrl;
    }
    return '';
  };

  return (
    <Card
      className="program-list-card mb-4 mr-4"
      isClickable
      as={Link}
      to={`/program-progress/${program.uuid}`}
      data-testid="program-list-card"
    >
      <Card.ImageCap
        src={getBannerImageURL() || programCardFallbackImage}
        srcAlt={`program card image for ${program.title}`}
        logoSrc={getOrgImageUrl() || 'https://www.edx.org/images/logos/edx-logo-elm.svg'}
        logoAlt={program.authoringOrganizations && program.authoringOrganizations[0]?.key}
        className="banner-image"
      />
      <Card.Section className="pb-0 small">
        <Row className="justify-content-between px-2.5">
          {program.authoringOrganizations && (
            <p className="truncate-text-1">
              {program.authoringOrganizations.map(org => org.key).join(', ')}
            </p>
          )}
          <p>
            {program.type}
          </p>
        </Row>
      </Card.Section>
      <Card.Section>
        <h4 className="truncate-text-2">{program.title}</h4>
      </Card.Section>
      <Card.Section>
        <ProgressCategoryBubbles
          inProgress={program.progress.inProgress}
          notStarted={program.progress.notStarted}
          completed={program.progress.completed}
        />
      </Card.Section>
    </Card>
  );
};
export default ProgramListCard;
