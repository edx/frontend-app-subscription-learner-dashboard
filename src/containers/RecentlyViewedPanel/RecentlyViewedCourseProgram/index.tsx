import { FC } from 'react';

import { ProductCard } from '../../ProductCard';
import { ProductCardItem } from '../../ProductCard/data/types';

interface RecentlyViewedCourseProgramProps {
  items: ProductCardItem[],
  isLoading: boolean,
}

export const RecentlyViewedCourseProgram: FC<RecentlyViewedCourseProgramProps> = ({ items, isLoading }) => {
  return (
    <div data-testid="recently-viewed-course-cards">
      <div className="row g-3 cards-scroll flex-nowrap flex-md-wrap">
        {items.map((item) => (
          <div key={item.id} className="col-12 col-md-6 col-xl-3 d-flex card-snap mb-2">
            <ProductCard item={item} isLoading={isLoading} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentlyViewedCourseProgram;
