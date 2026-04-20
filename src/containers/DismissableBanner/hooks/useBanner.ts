import { useQuery } from '@tanstack/react-query';
import { fetchBannerData } from '../api/fetchBannerData';
import type { BannerItem } from '../types';

const bannerQueryKeys = {
  BannerItem: ['dismissableBanner', 'bannerData'] as const,
};

export const useBanner = () => useQuery<BannerItem>({
  queryKey: bannerQueryKeys.BannerItem,
  queryFn: fetchBannerData,
  staleTime: 1000 * 60 * 5, // 5 min caching
});
