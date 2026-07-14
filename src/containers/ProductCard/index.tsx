import { FC } from 'react';
import { Card, Badge, Icon } from '@openedx/paragon';
import { School } from '@openedx/paragon/icons';

import { ProductCardProps } from './data/types';

import './index.scss';

const DESCRIPTION_MAX_LENGTH = 130;

const getPlainText = (value: string) => value.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();

const truncateText = (value: string, maxLength: number) => (
  value.length > maxLength ? `${value.slice(0, maxLength).trimEnd()}...` : value
);

export const ProductCard: FC<ProductCardProps> = ({ item, isLoading }) => {
  return (
    <Card
      className="shadow-sm d-flex flex-column rounded w-100 overflow-hidden"
      variant={item.product === 'Course' ? 'light' : 'dark'}
      data-testid="product-card"
      isLoading={isLoading}
    >
      <div className="position-relative">
        <Card.ImageCap
          src={item.url}
          srcAlt={`${item.title} main-image`}
          data-testid="product-card-image"
          logoSrc={item.thumbnail || ''}
          logoAlt={`${item.title} thumbnail-image`}
        />
      </div>

      <Card.Header title={item.title} />

      <Card.Section className="d-flex flex-column flex-grow-1 overflow-hidden">
        <div className="flex-grow-1 min-h-0">
          <p className="text-truncate-3 mb-2">
            {truncateText(getPlainText(item.primary_description), DESCRIPTION_MAX_LENGTH)}
          </p>
        </div>

        {(item.product === 'Program' && item.tagText) && (
          <Badge
            variant="light"
            className="d-inline-flex align-items-center px-2 py-1 align-self-start"
          >
            <Icon src={School} className="mr-2" />
            {item.tagText}
          </Badge>
        )}
      </Card.Section>

      <Card.Footer className="d-flex justify-content-between align-items-center">
        <span className={`small ${item.product === 'Program' ? 'text-white' : 'text-muted'}`}>{item.footerLabel}</span>
      </Card.Footer>
    </Card>
  );
};
