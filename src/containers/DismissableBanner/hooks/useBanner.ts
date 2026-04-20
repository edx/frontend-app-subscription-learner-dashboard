import { useQuery } from '@tanstack/react-query';
import { fetchBannerData } from '../api/fetchBannerData';

export const useBanner = () => useQuery({
  queryKey: ['bannerData'],
  queryFn: fetchBannerData,
  staleTime: 1000 * 60 * 5, // 5 min caching
});
