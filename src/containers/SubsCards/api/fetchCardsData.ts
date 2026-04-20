import { CardItem } from '../types';

const optimizedData = (data: string, size: number) => {
  return data.length > size ? `${data.slice(0, size)}...` : data;
};

export const fetchCardsData = async (): Promise<CardItem[]> => {
  const url = 'https://dummyjson.com/products?limit=4';

  try {
    const res = await fetch(url);
    const data = await res.json();
    const finalData: CardItem[] = data?.products?.map((item) => ({
      id: item.id,
      title: optimizedData(item.title, 15),
      body: optimizedData(item.description, 80),
      url: item?.images?.[0] || '',
      thumbnail: item?.thumbnail || '',
      hasTag: item.rating > 4.5,
      tagText: item.rating > 4.5 ? 'Professional Certificate' : '',
      footerLabel: 'Course',
    })) || [];

    return finalData;
  } catch (error) {
    console.error('Error fetching cards data:', error);
    return [];
  }
};
