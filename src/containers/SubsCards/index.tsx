import { FC } from 'react';
import { useCards } from './hooks/useCards';
import { CardView } from './components/CardView';

export const SubsCard: FC = () => {
  const { data = [], isLoading, isError } = useCards();

  return (
    <div className="container">
      <CardView data={data} isLoading={isLoading} isError={isError} />
    </div>
  );
};
