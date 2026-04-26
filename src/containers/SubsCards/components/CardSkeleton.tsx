import { FC, useEffect, useState } from 'react';
import { Skeleton, Card } from '@openedx/paragon';

export const CardSkeleton: FC = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const mobile = window.matchMedia('(max-width: 767px)');
    const tablet = window.matchMedia('(max-width: 1199px)');

    const handleChange = () => {
      if (mobile.matches) {
        setCount(1);
      } else if (tablet.matches) {
        setCount(2);
      } else {
        setCount(4);
      }
    };

    handleChange();

    mobile.addEventListener('change', handleChange);
    tablet.addEventListener('change', handleChange);

    return () => {
      mobile.removeEventListener('change', handleChange);
      tablet.removeEventListener('change', handleChange);
    };
  }, []);

  return (
    <div className="d-flex flex-wrap justify-content-center p-3" data-testid="skeleton">
      {Array.from({ length: count }).map((_, idx) => (
        <Card
          key={`skeleton-card-${idx}`} // eslint-disable-line react/no-array-index-key
          className="shadow-sm d-flex flex-column m-2 rounded w-100 skeleton"
          style={{ maxWidth: 350 }}
          data-testid="skeleton-card"
        >

          <Skeleton height={200} />

          <Card.Header>
            <Skeleton height={200} />
          </Card.Header>

          <Card.Section className="flex-grow-1 d-flex flex-column overflow-hidden min-h-0">
            <Skeleton width="90%" className="mb-2" />
            <Skeleton width="80%" className="mb-2" />
            <Skeleton width="60%" />
          </Card.Section>

          <Card.Footer className="d-flex justify-content-between align-items-center">
            <Skeleton height={20} />
          </Card.Footer>
        </Card>
      ))}
    </div>
  );
};
