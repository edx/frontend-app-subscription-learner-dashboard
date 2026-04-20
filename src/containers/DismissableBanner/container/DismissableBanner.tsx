import { FC, useMemo } from 'react';
import { useBanner } from '../hooks/useBanner';
import { DismissableBannerView } from '../components/DismissableBannerView';
import type { BannerItem } from '../types';

export const Banner: FC = () => {
  const { data = {}, isLoading, isError } = useBanner();

  const bannerData = useMemo(() => {
    return data as BannerItem;
  }, [data]);

  return (
    <DismissableBannerView bannerData={bannerData} isLoading={isLoading} isError={isError} />
  );
};
