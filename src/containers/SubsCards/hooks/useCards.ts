import { useQuery } from '@tanstack/react-query';
import { fetchCardsData } from '../api/fetchCardsData';

export const useCards = (options = {}) => {
  return useQuery({
    queryKey: ['cards'],
    queryFn: fetchCardsData,
    staleTime: 1000 * 60 * 5, // 5 min caching
    retry: 2,
    ...options,
  });
};
