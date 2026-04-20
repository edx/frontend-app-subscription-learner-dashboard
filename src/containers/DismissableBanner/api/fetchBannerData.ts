import type { BannerItem } from '../types';

export const fetchBannerData = async (): Promise<BannerItem> => {
  const res = await fetch('https://dummyjson.com/c/a378-aff0-4799-98d2');
  if (!res.ok) {
    throw new Error('Failed to fetch banner data');
  }
  const data = await res.json();
  return {
    id: data.id,
    title: data.title,
    body: data.body,
  };
};
