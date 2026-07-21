import { FC } from 'react';

import { ProductCard } from '../../ProductCard';
import { PopularCoursesProps } from './data/types';

export const PopularCourses: FC<PopularCoursesProps> = ({ items, isLoading }) => {
  return (
    <div data-testid="popular-courses-items">
      <div className="row g-3 flex-nowrap flex-md-wrap overflow-auto">
        {items.map((item) => (
          <div key={item.objectID} className="col-12 col-md-6 col-xl-3 d-flex mb-2">
            <ProductCard item={item} isLoading={isLoading} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularCourses;
