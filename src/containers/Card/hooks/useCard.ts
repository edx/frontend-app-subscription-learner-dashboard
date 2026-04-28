import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { fetchCardsData } from '../api/fetchCardsData';

type CardsData = Awaited<ReturnType<typeof fetchCardsData>>;

type UseCardsOptions = Omit<
  UseQueryOptions<CardsData>,
  'queryKey' | 'queryFn'
>;

export const useCard = (options?: UseCardsOptions) => {
  return useQuery({
    queryKey: ['cards'],
    queryFn: fetchCardsData,
    staleTime: 1000 * 60 * 5, // 5 min caching
    retry: 2,
    ...options,
  });
};
