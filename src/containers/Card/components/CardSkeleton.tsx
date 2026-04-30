import { FC } from 'react';
import { Skeleton, Card, useWindowSize, breakpoints } from '@openedx/paragon';

export const CardSkeleton: FC = () => {
  const { width = 1200 } = useWindowSize(); // fallback for SSR

  const count = width < (breakpoints.small.maxWidth ?? 768) ? 1
    : (width < (breakpoints.large.maxWidth ?? 1200) ? 2
        : 4);

  return (
    <div className="d-flex flex-wrap justify-content-center p-3" data-testid="skeleton">
      {Array.from({ length: count }).map((_, idx) => (
        <Card
          key={`skeleton-card-${idx}`} // eslint-disable-line react/no-array-index-key
          className="shadow-sm d-flex flex-column m-2 rounded w-100 skeleton"
          style={{ maxWidth: '350px' }}
          data-testid="skeleton-card"
        >
          <Skeleton height={200} />

          <Card.Header skeletonHeight={200} />

          <Card.Section className="flex-grow-1 d-flex flex-column overflow-hidden min-h-0">
            <Skeleton width="90%" className="mb-2" />
            <Skeleton width="80%" className="mb-2" />
            <Skeleton width="60%" />
          </Card.Section>

          <Card.Footer skeletonHeight={20} />
        </Card>
      ))}
    </div>
  );
};
