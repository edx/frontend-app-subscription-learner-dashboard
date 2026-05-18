import { FC } from 'react';
import { Alert } from '@openedx/paragon';
import { useIntl } from '@openedx/frontend-base';

import { ProductCard } from '../ProductCard';
import { useRecommendedCourseData } from '@src/hooks/useRecommendedCourseData';
import messages from './messages';
import './index.scss';

export const RecommendedCourse: FC = () => {
  const { data = [], isLoading, isError } = useRecommendedCourseData();
  const { formatMessage } = useIntl();

  if (isError) {
    return (
      <Alert variant="danger" data-testid="recommended-course-error">
        {formatMessage(messages.errorText)}
      </Alert>
    );
  }

  return (
    <div className="container">
      <div className="bg-light p-2" data-testid="recommended-course-cards">
        <div className="row g-3 cards-scroll flex-nowrap flex-md-wrap">
          {data.map((item) => (
            <div key={item.id} className="col-12 col-md-6 col-xl-3 d-flex card-snap mb-2">
              <ProductCard item={item} isLoading={isLoading} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
