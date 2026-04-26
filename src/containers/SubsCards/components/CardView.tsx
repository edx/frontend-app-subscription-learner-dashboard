import { FC } from 'react';
import { Alert, Card, Badge, Icon, Image } from '@openedx/paragon';
import { School } from '@openedx/paragon/icons';

import { CardProps } from '../types';
import { CardSkeleton } from './CardSkeleton';
import './CardView.scss';

export const CardView: FC<CardProps> = ({ data, isLoading, isError }) => {
  if (isLoading) {
    return (
      <CardSkeleton />
    );
  }

  if (isError) {
    return (
      <Alert variant="danger" data-testid="cardView-error">
        Failed to load data. Please try again later.
      </Alert>
    );
  }

  return (
    <div className="bg-light" data-testid="card-view">
      <div className="container-fluid p-2">
        <div className="row g-3 cards-scroll flex-nowrap flex-md-wrap">
          {data.map((item) => (
            <div key={item.id} className="col-12 col-md-6 col-xl-3 d-flex card-snap mb-2">
              <Card
                key={item.id}
                className="shadow-sm d-flex flex-column rounded w-100 overflow-hidden"
                variant={item.hasTag ? 'dark' : 'light'}
                data-testid="card"
              >
                <div className="position-relative">
                  <Card.ImageCap src={item.url} srcAlt={`${item.title} main-image`} data-testid="card-image" />

                  {/* Overlay thumbnail */}
                  {item.thumbnail && (
                    <Image
                      src={item.thumbnail || ''}
                      alt={`${item.title} thumbnail-image`}
                      className="position-absolute border bg-white rounded card-thumbnail"
                      data-testid="card-thumbnail"
                    />
                  )}
                </div>

                <Card.Header title={item.title} data-testid="card-header" />

                <Card.Section className="d-flex flex-column flex-grow-1 overflow-hidden" data-testid="card-body">
                  <div className="flex-grow-1 min-h-0">
                    <p className="text-truncate-3 mb-2">{item.body}</p>
                  </div>

                  {(item.hasTag && item.tagText) && (
                    <Badge
                      variant="light"
                      className="d-inline-flex align-items-center px-2 py-1 align-self-start"
                    >
                      <Icon src={School} className="mr-2" />
                      {item.tagText}
                    </Badge>
                  )}
                </Card.Section>

                <Card.Footer className="d-flex justify-content-between align-items-center" data-testid="course">
                  <span className={`small ${item.hasTag ? 'text-white' : 'text-muted'}`}>{item.footerLabel}</span>
                </Card.Footer>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
