import { FC } from 'react';
import { CardView } from './components/CardView';
import { CardProps } from './types';

export const SubsCard: FC<CardProps> = ({ data, isLoading, isError }) => {
  return (
    <div className="container">
      <CardView data={data} isLoading={isLoading} isError={isError} />
    </div>
  );
};
