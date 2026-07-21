import { FC } from 'react';
import { useIntl } from '@openedx/frontend-base';
import { Card, Icon } from '@openedx/paragon';
import { Timelapse, Speed } from '@openedx/paragon/icons';
import './index.scss';

import { ProductCardProps } from './data/types';
import messages from './messages';

export const ProductCard: FC<ProductCardProps> = ({ item, isLoading }) => {
  const { formatMessage } = useIntl();
  return (
    <Card
      className="shadow-sm d-flex flex-column rounded w-100 overflow-hidden card-container"
      variant={item.product === 'Course' ? 'light' : 'dark'}
      data-testid="product-card"
      isLoading={isLoading}
    >
      <Card.Header title={item.content_type} className="pb-2 pt-2 bg-light-500 text-primary-500 content-type" size="xs" />

      <div className="position-relative image-container">
        <Card.ImageCap
          src={item.url}
          srcAlt={`${item.title} main-image`}
          data-testid="product-card-image"
          logoSrc={item.thumbnail || ''}
          logoAlt={`${item.title} thumbnail-image`}
        />
      </div>

      <Card.Header title={item.title} size="sm" className="product-card-title" />

      {item.partner ? (
        <Card.Header title={item.partner} className="d-flex justify-content-between align-items-center" size="xs" />
      ) : null}

      <Card.Section className="d-flex flex-column flex-grow-1 overflow-hidden mt-6">
        {typeof item.weeks_to_complete === 'number' && (
          <span className="d-flex align-items-center">
            <Icon src={Timelapse} className="mr-2" />
            <span>{formatMessage(messages.weeksToComplete, { count: item.weeks_to_complete })}</span>
          </span>
        )}
        {item.level ? (
          <span className={`d-flex align-items-center${typeof item.weeks_to_complete === 'number' ? ' mt-3' : ''}`}>
            <Icon src={Speed} className="mr-2" />
            <span>{formatMessage(messages.level, { level: item.level })}</span>
          </span>
        ) : null}
      </Card.Section>

    </Card>
  );
};
